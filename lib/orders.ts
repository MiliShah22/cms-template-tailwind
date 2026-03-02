import raw from "../data/orders.json"

// Re-use types from pdf-generator for consistency
import { Order as PdfOrder } from "./pdf-generator"

// The JSON array should match PdfOrder shape exactly
export type Order = PdfOrder

const orders: Order[] = raw as Order[]

export function getOrders(): Order[] {
    return orders
}

export function getOrderById(id: string): Order | undefined {
    return orders.find((o) => o.id === id)
}

export function getOrdersByCustomerEmail(email: string): Order[] {
    return orders.filter((o) => o.customer.email === email)
}

export function getStatuses(): string[] {
    return Array.from(new Set(orders.map((o) => o.status)))
}
