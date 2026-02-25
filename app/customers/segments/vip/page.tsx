import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { VIPCustomersContent } from "@/components/customers/vip-content"

export const metadata: Metadata = {
    title: "VIP Customers - CMSFullForm Dashboard",
    description: "Manage your high-value VIP customers with premium benefits.",
}

export default function CustomersVIPPage() {
    return (
        <Layout>
            <VIPCustomersContent />
        </Layout>
    )
}
