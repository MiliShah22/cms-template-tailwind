import type { Metadata } from "next"
import AnalyticsOverviewContent from "@/components/analytics/overview-content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
    title: "Analytics Overview - CMSFullForm",
    description: "Track your website traffic and visitor behavior analytics",
}

export default function AnalyticsOverviewPage() {
    return (
        <Layout>
            <AnalyticsOverviewContent />
        </Layout>
    )
}
