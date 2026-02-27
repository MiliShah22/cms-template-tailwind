"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    ArrowLeft,
    Package,
    Tag,
    DollarSign,
    Box,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    Edit,
    Copy,
    Archive,
    Trash2,
    Link2,
    Share2,
    BarChart3,
    Clock,
    CheckCircle2,
    Circle,
    AlertCircle,
    Star,
    ShoppingCart,
    Eye,
    Download,
    RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Sample product data - matches the products in all-content.tsx
const productsData: Record<string, any> = {
    "PRD-1024": {
        id: "PRD-1024",
        name: "CMS Starter Plan",
        description: "Perfect for small businesses and startups. Includes basic CMS features, 5GB storage, and email support. Ideal for getting started with content management.",
        sku: "CMS-ST-01",
        category: "Subscriptions",
        price: 19.00,
        comparePrice: 29.00,
        stock: 243,
        status: "active",
        trend: "+12%",
        sales: 1247,
        revenue: 23693.00,
        rating: 4.8,
        reviews: 156,
        tags: ["subscription", "starter", "popular"],
        createdAt: "2023-08-15",
        updatedAt: "2024-02-10",
        variants: [
            { id: "VAR-001", name: "Monthly", price: 19.00, stock: 150 },
            { id: "VAR-002", name: "Yearly", price: 190.00, stock: 93 },
        ],
        salesHistory: [
            { month: "Jan", sales: 98, revenue: 1862 },
            { month: "Feb", sales: 112, revenue: 2128 },
            { month: "Mar", sales: 105, revenue: 1995 },
        ],
        activities: [
            { id: 1, type: "update", user: "John", action: "updated price", target: "from $29 to $19", time: "2 days ago" },
            { id: 2, type: "sale", user: "System", action: "new purchase", target: "by jane@example.com", time: "5 hours ago" },
            { id: 3, type: "review", user: "Sarah", action: "left 5-star review", target: "", time: "1 day ago" },
        ],
    },
    "PRD-1008": {
        id: "PRD-1008",
        name: "CMS Pro Plan",
        description: "Advanced features for growing businesses. Includes unlimited storage, priority support, custom domains, and advanced analytics.",
        sku: "CMS-PR-01",
        category: "Subscriptions",
        price: 49.00,
        comparePrice: 79.00,
        stock: 88,
        status: "active",
        trend: "+7%",
        sales: 892,
        revenue: 43708.00,
        rating: 4.9,
        reviews: 203,
        tags: ["subscription", "pro", "bestseller"],
        createdAt: "2023-07-20",
        updatedAt: "2024-02-08",
        variants: [
            { id: "VAR-003", name: "Monthly", price: 49.00, stock: 45 },
            { id: "VAR-004", name: "Yearly", price: 490.00, stock: 43 },
        ],
        salesHistory: [
            { month: "Jan", sales: 72, revenue: 3528 },
            { month: "Feb", sales: 85, revenue: 4165 },
            { month: "Mar", sales: 78, revenue: 3822 },
        ],
        activities: [
            { id: 1, type: "sale", user: "System", action: "bulk purchase", target: "10 licenses by corp@example.com", time: "1 day ago" },
            { id: 2, type: "update", user: "Mike", action: "added new feature", target: "Advanced Analytics", time: "3 days ago" },
        ],
    },
    "PRD-0992": {
        id: "PRD-0992",
        name: "SEO Toolkit Addon",
        description: "Boost your search rankings with our comprehensive SEO toolkit. Includes keyword research, on-page optimization, and competitor analysis.",
        sku: "ADD-SEO-01",
        category: "Addons",
        price: 9.00,
        comparePrice: 15.00,
        stock: 510,
        status: "active",
        trend: "+23%",
        sales: 2156,
        revenue: 19404.00,
        rating: 4.6,
        reviews: 89,
        tags: ["addon", "seo", "tools"],
        createdAt: "2023-09-01",
        updatedAt: "2024-02-12",
        variants: [],
        salesHistory: [
            { month: "Jan", sales: 180, revenue: 1620 },
            { month: "Feb", sales: 220, revenue: 1980 },
            { month: "Mar", sales: 195, revenue: 1755 },
        ],
        activities: [
            { id: 1, type: "update", user: "Sarah", action: "updated documentation", target: "", time: "1 week ago" },
        ],
    },
    "PRD-0975": {
        id: "PRD-0975",
        name: "Analytics Upgrade",
        description: "Advanced analytics and reporting features. Track user behavior, conversion rates, and custom events with detailed dashboards.",
        sku: "ADD-ANALYTICS",
        category: "Addons",
        price: 15.00,
        comparePrice: 25.00,
        stock: 132,
        status: "draft",
        trend: "-",
        sales: 0,
        revenue: 0,
        rating: 0,
        reviews: 0,
        tags: ["addon", "analytics", "beta"],
        createdAt: "2024-01-10",
        updatedAt: "2024-02-15",
        variants: [],
        salesHistory: [],
        activities: [
            { id: 1, type: "update", user: "John", action: "created product", target: "", time: "2 weeks ago" },
            { id: 2, type: "update", user: "Mike", action: "set to draft", target: "pending review", time: "1 week ago" },
        ],
    },
}

// Function to generate deterministic product data for unknown IDs
function generateProductData(productId: string) {
    const numericPart = parseInt(productId.replace(/\D/g, '')) || Math.floor(Math.random() * 10000)
    const seed = numericPart % 1000

    const statuses = ['active', 'draft', 'archived']
    const status = statuses[seed % statuses.length]
    const categories = ['Subscriptions', 'Addons', 'Services', 'Digital Products']
    const category = categories[seed % categories.length]

    const basePrice = ((seed % 50) + 10) + 0.99
    const stock = (seed % 500) + 50
    const sales = status === 'draft' ? 0 : (seed % 2000) + 100
    const revenue = sales * basePrice
    const rating = status === 'draft' ? 0 : 3.5 + (seed % 20) / 10

    return {
        id: productId,
        name: `Product ${productId}`,
        description: "This is a dynamically generated product description for demonstration purposes.",
        sku: `SKU-${productId}`,
        category,
        price: basePrice,
        comparePrice: basePrice * 1.5,
        stock,
        status,
        trend: status === 'draft' ? "-" : `${(seed % 30) - 10}%`,
        sales,
        revenue,
        rating,
        reviews: Math.floor(sales * 0.1),
        tags: [category.toLowerCase(), "generated"],
        createdAt: "2024-01-01",
        updatedAt: "2024-02-15",
        variants: [],
        salesHistory: [],
        activities: [],
    }
}

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800 border-green-300",
    draft: "bg-yellow-100 text-yellow-800 border-yellow-300",
    archived: "bg-gray-100 text-gray-800 border-gray-300",
}

const statusBadgeColors: Record<string, string> = {
    active: "border-green-500 text-green-700",
    draft: "border-yellow-500 text-yellow-700",
    archived: "border-gray-500 text-gray-700",
}

interface ProductDetailContentProps {
    productId: string
}

export function ProductDetailContent({ productId }: ProductDetailContentProps) {
    const product = productsData[productId] || generateProductData(productId)

    const stockPercentage = Math.min((product.stock / 500) * 100, 100)
    const stockStatus = product.stock < 50 ? "low" : product.stock < 100 ? "medium" : "good"

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/products/all">
                    <Button variant="ghost" size="sm" className="gap-2 w-fit">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Button>
                </Link>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-500">{product.id}</span>
                            <Badge className={`text-xs ${statusColors[product.status]}`}>
                                {product.status}
                            </Badge>
                            {product.rating > 0 && (
                                <Badge variant="outline" className="text-xs">
                                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                    {product.rating} ({product.reviews})
                                </Badge>
                            )}
                            {product.trend !== "-" && (
                                <Badge variant="outline" className={`text-xs ${product.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {product.trend.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                    {product.trend}
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl">{product.description}</p>

                        {/* Tags */}
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {product.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs capitalize">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                        <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Price</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">${product.price.toFixed(2)}</div>
                        {product.comparePrice > product.price && (
                            <p className="text-xs text-gray-500 line-through">${product.comparePrice.toFixed(2)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Stock</CardTitle>
                        <Box className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{product.stock}</div>
                        <div className="mt-2">
                            <Progress value={stockPercentage} className="h-2" />
                        </div>
                        <p className={`text-xs mt-1 ${stockStatus === 'low' ? 'text-red-500' :
                                stockStatus === 'medium' ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                            {stockStatus === 'low' ? 'Low stock' :
                                stockStatus === 'medium' ? 'Medium stock' : 'Good stock level'}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{product.sales.toLocaleString()}</div>
                        <p className="text-xs text-gray-500 mt-1">Total units sold</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">${product.revenue.toLocaleString()}</div>
                        <p className="text-xs text-gray-500 mt-1">Lifetime revenue</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Product Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Product Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-gray-500">SKU</p>
                                    <p className="text-sm font-medium">{product.sku}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="text-sm font-medium">{product.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Created</p>
                                    <p className="text-sm font-medium">{product.createdAt}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                    <p className="text-sm font-medium">{product.updatedAt}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Variants */}
                    {product.variants.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Product Variants</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Variant</TableHead>
                                                <TableHead className="text-right">Price</TableHead>
                                                <TableHead className="text-right">Stock</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {product.variants.map((variant: any) => (
                                                <TableRow key={variant.id}>
                                                    <TableCell className="font-medium">{variant.name}</TableCell>
                                                    <TableCell className="text-right">${variant.price.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right">{variant.stock}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Sales History */}
                    {product.salesHistory.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Sales History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Month</TableHead>
                                                <TableHead className="text-right">Units Sold</TableHead>
                                                <TableHead className="text-right">Revenue</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {product.salesHistory.map((month: any, index: number) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{month.month}</TableCell>
                                                    <TableCell className="text-right">{month.sales}</TableCell>
                                                    <TableCell className="text-right">${month.revenue.toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Activity Timeline */}
                    {product.activities.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {product.activities.map((activity: any) => (
                                        <div key={activity.id} className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    {activity.type === 'sale' ? (
                                                        <ShoppingCart className="h-4 w-4 text-primary" />
                                                    ) : activity.type === 'review' ? (
                                                        <Star className="h-4 w-4 text-yellow-500" />
                                                    ) : (
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-medium">{activity.user}</span>{' '}
                                                    <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>{' '}
                                                    {activity.target && <span className="font-medium">{activity.target}</span>}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="outline" className={`text-sm ${statusBadgeColors[product.status]}`}>
                                {product.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-2">
                                {product.status === 'active'
                                    ? 'Product is visible and available for purchase'
                                    : product.status === 'draft'
                                        ? 'Product is not visible to customers'
                                        : 'Product is archived and not available'}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                Export Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Archive className="h-4 w-4 mr-2" />
                                {product.status === 'archived' ? 'Unarchive' : 'Archive'}
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Inventory Alert */}
                    {stockStatus === 'low' && (
                        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                            <CardHeader>
                                <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    Low Stock Alert
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    Stock level is below 50 units. Consider restocking soon.
                                </p>
                                <Button className="w-full mt-3" size="sm">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Restock Now
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
