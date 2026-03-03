"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Tag, Eye } from "lucide-react"
import Link from "next/link"

import { Product } from "@/lib/products"
import { useAppSelector } from "@/lib/store/hooks"

const selectProducts = (state: any) => state.products.items

export function AllProductsContent() {
    const products: Product[] = useAppSelector(selectProducts)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    const totalPages = Math.ceil(products.length / pageSize)
    const pagedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Package className="h-4 w-4" />
                        Catalog
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">All Products</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        View and manage all products in your catalog.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{products.length}</div>
                        <p className="mt-1 text-xs text-gray-500">In catalog</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{products.filter(p => p.status === "active").length}</div>
                        <p className="mt-1 text-xs text-gray-500">Visible in storefront</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{products.filter(p => p.stock < 100).length}</div>
                        <p className="mt-1 text-xs text-gray-500">Below threshold</p>
                    </CardContent>
                </Card>
            </div>

            {/* Products Table */}
            <Card>
                <CardContent className="pt-4">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[140px]">Product</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead className="hidden md:table-cell">Category</TableHead>
                                    <TableHead className="hidden sm:table-cell text-right">Stock</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="hidden sm:table-cell text-right">Trend</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>

                            </TableHeader>
                            <TableBody>
                                {pagedProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <span>{product.name}</span>
                                                {product.status === "active" && (
                                                    <Badge variant="outline" className="text-[10px] uppercase">
                                                        Active
                                                    </Badge>
                                                )}
                                                {product.status === "draft" && (
                                                    <Badge variant="secondary" className="text-[10px] uppercase">
                                                        Draft
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="mt-0.5 text-[11px] text-gray-500">{product.id}</div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{product.sku}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                                                <Tag className="h-3 w-3 text-gray-400" />
                                                {product.category}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">
                                            {product.stock}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">{product.price}</TableCell>
                                        <TableCell className="hidden sm:table-cell text-right text-xs text-emerald-600">
                                            {product.trend}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/products/${product.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    View
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {/* pagination controls */}
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
                </CardContent>
            </Card>
        </div>
    )
}
