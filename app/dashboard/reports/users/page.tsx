import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { UsersReportContent } from "@/components/dashboard/reports/users-report-content"

export const metadata: Metadata = {
  title: "User Reports - CMSFullForm Dashboard",
  description: "Signups, active users, and segment reports.",
}

export default function UserReportsPage() {
  return (
    <Layout>
      <UsersReportContent />
    </Layout>
  )
}
