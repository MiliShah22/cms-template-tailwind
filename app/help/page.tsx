import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { HelpContent } from "@/components/help/content"

export const metadata: Metadata = {
  title: "Help Center - CMSFullForm Dashboard",
  description: "Get help, learn workflows, and contact support for CMSFullForm.",
}

export default function HelpPage() {
  return (
    <Layout>
      <HelpContent />
    </Layout>
  )
}


