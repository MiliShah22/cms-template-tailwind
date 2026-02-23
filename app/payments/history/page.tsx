import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { PaymentHistoryContent } from "@/components/payments/history-content"

export const metadata: Metadata = {
  title: "Payment History - CMSFullForm Dashboard",
  description: "Browse charges and refunds processed for your CMSFullForm workspace.",
}

export default function PaymentHistoryPage() {
  return (
    <Layout>
      <PaymentHistoryContent />
    </Layout>
  )
}

