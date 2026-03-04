import type { Metadata } from "next"
import Content from "@/components/cmsfullform/content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
}

export default function DashboardPage() {
  return (
    <Layout>
      {/* Dashboard Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Welcome back! Here's your project overview and key metrics.
        </p>
      </div>
      <Content />
    </Layout>
  )
}
