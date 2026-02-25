import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ReviewsContent } from "@/components/customers/reviews-content"

export const metadata: Metadata = {
    title: "Customer Reviews - CMSFullForm Dashboard",
    description: "Manage and respond to customer reviews.",
}

export default function ReviewsPage() {
    return (
        <Layout>
            <ReviewsContent />
        </Layout>
    )
}
