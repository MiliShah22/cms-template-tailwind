"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Users2, Filter, UserPlus, Mail, Star, TrendingUp, DollarSign, Sparkles, Calendar, UserCheck } from "lucide-react"

const newCustomers = [
    {
        id: "CUS-1988",
        name: "Cody Fisher",
        email: "cody.fisher@example.com",
        segment: "New",
        orders: 3,
        spent: "$210",
        status: "active",
        lastOrder: "2024-02-09",
        phone: "+1 (555) 234-5678",
        joinedDate: "2024-02-01",
        source: "Organic",
    },
    {
        id: "CUS-1790",
        name: "Cameron Williamson",
        email: "cameron.williamson@example.com",
        segment: "New",
        orders: 2,
        spent: "$89",
        status: "active",
        lastOrder: "2024-02-10",
        phone: "+1 (555) 678-9012",
        joinedDate: "2024-02-03",
        source: "Referral",
    },
    {
        id: "CUS-2100",
        name: "Jessica Martinez",
        email: "jessica.martinez@example.com",
        segment: "New",
        orders: 1,
        spent: "$45",
        status: "active",
        lastOrder: "2024-02-08",
        phone: "+1 (555) 123-4567",
        joinedDate: "2024-02-05",
        source: "Social Media",
    },
    {
        id: "CUS-2095",
        name: "Marcus Johnson",
        email: "marcus.johnson@example.com",
        segment: "New",
        orders: 1,
        spent: "$120",
        status: "active",
        lastOrder: "2024-02-07",
        phone: "+1 (555) 234-5678",
        joinedDate: "2024-02-06",
        source: "Email Campaign",
    },
    {
        id: "CUS-2090",
        name: "Ashley Thompson",
        email: "ashley.thompson@example.com",
        segment: "New",
        orders: 2,
        spent: "$78",
        status: "active",
        lastOrder: "2024-02-09",
        phone: "+1 (555) 345-6789",
        joinedDate: "2024-02-07",
        source: "Paid Ads",
    },
    {
        id: "CUS-2085",
        name: "David Brown",
        email: "david.brown@example.com",
        segment: "New",
        orders: 1,
        spent: "$55",
        status: "active",
        lastOrder: "2024-02-06",
        phone: "+1 (555) 456-7890",
        joinedDate: "2024-02-08",
        source: "Organic",
    },
    {
        id: "CUS-2080",
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        segment: "New",
        orders: 1,
        spent: "$32",
        status: "active",
        lastOrder: "2024-02-05",
        phone: "+1 (555) 567-8901",
        joinedDate: "2024-02-09",
        source: "Referral",
    },
    {
        id: "CUS-2075",
        name: "Ryan Davis",
        email: "ryan.davis@example.com",
        segment: "New",
        orders: 1,
        spent: "$89",
        status: "pending",
        lastOrder: "2024-02-04",
        phone: "+1 (555) 678-9012",
        joinedDate: "2024-02-10",
        source: "Social Media",
    },
]

export function NewCustomersContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                        <Sparkles className="h-4 w-4" />
                        CRM
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">New Customers</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track and manage newly acquired customers.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <UserCheck className="h-4 w-4" />
                        Welcome Series
                    </Button>
                    <Button size="sm" className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Add Customer
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48</div>
                        <p className="mt-1 text-xs text-gray-500">+24% vs last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.4%</div>
                        <p className="mt-1 text-xs text-gray-500">+3.2% improvement</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            Avg. First Order
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">$85</div>
                        <p className="mt-1 text-xs text-gray-500">First purchase value</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-blue-500" />
                            Retention Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">68%</div>
                        <p className="mt-1 text-xs text-gray-500">Returning within 30 days</p>
                    </CardContent>
                </Card>
            </div>

            {/* Acquisition Sources */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            Organic
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">18</div>
                        <p className="mt-1 text-xs text-gray-500">38% of new customers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Star className="h-4 w-4 text-blue-500" />
                            Referral
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">12</div>
                        <p className="mt-1 text-xs text-gray-500">25% of new customers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                            Social Media
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">10</div>
                        <p className="mt-1 text-xs text-gray-500">21% of new customers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-amber-500" />
                            Paid Ads
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">8</div>
                        <p className="mt-1 text-xs text-gray-500">16% of new customers</p>
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
                                    <SelectValue placeholder="Source" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All sources</SelectItem>
                                    <SelectItem value="organic">Organic</SelectItem>
                                    <SelectItem value="referral">Referral</SelectItem>
                                    <SelectItem value="social">Social Media</SelectItem>
                                    <SelectItem value="paid">Paid Ads</SelectItem>
                                    <SelectItem value="email">Email Campaign</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="newest">
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest first</SelectItem>
                                    <SelectItem value="spending">Highest spending</SelectItem>
                                    <SelectItem value="orders">Most orders</SelectItem>
                                    <SelectItem value="recent">Recent order</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <NewCustomersTable />
                </CardContent>
            </Card>
        </div>
    )
}

function NewCustomersTable() {
    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Source</TableHead>
                        <TableHead className="hidden sm:table-cell text-right">Orders</TableHead>
                        <TableHead className="text-right">Total spent</TableHead>
                        <TableHead className="hidden lg:table-cell text-right">Joined</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {newCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span>{customer.name}</span>
                                        <Badge variant="outline" className="flex items-center gap-1 text-[10px] uppercase">
                                            <Sparkles className="h-3 w-3 text-blue-500" />
                                            New
                                        </Badge>
                                        {customer.status === "active" && (
                                            <Badge className="bg-green-100 text-green-800 text-[10px]">Active</Badge>
                                        )}
                                        {customer.status === "pending" && (
                                            <Badge className="bg-amber-100 text-amber-800 text-[10px]">Pending</Badge>
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
                                <span className="text-sm text-gray-700 dark:text-gray-200">{customer.source}</span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">
                                {customer.orders}
                            </TableCell>
                            <TableCell className="text-right font-medium">{customer.spent}</TableCell>
                            <TableCell className="hidden lg:table-cell text-right text-sm text-gray-500">
                                {customer.joinedDate}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
