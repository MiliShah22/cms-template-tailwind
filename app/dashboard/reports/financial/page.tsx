import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { FinancialReportContent } from "@/components/dashboard/reports/financial-report-content"

export const metadata: Metadata = {
    title: "Financial Reports - CMSFullForm Dashboard",
    description: "Revenue, expenses, and profit analysis reports.",
}

export default function FinancialReportsPage() {
    return (
        <Layout>
            <FinancialReportContent />
        </Layout>
    )
}
