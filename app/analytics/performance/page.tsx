import type { Metadata } from "next"
import AnalyticsPerformanceContent from "@/components/analytics/performance-content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
    title: "Analytics Performance - CMSFullForm",
    description: "Track your website performance metrics and KPIs",
}

export default function AnalyticsPerformancePage() {
    return (
        <Layout>
            <AnalyticsPerformanceContent />
        </Layout>
    )
}
