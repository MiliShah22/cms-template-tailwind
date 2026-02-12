import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

interface PlaceholderPageProps {
  path: string
}

function formatTitleFromPath(path: string) {
  const segments = path.split("/").filter(Boolean)
  const last = segments[segments.length - 1] || "Page"
  return last
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function PlaceholderPage({ path }: PlaceholderPageProps) {
  const title = formatTitleFromPath(path)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Sparkles className="h-3 w-3" />
            Prototype template
          </div>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
            <Badge variant="outline" className="border-amber-300 bg-amber-50 text-[10px] uppercase tracking-wide text-amber-700 dark:border-amber-500/60 dark:bg-amber-500/5 dark:text-amber-300">
              Coming soon
            </Badge>
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            This screen is wired up and ready. Replace this template with your real content when the feature is ready.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard-cms">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Button>
          </Link>
        </div>
      </div>

      <Card className="border-dashed">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <CardTitle className="text-sm font-medium">Page template</CardTitle>
          </div>
          <span className="text-xs text-gray-400">{path}</span>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
          <p>
            This is a generic layout for pages that are not fully implemented yet. It uses your main CMSFullForm dashboard
            shell (sidebar + top navigation) so navigation and theming stay consistent while you build out the details.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Keep this as a placeholder while the feature is still in design or development.</li>
            <li>When the page is ready, replace this component with your actual content or a feature-specific layout.</li>
            <li>You can duplicate this pattern for new routes to get instant, styled scaffolding.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}


