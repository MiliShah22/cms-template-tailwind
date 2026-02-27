import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ReviewsContent } from "@/components/products/reviews-content"

export const metadata: Metadata = {
    title: "Product Reviews - CMSFullForm Dashboard",
    description: "View and manage product reviews.",
}

export default function ProductsReviewsPage() {
    return (
        <Layout>
            <ReviewsContent />
        </Layout>
    )
}
