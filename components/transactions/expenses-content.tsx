import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingDown, CreditCard, Download, Filter } from "lucide-react"

const expensesData = [
    { id: 1, description: "Server Hosting - AWS", amount: "$299.00", date: "2024-02-15", category: "Infrastructure", status: "paid" },
    { id: 2, description: "Domain Renewal", amount: "$15.00", date: "2024-02-14", category: "Domain", status: "paid" },
    { id: 3, description: "Email Service - SendGrid", amount: "$49.00", date: "2024-02-13", category: "Services", status: "paid" },
    { id: 4, description: "CDN Service - Cloudflare", amount: "$25.00", date: "2024-02-12", category: "Infrastructure", status: "paid" },
    { id: 5, description: "SSL Certificate", amount: "$75.00", date: "2024-02-10", category: "Security", status: "pending" },
    { id: 6, description: "Analytics - Mixpanel", amount: "$120.00", date: "2024-02-08", category: "Services", status: "paid" },
]

export function TransactionsExpensesContent() {
    const totalExpenses = expensesData.filter(e => e.status === "paid").reduce((acc, e) => acc + parseFloat(e.amount.replace("$", "")), 0)
    const pendingExpenses = expensesData.filter(e => e.status === "pending").reduce((acc, e) => acc + parseFloat(e.amount.replace("$", "")), 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <TrendingDown className="h-4 w-4" />
                        Finance
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Expenses</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track your business expenses and outgoing payments.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">${totalExpenses.toFixed(2)}</div>
                        <p className="mt-1 text-xs text-gray-500">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <CreditCard className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">${pendingExpenses.toFixed(2)}</div>
                        <p className="mt-1 text-xs text-gray-500">Awaiting payment</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Expense</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">$65.50</div>
                        <p className="mt-1 text-xs text-gray-500">Per transaction</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{expensesData.length}</div>
                        <p className="mt-1 text-xs text-gray-500">This period</p>
                    </CardContent>
                </Card>
            </div>

            {/* Expenses Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expensesData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.description}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.category}</Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold text-red-600">{item.amount}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{item.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === "paid" ? "default" : "secondary"} className={item.status === "paid" ? "bg-blue-500" : "bg-amber-500"}>
                                                {item.status}
                                            </Badge>
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
