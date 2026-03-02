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

import { getOrders } from "@/lib/orders"

export function generateStaticParams() {
    return getOrders().map((o) => ({ id: o.id }))
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
    return (
        <Layout>
            <OrderDetailContent orderId={params.id} />
        </Layout>
    )
}
