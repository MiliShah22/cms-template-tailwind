import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { InactiveCustomersContent } from "@/components/customers/inactive-content"

export const metadata: Metadata = {
    title: "Inactive Customers - CMSFullForm Dashboard",
    description: "Re-engage customers who haven't been active recently.",
}

export default function CustomersInactivePage() {
    return (
        <Layout>
            <InactiveCustomersContent />
        </Layout>
    )
}
