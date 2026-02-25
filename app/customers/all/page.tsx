import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { AllCustomersContent } from "@/components/customers/all-content"

export const metadata: Metadata = {
    title: "All Customers - CMSFullForm Dashboard",
    description: "Browse and manage all customers in your CMS.",
}

export default function CustomersAllPage() {
    return (
        <Layout>
            <AllCustomersContent />
        </Layout>
    )
}
