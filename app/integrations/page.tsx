import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { IntegrationsContent } from "@/components/integrations/content"

export const metadata: Metadata = {
    title: "Integrations - CMSFullForm Dashboard",
    description: "Manage third-party integrations.",
}

export default function IntegrationsPage() {
    return (
        <Layout>
            <IntegrationsContent />
        </Layout>
    )
}
