import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { PagesContent } from "@/components/pages/content"

export const metadata: Metadata = {
    title: "Pages - CMSFullForm Dashboard",
    description: "Manage your website pages and content.",
}

export default function PagesPage() {
    return (
        <Layout>
            <PagesContent />
        </Layout>
    )
}
