import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Calendar, Download, Filter, Plus } from "lucide-react"

const incomeData = [
    { id: 1, source: "Subscription - Pro Plan", amount: "$49.00", date: "2024-02-15", status: "completed", invoice: "INV-2024-0156" },
    { id: 2, source: "Subscription - Starter Plan", amount: "$19.00", date: "2024-02-15", status: "completed", invoice: "INV-2024-0155" },
    { id: 3, source: "Add-on - SEO Toolkit", amount: "$9.00", date: "2024-02-14", status: "completed", invoice: "INV-2024-0154" },
    { id: 4, source: "Subscription - Pro Plan", amount: "$49.00", date: "2024-02-14", status: "completed", invoice: "INV-2024-0153" },
    { id: 5, source: "Subscription - Enterprise", amount: "$199.00", date: "2024-02-13", status: "pending", invoice: "INV-2024-0152" },
    { id: 6, source: "Add-on - Analytics Upgrade", amount: "$15.00", date: "2024-02-12", status: "completed", invoice: "INV-2024-0151" },
]

const monthlyIncome = [
    { month: "Feb", amount: 12450 },
    { month: "Jan", amount: 11200 },
    { month: "Dec", amount: 10890 },
    { month: "Nov", amount: 9750 },
    { month: "Oct", amount: 10200 },
    { month: "Sep", amount: 8900 },
]

export function TransactionsIncomeContent() {
    const totalIncome = incomeData.filter(i => i.status === "completed").reduce((acc, i) => acc + parseFloat(i.amount.replace("$", "")), 0)
    const pendingIncome = incomeData.filter(i => i.status === "pending").reduce((acc, i) => acc + parseFloat(i.amount.replace("$", "")), 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <TrendingUp className="h-4 w-4" />
                        Finance
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Income</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track your revenue and income sources.
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
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">${totalIncome.toFixed(2)}</div>
                        <p className="mt-1 text-xs text-gray-500">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Calendar className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">${pendingIncome.toFixed(2)}</div>
                        <p className="mt-1 text-xs text-gray-500">Awaiting payment</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">$40.25</div>
                        <p className="mt-1 text-xs text-gray-500">Per transaction</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{incomeData.length}</div>
                        <p className="mt-1 text-xs text-gray-500">This period</p>
                    </CardContent>
                </Card>
            </div>

            {/* Income Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Income</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incomeData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.source}</TableCell>
                                        <TableCell className="font-semibold text-green-600">{item.amount}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{item.date}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{item.invoice}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === "completed" ? "default" : "secondary"} className={item.status === "completed" ? "bg-green-500" : "bg-amber-500"}>
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
