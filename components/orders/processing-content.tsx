"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"

const mockProcessingOrders: OrderData[] = [
  { id: "ORD-1021", customer: "Devon Lane", total: "$39.99", items: 1, createdAt: "2024-02-10 08:40", status: "processing" },
  { id: "ORD-1016", customer: "Emily Davis", total: "$456.78", items: 6, createdAt: "2024-02-09 16:20", status: "processing" },
  { id: "ORD-1010", customer: "Jenny Wilson", total: "$234.50", items: 4, createdAt: "2024-02-08 15:00", status: "processing" },
  { id: "ORD-1009", customer: "Cameron Williamson", total: "$567.00", items: 7, createdAt: "2024-02-08 12:30", status: "processing" },
]

export function ProcessingOrdersContent() {
  return (
    <OrderTable 
      title="Processing Orders" 
      description="Orders currently being processed and prepared for shipment."
      orders={mockProcessingOrders}
    />
  )
}
