import type { Metadata } from "next"
import Content from "@/components/settings/content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
  title: "Settings - CMSFullForm Dashboard",
  description: "Manage your account settings, preferences, and system configurations.",
}

export default function SettingsPage() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
