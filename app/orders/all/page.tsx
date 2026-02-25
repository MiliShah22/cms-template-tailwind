import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { AllOrdersContent } from "@/components/orders/all-content"

export const metadata: Metadata = {
    title: "All Orders - CMSFullForm Dashboard",
    description: "View and manage all orders in your CMSFullForm store.",
}

export default function OrdersAllPage() {
    return (
        <Layout>
            <AllOrdersContent />
        </Layout>
    )
}
