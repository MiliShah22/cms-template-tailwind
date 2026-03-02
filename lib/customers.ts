import raw from "../data/customers.json"

export interface Customer {
    id: string
    name: string
    email: string
    phone: string
    address: string
    avatar: string
    segment: string
}

const customers = raw as Customer[]

export function getCustomers(): Customer[] {
    return customers
}

export function getCustomerById(id: string): Customer | undefined {
    return customers.find((c) => c.id === id)
}

export function getSegmentSlugs(): string[] {
    const slugs = customers.map((c) => c.segment.toLowerCase())
    return Array.from(new Set(slugs))
}

export function getSegmentCounts(): Record<string, number> {
    return customers.reduce((acc, c) => {
        const key = c.segment.toLowerCase()
        acc[key] = (acc[key] || 0) + 1
        return acc
    }, {} as Record<string, number>)
}

export function getCustomersBySegment(segment: string): Customer[] {
    return customers.filter(
        (c) => c.segment.toLowerCase() === segment.toLowerCase()
    )
}