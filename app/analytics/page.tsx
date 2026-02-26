import { redirect } from "next/navigation"

export default function AnalyticsPage() {
    // Redirect to overview by default
    redirect("/analytics/overview")
}
