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
    Download,
} from "lucide-react"
import Link from "next/link"
import { generateInvoicePDF, generatePrintableOrder } from "@/lib/pdf-generator"

// Sample product catalog for generating order items
const sampleProducts = [
    { name: "Wireless Headphones", sku: "WH-001", basePrice: 99.00 },
    { name: "USB-C Cable", sku: "USB-002", basePrice: 19.90 },
    { name: "Phone Case", sku: "PC-003", basePrice: 24.50 },
    { name: "Screen Protector", sku: "SP-004", basePrice: 12.90 },
    { name: "Charging Adapter", sku: "CA-005", basePrice: 46.90 },
    { name: "Smart Watch", sku: "SW-001", basePrice: 199.99 },
    { name: "Laptop Pro 15\"", sku: "LP-001", basePrice: 1299.00 },
    { name: "Laptop Sleeve", sku: "LS-002", basePrice: 49.50 },
    { name: "Wireless Mouse", sku: "WM-003", basePrice: 55.00 },
    { name: "Mechanical Keyboard", sku: "MK-001", basePrice: 149.99 },
    { name: "USB Hub", sku: "UH-001", basePrice: 29.99 },
    { name: "Webcam HD", sku: "WC-001", basePrice: 79.99 },
    { name: "Monitor 27\"", sku: "MN-001", basePrice: 349.99 },
    { name: "Desk Lamp", sku: "DL-001", basePrice: 45.00 },
    { name: "Bluetooth Speaker", sku: "BS-001", basePrice: 89.99 },
    { name: "Tablet 10\"", sku: "TB-001", basePrice: 399.99 },
    { name: "Stylus Pen", sku: "SP-005", basePrice: 29.99 },
    { name: "Screen Protector", sku: "SP-006", basePrice: 15.99 },
    { name: "Phone Holder", sku: "PH-001", basePrice: 19.99 },
    { name: "Power Bank", sku: "PB-001", basePrice: 49.99 },
]

// Sample customers for generating order data
const sampleCustomers = [
    { name: "Jane Cooper", email: "jane.cooper@example.com", phone: "+1 (555) 123-4567", address: "123 Main Street, New York, NY 10001", avatar: "JC" },
    { name: "Cody Fisher", email: "cody.fisher@example.com", phone: "+1 (555) 234-5678", address: "456 Oak Avenue, Los Angeles, CA 90001", avatar: "CF" },
    { name: "Kristin Watson", email: "kristin.watson@example.com", phone: "+1 (555) 345-6789", address: "789 Pine Road, Chicago, IL 60601", avatar: "KW" },
    { name: "Jenny Wilson", email: "jenny.wilson@example.com", phone: "+1 (555) 456-7890", address: "321 Maple Drive, Houston, TX 77001", avatar: "JW" },
    { name: "Robert Chen", email: "robert.chen@example.com", phone: "+1 (555) 567-8901", address: "654 Cedar Lane, San Francisco, CA 94101", avatar: "RC" },
    { name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "+1 (555) 678-9012", address: "987 Birch Street, Seattle, WA 98101", avatar: "SJ" },
    { name: "Michael Brown", email: "michael.brown@example.com", phone: "+1 (555) 789-0123", address: "147 Elm Avenue, Boston, MA 02101", avatar: "MB" },
    { name: "Emily Davis", email: "emily.davis@example.com", phone: "+1 (555) 890-1234", address: "258 Walnut Way, Miami, FL 33101", avatar: "ED" },
]

// Function to generate deterministic order data based on order ID
function generateOrderData(orderId: string) {
    // Extract numeric part from order ID
    const numericPart = parseInt(orderId.replace(/\D/g, '')) || Math.floor(Math.random() * 10000)
    const seed = numericPart % 1000

    // Use seed to generate consistent data for same order ID
    const customerIndex = seed % sampleCustomers.length
    const customer = sampleCustomers[customerIndex]

    // Generate random number of items (1-6)
    const numItems = (seed % 6) + 1
    const items: any[] = []

    // Select random products and generate items
    const usedProducts = new Set<number>()
    for (let i = 0; i < numItems; i++) {
        let productIndex = (seed + i * 7) % sampleProducts.length
        while (usedProducts.has(productIndex)) {
            productIndex = (productIndex + 1) % sampleProducts.length
        }
        usedProducts.add(productIndex)

        const product = sampleProducts[productIndex]
        const quantity = (seed % 3) + 1
        const price = product.basePrice
        const itemTotal = price * quantity

        items.push({
            id: i + 1,
            name: product.name,
            sku: product.sku,
            price: `$${price.toFixed(2)}`,
            quantity: quantity,
            total: `$${itemTotal.toFixed(2)}`
        })
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''))
        return sum + (price * item.quantity)
    }, 0)

    // Generate status based on seed
    const statuses = ['pending', 'processing', 'shipped', 'delivered']
    const status = statuses[seed % statuses.length]

    // Generate dates based on seed
    const daysAgo = seed % 30
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - daysAgo)
    const createdAt = createdDate.toISOString().slice(0, 16).replace('T', ' ')

    const updatedDate = new Date(createdDate)
    updatedDate.setDate(updatedDate.getDate() + (seed % 3))
    const updatedAt = updatedDate.toISOString().slice(0, 16).replace('T', ' ')

    // Generate payment method based on seed
    const paymentMethods = ['Credit Card', 'PayPal', 'Debit Card', 'Apple Pay', 'Google Pay']
    const paymentMethod = paymentMethods[seed % paymentMethods.length]

    // Generate shipping method
    const shippingMethods = ['Standard Shipping', 'Express Shipping', 'Next Day Delivery', 'Free Shipping']
    const shippingMethod = shippingMethods[seed % shippingMethods.length]
    const shippingCost = seed % 4 === 0 ? 0 : (seed % 3) * 5 + 5

    // Generate tracking number for shipped/delivered orders
    const trackingNumber = (status === 'shipped' || status === 'delivered')
        ? `TRK-${Math.abs(seed * 12345)}`.slice(0, 15)
        : undefined

    // Generate timeline based on status
    const timeline: any[] = [
        { id: 1, action: "Order placed", description: "Order was placed by customer", time: createdAt }
    ]

    if (seed % 2 === 0 || status !== 'pending') {
        timeline.push({ id: 2, action: "Payment confirmed", description: `Payment of $${subtotal.toFixed(2)} was confirmed`, time: createdAt })
    }

    if (status === 'processing' || status === 'shipped' || status === 'delivered') {
        timeline.push({ id: 3, action: "Processing", description: "Order is being processed", time: createdAt.replace('00:00', '10:00') })
    }

    if (status === 'shipped' || status === 'delivered') {
        timeline.push({ id: 4, action: "Shipped", description: "Order has been shipped", time: updatedAt.replace('00:00', '14:00') })
    }

    if (status === 'delivered') {
        timeline.push({ id: 5, action: "Delivered", description: "Order was delivered", time: updatedAt })
    }

    // Generate notes for some orders
    const notes = seed % 5 === 0 ? "Please deliver before 5 PM" : (seed % 7 === 0 ? "Leave at door" : "")

    // Calculate tax (8% of subtotal)
    const tax = subtotal * 0.08

    return {
        id: orderId,
        customer,
        status,
        createdAt,
        updatedAt,
        paymentMethod,
        paymentStatus: seed % 3 === 0 ? 'pending' : 'paid',
        shippingMethod,
        shippingAddress: customer.address,
        trackingNumber,
        notes,
        items,
        subtotal: `$${subtotal.toFixed(2)}`,
        shipping: `$${shippingCost.toFixed(2)}`,
        tax: `$${tax.toFixed(2)}`,
        total: `$${(subtotal + shippingCost + tax).toFixed(2)}`,
        timeline
    }
}

// Sample order data - in real app this would come from API/database
// These match the listing page data for consistency
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
    "ORD-1019": {
        id: "ORD-1019",
        customer: {
            name: "Floyd Lewis",
            email: "floyd.lewis@example.com",
            phone: "+1 (555) 111-2222",
            address: "321 Oak Street, Dallas, TX 75201",
            avatar: "FL"
        },
        status: "shipped",
        createdAt: "2024-02-10 08:00",
        updatedAt: "2024-02-12 10:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "321 Oak Street, Dallas, TX 75201",
        trackingNumber: "TRK-111222333",
        notes: "",
        items: [
            { id: 1, name: "MacBook Pro 16\"", sku: "MBP-001", price: "$12,000.00", quantity: 1, total: "$12,000.00" },
            { id: 2, name: "USB-C Hub", sku: "UH-002", price: "$79.00", quantity: 2, total: "$158.00" },
            { id: 3, name: "Laptop Sleeve", sku: "LS-003", price: "$187.00", quantity: 1, total: "$187.00" },
        ],
        subtotal: "$12,345.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$12,345.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 08:00" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-10 08:05" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-12 10:00" },
        ]
    },
    "ORD-1018": {
        id: "ORD-1018",
        customer: {
            name: "Jacob Jones",
            email: "jacob.jones@example.com",
            phone: "+1 (555) 222-3333",
            address: "456 Pine Avenue, Phoenix, AZ 85001",
            avatar: "JJ"
        },
        status: "delivered",
        createdAt: "2024-02-10 18:45",
        updatedAt: "2024-02-15 12:00",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "456 Pine Avenue, Phoenix, AZ 85001",
        trackingNumber: "TRK-444555666",
        notes: "Leave at front door",
        items: [
            { id: 1, name: "Gaming PC", sku: "GP-001", price: "$89,000.00", quantity: 1, total: "$89,000.00" },
        ],
        subtotal: "$89,000.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$89,000.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 18:45" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-10 18:50" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-12 09:00" },
            { id: 4, action: "Delivered", description: "Order was delivered", time: "2024-02-15 12:00" },
        ]
    },
    "ORD-1017": {
        id: "ORD-1017",
        customer: {
            name: "Ralph Edwards",
            email: "ralph.edwards@example.com",
            phone: "+1 (555) 333-4444",
            address: "789 Maple Road, Denver, CO 80201",
            avatar: "RE"
        },
        status: "pending",
        createdAt: "2024-02-10 17:30",
        updatedAt: "2024-02-10 17:30",
        paymentMethod: "Debit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "789 Maple Road, Denver, CO 80201",
        notes: "",
        items: [
            { id: 1, name: "Server Equipment", sku: "SE-001", price: "$4,500.00", quantity: 1, total: "$4,500.00" },
        ],
        subtotal: "$4,500.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$4,500.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 17:30" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-10 17:35" },
        ]
    },
    "ORD-1016": {
        id: "ORD-1016",
        customer: {
            name: "Cameron Williamson",
            email: "cameron.williamson@example.com",
            phone: "+1 (555) 444-5555",
            address: "147 Cedar Lane, Atlanta, GA 30301",
            avatar: "CW"
        },
        status: "processing",
        createdAt: "2024-02-09 14:20",
        updatedAt: "2024-02-10 09:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "147 Cedar Lane, Atlanta, GA 30301",
        notes: "",
        items: [
            { id: 1, name: "iMac 27\"", sku: "IM-001", price: "$1,200.00", quantity: 1, total: "$1,200.00" },
            { id: 2, name: "Wireless Keyboard", sku: "WK-001", price: "$149.00", quantity: 1, total: "$149.00" },
            { id: 3, name: "Wireless Mouse", sku: "WM-002", price: "$79.00", quantity: 1, total: "$79.00" },
            { id: 4, name: "USB Hub", sku: "UH-003", price: "$39.00", quantity: 1, total: "$39.00" },
            { id: 5, name: "Webcam HD", sku: "WC-002", price: "$89.00", quantity: 1, total: "$89.00" },
            { id: 6, name: "Monitor Stand", sku: "MS-001", price: "$11.00", quantity: 1, total: "$11.00" },
        ],
        subtotal: "$1,567.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$1,567.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-09 14:20" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-09 14:25" },
            { id: 3, action: "Processing", description: "Order is being processed", time: "2024-02-10 09:00" },
        ]
    },
    "ORD-1015": {
        id: "ORD-1015",
        customer: {
            name: "Michael Brown",
            email: "michael.brown@example.com",
            phone: "+1 (555) 789-0123",
            address: "147 Elm Avenue, Boston, MA 02101",
            avatar: "MB"
        },
        status: "shipped",
        createdAt: "2024-02-09 14:10",
        updatedAt: "2024-02-11 10:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "147 Elm Avenue, Boston, MA 02101",
        trackingNumber: "TRK-555666777",
        notes: "",
        items: [
            { id: 1, name: "iPhone 15", sku: "IP-015", price: "$120.00", quantity: 1, total: "$120.00" },
            { id: 2, name: "Phone Case", sku: "PC-015", price: "$35.00", quantity: 1, total: "$35.00" },
            { id: 3, name: "Screen Protector", sku: "SP-015", price: "$19.00", quantity: 1, total: "$19.00" },
            { id: 4, name: "Charging Cable", sku: "CC-015", price: "$60.00", quantity: 1, total: "$60.00" },
        ],
        subtotal: "$234.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$234.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-09 14:10" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-09 14:15" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-11 10:00" },
        ]
    },
    "ORD-1014": {
        id: "ORD-1014",
        customer: {
            name: "Theresa Webb",
            email: "theresa.webb@example.com",
            phone: "+1 (555) 666-7777",
            address: "369 Birch Street, Minneapolis, MN 55401",
            avatar: "TW"
        },
        status: "delivered",
        createdAt: "2024-02-09 09:30",
        updatedAt: "2024-02-13 14:00",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "369 Birch Street, Minneapolis, MN 55401",
        trackingNumber: "TRK-111333555",
        notes: "",
        items: [
            { id: 1, name: "Dell XPS 15", sku: "DX-001", price: "$1,800.00", quantity: 1, total: "$1,800.00" },
            { id: 2, name: "Laptop Sleeve", sku: "LS-004", price: "$89.00", quantity: 1, total: "$89.00" },
            { id: 3, name: "Wireless Mouse", sku: "WM-004", price: "$55.00", quantity: 1, total: "$55.00" },
            { id: 4, name: "USB-C Cable", sku: "USB-003", price: "$25.00", quantity: 1, total: "$25.00" },
            { id: 5, name: "Webcam", sku: "WC-003", price: "$120.00", quantity: 1, total: "$120.00" },
            { id: 6, name: "Headphones", sku: "HP-001", price: "$251.00", quantity: 1, total: "$251.00" },
        ],
        subtotal: "$2,340.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$2,340.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-09 09:30" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-09 09:35" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-10 11:00" },
            { id: 4, action: "Delivered", description: "Order was delivered", time: "2024-02-13 14:00" },
        ]
    },
    "ORD-1013": {
        id: "ORD-1013",
        customer: {
            name: "Darlene Robertson",
            email: "darlene.robertson@example.com",
            phone: "+1 (555) 777-8888",
            address: "741 Elm Avenue, Nashville, TN 37201",
            avatar: "DR"
        },
        status: "pending",
        createdAt: "2024-02-08 16:45",
        updatedAt: "2024-02-08 16:45",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "741 Elm Avenue, Nashville, TN 37201",
        notes: "",
        items: [
            { id: 1, name: "AirPods Pro", sku: "AP-001", price: "$249.00", quantity: 1, total: "$249.00" },
            { id: 2, name: "AirPods Case", sku: "AC-001", price: "$318.00", quantity: 1, total: "$318.00" },
        ],
        subtotal: "$567.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$567.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-08 16:45" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-08 16:50" },
        ]
    },
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
    // Use hardcoded data if available, otherwise generate dynamic data
    const order = ordersData[orderId] || generateOrderData(orderId)

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
                        <Button variant="outline" size="sm" onClick={() => generatePrintableOrder(order)}>
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
                            <Button variant="outline" className="w-full justify-start" onClick={() => generateInvoicePDF(order)}>
                                <Download className="h-4 w-4 mr-2" />
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
