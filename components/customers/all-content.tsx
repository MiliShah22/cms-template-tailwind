"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users2, Filter, UserPlus, Mail, Star, TrendingUp, DollarSign, Clock } from "lucide-react"

const allCustomers = [
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
    },
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
    },
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
    },
    {
        id: "CUS-1823",
        name: "Ralph Edwards",
        email: "ralph.edwards@example.com",
        segment: "Regular",
        orders: 18,
        spent: "$1,250",
        status: "active",
        lastOrder: "2024-02-07",
        phone: "+1 (555) 567-8901",
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
    },
    {
        id: "CUS-1756",
        name: "Theresa Webb",
        email: "theresa.webb@example.com",
        segment: "Regular",
        orders: 8,
        spent: "$640",
        status: "active",
        lastOrder: "2024-02-05",
        phone: "+1 (555) 789-0123",
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
    },
]

export function AllCustomersContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Users2 className="h-4 w-4" />
                        CRM
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">All Customers</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        View, segment and manage all customers in your CMS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Segments
                    </Button>
                    <Button size="sm" className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Add customer
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total customers</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="mt-1 text-xs text-gray-500">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active this month</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">342</div>
                        <p className="mt-1 text-xs text-gray-500">Logged in or placed an order</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$48,920</div>
                        <p className="mt-1 text-xs text-gray-500">+12% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Advanced Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            New this month
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">48</div>
                        <p className="mt-1 text-xs text-gray-500">+24% vs last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-500" />
                            VIP customers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">27</div>
                        <p className="mt-1 text-xs text-gray-500">High LTV & engagement</p>
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
                        <div className="text-2xl font-semibold">$1,240</div>
                        <p className="mt-1 text-xs text-gray-500">Lifetime value</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-500" />
                            Inactive
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">156</div>
                        <p className="mt-1 text-xs text-gray-500">No activity 30+ days</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & tabs */}
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
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="h-9 w-[160px] text-xs">
                                    <SelectValue placeholder="Segment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All segments</SelectItem>
                                    <SelectItem value="vip">VIP</SelectItem>
                                    <SelectItem value="regular">Regular</SelectItem>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="newest">
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest first</SelectItem>
                                    <SelectItem value="oldest">Oldest first</SelectItem>
                                    <SelectItem value="spending">Highest spending</SelectItem>
                                    <SelectItem value="orders">Most orders</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                            <TabsTrigger value="all">All customers</TabsTrigger>
                            <TabsTrigger value="vip">VIP</TabsTrigger>
                            <TabsTrigger value="new">New</TabsTrigger>
                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="pt-4">
                            <CustomersTable />
                        </TabsContent>
                        <TabsContent value="vip" className="pt-4">
                            <CustomersTable filterSegment="VIP" />
                        </TabsContent>
                        <TabsContent value="new" className="pt-4">
                            <CustomersTable filterSegment="New" />
                        </TabsContent>
                        <TabsContent value="inactive" className="pt-4">
                            <CustomersTable filterSegment="Inactive" />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

interface CustomersTableProps {
    filterSegment?: string
}

function CustomersTable({ filterSegment }: CustomersTableProps) {
    const rows = filterSegment
        ? allCustomers.filter((c) => c.segment === filterSegment)
        : allCustomers

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Segment</TableHead>
                        <TableHead className="hidden sm:table-cell text-right">Orders</TableHead>
                        <TableHead className="text-right">Total spent</TableHead>
                        <TableHead className="hidden lg:table-cell text-right">Last order</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span>{customer.name}</span>
                                        {customer.segment === "VIP" && (
                                            <Badge variant="outline" className="flex items-center gap-1 text-[10px] uppercase">
                                                <Star className="h-3 w-3 text-amber-500" />
                                                VIP
                                            </Badge>
                                        )}
                                        {customer.status === "active" && (
                                            <Badge className="bg-green-100 text-green-800 text-[10px]">Active</Badge>
                                        )}
                                        {customer.status === "inactive" && (
                                            <Badge variant="secondary" className="text-[10px]">Inactive</Badge>
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
                                <span className="text-sm text-gray-700 dark:text-gray-200">{customer.segment}</span>
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
