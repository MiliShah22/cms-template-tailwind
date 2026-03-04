import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { BlankContent } from "@/components/blank"

export const metadata: Metadata = {
  title: "Blank Page - CMSFullForm Dashboard",
  description: "Blank page template for creating new dashboard pages.",
}

export default function BlankPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  )
}
