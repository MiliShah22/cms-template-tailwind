import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { InvoicesContent } from "@/components/invoices/content"

export const metadata: Metadata = {
  title: "Invoices - CMSFullForm Dashboard",
  description: "Manage invoices and billing for your CMSFullForm subscriptions.",
}

export default function InvoicesPage() {
  return (
    <Layout>
      <InvoicesContent />
    </Layout>
  )
}


