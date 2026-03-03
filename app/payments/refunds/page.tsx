import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { PaymentHistoryContent } from "@/components/payments/history-content"

export const metadata: Metadata = {
    title: "Refunds - CMSFullForm Dashboard",
    description: "View all refund transactions.",
}

export default function RefundsPage() {
    return (
        <Layout>
            <PaymentHistoryContent initialTab="refunds" />
        </Layout>
    )
}
