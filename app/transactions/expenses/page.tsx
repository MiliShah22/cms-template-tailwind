import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { TransactionsExpensesContent } from "@/components/transactions/expenses-content"

export const metadata: Metadata = {
    title: "Expenses - CMSFullForm Dashboard",
    description: "Track expenses and outgoing payments.",
}

export default function TransactionsExpensesPage() {
    return (
        <Layout>
            <TransactionsExpensesContent />
        </Layout>
    )
}
