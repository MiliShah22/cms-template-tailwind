"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    ArrowLeft,
    Calendar,
    Clock,
    Package,
    User,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    Truck,
    CheckCircle2,
    Circle,
    MoreHorizontal,
    Edit,
    Printer,
    RefreshCw,
    FileText,
    MessageSquare,
} from "lucide-react"
import Link from "next/link"

// Sample order data - in real app this would come from API/database
const ordersData: Record<string, any> = {
    "ORD-1024": {
        id: "ORD-1024",
        customer: {
            name: "Jane Cooper",
            email: "jane.cooper@example.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main Street, New York, NY 10001",
            avatar: "JC"
        },
        status: "pending",
        createdAt: "2024-02-10 09:24",
        updatedAt: "2024-02-10 09:24",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "123 Main Street, New York, NY 10001",
        notes: "Please deliver before 5 PM",
        items: [
            { id: 1, name: "Wireless Headphones", sku: "WH-001", price: "$99.00", quantity: 1, total: "$99.00" },
            { id: 2, name: "USB-C Cable", sku: "USB-002", price: "$19.90", quantity: 2, total: "$39.80" },
            { id: 3, name: "Phone Case", sku: "PC-003", price: "$24.50", quantity: 1, total: "$24.50" },
            { id: 4, name: "Screen Protector", sku: "SP-004", price: "$12.90", quantity: 3, total: "$38.70" },
            { id: 5, name: "Charging Adapter", sku: "CA-005", price: "$46.90", quantity: 1, total: "$46.90" },
        ],
        subtotal: "$248.90",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$248.90",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 09:24" },
            { id: 2, action: "Payment confirmed", description: "Payment of $248.90 was confirmed", time: "2024-02-10 09:25" },
            { id: 3, action: "Processing", description: "Order is being processed", time: "2024-02-10 10:00" },
        ]
    },
    "ORD-1023": {
        id: "ORD-1023",
        customer: {
            name: "Cody Fisher",
            email: "cody.fisher@example.com",
            phone: "+1 (555) 234-5678",
            address: "456 Oak Avenue, Los Angeles, CA 90001",
            avatar: "CF"
        },
        status: "shipped",
        createdAt: "2024-09-12",
        updatedAt: "2024-09-14",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "456 Oak Avenue, Los Angeles, CA 90001",
        trackingNumber: "TRK-987654321",
        notes: "",
        items: [
            { id: 1, name: "Smart Watch", sku: "SW-001", price: "$45.00", quantity: 2, total: "$89.00" },
        ],
        subtotal: "$89.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$89.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-09-12" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-09-12" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-09-14" },
        ]
    },
    "ORD-1022": {
        id: "ORD-1022",
        customer: {
            name: "Kristin Watson",
            email: "kristin.watson@example.com",
            phone: "+1 (555) 345-6789",
            address: "789 Pine Road, Chicago, IL 60601",
            avatar: "KW"
        },
        status: "delivered",
        createdAt: "2024-02-10 08:58",
        updatedAt: "2024-02-15 14:30",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "789 Pine Road, Chicago, IL 60601",
        trackingNumber: "TRK-123456789",
        notes: "Leave at door",
        items: [
            { id: 1, name: "Laptop Pro 15\"", sku: "LP-001", price: "$1,100.00", quantity: 1, total: "$1,100.00" },
            { id: 2, name: "Laptop Sleeve", sku: "LS-002", price: "$49.50", quantity: 1, total: "$49.50" },
            { id: 3, name: "Wireless Mouse", sku: "WM-003", price: "$55.00", quantity: 1, total: "$55.00" },
        ],
        subtotal: "$1,204.50",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$1,204.50",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 08:58" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-10 08:59" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-11" },
            { id: 4, action: "Delivered", description: "Order was delivered", time: "2024-02-15 14:30" },
        ]
    },
}

// Default order for unknown IDs
const defaultOrder = {
    id: "ORD-0000",
    customer: {
        name: "Unknown Customer",
        email: "unknown@example.com",
        phone: "+1 (555) 000-0000",
        address: "No address provided",
        avatar: "UC"
    },
    status: "pending",
    createdAt: "2024-01-01 00:00",
    updatedAt: "2024-01-01 00:00",
    paymentMethod: "Credit Card",
    paymentStatus: "pending",
    shippingMethod: "Standard Shipping",
    shippingAddress: "No address provided",
    notes: "",
    items: [],
    subtotal: "$0.00",
    shipping: "$0.00",
    tax: "$0.00",
    total: "$0.00",
    timeline: []
}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    shipped: "bg-blue-100 text-blue-800 border-blue-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    processing: "bg-purple-100 text-purple-800 border-purple-300"
}

const statusBadgeColors: Record<string, string> = {
    pending: "border-yellow-500 text-yellow-700",
    shipped: "border-blue-500 text-blue-700",
    delivered: "border-green-500 text-green-700",
    processing: "border-purple-500 text-purple-700"
}

interface OrderDetailContentProps {
    orderId: string
}

export function OrderDetailContent({ orderId }: OrderDetailContentProps) {
    const order = ordersData[orderId] || { ...defaultOrder, id: orderId }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/orders/all">
                    <Button variant="ghost" size="sm" className="gap-2 w-fit">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Orders
                    </Button>
                </Link>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-500">{order.id}</span>
                            <Badge className={`text-xs ${statusColors[order.status]}`}>
                                {order.status}
                            </Badge>
                            {order.trackingNumber && (
                                <Badge variant="outline" className="text-xs">
                                    <Truck className="h-3 w-3 mr-1" />
                                    {order.trackingNumber}
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Created on {order.createdAt} • Updated on {order.updatedAt}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Order
                        </Button>
                        <Button variant="outline" size="sm">
                            <Printer className="h-4 w-4 mr-2" />
                            Print
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
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                        <Package className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <Badge variant="outline" className={statusBadgeColors[order.status]}>
                            {order.status}
                        </Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Payment</CardTitle>
                        <CreditCard className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium capitalize">{order.paymentStatus}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{order.paymentMethod}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Shipping</CardTitle>
                        <Truck className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium capitalize">{order.shippingMethod}</div>
                        <p className="text-xs text-gray-500 mt-1">
                            {order.trackingNumber || "No tracking yet"}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total</CardTitle>
                        <Clock className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{order.total}</div>
                        <p className="text-xs text-gray-500 mt-1">{order.items.length} items</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Order Items Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-center">Qty</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {order.items.map((item: any) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">{item.price}</TableCell>
                                                <TableCell className="text-center">{item.quantity}</TableCell>
                                                <TableCell className="text-right font-medium">{item.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 flex justify-end">
                                <div className="w-full max-w-xs space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span>{order.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Shipping</span>
                                        <span>{order.shipping}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Tax</span>
                                        <span>{order.tax}</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-t pt-2 font-semibold">
                                        <span>Total</span>
                                        <span>{order.total}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Section */}
                    {order.timeline.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Order Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order.timeline.map((event: any, index: number) => (
                                        <div key={event.id} className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    {index === order.timeline.length - 1 ? (
                                                        <Circle className="h-4 w-4 text-primary" />
                                                    ) : (
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    )}
                                                </div>
                                                {index < order.timeline.length - 1 && (
                                                    <div className="w-0.5 h-full bg-gray-200 mt-1" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <p className="text-sm font-medium">{event.action}</p>
                                                <p className="text-xs text-gray-500">{event.description}</p>
                                                <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Notes Section */}
                    {order.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{order.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Customer Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>{order.customer.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{order.customer.name}</p>
                                    <Link href="/customers/all" className="text-xs text-primary hover:underline">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{order.customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{order.customer.phone}</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-400">{order.customer.address}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-400">{order.shippingAddress}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Update Status
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Generate Invoice
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Truck className="h-4 w-4 mr-2" />
                                Add Tracking
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Send Notification
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refund Order
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
