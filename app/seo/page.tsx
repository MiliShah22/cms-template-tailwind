import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { SeoContent } from "@/components/seo/content"

export const metadata: Metadata = {
    title: "SEO - CMSFullForm Dashboard",
    description: "Manage your SEO settings and keywords.",
}

export default function SeoPage() {
    return (
        <Layout>
            <SeoContent />
        </Layout>
    )
}
