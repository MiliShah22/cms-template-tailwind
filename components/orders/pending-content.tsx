"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Clock, Filter, RefreshCw } from "lucide-react"

const mockPendingOrders = [
  {
    id: "ORD-1024",
    customer: "Jane Cooper",
    total: "$248.90",
    items: 5,
    createdAt: "2024-02-10 09:24",
    age: "32m ago",
  },
  {
    id: "ORD-1023",
    customer: "Cody Fisher",
    total: "$89.00",
    items: 2,
    createdAt: "2024-02-10 09:12",
    age: "44m ago",
  },
  {
    id: "ORD-1022",
    customer: "Kristin Watson",
    total: "$1,204.50",
    items: 12,
    createdAt: "2024-02-10 08:58",
    age: "58m ago",
  },
  {
    id: "ORD-1021",
    customer: "Devon Lane",
    total: "$39.99",
    items: 1,
    createdAt: "2024-02-10 08:40",
    age: "1h 16m ago",
  },
]

export function PendingOrdersContent() {
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
            <div className="text-2xl font-semibold">24</div>
            <p className="mt-1 text-xs text-gray-500">Across all sales channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average order value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">$184.32</div>
            <p className="mt-1 text-xs text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oldest pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">3h 12m</div>
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
                {mockPendingOrders.map((order) => (
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
                      {order.age}
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


