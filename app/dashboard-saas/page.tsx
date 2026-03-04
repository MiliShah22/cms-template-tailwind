import type { Metadata } from "next"
import { DashboardSaasLayout } from "@/components/dashboard-saas"

export const metadata: Metadata = {
  title: "SaaS Dashboard - CMSFullForm",
  description: "SaaS management dashboard with subscription, billing, and customer analytics.",
}

export default function DashboardSaasPage() {
  return <DashboardSaasLayout />
}
