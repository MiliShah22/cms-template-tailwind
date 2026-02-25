import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ApiKeysContent } from "@/components/api/keys-content"

export const metadata: Metadata = {
    title: "API Keys - CMSFullForm Dashboard",
    description: "Manage API keys and access.",
}

export default function ApiKeysPage() {
    return (
        <Layout>
            <ApiKeysContent />
        </Layout>
    )
}
