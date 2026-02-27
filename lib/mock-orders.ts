"use client"

import { OrderData } from "@/components/shared/order-table"

// Order item interface for detailed order data
export interface OrderItem {
    id: number
    name: string
    sku: string
    price: string
    quantity: number
    total: string
}

// Customer interface for detailed order data
export interface OrderCustomer {
    name: string
    email: string
    phone: string
    address: string
    avatar: string
}

// Timeline event interface
export interface TimelineEvent {
    id: number
    action: string
    description: string
    time: string
}

// Detailed order data interface
export interface OrderDetailData {
    id: string
    customer: OrderCustomer
    status: string
    createdAt: string
    updatedAt: string
    paymentMethod: string
    paymentStatus: string
    shippingMethod: string
    shippingAddress: string
    trackingNumber?: string
    notes?: string
    items: OrderItem[]
    subtotal: string
    shipping: string
    tax: string
    total: string
    timeline: TimelineEvent[]
}

// Sample products catalog
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
    { name: "Power Bank", sku: "PB-001", basePrice: 49.99 },
    { name: "AirPods Pro", sku: "AP-001", basePrice: 249.00 },
    { name: "iPhone 15", sku: "IP-015", basePrice: 999.00 },
]

// Sample customers
const sampleCustomers: Record<string, OrderCustomer> = {
    "Jane Cooper": { name: "Jane Cooper", email: "jane.cooper@example.com", phone: "+1 (555) 123-4567", address: "123 Main Street, New York, NY 10001", avatar: "JC" },
    "Cody Fisher": { name: "Cody Fisher", email: "cody.fisher@example.com", phone: "+1 (555) 234-5678", address: "456 Oak Avenue, Los Angeles, CA 90001", avatar: "CF" },
    "Kristin Watson": { name: "Kristin Watson", email: "kristin.watson@example.com", phone: "+1 (555) 345-6789", address: "789 Pine Road, Chicago, IL 60601", avatar: "KW" },
    "Floyd Lewis": { name: "Floyd Lewis", email: "floyd.lewis@example.com", phone: "+1 (555) 111-2222", address: "321 Oak Street, Dallas, TX 75201", avatar: "FL" },
    "Jacob Jones": { name: "Jacob Jones", email: "jacob.jones@example.com", phone: "+1 (555) 222-3333", address: "456 Pine Avenue, Phoenix, AZ 85001", avatar: "JJ" },
    "Ralph Edwards": { name: "Ralph Edwards", email: "ralph.edwards@example.com", phone: "+1 (555) 333-4444", address: "789 Maple Road, Denver, CO 80201", avatar: "RE" },
    "Cameron Williamson": { name: "Cameron Williamson", email: "cameron.williamson@example.com", phone: "+1 (555) 444-5555", address: "147 Cedar Lane, Atlanta, GA 30301", avatar: "CW" },
    "Devon Lane": { name: "Devon Lane", email: "devon.lane@example.com", phone: "+1 (555) 555-6666", address: "258 Walnut Way, Miami, FL 33101", avatar: "DL" },
    "Theresa Webb": { name: "Theresa Webb", email: "theresa.webb@example.com", phone: "+1 (555) 666-7777", address: "369 Birch Street, Minneapolis, MN 55401", avatar: "TW" },
    "Darlene Robertson": { name: "Darlene Robertson", email: "darlene.robertson@example.com", phone: "+1 (555) 777-8888", address: "741 Elm Avenue, Nashville, TN 37201", avatar: "DR" },
    "Jenny Wilson": { name: "Jenny Wilson", email: "jenny.wilson@example.com", phone: "+1 (555) 456-7890", address: "321 Maple Drive, Houston, TX 77001", avatar: "JW" },
    "Robert Chen": { name: "Robert Chen", email: "robert.chen@example.com", phone: "+1 (555) 567-8901", address: "654 Cedar Lane, San Francisco, CA 94101", avatar: "RC" },
    "Sarah Johnson": { name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "+1 (555) 678-9012", address: "987 Birch Street, Seattle, WA 98101", avatar: "SJ" },
    "Michael Brown": { name: "Michael Brown", email: "michael.brown@example.com", phone: "+1 (555) 789-0123", address: "147 Elm Avenue, Boston, MA 02101", avatar: "MB" },
    "Emily Davis": { name: "Emily Davis", email: "emily.davis@example.com", phone: "+1 (555) 890-1234", address: "258 Walnut Way, Miami, FL 33101", avatar: "ED" },
    "Bessie Cooper": { name: "Bessie Cooper", email: "bessie.cooper@example.com", phone: "+1 (555) 901-2345", address: "369 Pine Street, Austin, TX 78701", avatar: "BC" },
    "Annette Black": { name: "Annette Black", email: "annette.black@example.com", phone: "+1 (555) 012-3456", address: "741 Oak Avenue, Portland, OR 97201", avatar: "AB" },
    "Courtney Henry": { name: "Courtney Henry", email: "courtney.henry@example.com", phone: "+1 (555) 123-4567", address: "852 Maple Road, Las Vegas, NV 89101", avatar: "CH" },
}

// All mock orders for list view (simplified data)
export const mockOrders: OrderData[] = [
    // Pending orders
    { id: "ORD-1024", customer: "Jane Cooper", total: "$248.90", items: 5, createdAt: "2024-02-10 09:24", status: "pending" },
    { id: "ORD-1017", customer: "Ralph Edwards", total: "$4,500.00", items: 1, createdAt: "2024-02-10 17:30", status: "pending" },
    { id: "ORD-1013", customer: "Darlene Robertson", total: "$567.00", items: 2, createdAt: "2024-02-08 16:45", status: "pending" },

    // Processing orders
    { id: "ORD-1021", customer: "Devon Lane", total: "$39.99", items: 1, createdAt: "2024-02-10 08:40", status: "processing" },
    { id: "ORD-1016", customer: "Cameron Williamson", total: "$1,567.00", items: 8, createdAt: "2024-02-09 14:20", status: "processing" },
    { id: "ORD-1010", customer: "Jenny Wilson", total: "$234.50", items: 4, createdAt: "2024-02-08 15:00", status: "processing" },
    { id: "ORD-1009", customer: "Robert Chen", total: "$567.00", items: 7, createdAt: "2024-02-08 12:30", status: "processing" },

    // Shipped orders
    { id: "ORD-1023", customer: "Cody Fisher", total: "$89.00", items: 2, createdAt: "2024-02-10 09:12", status: "shipped" },
    { id: "ORD-1019", customer: "Floyd Lewis", total: "$12,345.00", items: 3, createdAt: "2024-02-10 08:00", status: "shipped" },
    { id: "ORD-1015", customer: "Michael Brown", total: "$890.00", items: 4, createdAt: "2024-02-09 14:10", status: "shipped" },
    { id: "ORD-1014", customer: "Sarah Johnson", total: "$678.90", items: 9, createdAt: "2024-02-09 12:00", status: "shipped" },

    // Delivered orders
    { id: "ORD-1022", customer: "Kristin Watson", total: "$1,204.50", items: 12, createdAt: "2024-02-10 08:58", status: "delivered" },
    { id: "ORD-1020", customer: "Bessie Cooper", total: "$567.00", items: 8, createdAt: "2024-02-10 08:20", status: "delivered" },
    { id: "ORD-1018", customer: "Jacob Jones", total: "$89,000.00", items: 15, createdAt: "2024-02-10 18:45", status: "delivered" },
    { id: "ORD-1012", customer: "Courtney Henry", total: "$789.00", items: 7, createdAt: "2024-02-08 16:45", status: "delivered" },
    { id: "ORD-1011", customer: "Theresa Webb", total: "$156.00", items: 2, createdAt: "2024-02-08 14:20", status: "delivered" },
]

// Detailed order data for order detail page
export const mockOrderDetails: Record<string, OrderDetailData> = {
    "ORD-1024": {
        id: "ORD-1024",
        customer: sampleCustomers["Jane Cooper"],
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
        ]
    },
    "ORD-1023": {
        id: "ORD-1023",
        customer: sampleCustomers["Cody Fisher"],
        status: "shipped",
        createdAt: "2024-02-10 09:12",
        updatedAt: "2024-02-12 14:00",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "456 Oak Avenue, Los Angeles, CA 90001",
        trackingNumber: "TRK-987654321",
        items: [
            { id: 1, name: "Smart Watch", sku: "SW-001", price: "$44.50", quantity: 2, total: "$89.00" },
        ],
        subtotal: "$89.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$89.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 09:12" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-10 09:15" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-12 14:00" },
        ]
    },
    "ORD-1022": {
        id: "ORD-1022",
        customer: sampleCustomers["Kristin Watson"],
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
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-11 10:00" },
            { id: 4, action: "Delivered", description: "Order was delivered", time: "2024-02-15 14:30" },
        ]
    },
    "ORD-1021": {
        id: "ORD-1021",
        customer: sampleCustomers["Devon Lane"],
        status: "processing",
        createdAt: "2024-02-10 08:40",
        updatedAt: "2024-02-10 10:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "258 Walnut Way, Miami, FL 33101",
        items: [
            { id: 1, name: "USB Hub", sku: "UH-001", price: "$39.99", quantity: 1, total: "$39.99" },
        ],
        subtotal: "$39.99",
        shipping: "$5.00",
        tax: "$3.20",
        total: "$48.19",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 08:40" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-10 08:45" },
            { id: 3, action: "Processing", description: "Order is being processed", time: "2024-02-10 10:00" },
        ]
    },
    "ORD-1020": {
        id: "ORD-1020",
        customer: sampleCustomers["Bessie Cooper"],
        status: "delivered",
        createdAt: "2024-02-10 08:20",
        updatedAt: "2024-02-14 16:00",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "369 Pine Street, Austin, TX 78701",
        trackingNumber: "TRK-555666777",
        items: [
            { id: 1, name: "Mechanical Keyboard", sku: "MK-001", price: "$149.99", quantity: 2, total: "$299.98" },
            { id: 2, name: "Wireless Mouse", sku: "WM-003", price: "$55.00", quantity: 1, total: "$55.00" },
            { id: 3, name: "USB-C Cable", sku: "USB-002", price: "$19.90", quantity: 3, total: "$59.70" },
            { id: 4, name: "Webcam HD", sku: "WC-001", price: "$79.99", quantity: 1, total: "$79.99" },
            { id: 5, name: "Desk Lamp", sku: "DL-001", price: "$45.00", quantity: 1, total: "$45.00" },
        ],
        subtotal: "$539.67",
        shipping: "$0.00",
        tax: "$27.33",
        total: "$567.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-10 08:20" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-10 08:25" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-11 09:00" },
            { id: 4, action: "Delivered", description: "Order was delivered", time: "2024-02-14 16:00" },
        ]
    },
    "ORD-1019": {
        id: "ORD-1019",
        customer: sampleCustomers["Floyd Lewis"],
        status: "shipped",
        createdAt: "2024-02-10 08:00",
        updatedAt: "2024-02-12 10:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "321 Oak Street, Dallas, TX 75201",
        trackingNumber: "TRK-111222333",
        items: [
            { id: 1, name: "Laptop Pro 15\"", sku: "LP-001", price: "$12,000.00", quantity: 1, total: "$12,000.00" },
            { id: 2, name: "USB Hub", sku: "UH-001", price: "$79.00", quantity: 2, total: "$158.00" },
            { id: 3, name: "Wireless Mouse", sku: "WM-003", price: "$187.00", quantity: 1, total: "$187.00" },
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
        customer: sampleCustomers["Jacob Jones"],
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
            { id: 1, name: "Custom Gaming PC", sku: "GP-001", price: "$89,000.00", quantity: 1, total: "$89,000.00" },
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
        customer: sampleCustomers["Ralph Edwards"],
        status: "pending",
        createdAt: "2024-02-10 17:30",
        updatedAt: "2024-02-10 17:30",
        paymentMethod: "Debit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "789 Maple Road, Denver, CO 80201",
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
        customer: sampleCustomers["Cameron Williamson"],
        status: "processing",
        createdAt: "2024-02-09 14:20",
        updatedAt: "2024-02-10 09:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "147 Cedar Lane, Atlanta, GA 30301",
        items: [
            { id: 1, name: "iMac 27\"", sku: "IM-001", price: "$1,200.00", quantity: 1, total: "$1,200.00" },
            { id: 2, name: "Wireless Keyboard", sku: "WK-001", price: "$149.00", quantity: 1, total: "$149.00" },
            { id: 3, name: "Wireless Mouse", sku: "WM-002", price: "$79.00", quantity: 1, total: "$79.00" },
            { id: 4, name: "USB Hub", sku: "UH-003", price: "$39.00", quantity: 1, total: "$39.00" },
            { id: 5, name: "Webcam HD", sku: "WC-002", price: "$89.00", quantity: 1, total: "$89.00" },
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
        customer: sampleCustomers["Michael Brown"],
        status: "shipped",
        createdAt: "2024-02-09 14:10",
        updatedAt: "2024-02-11 10:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "147 Elm Avenue, Boston, MA 02101",
        trackingNumber: "TRK-555666777",
        items: [
            { id: 1, name: "iPhone 15", sku: "IP-015", price: "$799.00", quantity: 1, total: "$799.00" },
            { id: 2, name: "Phone Case", sku: "PC-015", price: "$35.00", quantity: 1, total: "$35.00" },
            { id: 3, name: "Screen Protector", sku: "SP-015", price: "$19.00", quantity: 1, total: "$19.00" },
            { id: 4, name: "Charging Cable", sku: "CC-015", price: "$37.00", quantity: 1, total: "$37.00" },
        ],
        subtotal: "$890.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$890.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-09 14:10" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-09 14:15" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-11 10:00" },
        ]
    },
    "ORD-1014": {
        id: "ORD-1014",
        customer: sampleCustomers["Sarah Johnson"],
        status: "shipped",
        createdAt: "2024-02-09 12:00",
        updatedAt: "2024-02-11 09:00",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "987 Birch Street, Seattle, WA 98101",
        trackingNumber: "TRK-888999000",
        items: [
            { id: 1, name: "Tablet 10\"", sku: "TB-001", price: "$399.99", quantity: 1, total: "$399.99" },
            { id: 2, name: "Stylus Pen", sku: "SP-005", price: "$29.99", quantity: 1, total: "$29.99" },
            { id: 3, name: "Screen Protector", sku: "SP-006", price: "$15.99", quantity: 2, total: "$31.98" },
            { id: 4, name: "Phone Holder", sku: "PH-001", price: "$19.99", quantity: 1, total: "$19.99" },
            { id: 5, name: "Power Bank", sku: "PB-001", price: "$49.99", quantity: 1, total: "$49.99" },
            { id: 6, name: "USB-C Cable", sku: "USB-002", price: "$19.90", quantity: 3, total: "$59.70" },
            { id: 7, name: "Bluetooth Speaker", sku: "BS-001", price: "$89.99", quantity: 1, total: "$89.99" },
        ],
        subtotal: "$701.62",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$701.62",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-09 12:00" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-09 12:05" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-11 09:00" },
        ]
    },
    "ORD-1013": {
        id: "ORD-1013",
        customer: sampleCustomers["Darlene Robertson"],
        status: "pending",
        createdAt: "2024-02-08 16:45",
        updatedAt: "2024-02-08 16:45",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "741 Elm Avenue, Nashville, TN 37201",
        items: [
            { id: 1, name: "AirPods Pro", sku: "AP-001", price: "$249.00", quantity: 1, total: "$249.00" },
            { id: 2, name: "Phone Case", sku: "PC-003", price: "$318.00", quantity: 1, total: "$318.00" },
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
    "ORD-1012": {
        id: "ORD-1012",
        customer: sampleCustomers["Courtney Henry"],
        status: "delivered",
        createdAt: "2024-02-08 16:45",
        updatedAt: "2024-02-12 11:00",
        paymentMethod: "Apple Pay",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "852 Maple Road, Las Vegas, NV 89101",
        trackingNumber: "TRK-222333444",
        items: [
            { id: 1, name: "Monitor 27\"", sku: "MN-001", price: "$349.99", quantity: 2, total: "$699.98" },
            { id: 2, name: "Desk Lamp", sku: "DL-001", price: "$45.00", quantity: 1, total: "$45.00" },
            { id: 3, name: "Bluetooth Speaker", sku: "BS-001", price: "$44.02", quantity: 1, total: "$44.02" },
        ],
        subtotal: "$789.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$789.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-08 16:45" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-08 16:50" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-10 09:00" },
            { id: 4, action: "Delivered", description: "Order was delivered", time: "2024-02-12 11:00" },
        ]
    },
    "ORD-1011": {
        id: "ORD-1011",
        customer: sampleCustomers["Theresa Webb"],
        status: "delivered",
        createdAt: "2024-02-08 14:20",
        updatedAt: "2024-02-11 16:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "369 Birch Street, Minneapolis, MN 55401",
        trackingNumber: "TRK-333444555",
        items: [
            { id: 1, name: "Webcam HD", sku: "WC-001", price: "$79.99", quantity: 1, total: "$79.99" },
            { id: 2, name: "USB Hub", sku: "UH-001", price: "$76.01", quantity: 1, total: "$76.01" },
        ],
        subtotal: "$156.00",
        shipping: "$0.00",
        tax: "$0.00",
        total: "$156.00",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-08 14:20" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-08 14:25" },
            { id: 3, action: "Shipped", description: "Order has been shipped", time: "2024-02-09 10:00" },
            { id: 4, action: "Delivered", description: "Order was delivered", time: "2024-02-11 16:00" },
        ]
    },
    "ORD-1010": {
        id: "ORD-1010",
        customer: sampleCustomers["Jenny Wilson"],
        status: "processing",
        createdAt: "2024-02-08 15:00",
        updatedAt: "2024-02-09 10:00",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        shippingMethod: "Standard Shipping",
        shippingAddress: "321 Maple Drive, Houston, TX 77001",
        items: [
            { id: 1, name: "Wireless Headphones", sku: "WH-001", price: "$99.00", quantity: 1, total: "$99.00" },
            { id: 2, name: "USB-C Cable", sku: "USB-002", price: "$19.90", quantity: 2, total: "$39.80" },
            { id: 3, name: "Phone Case", sku: "PC-003", price: "$24.50", quantity: 1, total: "$24.50" },
            { id: 4, name: "Power Bank", sku: "PB-001", price: "$71.20", quantity: 1, total: "$71.20" },
        ],
        subtotal: "$234.50",
        shipping: "$5.00",
        tax: "$18.76",
        total: "$258.26",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-08 15:00" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-08 15:05" },
            { id: 3, action: "Processing", description: "Order is being processed", time: "2024-02-09 10:00" },
        ]
    },
    "ORD-1009": {
        id: "ORD-1009",
        customer: sampleCustomers["Robert Chen"],
        status: "processing",
        createdAt: "2024-02-08 12:30",
        updatedAt: "2024-02-09 14:00",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        shippingMethod: "Express Shipping",
        shippingAddress: "654 Cedar Lane, San Francisco, CA 94101",
        items: [
            { id: 1, name: "Smart Watch", sku: "SW-001", price: "$199.99", quantity: 1, total: "$199.99" },
            { id: 2, name: "Wireless Headphones", sku: "WH-001", price: "$99.00", quantity: 1, total: "$99.00" },
            { id: 3, name: "Phone Case", sku: "PC-003", price: "$24.50", quantity: 2, total: "$49.00" },
            { id: 4, name: "Screen Protector", sku: "SP-004", price: "$12.90", quantity: 2, total: "$25.80" },
            { id: 5, name: "Charging Adapter", sku: "CA-005", price: "$46.90", quantity: 1, total: "$46.90" },
            { id: 6, name: "USB-C Cable", sku: "USB-002", price: "$19.90", quantity: 3, total: "$59.70" },
            { id: 7, name: "Power Bank", sku: "PB-001", price: "$86.82", quantity: 1, total: "$86.82" },
        ],
        subtotal: "$567.21",
        shipping: "$0.00",
        tax: "$45.38",
        total: "$612.59",
        timeline: [
            { id: 1, action: "Order placed", description: "Order was placed by customer", time: "2024-02-08 12:30" },
            { id: 2, action: "Payment confirmed", description: "Payment was confirmed", time: "2024-02-08 12:35" },
            { id: 3, action: "Processing", description: "Order is being processed", time: "2024-02-09 14:00" },
        ]
    },
}

// Helper function to get orders by status
export function getOrdersByStatus(status: string): OrderData[] {
    if (status === "all") {
        return mockOrders
    }
    return mockOrders.filter(order => order.status === status)
}

// Helper function to get order detail by ID
export function getOrderDetail(orderId: string): OrderDetailData | undefined {
    return mockOrderDetails[orderId]
}

// Status colors mapping
export const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    shipped: "bg-blue-100 text-blue-800 border-blue-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    processing: "bg-purple-100 text-purple-800 border-purple-300"
}

export const statusBadgeColors: Record<string, string> = {
    pending: "border-yellow-500 text-yellow-700",
    shipped: "border-blue-500 text-blue-700",
    delivered: "border-green-500 text-green-700",
    processing: "border-purple-500 text-purple-700"
}
