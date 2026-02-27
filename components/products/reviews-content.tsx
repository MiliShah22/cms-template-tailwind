"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, MessageSquare, Eye } from "lucide-react"
import { useState } from "react"

// Import existing data
const products = [
    {
        id: "PRD-1024",
        name: "CMS Starter Plan",
        sku: "CMS-ST-01",
        category: "Subscriptions",
        price: "$19.00",
        stock: 243,
        status: "active",
        trend: "+12%",
    },
    {
        id: "PRD-1008",
        name: "CMS Pro Plan",
        sku: "CMS-PR-01",
        category: "Subscriptions",
        price: "$49.00",
        stock: 88,
        status: "active",
        trend: "+7%",
    },
    {
        id: "PRD-0992",
        name: "SEO Toolkit Addon",
        sku: "ADD-SEO-01",
        category: "Addons",
        price: "$9.00",
        stock: 510,
        status: "active",
        trend: "+23%",
    },
    {
        id: "PRD-0975",
        name: "Analytics Upgrade",
        sku: "ADD-ANALYTICS",
        category: "Addons",
        price: "$15.00",
        stock: 132,
        status: "draft",
        trend: "-",
    },
]

const allReviews = [
    {
        id: "REV-2041",
        customerName: "Jane Cooper",
        customerEmail: "jane.cooper@example.com",
        product: "CMS Starter Plan",
        rating: 5,
        comment: "Absolutely love this plan! Great features and very easy to use for beginners.",
        date: "2024-02-10",
        status: "approved",
        helpful: 24,
    },
    {
        id: "REV-1988",
        customerName: "Cody Fisher",
        customerEmail: "cody.fisher@example.com",
        product: "CMS Starter Plan",
        rating: 4,
        comment: "Good value for money. Could use more customization options though.",
        date: "2024-02-09",
        status: "approved",
        helpful: 12,
    },
    {
        id: "REV-1905",
        customerName: "Kristin Watson",
        customerEmail: "kristin.watson@example.com",
        product: "CMS Pro Plan",
        rating: 2,
        comment: "The Pro plan has some issues with the analytics module. Needs improvement.",
        date: "2024-02-08",
        status: "pending",
        helpful: 3,
    },
    {
        id: "REV-1850",
        customerName: "Devon Lane",
        customerEmail: "devon.lane@example.com",
        product: "CMS Pro Plan",
        rating: 5,
        comment: "Perfect for our team! The collaboration features are amazing.",
        date: "2024-02-08",
        status: "approved",
        helpful: 18,
    },
    {
        id: "REV-1823",
        customerName: "Ralph Edwards",
        customerEmail: "ralph.edwards@example.com",
        product: "SEO Toolkit Addon",
        rating: 3,
        comment: "Works as expected but could be more comprehensive.",
        date: "2024-02-07",
        status: "approved",
        helpful: 7,
    },
    {
        id: "REV-1790",
        customerName: "Cameron Williamson",
        customerEmail: "cameron.williamson@example.com",
        product: "SEO Toolkit Addon",
        rating: 1,
        comment: "Not satisfied with this addon. Limited functionality.",
        date: "2024-02-06",
        status: "rejected",
        helpful: 0,
    },
    {
        id: "REV-1756",
        customerName: "Theresa Webb",
        customerEmail: "theresa.webb@example.com",
        product: "Analytics Upgrade",
        rating: 5,
        comment: "Best analytics upgrade we've used! Very insightful data.",
        date: "2024-02-05",
        status: "approved",
        helpful: 31,
    },
    {
        id: "REV-1701",
        customerName: "Floyd Lewis",
        customerEmail: "floyd.lewis@example.com",
        product: "CMS Starter Plan",
        rating: 4,
        comment: "Good starter plan. Easy to set up and get going.",
        date: "2024-02-04",
        status: "approved",
        helpful: 9,
    },
    {
        id: "REV-1650",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.johnson@example.com",
        product: "CMS Pro Plan",
        rating: 5,
        comment: "Excellent support team and great features for the price.",
        date: "2024-02-03",
        status: "approved",
        helpful: 15,
    },
    {
        id: "REV-1600",
        customerName: "Mike Chen",
        customerEmail: "mike.chen@example.com",
        product: "Analytics Upgrade",
        rating: 4,
        comment: "Very useful analytics. Would love to see more report templates.",
        date: "2024-02-02",
        status: "approved",
        helpful: 8,
    },
]

export function ReviewsContent() {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

    // Compute review counts for each product
    const productReviewCounts = products.map(product => {
        const reviews = allReviews.filter(review => review.product === product.name)
        return {
            ...product,
            reviewCount: reviews.length,
            reviews: reviews
        }
    })

    const selectedProductData = selectedProduct ? productReviewCounts.find(p => p.id === selectedProduct) : null

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <MessageSquare className="h-4 w-4" />
                        Products
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Product Reviews</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        View review counts for each product and see customer feedback.
                    </p>
                </div>
            </div>

            {/* Products Table */}
            <Card>
                <CardContent className="pt-4">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Product</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead className="hidden md:table-cell">Category</TableHead>
                                    <TableHead className="text-center">Reviews</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productReviewCounts.map((product) => (
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
                                                {product.category}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className="text-xs">
                                                {product.reviewCount} reviews
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(product.id)}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View Reviews
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>Reviews for {product.name}</DialogTitle>
                                                    </DialogHeader>
                                                    {selectedProductData && selectedProductData.reviews.length > 0 ? (
                                                        <div className="space-y-4">
                                                            {selectedProductData.reviews.map((review) => (
                                                                <Card key={review.id}>
                                                                    <CardContent className="pt-4">
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center gap-2 mb-2">
                                                                                    <span className="font-medium">{review.customerName}</span>
                                                                                    <div className="flex items-center gap-1">
                                                                                        {[...Array(5)].map((_, i) => (
                                                                                            <Star
                                                                                                key={i}
                                                                                                className={`h-3 w-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                                                                                            />
                                                                                        ))}
                                                                                        <span className="text-sm font-medium ml-1">{review.rating}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                                                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                                                    <span>{review.date}</span>
                                                                                    <span>{review.helpful} helpful</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-center text-gray-500">No reviews yet for this product.</p>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
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
