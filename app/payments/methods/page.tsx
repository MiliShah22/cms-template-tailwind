import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { PaymentMethodsContent } from "@/components/payments/methods-content"

export const metadata: Metadata = {
  title: "Payment Methods - CMSFullForm Dashboard",
  description: "Configure billing gateways and workspace payment methods.",
}

export default function PaymentMethodsPage() {
  return (
    <Layout>
      <PaymentMethodsContent />
    </Layout>
  )
}

