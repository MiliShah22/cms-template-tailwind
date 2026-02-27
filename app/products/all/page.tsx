import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { AllProductsContent } from "@/components/products/all-content"

export const metadata: Metadata = {
    title: "All Products - CMSFullForm Dashboard",
    description: "View and manage all products in your CMSFullForm store.",
}

export default function ProductsAllPage() {
    return (
        <Layout>
            <AllProductsContent />
        </Layout>
    )
}
