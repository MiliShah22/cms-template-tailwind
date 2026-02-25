"use client"

import { useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Users, UserCheck, Globe, MapPin, Download, FileText, Calendar, ArrowDown, ArrowUp, Star } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
            labels: { usePointStyle: true, padding: 16, font: { size: 11 } },
        },
        tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
        y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.06)" }, ticks: { font: { size: 10 } } },
        x: { grid: { color: "rgba(0,0,0,0.06)" }, ticks: { font: { size: 10 }, maxRotation: 45 } },
    },
    interaction: { mode: "nearest" as const, axis: "x" as const, intersect: false },
}

const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            label: "New Users",
            data: [120, 145, 132, 168, 152, 185, 198, 215, 204, 228, 218, 246],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
        },
        {
            label: "Returning Users",
            data: [580, 620, 658, 712, 748, 802, 824, 868, 902, 948, 982, 1024],
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
        },
    ],
}

const demographicsData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    datasets: [
        {
            label: "Users",
            data: [180, 420, 280, 150, 80, 40],
            backgroundColor: [
                "rgba(59, 130, 246, 0.85)",
                "rgba(16, 185, 129, 0.85)",
                "rgba(139, 92, 246, 0.85)",
                "rgba(245, 158, 11, 0.85)",
                "rgba(236, 72, 153, 0.85)",
                "rgba(107, 114, 128, 0.85)",
            ],
            borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(139, 92, 246)", "rgb(245, 158, 11)", "rgb(236, 72, 153)", "rgb(107, 114, 128)"],
            borderWidth: 1,
        },
    ],
}

const segmentData = {
    labels: ["New", "Returning", "VIP", "At Risk"],
    datasets: [
        {
            data: [38, 42, 15, 5],
            backgroundColor: ["rgba(59, 130, 246, 0.9)", "rgba(16, 185, 129, 0.9)", "rgba(245, 158, 11, 0.9)", "rgba(239, 68, 68, 0.9)"],
            borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(245, 158, 11)", "rgb(239, 68, 68)"],
            borderWidth: 2,
        },
    ],
}

const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: "bottom" as const, labels: { usePointStyle: true, padding: 12, font: { size: 11 } } },
        tooltip: { callbacks: { label: (ctx: { label: string; parsed: number }) => `${ctx.label}: ${ctx.parsed}%` } },
    },
}

const topCountries = [
    { country: "United States", code: "US", visitors: 45200, percentage: "32.4%", trend: "up" },
    { country: "United Kingdom", code: "GB", visitors: 18200, percentage: "13.0%", trend: "up" },
    { country: "Germany", code: "DE", visitors: 12400, percentage: "8.9%", trend: "stable" },
    { country: "Canada", code: "CA", visitors: 9800, percentage: "7.0%", trend: "down" },
    { country: "France", code: "FR", visitors: 8200, percentage: "5.9%", trend: "up" },
    { country: "Australia", code: "AU", visitors: 6400, percentage: "4.6%", trend: "up" },
    { country: "India", code: "IN", visitors: 5200, percentage: "3.7%", trend: "up" },
    { country: "Netherlands", code: "NL", visitors: 3800, percentage: "2.7%", trend: "stable" },
]

const userSegments = [
    { segment: "New Users", users: 52400, percentage: "38%", avgSession: "2m 15s", conversion: "2.1%" },
    { segment: "Returning Users", users: 57800, percentage: "42%", avgSession: "4m 32s", conversion: "4.8%" },
    { segment: "VIP Users", users: 20700, percentage: "15%", avgSession: "8m 45s", conversion: "12.4%" },
    { segment: "At Risk Users", users: 6900, percentage: "5%", avgSession: "1m 05s", conversion: "0.3%" },
]

const topUsers = [
    { name: "Jane Cooper", email: "jane.cooper@example.com", sessions: 142, lastActive: "2 min ago", segment: "VIP" },
    { name: "Cody Fisher", email: "cody.fisher@example.com", sessions: 98, lastActive: "15 min ago", segment: "Returning" },
    { name: "Kristin Watson", email: "kristin.watson@example.com", sessions: 87, lastActive: "1 hour ago", segment: "VIP" },
    { name: "Devon Lane", email: "devon.lane@example.com", sessions: 72, lastActive: "3 hours ago", segment: "Returning" },
    { name: "Sofia Davis", email: "sofia.davis@example.com", sessions: 65, lastActive: "5 hours ago", segment: "New" },
]

export default function AnalyticsAudienceContent() {
    const [range, setRange] = useState("12m")

    return (
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <FileText className="h-4 w-4" />
                        Analytics
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Audience</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Understand your visitors and their behavior.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Select value={range} onValueChange={setRange}>
                        <SelectTrigger className="h-9 w-[140px] text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="12m">Last 12 months</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* KPI cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Users", value: "137.8K", change: "+15.2%", up: true, icon: Users },
                    { title: "New Users", value: "52.4K", change: "+18.4%", up: true, icon: UserCheck },
                    { title: "Returning Users", value: "85.4K", change: "+12.8%", up: true, icon: UserCheck },
                    { title: "VIP Users", value: "20.7K", change: "+22.1%", up: true, icon: Star },
                ].map((stat) => (
                    <Card key={stat.title} className="border border-gray-200 dark:border-[#1F1F23]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </div>
                            <p className="text-xs mt-1 flex items-center gap-1">
                                {stat.up ? (
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 text-red-500" />
                                )}
                                <span className={stat.up ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts row 1: User growth + Demographics */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
                <Card className="xl:col-span-2 border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            User growth over time
                        </CardTitle>
                        <p className="text-xs text-gray-500">New vs returning users</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 sm:h-80 w-full">
                            <Line data={userGrowthData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Age demographics
                        </CardTitle>
                        <p className="text-xs text-gray-500">Users by age group</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 sm:h-72 w-full flex items-center justify-center">
                            <div className="w-full max-w-[220px] h-64">
                                <Bar data={demographicsData} options={chartOptions} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts row 2: User segments + Top countries */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            User segments
                        </CardTitle>
                        <p className="text-xs text-gray-500">Distribution by segment type</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-56 sm:h-64 w-full flex items-center justify-center">
                            <div className="w-full max-w-[200px] h-56">
                                <Doughnut data={segmentData} options={doughnutOptions} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Top countries
                        </CardTitle>
                        <p className="text-xs text-gray-500">Where your visitors come from</p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">Country</TableHead>
                                        <TableHead className="text-right">Visitors</TableHead>
                                        <TableHead className="text-right">Share</TableHead>
                                        <TableHead className="text-right">Trend</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topCountries.map((row) => (
                                        <TableRow key={row.code}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="h-4 w-4 text-gray-400" />
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">{row.country}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{row.visitors.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">{row.percentage}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    {row.trend === "up" && <ArrowUp className="h-3 w-3 text-green-500" />}
                                                    {row.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                                                    {row.trend === "stable" && <span className="text-gray-400">-</span>}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tables row: User segments + Top users */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            User segment performance
                        </CardTitle>
                        <p className="text-xs text-gray-500">Metrics by user segment</p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[140px]">Segment</TableHead>
                                        <TableHead className="text-right">Users</TableHead>
                                        <TableHead className="text-right hidden sm:table-cell">Avg Session</TableHead>
                                        <TableHead className="text-right hidden md:table-cell">Conversion</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userSegments.map((row) => (
                                        <TableRow key={row.segment}>
                                            <TableCell>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{row.segment}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">{row.users.toLocaleString()}</span>
                                                    <span className="text-xs text-gray-500 ml-1">({row.percentage})</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right hidden sm:table-cell text-xs">{row.avgSession}</TableCell>
                                            <TableCell className="text-right hidden md:table-cell">
                                                <span className={row.conversion.startsWith("0") ? "text-gray-500" : "text-green-600 dark:text-green-400"}>
                                                    {row.conversion}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Most active users
                        </CardTitle>
                        <p className="text-xs text-gray-500">Top users by session count</p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[160px]">User</TableHead>
                                        <TableHead className="text-right">Sessions</TableHead>
                                        <TableHead className="text-right">Last Active</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topUsers.map((row) => (
                                        <TableRow key={row.email}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
                                                    <p className="text-xs text-gray-500">{row.email}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{row.sessions}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Calendar className="h-3 w-3 text-gray-400" />
                                                    <span className="text-xs">{row.lastActive}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
