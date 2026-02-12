'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

type AccordionType = 'single' | 'multiple'

interface AccordionContextValue {
  type: AccordionType
  collapsible?: boolean
  openItems: string[]
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined,
)

interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType
  collapsible?: boolean
  defaultValue?: string
}

const Accordion = ({
  type = 'single',
  collapsible = false,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<string[]>(
    defaultValue ? [defaultValue] : [],
  )

  const toggleItem = (value: string) => {
    setOpenItems((current) => {
      if (type === 'single') {
        if (current[0] === value) {
          return collapsible ? [] : current
        }
        return [value]
      }

      // multiple
      if (current.includes(value)) {
        return current.filter((v) => v !== value)
      }
      return [...current, value]
    })
  }

  return (
    <AccordionContext.Provider
      value={{ type, collapsible, openItems, toggleItem }}
    >
      <div className={cn('divide-y divide-gray-200 dark:divide-gray-800', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

Accordion.displayName = 'Accordion'

interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-value={value}
        className={cn('border-b last:border-b-0 border-gray-200 dark:border-gray-800', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('AccordionTrigger must be used within <Accordion>')
  }

  const itemValue =
    (props as any)['data-value'] ||
    (props as any).value ||
    (props as any)['aria-controls']

  // We rely on parent AccordionItem to set data-value; fallback no-op if missing.
  const value = itemValue as string
  const isOpen = value && context.openItems.includes(value)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (value) {
      context.toggleItem(value)
    }
    props.onClick?.(event)
  }

  return (
    <button
      ref={ref}
      type="button"
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  )
})

AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('AccordionContent must be used within <Accordion>')
  }

  const parent = (props as any)['data-value'] as string | undefined
  const isOpen = parent ? context.openItems.includes(parent) : false

  return (
    <div
      ref={ref}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      )}
      hidden={!isOpen}
      {...props}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </div>
  )
})

AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
