import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ProcessingOrdersContent } from "@/components/orders/processing-content"

export const metadata: Metadata = {
    title: "Processing Orders - CMSFullForm Dashboard",
    description: "View and manage processing orders in your CMSFullForm store.",
}

export default function OrdersProcessingPage() {
    return (
        <Layout>
            <ProcessingOrdersContent />
        </Layout>
    )
}
