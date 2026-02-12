import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { PlaceholderPage } from "@/components/cmsfullform/placeholder-page"

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - Template Page",
  description: "Scaffold page for routes that are not fully implemented yet.",
}

interface CatchAllPageProps {
  params: {
    slug: string[]
  }
}

export default function CatchAllPage({ params }: CatchAllPageProps) {
  const path = "/" + (params.slug ?? []).join("/")

  return (
    <Layout>
      <PlaceholderPage path={path} />
    </Layout>
  )
}


