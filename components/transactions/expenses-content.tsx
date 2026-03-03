"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingDown, CreditCard, Download, Filter } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination"

import type { ExpenseTransaction } from "@/lib/transactions"

interface TransactionsExpensesContentProps {
    transactions: ExpenseTransaction[]
}

const PAGE_SIZE = 5

export function TransactionsExpensesContent({ transactions }: TransactionsExpensesContentProps) {
    // convert amounts into formatted strings for display
    const expensesData = useMemo(
        () =>
            transactions.map((t) => ({
                ...t,
                amount: `$${Math.abs(t.amount).toFixed(2)}`,
            })),
        [transactions],
    )

    const totalExpenses = transactions
        .filter((e) => e.status === "paid")
        .reduce((acc, e) => acc + Math.abs(e.amount), 0)
    const pendingExpenses = transactions
        .filter((e) => e.status === "pending")
        .reduce((acc, e) => acc + Math.abs(e.amount), 0)

    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(expensesData.length / PAGE_SIZE)
    const currentPageData = useMemo(
        () => expensesData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [expensesData, page],
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
                        <div className="text-2xl font-semibold">{transactions.length}</div>
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
                                {currentPageData.map((item) => (
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
                            {renderPagination()}
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
