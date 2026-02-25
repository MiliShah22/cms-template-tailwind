import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { NewCustomersContent } from "@/components/customers/new-content"

export const metadata: Metadata = {
    title: "New Customers - CMSFullForm Dashboard",
    description: "Track and manage newly acquired customers.",
}

export default function CustomersNewPage() {
    return (
        <Layout>
            <NewCustomersContent />
        </Layout>
    )
}
