import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { MediaContent } from "@/components/media/content"

export const metadata: Metadata = {
    title: "Media - CMSFullForm Dashboard",
    description: "Manage your media library and files.",
}

export default function MediaPage() {
    return (
        <Layout>
            <MediaContent />
        </Layout>
    )
}
