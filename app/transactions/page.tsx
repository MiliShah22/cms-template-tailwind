import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { TransactionsContent } from "@/components/transactions/content"

export const metadata: Metadata = {
    title: "Transactions - CMSFullForm Dashboard",
    description: "View and manage all financial transactions.",
}

export default function TransactionsPage() {
    return (
        <Layout>
            <TransactionsContent />
        </Layout>
    )
}
