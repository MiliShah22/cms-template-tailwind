"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"

const mockAllOrders: OrderData[] = [
  { id: "ORD-1024", customer: "Jane Cooper", total: "$248.90", items: 5, createdAt: "2024-02-10 09:24", status: "pending" },
  { id: "ORD-1023", customer: "Cody Fisher", total: "$89.00", items: 2, createdAt: "2024-09-12", status: "shipped" },
  { id: "ORD-1022", customer: "Kristin Watson", total: "$1,204.50", items: 12, createdAt: "2024-02-10 08:58", status: "delivered" },
  { id: "ORD-1019", customer: "Floyd Lewis", total: "$12,345.00", items: 3, createdAt: "2024-02-10 08:00", status: "shipped" },
  { id: "ORD-1018", customer: "Jacob Jones", total: "$89,000.00", items: 15, createdAt: "2024-02-10 18:45", status: "delivered" },
  { id: "ORD-1017", customer: "Ralph Edwards", total: "$4,500.00", items: 1, createdAt: "2024-02-10 17:30", status: "pending" },
  { id: "ORD-1016", customer: "Cameron Williamson", total: "$1,567.00", items: 8, createdAt: "2024-02-09 14:20", status: "processing" },
  { id: "ORD-1015", customer: "Devon Lane", total: "$890.00", items: 4, createdAt: "2024-02-09 11:15", status: "shipped" },
  { id: "ORD-1014", customer: "Theresa Webb", total: "$2,340.00", items: 6, createdAt: "2024-02-09 09:30", status: "delivered" },
  { id: "ORD-1013", customer: "Darlene Robertson", total: "$567.00", items: 2, createdAt: "2024-02-08 16:45", status: "pending" },
]

export function AllOrdersContent() {
  return (
    <OrderTable
      title="All Orders"
      description="View and manage all orders."
      orders={mockAllOrders}
    />
  )
}
