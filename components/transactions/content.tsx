"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Search, Download, Filter, TrendingUp, TrendingDown } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination"

import type { Transaction, ExpenseTransaction } from "@/lib/transactions"

interface TransactionsContentProps {
    transactions: Transaction[]
    expenseTransactions?: ExpenseTransaction[]
}

const PAGE_SIZE = 5

export function TransactionsContent({ transactions, expenseTransactions = [] }: TransactionsContentProps) {
    // derived helper lists
    const incomeTransactions = useMemo(
        () => transactions.filter((t) => t.amount > 0 && t.status !== "refunded"),
        [transactions],
    )

    // current tab and page state
    const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expenses'>('all')
    const [pageAll, setPageAll] = useState(1)
    const [pageIncome, setPageIncome] = useState(1)
    const [pageExpenses, setPageExpenses] = useState(1)

    const totalIncome = transactions.filter((t) => t.status !== "refunded").reduce((acc, t) => acc + t.amount, 0)
    const totalExpenses = expenseTransactions.reduce((acc, t) => acc + Math.abs(t.amount), 0)
    const netProfit = totalIncome - totalExpenses

    // pagination calculations
    const allTotalPages = Math.ceil(transactions.length / PAGE_SIZE)
    const incomeTotalPages = Math.ceil(incomeTransactions.length / PAGE_SIZE)
    const expensesTotalPages = Math.ceil(expenseTransactions.length / PAGE_SIZE)

    const currentAll = useMemo(
        () => transactions.slice((pageAll - 1) * PAGE_SIZE, pageAll * PAGE_SIZE),
        [transactions, pageAll],
    )
    const currentIncome = useMemo(
        () => incomeTransactions.slice((pageIncome - 1) * PAGE_SIZE, pageIncome * PAGE_SIZE),
        [incomeTransactions, pageIncome],
    )
    const currentExpenses = useMemo(
        () => expenseTransactions.slice((pageExpenses - 1) * PAGE_SIZE, pageExpenses * PAGE_SIZE),
        [expenseTransactions, pageExpenses],
    )

    const renderPagination = (
        page: number,
        totalPages: number,
        setPage: (n: number) => void,
    ) => {
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
                        <Wallet className="h-4 w-4" />
                        Finance
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        View and manage all your financial transactions.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-green-600">${totalIncome.toFixed(2)}</div>
                        <p className="mt-1 text-xs text-gray-500">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-red-600">${totalExpenses.toFixed(2)}</div>
                        <p className="mt-1 text-xs text-gray-500">-5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                        <Wallet className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-semibold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            ${netProfit.toFixed(2)}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">+18% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table */}
            <Card>
                <CardContent className="pt-4">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                            <Search className="h-3 w-3" />
                            Search
                        </div>
                        <Input placeholder="Search transactions..." className="h-9 max-w-sm bg-transparent text-sm" />
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                            <TabsTrigger value="all">All Transactions</TabsTrigger>
                            <TabsTrigger value="income">Income</TabsTrigger>
                            <TabsTrigger value="expenses">Expenses</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentAll.map((txn) => (
                                            <TableRow key={txn.id}>
                                                <TableCell className="font-medium text-xs">{txn.id}</TableCell>
                                                <TableCell className="text-sm">{txn.date}</TableCell>
                                                <TableCell className="text-sm">{txn.description}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{txn.customer}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{txn.method}</TableCell>
                                                <TableCell className={`text-right font-medium ${txn.amount < 0 ? "text-red-600" : ""}`}>
                                                    ${Math.abs(txn.amount).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            txn.status === "completed"
                                                                ? "border-green-500 text-green-700"
                                                                : txn.status === "pending"
                                                                    ? "border-yellow-500 text-yellow-700"
                                                                    : "border-red-500 text-red-700"
                                                        }
                                                    >
                                                        {txn.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {renderPagination(pageAll, allTotalPages, setPageAll)}
                        </TabsContent>

                        <TabsContent value="income" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentIncome.map((txn) => (
                                            <TableRow key={txn.id}>
                                                <TableCell className="font-medium text-xs">{txn.id}</TableCell>
                                                <TableCell className="text-sm">{txn.date}</TableCell>
                                                <TableCell className="text-sm">{txn.description}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{txn.customer}</TableCell>
                                                <TableCell className="text-right font-medium text-green-600">
                                                    +${txn.amount.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {renderPagination(pageIncome, incomeTotalPages, setPageIncome)}
                        </TabsContent>

                        <TabsContent value="expenses" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentExpenses.map((txn) => (
                                            <TableRow key={txn.id}>
                                                <TableCell className="font-medium text-xs">{txn.id}</TableCell>
                                                <TableCell className="text-sm">{txn.date}</TableCell>
                                                <TableCell className="text-sm">{txn.description}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{txn.category}</TableCell>
                                                <TableCell className="text-right font-medium text-red-600">
                                                    -${Math.abs(txn.amount).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {renderPagination(pageExpenses, expensesTotalPages, setPageExpenses)}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
