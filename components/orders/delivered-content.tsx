"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"

const mockDeliveredOrders: OrderData[] = [
  { id: "ORD-1022", customer: "Kristin Watson", total: "$1,204.50", items: 12, createdAt: "2024-02-10 08:58", status: "delivered" },
  { id: "ORD-1020", customer: "Bessie Cooper", total: "$567.00", items: 8, createdAt: "2024-02-10 08:20", status: "delivered" },
  { id: "ORD-1018", customer: "Jacob Jones", total: "$890.00", items: 15, createdAt: "2024-02-09 18:45", status: "delivered" },
  { id: "ORD-1013", customer: "Annette Black", total: "$345.00", items: 5, createdAt: "2024-02-09 10:30", status: "delivered" },
  { id: "ORD-1012", customer: "Courtney Henry", total: "$789.00", items: 7, createdAt: "2024-02-08 16:45", status: "delivered" },
  { id: "ORD-1011", customer: "Theresa Webb", total: "$156.00", items: 2, createdAt: "2024-02-08 14:20", status: "delivered" },
]

export function DeliveredOrdersContent() {
  return (
    <OrderTable 
      title="Delivered Orders" 
      description="Orders that have been successfully delivered."
      orders={mockDeliveredOrders}
      statusBadge="delivered"
    />
  )
}
