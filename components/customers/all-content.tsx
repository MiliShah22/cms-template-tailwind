"use client"

import { CustomerTable, CustomerData } from "@/components/shared/customer-table"
import { getCustomers, Customer } from "@/lib/customers"

export function AllCustomersContent() {
    const customers: Customer[] = getCustomers()
    const customerList: CustomerData[] = customers.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        segment: c.segment,
    }))

    return (
        <CustomerTable
            title="All Customers"
            description="View and manage all customers."
            customers={customerList}
        />
    )
}

