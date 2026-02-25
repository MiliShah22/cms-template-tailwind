"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"

const mockShippedOrders: OrderData[] = [
  { id: "ORD-1023", customer: "Cody Fisher", total: "$89.00", items: 2, createdAt: "2024-02-10 09:12", status: "shipped" },
  { id: "ORD-1019", customer: "Floyd Lewis", total: "$123.45", items: 3, createdAt: "2024-02-10 08:00", status: "shipped" },
  { id: "ORD-1016", customer: "Emily Davis", total: "$456.78", items: 6, createdAt: "2024-02-09 16:20", status: "shipped" },
  { id: "ORD-1015", customer: "Michael Brown", total: "$234.00", items: 4, createdAt: "2024-02-09 14:10", status: "shipped" },
  { id: "ORD-1014", customer: "Sarah Wilson", total: "$678.90", items: 9, createdAt: "2024-02-09 12:00", status: "shipped" },
]

export function ShippedOrdersContent() {
  return (
    <OrderTable 
      title="Shipped Orders" 
      description="Orders that have been shipped and are on their way."
      orders={mockShippedOrders}
      statusBadge="shipped"
    />
  )
}
