"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Users2, Filter, UserPlus, Mail, Star, TrendingDown, DollarSign, Clock, RefreshCw, MailWarning } from "lucide-react"

const inactiveCustomers = [
    {
        id: "CUS-1905",
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        segment: "Inactive",
        orders: 12,
        spent: "$980",
        status: "inactive",
        lastOrder: "2024-01-15",
        phone: "+1 (555) 345-6789",
        daysInactive: 28,
        reason: "No recent activity",
    },
    {
        id: "CUS-1756",
        name: "Theresa Webb",
        email: "theresa.webb@example.com",
        segment: "Inactive",
        orders: 8,
        spent: "$640",
        status: "inactive",
        lastOrder: "2024-01-10",
        phone: "+1 (555) 789-0123",
        daysInactive: 33,
        reason: "Unsubscribed",
    },
    {
        id: "CUS-1680",
        name: "Albert Foster",
        email: "albert.foster@example.com",
        segment: "Inactive",
        orders: 5,
        spent: "$320",
        status: "inactive",
        lastOrder: "2023-12-28",
        phone: "+1 (555) 234-5678",
        daysInactive: 45,
        reason: "No recent activity",
    },
    {
        id: "CUS-1620",
        name: "Julia Howard",
        email: "julia.howard@example.com",
        segment: "Inactive",
        orders: 15,
        spent: "$1,850",
        status: "inactive",
        lastOrder: "2024-01-08",
        phone: "+1 (555) 345-6789",
        daysInactive: 35,
        reason: "Churned",
    },
    {
        id: "CUS-1550",
        name: "Tyler Murray",
        email: "tyler.murray@example.com",
        segment: "Inactive",
        orders: 7,
        spent: "$445",
        status: "inactive",
        lastOrder: "2023-12-20",
        phone: "+1 (555) 456-7890",
        daysInactive: 53,
        reason: "No recent activity",
    },
    {
        id: "CUS-1480",
        name: "Hannah Reed",
        email: "hannah.reed@example.com",
        segment: "Inactive",
        orders: 9,
        spent: "$720",
        status: "inactive",
        lastOrder: "2024-01-05",
        phone: "+1 (555) 567-8901",
        daysInactive: 38,
        reason: "Unsubscribed",
    },
    {
        id: "CUS-1410",
        name: "Brandon Kelly",
        email: "brandon.kelly@example.com",
        segment: "Inactive",
        orders: 4,
        spent: "$180",
        status: "inactive",
        lastOrder: "2023-12-15",
        phone: "+1 (555) 678-9012",
        daysInactive: 58,
        reason: "No recent activity",
    },
    {
        id: "CUS-1340",
        name: "Megan Stewart",
        email: "megan.stewart@example.com",
        segment: "Inactive",
        orders: 11,
        spent: "$1,120",
        status: "inactive",
        lastOrder: "2024-01-02",
        phone: "+1 (555) 789-0123",
        daysInactive: 41,
        reason: "Churned",
    },
]

export function InactiveCustomersContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Clock className="h-4 w-4" />
                        CRM
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Inactive Customers</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Re-engage customers who haven't been active recently.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <MailWarning className="h-4 w-4" />
                        Re-engage
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Win-back Campaign
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Customers</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                        <p className="mt-1 text-xs text-gray-500">No activity 30+ days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">At Risk Revenue</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,840</div>
                        <p className="mt-1 text-xs text-gray-500">Potential lost revenue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-red-500" />
                            Win-back Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">8.2%</div>
                        <p className="mt-1 text-xs text-gray-500">Successfully re-engaged</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            Avg. Recovery
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">$145</div>
                        <p className="mt-1 text-xs text-gray-500">Per re-engaged customer</p>
                    </CardContent>
                </Card>
            </div>

            {/* Inactivity Breakdown */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-500" />
                            30-60 Days Inactive
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">82 customers</div>
                        <p className="mt-1 text-xs text-gray-500">High recovery potential</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            60-90 Days Inactive
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">48 customers</div>
                        <p className="mt-1 text-xs text-gray-500">Medium recovery potential</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-red-500" />
                            90+ Days Inactive
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">26 customers</div>
                        <p className="mt-1 text-xs text-gray-500">Low recovery potential</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Table */}
            <Card>
                <CardContent className="space-y-4 pt-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-1 items-center gap-2">
                            <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                                <Search className="h-3 w-3" />
                                Search
                            </div>
                            <Input
                                placeholder="Search by name, email or ID..."
                                className="h-9 max-w-sm bg-transparent text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="h-9 w-[160px] text-xs">
                                    <SelectValue placeholder="Inactivity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All periods</SelectItem>
                                    <SelectItem value="30">30-60 days</SelectItem>
                                    <SelectItem value="60">60-90 days</SelectItem>
                                    <SelectItem value="90">90+ days</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="inactive">
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inactive">Most inactive</SelectItem>
                                    <SelectItem value="spending">Highest spending</SelectItem>
                                    <SelectItem value="orders">Most orders</SelectItem>
                                    <SelectItem value="recent">Recent order</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <InactiveCustomersTable />
                </CardContent>
            </Card>
        </div>
    )
}

function InactiveCustomersTable() {
    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Days Inactive</TableHead>
                        <TableHead className="hidden sm:table-cell text-right">Orders</TableHead>
                        <TableHead className="text-right">Total spent</TableHead>
                        <TableHead className="hidden lg:table-cell text-right">Last order</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inactiveCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span>{customer.name}</span>
                                        <Badge variant="outline" className="flex items-center gap-1 text-[10px] uppercase">
                                            <Clock className="h-3 w-3 text-gray-500" />
                                            Inactive
                                        </Badge>
                                    </div>
                                    <span className="mt-0.5 text-[11px] text-gray-500">{customer.id}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3 text-gray-400" />
                                    {customer.email}
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-sm text-gray-600">
                                {customer.phone}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <span className={`text-sm font-medium ${customer.daysInactive > 60 ? 'text-red-600' :
                                        customer.daysInactive > 30 ? 'text-amber-600' : 'text-gray-700'
                                    }`}>
                                    {customer.daysInactive} days
                                </span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">
                                {customer.orders}
                            </TableCell>
                            <TableCell className="text-right font-medium">{customer.spent}</TableCell>
                            <TableCell className="hidden lg:table-cell text-right text-sm text-gray-500">
                                {customer.lastOrder}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
