"use client"

import { CustomerTable, CustomerData } from "@/components/shared/customer-table"
import { getCustomersBySegment, Customer } from "@/lib/customers"

export function VIPCustomersContent() {
  const customers: Customer[] = getCustomersBySegment("vip")
  const customerList: CustomerData[] = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    segment: c.segment,
  }))

  return (
    <CustomerTable
      title="VIP Customers"
      description="Manage high-value VIP customers."
      customers={customerList}
    />
  )
}
