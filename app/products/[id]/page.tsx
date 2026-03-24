import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ProductDetailContent } from "@/components/products/product-detail-content"

export const metadata: Metadata = {
    title: "Product Details - CMSFullForm Dashboard",
    description: "View and manage product details.",
}

interface ProductDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params
    return (
        <Layout>
            <ProductDetailContent productId={id} />
        </Layout>
    )
}

