"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Wallet, ArrowDownLeft, ArrowUpRight, Search, Filter, Calendar } from "lucide-react"

type PaymentStatus = "succeeded" | "pending" | "refunded" | "failed"

interface Payment {
  id: string
  customer: string
  method: string
  type: "charge" | "refund"
  source: "Stripe" | "PayPal" | "Manual"
  amount: string
  createdAt: string
  status: PaymentStatus
}

const payments: Payment[] = [
  {
    id: "PAY-4821",
    customer: "Jane Cooper",
    method: "Visa •••• 4242",
    type: "charge",
    source: "Stripe",
    amount: "$588.00",
    createdAt: "2024-02-10 09:12",
    status: "succeeded",
  },
  {
    id: "PAY-4819",
    customer: "Cody Fisher",
    method: "Visa •••• 4242",
    type: "charge",
    source: "Stripe",
    amount: "$49.00",
    createdAt: "2024-02-10 08:44",
    status: "pending",
  },
  {
    id: "PAY-4815",
    customer: "Kristin Watson",
    method: "PayPal",
    type: "charge",
    source: "PayPal",
    amount: "$9.00",
    createdAt: "2024-02-09 17:32",
    status: "succeeded",
  },
  {
    id: "PAY-4802",
    customer: "Devon Lane",
    method: "Visa •••• 9938",
    type: "refund",
    source: "Stripe",
    amount: "$-49.00",
    createdAt: "2024-02-08 11:08",
    status: "refunded",
  },
  {
    id: "PAY-4794",
    customer: "Sofia Davis",
    method: "Manual invoice",
    type: "charge",
    source: "Manual",
    amount: "$129.00",
    createdAt: "2024-02-08 09:21",
    status: "failed",
  },
]

export function PaymentHistoryContent() {
  const succeededTotal = payments
    .filter((p) => p.status === "succeeded" && p.type === "charge")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[^0-9.-]+/g, "")), 0)

  const refundedTotal = payments
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[^0-9.-]+/g, "")), 0)

  const pendingCount = payments.filter((p) => p.status === "pending").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Wallet className="h-4 w-4" />
            Finance
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Payment history</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View charges and refunds processed through your connected payment gateways.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Collected this period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">${succeededTotal.toFixed(2)}</div>
            <p className="mt-1 text-xs text-gray-500">Successful charges only</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {refundedTotal === 0 ? "$0.00" : `-$${Math.abs(refundedTotal).toFixed(2)}`}
            </div>
            <p className="mt-1 text-xs text-gray-500">Completed refunds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Pending payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{pendingCount}</div>
            <p className="mt-1 text-xs text-gray-500">Awaiting confirmation or capture</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters + table */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1.5 text-xs text-gray-500">
                <Search className="h-3.5 w-3.5" />
                Search
              </div>
              <Input
                placeholder="Search by payment ID, customer, or card..."
                className="h-8 max-w-sm bg-transparent text-sm"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[120px] text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="succeeded">Succeeded</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[120px] text-xs">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sources</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Filter className="h-3.5 w-3.5" />
                More filters
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="charges">Charges</TabsTrigger>
              <TabsTrigger value="refunds">Refunds</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="pt-3">
              <PaymentsTable rows={payments} />
            </TabsContent>
            <TabsContent value="charges" className="pt-3">
              <PaymentsTable rows={payments.filter((p) => p.type === "charge")} />
            </TabsContent>
            <TabsContent value="refunds" className="pt-3">
              <PaymentsTable rows={payments.filter((p) => p.type === "refund")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentsTable({ rows }: { rows: Payment[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Payment</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Method</TableHead>
            <TableHead className="hidden sm:table-cell">Source</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Created</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {payment.type === "charge" ? (
                    <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span>{payment.id}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-900 dark:text-gray-100">{payment.customer}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-xs text-gray-600 dark:text-gray-300">
                {payment.method}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-xs text-gray-600 dark:text-gray-300">
                {payment.source}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-right text-xs text-gray-500">
                <div className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  {payment.createdAt}
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{payment.amount}</TableCell>
              <TableCell className="hidden sm:table-cell text-right">
                <StatusBadge status={payment.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  if (status === "succeeded") {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-300">
        Succeeded
      </Badge>
    )
  }
  if (status === "pending") {
    return (
      <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-300">
        Pending
      </Badge>
    )
  }
  if (status === "refunded") {
    return (
      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-500/10 dark:text-blue-300">
        Refunded
      </Badge>
    )
  }
  return (
    <Badge className="bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-500/10 dark:text-red-300">
      Failed
    </Badge>
  )
}

