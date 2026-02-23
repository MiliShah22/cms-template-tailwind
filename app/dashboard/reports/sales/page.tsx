import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { SalesReportContent } from "@/components/dashboard/reports/sales-report-content"

export const metadata: Metadata = {
  title: "Sales Reports - CMSFullForm Dashboard",
  description: "Revenue, orders, and sales performance reports.",
}

export default function SalesReportsPage() {
  return (
    <Layout>
      <SalesReportContent />
    </Layout>
  )
}
