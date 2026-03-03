"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/shared/pagination"

import { downloadCSV } from "@/components/shared/export-utils"

export interface CustomerData {
    id: string
    name: string
    email: string
    phone: string
    segment: string
}

interface CustomerTableProps {
    title: string
    description: string
    customers: CustomerData[]
}

// export helper so pages can reuse
export function exportCustomersCSV(customers: CustomerData[], fileName = "customers.csv") {
    const headers = ["Customer ID", "Name", "Email", "Phone", "Segment"]
    const rows = customers.map((c) => [c.id, c.name, c.email, c.phone, c.segment])
    downloadCSV(headers, rows, fileName)
}

export function CustomerTable({ title, description, customers }: CustomerTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const totalPages = Math.ceil(customers.length / pageSize)
    const paged = customers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportCustomersCSV(customers, `${title.replace(/\s+/g, "-").toLowerCase()}.csv`)}
                    >
                        Export
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="pt-4">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[140px]">Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Segment</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paged.map((cust) => (
                                    <TableRow key={cust.id}>
                                        <TableCell className="font-medium">{cust.name}</TableCell>
                                        <TableCell>{cust.email}</TableCell>
                                        <TableCell>{cust.phone}</TableCell>
                                        <TableCell>{cust.segment}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/customers/${cust.id}`}>
                                                <Button variant="ghost" size="sm">
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

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    totalItems={customers.length}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize)
                        setCurrentPage(1)
                    }}
                />
            )}
        </div>
    )
}
