import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ShippedOrdersContent } from "@/components/orders/shipped-content"

export const metadata: Metadata = {
    title: "Shipped Orders - CMSFullForm Dashboard",
    description: "View and manage shipped orders in your CMSFullForm store.",
}

export default function OrdersShippedPage() {
    return (
        <Layout>
            <ShippedOrdersContent />
        </Layout>
    )
}
