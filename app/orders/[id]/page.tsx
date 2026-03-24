import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { OrderDetailContent } from "@/components/orders/order-detail-content"

export const metadata: Metadata = {
    title: "Order Details - CMSFullForm Dashboard",
    description: "View and manage order details.",
}

interface OrderDetailPageProps {
    params: Promise<{ id: string }>
}

import { getOrders } from "@/lib/orders"

export function generateStaticParams() {
    return getOrders().map((o) => ({ id: o.id }))
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
    const { id } = await params
    return (
        <Layout>
            <OrderDetailContent orderId={id} />
        </Layout>
    )
}

