import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { TransactionsExpensesContent } from "@/components/transactions/expenses-content"
import { getExpenseTransactions } from "@/lib/transactions"

export const metadata: Metadata = {
    title: "Expenses - CMSFullForm Dashboard",
    description: "Track expenses and outgoing payments.",
}

export default function TransactionsExpensesPage() {
    const expenseTransactions = getExpenseTransactions()
    return (
        <Layout>
            <TransactionsExpensesContent transactions={expenseTransactions} />
        </Layout>
    )
}
