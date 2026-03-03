import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { TransactionsContent } from "@/components/transactions/content"
import { getTransactions, getExpenseTransactions } from "@/lib/transactions"

export const metadata: Metadata = {
    title: "All Transactions - CMSFullForm Dashboard",
    description: "View and manage all financial transactions (all).",
}

export default function TransactionsAllPage() {
    const transactions = getTransactions()
    const expenseTransactions = getExpenseTransactions()

    return (
        <Layout>
            <TransactionsContent
                transactions={transactions}
                expenseTransactions={expenseTransactions}
            />
        </Layout>
    )
}
