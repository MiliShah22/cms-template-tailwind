import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { SeoKeywordsContent } from "@/components/seo/keywords-content"

export const metadata: Metadata = {
    title: "SEO Keywords - CMSFullForm Dashboard",
    description: "Manage SEO keywords and rankings.",
}

export default function SeoKeywordsPage() {
    return (
        <Layout>
            <SeoKeywordsContent />
        </Layout>
    )
}
