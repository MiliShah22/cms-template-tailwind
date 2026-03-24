import type { Metadata } from "next"
import { unstable_cache } from "next/cache"
import Layout from "@/components/cmsfullform/layout"
import { CustomerDetailContent } from "@/components/customers/customer-detail-content"
import { getCustomers, getCustomerById } from "@/lib/customers"
import type { Customer } from "@/lib/customers"
import { getOrdersByCustomerEmail } from "@/lib/orders"
import type { Order } from "@/lib/orders"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
    title: "Customer Details - CMSFullForm Dashboard",
    description: "View and manage individual customer information.",
}

interface CustomerPageProps {
    params: Promise<{ id: string }>
}

const getCachedCustomer = unstable_cache(
    async (id: string) => {
        "use server"
        return getCustomerById(id)
    },
    ["customer-"],
    { revalidate: 3600 } // Cache for 1 hour, adjust as needed
)

const getCachedOrders = unstable_cache(
    async (email: string) => {
        "use server"
        return getOrdersByCustomerEmail(email)
    },
    ["orders-"],
    { revalidate: 3600 }
)

export function generateStaticParams() {
    return getCustomers().map((c: Customer) => ({ id: c.id }))
}

export default async function CustomerPage({ params }: CustomerPageProps) {
    const { id } = await params;
    const customer = await getCachedCustomer(id)
    if (!customer) {
      notFound()
    }
    const orders = await getCachedOrders(customer.email)
    
    return (
        <Layout>
            <CustomerDetailContent customer={customer} orders={orders} />
        </Layout>
    )
}
