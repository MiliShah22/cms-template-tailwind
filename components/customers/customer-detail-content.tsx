"use client"

import { getCustomerById, Customer } from "@/lib/customers"
import { getOrdersByCustomerEmail, Order } from "@/lib/orders"
import { OrderTable, OrderData } from "@/components/shared/order-table"
import Link from "next/link"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, User } from "lucide-react"

interface CustomerDetailContentProps {
    customerId: string
}

export function CustomerDetailContent({ customerId }: CustomerDetailContentProps) {
    const customer: Customer | undefined = getCustomerById(customerId)

    if (!customer) {
        return <div className="p-4">Customer not found</div>
    }

    const orders: Order[] = getOrdersByCustomerEmail(customer.email)
    const orderList: OrderData[] = orders.map((o: Order) => ({
        id: o.id,
        customer: o.customer.name,
        total: o.total,
        items: o.items.length,
        createdAt: o.createdAt,
        status: o.status,
    }))

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/customers/all">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">{customer.name}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Customer Info</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{customer.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{customer.phone}</span>
                        </div>
                        <div>Segment: {customer.segment}</div>
                        <div className="sm:col-span-2">Address: {customer.address}</div>
                    </div>
                </CardContent>
            </Card>

            <OrderTable
                title="Orders"
                description="Orders placed by this customer."
                orders={orderList}
            />
        </div>
    )
}
