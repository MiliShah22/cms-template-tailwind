import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { DeliveredOrdersContent } from "@/components/orders/delivered-content"

export const metadata: Metadata = {
    title: "Delivered Orders - CMSFullForm Dashboard",
    description: "View and manage delivered orders in your CMSFullForm store.",
}

export default function OrdersDeliveredPage() {
    return (
        <Layout>
            <DeliveredOrdersContent />
        </Layout>
    )
}
