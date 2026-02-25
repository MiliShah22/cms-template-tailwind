import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { MediaImagesContent } from "@/components/media/images-content"

export const metadata: Metadata = {
    title: "Images - CMSFullForm Dashboard",
    description: "Manage media images.",
}

export default function MediaImagesPage() {
    return (
        <Layout>
            <MediaImagesContent />
        </Layout>
    )
}
