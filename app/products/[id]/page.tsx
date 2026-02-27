import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ProductDetailContent } from "@/components/products/product-detail-content"

export const metadata: Metadata = {
    title: "Product Details - CMSFullForm Dashboard",
    description: "View and manage product details.",
}

interface ProductDetailPageProps {
    params: {
        id: string
    }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    return (
        <Layout>
            <ProductDetailContent productId={params.id} />
        </Layout>
    )
}
