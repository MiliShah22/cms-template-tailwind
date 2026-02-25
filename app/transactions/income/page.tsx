import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { TransactionsIncomeContent } from "@/components/transactions/income-content"

export const metadata: Metadata = {
    title: "Income - CMSFullForm Dashboard",
    description: "Track income and revenue.",
}

export default function TransactionsIncomePage() {
    return (
        <Layout>
            <TransactionsIncomeContent />
        </Layout>
    )
}
