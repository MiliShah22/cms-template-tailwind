import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { TransactionsIncomeContent } from "@/components/transactions/income-content"
import { getIncomeTransactions } from "@/lib/transactions"

export const metadata: Metadata = {
    title: "Income - CMSFullForm Dashboard",
    description: "Track income and revenue.",
}

export default function TransactionsIncomePage() {
    const transactions = getIncomeTransactions()

    return (
        <Layout>
            <TransactionsIncomeContent transactions={transactions} />
        </Layout>
    )
}
