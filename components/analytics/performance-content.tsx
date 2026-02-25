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
import { TrendingUp, TrendingDown, Gauge, Clock, Zap, AlertCircle, Download, FileText, Monitor, Smartphone, Tablet, Globe, ArrowDown, ArrowUp } from "lucide-react"

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

const pageLoadData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            label: "Avg. Page Load Time (s)",
            data: [2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
        },
        {
            label: "Time to First Byte (s)",
            data: [0.8, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.3],
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
        },
    ],
}

const coreWebVitalsData = {
    labels: ["LCP", "FID", "CLS", "TTFB", "FCP"],
    datasets: [
        {
            label: "Score",
            data: [92, 95, 88, 78, 90],
            backgroundColor: [
                "rgba(16, 185, 129, 0.85)",
                "rgba(16, 185, 129, 0.85)",
                "rgba(245, 158, 11, 0.85)",
                "rgba(245, 158, 11, 0.85)",
                "rgba(16, 185, 129, 0.85)",
            ],
            borderColor: ["rgb(16, 185, 129)", "rgb(16, 185, 129)", "rgb(245, 158, 11)", "rgb(245, 158, 11)", "rgb(16, 185, 129)"],
            borderWidth: 1,
        },
    ],
}

const deviceData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
        {
            data: [62, 32, 6],
            backgroundColor: ["rgba(59, 130, 246, 0.9)", "rgba(16, 185, 129, 0.9)", "rgba(139, 92, 246, 0.9)"],
            borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(139, 92, 246)"],
            borderWidth: 2,
        },
    ],
}

const browserData = {
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    datasets: [
        {
            data: [64, 18, 10, 6, 2],
            backgroundColor: ["rgba(59, 130, 246, 0.9)", "rgba(16, 185, 129, 0.9)", "rgba(245, 158, 11, 0.9)", "rgba(139, 92, 246, 0.9)", "rgba(107, 114, 128, 0.9)"],
            borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(245, 158, 11)", "rgb(139, 92, 246)", "rgb(107, 114, 128)"],
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

const slowestPages = [
    { page: "/dashboard/settings", loadTime: "4.2s", size: "2.4 MB", requests: 45 },
    { page: "/checkout", loadTime: "3.8s", size: "1.8 MB", requests: 38 },
    { page: "/analytics", loadTime: "3.2s", size: "1.5 MB", requests: 32 },
    { page: "/products/all", loadTime: "2.9s", size: "1.2 MB", requests: 28 },
    { page: "/reports/export", loadTime: "2.6s", size: "980 KB", requests: 24 },
]

const browserVersions = [
    { browser: "Chrome", version: "120.0", users: 12400, share: "52.4%", trend: "up" },
    { browser: "Chrome", version: "119.0", users: 4200, share: "17.7%", trend: "down" },
    { browser: "Safari", version: "17.2", users: 3800, share: "16.0%", trend: "up" },
    { browser: "Firefox", version: "121.0", users: 2100, share: "8.9%", trend: "stable" },
    { browser: "Edge", version: "120.0", users: 1400, share: "5.9%", trend: "up" },
]

export default function AnalyticsPerformanceContent() {
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
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Performance</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Monitor your website performance and Core Web Vitals.
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
                    { title: "Avg. Page Load", value: "1.6s", change: "-42%", up: true, icon: Clock, status: "good" },
                    { title: "Time to First Byte", value: "0.3s", change: "-62%", up: true, icon: Gauge, status: "good" },
                    { title: "First Contentful Paint", value: "0.8s", change: "-35%", up: true, icon: Zap, status: "good" },
                    { title: "Largest Contentful Paint", value: "1.8s", change: "-28%", up: true, icon: AlertCircle, status: "needs-improvement" },
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
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-xs flex items-center gap-1">
                                    {stat.up ? (
                                        <TrendingDown className="h-3 w-3 text-green-500" />
                                    ) : (
                                        <TrendingUp className="h-3 w-3 text-red-500" />
                                    )}
                                    <span className={stat.up ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                                </p>
                                <span className={`text-xs px-1.5 py-0.5 rounded ${stat.status === "good" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                                    stat.status === "needs-improvement" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    }`}>
                                    {stat.status === "good" ? "Good" : stat.status === "needs-improvement" ? "Needs Improvement" : "Poor"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts row 1: Page load time + Core Web Vitals */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
                <Card className="xl:col-span-2 border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Page load time over time
                        </CardTitle>
                        <p className="text-xs text-gray-500">Average page load and TTFB</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 sm:h-80 w-full">
                            <Line data={pageLoadData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Core Web Vitals
                        </CardTitle>
                        <p className="text-xs text-gray-500">Performance scores</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 sm:h-72 w-full flex items-center justify-center">
                            <div className="w-full max-w-[220px] h-64">
                                <Bar data={coreWebVitalsData} options={chartOptions} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts row 2: Device + Browser breakdown */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Device performance
                        </CardTitle>
                        <p className="text-xs text-gray-500">Visitors by device type</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-56 sm:h-64 w-full flex items-center justify-center">
                            <div className="w-full max-w-[200px] h-56">
                                <Doughnut data={deviceData} options={doughnutOptions} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Browser distribution
                        </CardTitle>
                        <p className="text-xs text-gray-500">Visitors by browser</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-56 sm:h-64 w-full flex items-center justify-center">
                            <div className="w-full max-w-[200px] h-56">
                                <Doughnut data={browserData} options={doughnutOptions} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tables row: Slowest pages + Browser versions */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Slowest pages
                        </CardTitle>
                        <p className="text-xs text-gray-500">Pages with longest load times</p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">Page</TableHead>
                                        <TableHead className="text-right">Load Time</TableHead>
                                        <TableHead className="text-right hidden sm:table-cell">Size</TableHead>
                                        <TableHead className="text-right hidden md:table-cell">Requests</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {slowestPages.map((row) => (
                                        <TableRow key={row.page}>
                                            <TableCell>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{row.page}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="text-red-600 dark:text-red-400 font-medium">{row.loadTime}</span>
                                            </TableCell>
                                            <TableCell className="text-right hidden sm:table-cell text-xs">{row.size}</TableCell>
                                            <TableCell className="text-right hidden md:table-cell text-xs">{row.requests}</TableCell>
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
                            Top browser versions
                        </CardTitle>
                        <p className="text-xs text-gray-500">Most used browser versions</p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[120px]">Browser</TableHead>
                                        <TableHead className="hidden sm:table-cell">Version</TableHead>
                                        <TableHead className="text-right">Users</TableHead>
                                        <TableHead className="text-right">Share</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {browserVersions.map((row) => (
                                        <TableRow key={`${row.browser}-${row.version}`}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="h-4 w-4 text-gray-400" />
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">{row.browser}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-xs text-gray-500">{row.version}</TableCell>
                                            <TableCell className="text-right">{row.users.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    {row.trend === "up" && <ArrowUp className="h-3 w-3 text-green-500" />}
                                                    {row.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                                                    <span>{row.share}</span>
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
