import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ProductsContent } from "@/components/products/content"

export const metadata: Metadata = {
  title: "Products - CMSFullForm Dashboard",
  description: "Manage your CMS products and catalog.",
}

export default function ProductsPage() {
  return (
    <Layout>
      <ProductsContent />
    </Layout>
  )
}


