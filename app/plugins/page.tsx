import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import Content from "@/components/plugins/content"

export const metadata: Metadata = {
  title: "Plugins - CMSFullForm Dashboard",
  description: "Browse, install, and manage plugins to extend your CMS functionality.",
}

export default function PluginsPage() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
