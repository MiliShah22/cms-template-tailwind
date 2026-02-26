import type { Metadata } from "next"
import AnalyticsAudienceContent from "@/components/analytics/audience-content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
    title: "Analytics Audience - CMSFullForm",
    description: "Analyze your website audience demographics and behavior",
}

export default function AnalyticsAudiencePage() {
    return (
        <Layout>
            <AnalyticsAudienceContent />
        </Layout>
    )
}
