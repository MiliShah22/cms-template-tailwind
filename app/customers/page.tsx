import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { CustomersContent } from "@/components/customers/content"

export const metadata: Metadata = {
  title: "Customers - CMSFullForm Dashboard",
  description: "Browse and manage your CMS customers.",
}

export default function CustomersPage() {
  return (
    <Layout>
      <CustomersContent />
    </Layout>
  )
}


