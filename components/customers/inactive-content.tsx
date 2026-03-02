"use client"

import { CustomerTable, CustomerData } from "@/components/shared/customer-table"
import { getCustomersBySegment, Customer } from "@/lib/customers"

export function InactiveCustomersContent() {
  const customers: Customer[] = getCustomersBySegment("inactive")
  const customerList: CustomerData[] = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    segment: c.segment,
  }))

  return (
    <CustomerTable
      title="Inactive Customers"
      description="Customers who haven't interacted in a while."
      customers={customerList}
    />
  )
}
