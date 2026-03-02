"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"
import { getOrders, Order } from "@/lib/orders"

export function AllOrdersContent() {
  const allOrders: Order[] = getOrders()

  // convert to listing shape
  const orderList: OrderData[] = allOrders.map((o) => ({
    id: o.id,
    customer: o.customer.name,
    total: o.total,
    items: o.items.length,
    createdAt: o.createdAt,
    status: o.status,
  }))

  // pagination
  return (
    <div>
      <OrderTable
        title="All Orders"
        description="View and manage all orders."
        orders={orderList}
      />
    </div>
  )
}
