import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { CustomerDetailContent } from "@/components/customers/customer-detail-content"
import { getCustomers } from "@/lib/customers"

export const metadata: Metadata = {
    title: "Customer Details - CMSFullForm Dashboard",
    description: "View and manage individual customer information.",
}

interface CustomerPageProps {
    params: {
        id: string
    }
}

export function generateStaticParams() {
    return getCustomers().map((c) => ({ id: c.id }))
}

export default function CustomerPage({ params }: CustomerPageProps) {
    return (
        <Layout>
            <CustomerDetailContent customerId={params.id} />
        </Layout>
    )
}
