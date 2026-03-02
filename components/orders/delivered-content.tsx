"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"
import { getOrders, Order } from "@/lib/orders"

export function DeliveredOrdersContent() {
  const orders: Order[] = getOrders().filter((o) => o.status === "delivered")
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
      title="Delivered Orders"
      description="Orders that have been successfully delivered."
      orders={orderList}
    />
  )
}
