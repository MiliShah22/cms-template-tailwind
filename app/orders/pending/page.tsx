import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { PendingOrdersContent } from "@/components/orders/pending-content"

export const metadata: Metadata = {
  title: "Pending Orders - CMSFullForm Dashboard",
  description: "Review and process all pending orders in your CMSFullForm store.",
}

export default function OrdersPendingPage() {
  return (
    <Layout>
      <PendingOrdersContent />
    </Layout>
  )
}


