"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Users2, Filter, UserPlus, Mail, Star, TrendingUp, DollarSign, Crown, Gift, MessageCircle } from "lucide-react"

const vipCustomers = [
    {
        id: "CUS-2041",
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        segment: "VIP",
        orders: 42,
        spent: "$4,920",
        status: "active",
        lastOrder: "2024-02-10",
        phone: "+1 (555) 123-4567",
        tier: "Platinum",
        joinedDate: "2022-03-15",
    },
    {
        id: "CUS-1850",
        name: "Devon Lane",
        email: "devon.lane@example.com",
        segment: "VIP",
        orders: 31,
        spent: "$3,430",
        status: "active",
        lastOrder: "2024-02-08",
        phone: "+1 (555) 456-7890",
        tier: "Gold",
        joinedDate: "2022-06-20",
    },
    {
        id: "CUS-1701",
        name: "Floyd Lewis",
        email: "floyd.lewis@example.com",
        segment: "VIP",
        orders: 56,
        spent: "$12,345",
        status: "active",
        lastOrder: "2024-02-09",
        phone: "+1 (555) 890-1234",
        tier: "Platinum",
        joinedDate: "2021-11-08",
    },
    {
        id: "CUS-1650",
        name: "Emily Richardson",
        email: "emily.richardson@example.com",
        segment: "VIP",
        orders: 38,
        spent: "$8,920",
        status: "active",
        lastOrder: "2024-02-07",
        phone: "+1 (555) 234-5678",
        tier: "Gold",
        joinedDate: "2022-01-12",
    },
    {
        id: "CUS-1590",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        segment: "VIP",
        orders: 29,
        spent: "$5,670",
        status: "active",
        lastOrder: "2024-02-06",
        phone: "+1 (555) 345-6789",
        tier: "Gold",
        joinedDate: "2022-08-25",
    },
    {
        id: "CUS-1520",
        name: "Sarah Williams",
        email: "sarah.williams@example.com",
        segment: "VIP",
        orders: 45,
        spent: "$9,800",
        status: "active",
        lastOrder: "2024-02-05",
        phone: "+1 (555) 456-7890",
        tier: "Platinum",
        joinedDate: "2021-09-14",
    },
]

export function VIPCustomersContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-amber-600">
                        <Crown className="h-4 w-4" />
                        CRM
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">VIP Customers</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your high-value customers with premium benefits.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Gift className="h-4 w-4" />
                        Send Rewards
                    </Button>
                    <Button size="sm" className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Add to VIP
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">27</div>
                        <p className="mt-1 text-xs text-gray-500">High value customers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">VIP Revenue</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$32,450</div>
                        <p className="mt-1 text-xs text-gray-500">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            Avg. LTV
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">$3,840</div>
                        <p className="mt-1 text-xs text-gray-500">Lifetime value</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-blue-500" />
                            Avg. Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">38</div>
                        <p className="mt-1 text-xs text-gray-500">Per VIP customer</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tier Breakdown */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Crown className="h-4 w-4 text-amber-500" />
                            Platinum Tier
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">8 customers</div>
                        <p className="mt-1 text-xs text-gray-500">$18,500 total revenue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Gold Tier
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">19 customers</div>
                        <p className="mt-1 text-xs text-gray-500">$13,950 total revenue</p>
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
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue placeholder="Tier" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All tiers</SelectItem>
                                    <SelectItem value="platinum">Platinum</SelectItem>
                                    <SelectItem value="gold">Gold</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="spending">
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="spending">Highest spending</SelectItem>
                                    <SelectItem value="orders">Most orders</SelectItem>
                                    <SelectItem value="newest">Newest first</SelectItem>
                                    <SelectItem value="recent">Recent order</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <VIPCustomersTable />
                </CardContent>
            </Card>
        </div>
    )
}

function VIPCustomersTable() {
    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Tier</TableHead>
                        <TableHead className="hidden sm:table-cell text-right">Orders</TableHead>
                        <TableHead className="text-right">Total spent</TableHead>
                        <TableHead className="hidden lg:table-cell text-right">Last order</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vipCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span>{customer.name}</span>
                                        <Badge variant="outline" className="flex items-center gap-1 text-[10px] uppercase">
                                            <Crown className="h-3 w-3 text-amber-500" />
                                            VIP
                                        </Badge>
                                        {customer.tier === "Platinum" && (
                                            <Badge className="bg-gradient-to-r from-slate-900 to-slate-700 text-[10px]">Platinum</Badge>
                                        )}
                                        {customer.tier === "Gold" && (
                                            <Badge className="bg-amber-100 text-amber-800 text-[10px]">Gold</Badge>
                                        )}
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
                                <span className="text-sm text-gray-700 dark:text-gray-200">{customer.tier}</span>
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
