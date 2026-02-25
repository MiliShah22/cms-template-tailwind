import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ApiContent } from "@/components/api/content"

export const metadata: Metadata = {
    title: "API - CMSFullForm Dashboard",
    description: "Manage API keys and webhooks.",
}

export default function ApiPage() {
    return (
        <Layout>
            <ApiContent />
        </Layout>
    )
}
