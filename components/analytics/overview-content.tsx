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
import { TrendingUp, TrendingDown, Eye, Users, Clock, MousePointerClick, Download, FileText, Globe, Monitor, Smartphone, Tablet } from "lucide-react"

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

const trafficData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            label: "Page Views",
            data: [45000, 52000, 48000, 61000, 55000, 67000, 72000, 78000, 74000, 82000, 79000, 89000],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
        },
        {
            label: "Unique Visitors",
            data: [12000, 14500, 13200, 16800, 15200, 18500, 19800, 21500, 20400, 22800, 21800, 24600],
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
        },
    ],
}

const trafficSourcesData = {
    labels: ["Organic Search", "Direct", "Social", "Referral", "Email"],
    datasets: [
        {
            label: "Visitors",
            data: [12400, 8200, 5600, 3800, 2400],
            backgroundColor: [
                "rgba(59, 130, 246, 0.85)",
                "rgba(16, 185, 129, 0.85)",
                "rgba(139, 92, 246, 0.85)",
                "rgba(245, 158, 11, 0.85)",
                "rgba(236, 72, 153, 0.85)",
            ],
            borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(139, 92, 246)", "rgb(245, 158, 11)", "rgb(236, 72, 153)"],
            borderWidth: 1,
        },
    ],
}

const deviceData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
        {
            data: [58, 35, 7],
            backgroundColor: ["rgba(59, 130, 246, 0.9)", "rgba(16, 185, 129, 0.9)", "rgba(139, 92, 246, 0.9)"],
            borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(139, 92, 246)"],
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

const topPages = [
    { page: "/", title: "Homepage", views: 24500, visitors: 18200, avgTime: "2m 34s", bounceRate: "32%" },
    { page: "/features", title: "Features", views: 18200, visitors: 14500, avgTime: "3m 12s", bounceRate: "28%" },
    { page: "/pricing", title: "Pricing", views: 15600, visitors: 12800, avgTime: "4m 05s", bounceRate: "25%" },
    { page: "/blog", title: "Blog", views: 12400, visitors: 9800, avgTime: "5m 22s", bounceRate: "42%" },
    { page: "/docs", title: "Documentation", views: 8900, visitors: 7200, avgTime: "6m 45s", bounceRate: "18%" },
]

const topReferrers = [
    { source: "google.com", visitors: 8200, percentage: "33.3%" },
    { source: "twitter.com", visitors: 3400, percentage: "13.8%" },
    { source: "github.com", visitors: 2800, percentage: "11.4%" },
    { source: "linkedin.com", visitors: 2100, percentage: "8.5%" },
    { source: "facebook.com", visitors: 1600, percentage: "6.5%" },
]

export default function AnalyticsOverviewContent() {
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
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Analytics Overview</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track your website traffic and visitor behavior.
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
                    { title: "Total Page Views", value: "842K", change: "+18.4%", up: true, icon: Eye },
                    { title: "Unique Visitors", value: "246K", change: "+12.2%", up: true, icon: Users },
                    { title: "Avg. Time on Site", value: "4m 32s", change: "+8.1%", up: true, icon: Clock },
                    { title: "Bounce Rate", value: "32.4%", change: "-3.2%", up: true, icon: MousePointerClick },
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

            {/* Charts row 1: Traffic over time + Device breakdown */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
                <Card className="xl:col-span-2 border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Traffic over time
                        </CardTitle>
                        <p className="text-xs text-gray-500">Page views and unique visitors</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 sm:h-80 w-full">
                            <Line data={trafficData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Device breakdown
                        </CardTitle>
                        <p className="text-xs text-gray-500">Visitors by device type</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 sm:h-72 w-full flex items-center justify-center">
                            <div className="w-full max-w-[220px] h-64">
                                <Doughnut data={deviceData} options={doughnutOptions} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts row 2: Traffic sources bar chart */}
            <Card className="border border-gray-200 dark:border-[#1F1F23]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                        Traffic sources
                    </CardTitle>
                    <p className="text-xs text-gray-500">Where your visitors come from</p>
                </CardHeader>
                <CardContent>
                    <div className="h-56 sm:h-64 w-full">
                        <Bar data={trafficSourcesData} options={chartOptions} />
                    </div>
                </CardContent>
            </Card>

            {/* Tables row: Top pages + Top referrers */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="border border-gray-200 dark:border-[#1F1F23]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Top pages
                        </CardTitle>
                        <p className="text-xs text-gray-500">Most visited pages</p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">Page</TableHead>
                                        <TableHead className="text-right">Views</TableHead>
                                        <TableHead className="text-right">Visitors</TableHead>
                                        <TableHead className="text-right hidden sm:table-cell">Avg Time</TableHead>
                                        <TableHead className="text-right hidden md:table-cell">Bounce</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topPages.map((row) => (
                                        <TableRow key={row.page}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{row.title}</p>
                                                    <p className="text-xs text-gray-500">{row.page}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{row.views.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">{row.visitors.toLocaleString()}</TableCell>
                                            <TableCell className="text-right hidden sm:table-cell text-xs">{row.avgTime}</TableCell>
                                            <TableCell className="text-right hidden md:table-cell text-xs">{row.bounceRate}</TableCell>
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
                            Top referrers
                        </CardTitle>
                        <p className="text-xs text-gray-500">External sites sending traffic</p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">Source</TableHead>
                                        <TableHead className="text-right">Visitors</TableHead>
                                        <TableHead className="text-right">Share</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topReferrers.map((row) => (
                                        <TableRow key={row.source}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="h-4 w-4 text-gray-400" />
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">{row.source}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{row.visitors.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">{row.percentage}</TableCell>
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
