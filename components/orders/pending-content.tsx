"use client"

import { useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Clock, Filter, RefreshCw } from "lucide-react"
import { getOrders, Order } from "@/lib/orders"
import { exportOrdersCSV, OrderData } from "@/components/shared/order-table"

function calcAge(created: string): string {
  const then = new Date(created)
  const now = new Date()
  const diff = now.getTime() - then.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m ago`
}

export function PendingOrdersContent() {
  const orders: Order[] = getOrders().filter((o) => o.status === "pending")
  const totalPending = orders.length
  // shape for table and export
  const orderList: OrderData[] = orders.map((o) => ({
    id: o.id,
    customer: o.customer.name,
    total: o.total,
    items: o.items.length,
    createdAt: o.createdAt,
    status: o.status,
  }))

  // pagination for table rows
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.ceil(orderList.length / pageSize)
  const pagedOrders = orderList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const avgValue = useMemo(() => {
    if (orders.length === 0) return 0
    const sum = orders.reduce((sum, o) => sum + parseFloat(o.total.replace(/[$,]/g, "")), 0)
    return sum / orders.length
  }, [orders])
  const oldest = useMemo(() => {
    if (orders.length === 0) return "0m"
    const times = orders.map((o) => new Date(o.createdAt).getTime())
    const min = Math.min(...times)
    const diff = Date.now() - min
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    return `${h}h ${m}m`
  }, [orders])

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <Clock className="h-6 w-6 text-amber-500" />
            Pending Orders
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Review and process orders that are waiting for confirmation or payment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportOrdersCSV(orderList, "pending-orders.csv")}
          >
            Export
          </Button>
          <Button size="sm" className="gap-2">
            Process selected
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total pending</CardTitle>
            <Badge variant="secondary">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totalPending}</div>
            <p className="mt-1 text-xs text-gray-500">Across all sales channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average order value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">${avgValue.toFixed(2)}</div>
            <p className="mt-1 text-xs text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oldest pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{oldest}</div>
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
              Consider following up with the customer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase text-gray-500">Filter</span>
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              placeholder="Search by order ID, customer, email..."
              className="h-9 w-full max-w-xs bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[140px] text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="awaiting_payment">Awaiting payment</SelectItem>
                <SelectItem value="awaiting_confirmation">Awaiting confirmation</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="today">
              <SelectTrigger className="h-9 w-[120px] text-xs">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pending orders table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium">Pending orders queue</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Created at</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Waiting</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{order.id}</span>
                        <Badge
                          variant="outline"
                          className="border-amber-300 bg-amber-50 text-[10px] uppercase tracking-wide text-amber-700 dark:border-amber-500/60 dark:bg-amber-500/5 dark:text-amber-300"
                        >
                          Pending
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-gray-500">{order.createdAt}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">
                      {order.items}
                    </TableCell>
                    <TableCell className="text-right font-medium">{order.total}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-xs text-gray-500">
                      {calcAge(order.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}


