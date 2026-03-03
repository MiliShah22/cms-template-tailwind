"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Calendar, Download, Filter, Plus } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination"

import type { Transaction } from "@/lib/transactions"

interface TransactionsIncomeContentProps {
    transactions: Transaction[]
}

const PAGE_SIZE = 5

const monthlyIncome = [
    { month: "Feb", amount: 12450 },
    { month: "Jan", amount: 11200 },
    { month: "Dec", amount: 10890 },
    { month: "Nov", amount: 9750 },
    { month: "Oct", amount: 10200 },
    { month: "Sep", amount: 8900 },
]

export function TransactionsIncomeContent({ transactions }: TransactionsIncomeContentProps) {
    // convert numeric amounts and keep rest of code unchanged
    const incomeData = useMemo(
        () =>
            transactions.map((t) => ({
                ...t,
                amount: `$${t.amount.toFixed(2)}`,
                id: t.id,
                date: t.date,
                status: t.status,
                invoice: t.id.replace("TXN", "INV"), // just generate an invoice id from txn for demo
            })),
        [transactions],
    )

    const totalIncome = transactions
        .filter((t) => t.status === "completed")
        .reduce((acc, t) => acc + t.amount, 0)
    const pendingIncome = transactions
        .filter((t) => t.status === "pending")
        .reduce((acc, t) => acc + t.amount, 0)

    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(incomeData.length / PAGE_SIZE)
    const currentPageData = useMemo(
        () => incomeData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [incomeData, page],
    )

    const renderPagination = () => {
        if (totalPages <= 1) return null
        return (
            <Pagination className="mt-4">
                <PaginationPrevious onClick={() => setPage(Math.max(page - 1, 1))} />
                <PaginationContent>
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const num = i + 1
                        return (
                            <PaginationItem key={num}>
                                <PaginationLink
                                    isActive={num === page}
                                    onClick={() => setPage(num)}
                                >
                                    {num}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
                </PaginationContent>
                <PaginationNext onClick={() => setPage(Math.min(page + 1, totalPages))} />
            </Pagination>
        )
    }

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
                        <div className="text-2xl font-semibold">{transactions.length}</div>
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
                                    <TableHead>Description</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentPageData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.description}</TableCell>
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
                            {renderPagination()}
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
