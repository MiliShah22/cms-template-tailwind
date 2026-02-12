"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Receipt, Filter, Download, Mail, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react"

type InvoiceStatus = "draft" | "sent" | "overdue" | "paid"

interface Invoice {
  id: string
  customer: string
  email: string
  amount: string
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  reference: string
}

const invoices: Invoice[] = [
  {
    id: "INV-2041",
    customer: "Jane Cooper",
    email: "jane.cooper@example.com",
    amount: "$588.00",
    status: "paid",
    issueDate: "2024-02-02",
    dueDate: "2024-02-09",
    reference: "CMS Pro Plan – Yearly",
  },
  {
    id: "INV-2038",
    customer: "Cody Fisher",
    email: "cody.fisher@example.com",
    amount: "$49.00",
    status: "sent",
    issueDate: "2024-02-10",
    dueDate: "2024-02-17",
    reference: "CMS Starter Plan – Monthly",
  },
  {
    id: "INV-2032",
    customer: "Kristin Watson",
    email: "kristin.watson@example.com",
    amount: "$9.00",
    status: "overdue",
    issueDate: "2024-01-20",
    dueDate: "2024-01-27",
    reference: "SEO Toolkit Addon",
  },
  {
    id: "INV-2027",
    customer: "Devon Lane",
    email: "devon.lane@example.com",
    amount: "$15.00",
    status: "draft",
    issueDate: "2024-02-12",
    dueDate: "2024-02-19",
    reference: "Analytics Upgrade",
  },
]

export function InvoicesContent() {
  const [selectedId, setSelectedId] = useState<string>(invoices[0]?.id ?? "")

  const selectedInvoice = invoices.find((inv) => inv.id === selectedId) ?? invoices[0]

  const openCount = invoices.filter((i) => i.status === "sent" || i.status === "overdue").length
  const overdueCount = invoices.filter((i) => i.status === "overdue").length
  const paidCount = invoices.filter((i) => i.status === "paid").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Receipt className="h-4 w-4" />
            Billing
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track issued invoices, payment status and due dates for your CMS subscriptions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Saved views
          </Button>
          <Button size="sm" className="gap-2">
            <Receipt className="h-4 w-4" />
            New invoice
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Open invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{openCount}</div>
            <p className="mt-1 text-xs text-gray-500">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              Overdue
              {overdueCount > 0 && (
                <AlertTriangle className="h-3 w-3 text-amber-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{overdueCount}</div>
            <p className="mt-1 text-xs text-gray-500">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              Paid this month
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{paidCount}</div>
            <p className="mt-1 text-xs text-gray-500">Successfully settled</p>
          </CardContent>
        </Card>
      </div>

      {/* Main 2-column layout */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        {/* Left: list & filters */}
        <Card className="order-2 lg:order-1">
          <CardContent className="space-y-4 pt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                  <Search className="h-3 w-3" />
                  Search
                </div>
                <Input
                  placeholder="Search by invoice, customer or email..."
                  className="h-9 max-w-sm bg-transparent text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="h-9 w-[130px] text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="30d">
                  <SelectTrigger className="h-9 w-[130px] text-xs">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="pt-4">
                <InvoicesTable selectedId={selectedId} onSelect={setSelectedId} />
              </TabsContent>
              <TabsContent value="open" className="pt-4">
                <InvoicesTable
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  filterStatus={["sent", "overdue"]}
                />
              </TabsContent>
              <TabsContent value="paid" className="pt-4">
                <InvoicesTable
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  filterStatus={["paid"]}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right: details panel */}
        <Card className="order-1 lg:order-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-sm font-medium">Invoice details</CardTitle>
              <p className="mt-1 text-xs text-gray-500">Preview of the selected invoice</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedInvoice ? (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase text-gray-500">
                        {selectedInvoice.id}
                      </span>
                      <StatusBadge status={selectedInvoice.status} />
                    </div>
                    <h2 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                      {selectedInvoice.reference}
                    </h2>
                    <p className="text-xs text-gray-500">{selectedInvoice.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedInvoice.amount}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 rounded-md bg-gray-50 p-3 text-xs text-gray-600 dark:bg-gray-900/40 dark:text-gray-300 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-3.5 w-3.5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">Issue date</p>
                      <p>{selectedInvoice.issueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-3.5 w-3.5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">Due date</p>
                      <p>{selectedInvoice.dueDate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                  <p className="font-medium text-gray-800 dark:text-gray-100">Bill to</p>
                  <div>
                    <p>{selectedInvoice.customer}</p>
                    <p>{selectedInvoice.email}</p>
                  </div>
                </div>

                <div className="rounded-md border border-dashed border-gray-200 p-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  This is a visual template. Wire this panel to your billing system (Stripe, Paddle, etc.) to render
                  real invoice PDFs or hosted invoice links.
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Select an invoice from the list.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface InvoicesTableProps {
  selectedId: string
  onSelect: (id: string) => void
  filterStatus?: InvoiceStatus[]
}

function InvoicesTable({ selectedId, onSelect, filterStatus }: InvoicesTableProps) {
  const rows = filterStatus
    ? invoices.filter((inv) => filterStatus.includes(inv.status))
    : invoices

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Reference</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Due</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((invoice) => {
            const isSelected = invoice.id === selectedId
            return (
              <TableRow
                key={invoice.id}
                onClick={() => onSelect(invoice.id)}
                className={isSelected ? "cursor-pointer bg-gray-50 dark:bg-gray-900/40" : "cursor-pointer"}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{invoice.id}</span>
                    <span className="mt-0.5 text-[11px] text-gray-500">{invoice.issueDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900 dark:text-gray-100">{invoice.customer}</span>
                    <span className="text-[11px] text-gray-500">{invoice.email}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-gray-600">
                  {invoice.reference}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-right text-xs text-gray-500">
                  {invoice.dueDate}
                </TableCell>
                <TableCell className="text-right font-medium">{invoice.amount}</TableCell>
                <TableCell className="hidden sm:table-cell text-right">
                  <StatusBadge status={invoice.status} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  if (status === "paid") {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-300">
        Paid
      </Badge>
    )
  }

  if (status === "overdue") {
    return (
      <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-300">
        Overdue
      </Badge>
    )
  }

  if (status === "sent") {
    return (
      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-500/10 dark:text-blue-300">
        Sent
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="text-xs">
      Draft
    </Badge>
  )
}


