"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"
import { getOrders, Order } from "@/lib/orders"

export function ShippedOrdersContent() {
  const orders: Order[] = getOrders().filter((o) => o.status === "shipped")
  const orderList: OrderData[] = orders.map((o) => ({
    id: o.id,
    customer: o.customer.name,
    total: o.total,
    items: o.items.length,
    createdAt: o.createdAt,
    status: o.status,
  }))

  return (
    <OrderTable
      title="Shipped Orders"
      description="Orders that have been shipped and are on their way."
      orders={orderList}
    />
  )
}
