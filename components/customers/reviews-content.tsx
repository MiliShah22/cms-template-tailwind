"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Search,
    MessageSquare,
    Filter,
    Star,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
    ThumbsUp,
    ThumbsDown,
    MoreHorizontal,
    Eye,
    Reply
} from "lucide-react"

const allReviews = [
    {
        id: "REV-2041",
        customerName: "Jane Cooper",
        customerEmail: "jane.cooper@example.com",
        product: "Premium Wireless Headphones",
        rating: 5,
        comment: "Absolutely love these headphones! The sound quality is exceptional and they're so comfortable to wear for hours.",
        date: "2024-02-10",
        status: "approved",
        helpful: 24,
    },
    {
        id: "REV-1988",
        customerName: "Cody Fisher",
        customerEmail: "cody.fisher@example.com",
        product: "Smart Watch Pro",
        rating: 4,
        comment: "Great smartwatch with many features. Battery life could be better though.",
        date: "2024-02-09",
        status: "approved",
        helpful: 12,
    },
    {
        id: "REV-1905",
        customerName: "Kristin Watson",
        customerEmail: "kristin.watson@example.com",
        product: "Bluetooth Speaker",
        rating: 2,
        comment: "The speaker started malfunctioning after just 2 weeks. Not happy with this purchase.",
        date: "2024-02-08",
        status: "pending",
        helpful: 3,
    },
    {
        id: "REV-1850",
        customerName: "Devon Lane",
        customerEmail: "devon.lane@example.com",
        product: "Laptop Stand",
        rating: 5,
        comment: "Perfect addition to my workspace. Very sturdy and adjustable.",
        date: "2024-02-08",
        status: "approved",
        helpful: 18,
    },
    {
        id: "REV-1823",
        customerName: "Ralph Edwards",
        customerEmail: "ralph.edwards@example.com",
        product: "USB-C Hub",
        rating: 3,
        comment: "Works as expected but the build quality feels a bit cheap.",
        date: "2024-02-07",
        status: "approved",
        helpful: 7,
    },
    {
        id: "REV-1790",
        customerName: "Cameron Williamson",
        customerEmail: "cameron.williamson@example.com",
        product: "Wireless Mouse",
        rating: 1,
        comment: "Received a defective product. The mouse doesn't work at all.",
        date: "2024-02-06",
        status: "rejected",
        helpful: 0,
    },
    {
        id: "REV-1756",
        customerName: "Theresa Webb",
        customerEmail: "theresa.webb@example.com",
        product: "Mechanical Keyboard",
        rating: 5,
        comment: "Best keyboard I've ever owned! The tactile feedback is amazing.",
        date: "2024-02-05",
        status: "approved",
        helpful: 31,
    },
    {
        id: "REV-1701",
        customerName: "Floyd Lewis",
        customerEmail: "floyd.lewis@example.com",
        product: "Webcam HD",
        rating: 4,
        comment: "Good quality webcam for video calls. Easy setup.",
        date: "2024-02-04",
        status: "approved",
        helpful: 9,
    },
]

export function ReviewsContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <MessageSquare className="h-4 w-4" />
                        CRM
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage and respond to customer reviews across your store.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                    <Button size="sm" className="gap-2">
                        Export Reviews
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="mt-1 text-xs text-gray-500">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-1">
                            4.2
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">+0.3 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                        <Badge variant="secondary">Needs Action</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="mt-1 text-xs text-gray-500">Awaiting moderation</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                        <Badge variant="secondary">Live</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="mt-1 text-xs text-gray-500">+5% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Rating Distribution */}
            <div className="grid gap-4 md:grid-cols-6">
                {[5, 4, 3, 2, 1].map((stars) => {
                    const count = allReviews.filter(r => r.rating === stars).length
                    const percentage = (count / allReviews.length) * 100
                    return (
                        <Card key={stars}>
                            <CardHeader className="space-y-1 pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-1">
                                    {stars} <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-semibold">{count}</div>
                                <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-2 rounded-full bg-amber-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">{percentage.toFixed(0)}%</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Filters & Tabs */}
            <Card>
                <CardContent className="space-y-4 pt-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-1 items-center gap-2">
                            <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                                <Search className="h-3 w-3" />
                                Search
                            </div>
                            <Input
                                placeholder="Search reviews..."
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
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue placeholder="Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All ratings</SelectItem>
                                    <SelectItem value="5">5 stars</SelectItem>
                                    <SelectItem value="4">4 stars</SelectItem>
                                    <SelectItem value="3">3 stars</SelectItem>
                                    <SelectItem value="2">2 stars</SelectItem>
                                    <SelectItem value="1">1 star</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="newest">
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest first</SelectItem>
                                    <SelectItem value="oldest">Oldest first</SelectItem>
                                    <SelectItem value="highest">Highest rating</SelectItem>
                                    <SelectItem value="lowest">Lowest rating</SelectItem>
                                    <SelectItem value="helpful">Most helpful</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                            <TabsTrigger value="all">All Reviews</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="approved">Approved</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="pt-4">
                            <ReviewsTable />
                        </TabsContent>
                        <TabsContent value="pending" className="pt-4">
                            <ReviewsTable filterStatus="pending" />
                        </TabsContent>
                        <TabsContent value="approved" className="pt-4">
                            <ReviewsTable filterStatus="approved" />
                        </TabsContent>
                        <TabsContent value="rejected" className="pt-4">
                            <ReviewsTable filterStatus="rejected" />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

interface ReviewsTableProps {
    filterStatus?: string
}

function ReviewsTable({ filterStatus }: ReviewsTableProps) {
    const rows = filterStatus
        ? allReviews.filter((r) => r.status === filterStatus)
        : allReviews

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[180px]">Customer</TableHead>
                        <TableHead className="w-[200px]">Product</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="hidden md:table-cell">Review</TableHead>
                        <TableHead className="hidden sm:table-cell text-center">Helpful</TableHead>
                        <TableHead className="hidden lg:table-cell">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span>{review.customerName}</span>
                                    </div>
                                    <span className="mt-0.5 text-[11px] text-gray-500">{review.id}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                                {review.product}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                    <span className="ml-1 text-sm font-medium">{review.rating}</span>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-sm text-gray-600 max-w-[200px]">
                                <p className="truncate">{review.comment}</p>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-center">
                                <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                                    <ThumbsUp className="h-3 w-3" />
                                    {review.helpful}
                                </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-sm text-gray-500">
                                {review.date}
                            </TableCell>
                            <TableCell>
                                {review.status === "approved" && (
                                    <Badge className="bg-green-100 text-green-800 text-[10px]">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Approved
                                    </Badge>
                                )}
                                {review.status === "pending" && (
                                    <Badge className="bg-yellow-100 text-yellow-800 text-[10px]">
                                        <Clock className="h-3 w-3 mr-1" />
                                        Pending
                                    </Badge>
                                )}
                                {review.status === "rejected" && (
                                    <Badge variant="secondary" className="text-[10px]">
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Rejected
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Reply className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
