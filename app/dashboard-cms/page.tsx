import type { Metadata } from "next"
import Content from "@/components/dashboard-cms/content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
  title: "CMS Dashboard - CMSFullForm",
  description: "Comprehensive CMS management dashboard with content, users, and settings.",
}

export default function DashboardCMSPage() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
