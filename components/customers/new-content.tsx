"use client"

import { CustomerTable, CustomerData } from "@/components/shared/customer-table"
import { getCustomersBySegment, Customer } from "@/lib/customers"

export function NewCustomersContent() {
  const customers: Customer[] = getCustomersBySegment("new")
  const customerList: CustomerData[] = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    segment: c.segment,
  }))

  return (
    <CustomerTable
      title="New Customers"
      description="View recently added customers."
      customers={customerList}
    />
  )
}
