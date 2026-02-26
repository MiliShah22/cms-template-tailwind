"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye } from "lucide-react"
import Link from "next/link"

export interface OrderData {
  id: string
  customer: string
  total: string
  items: number
  createdAt?: string
  status?: string
}

interface OrderTableProps {
  title: string
  description: string
  orders: OrderData[]
}

function getStatusColor(status?: string): string {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    shipped: "bg-blue-100 text-blue-800 border-blue-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    processing: "bg-purple-100 text-purple-800 border-purple-300"
  }
  return colors[status || ""] || colors.pending
}

export function OrderTable({ title, description, orders }: OrderTableProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm">Add Order</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Badge variant="secondary">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <Badge variant="secondary">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-gray-500">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Badge variant="secondary">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$248</div>
            <p className="text-xs text-gray-500">+4% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Search orders..." className="max-w-sm" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Created at</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status || 'Pending'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-gray-500">{order.createdAt}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">{order.items}</TableCell>
                    <TableCell className="text-right font-medium">{order.total}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right">
                      <Badge variant="outline">{order.status || 'Pending'}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
