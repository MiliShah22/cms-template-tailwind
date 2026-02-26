import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { OrderDetailContent } from "@/components/orders/order-detail-content"

export const metadata: Metadata = {
    title: "Order Details - CMSFullForm Dashboard",
    description: "View and manage order details.",
}

interface OrderDetailPageProps {
    params: {
        id: string
    }
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
    return (
        <Layout>
            <OrderDetailContent orderId={params.id} />
        </Layout>
    )
}
