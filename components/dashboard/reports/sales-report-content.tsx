"use client"

import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Download, FileText } from "lucide-react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
)

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

const salesMonthly = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [12400, 18900, 15200, 24800, 22100, 29800, 28200, 35200, 31800, 39800, 38100, 44800],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Orders",
      data: [420, 518, 490, 612, 588, 724, 698, 812, 780, 924, 896, 1024],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
}

const revenueWeekly = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [8200, 9100, 8800, 9600],
      backgroundColor: [
        "rgba(59, 130, 246, 0.85)",
        "rgba(16, 185, 129, 0.85)",
        "rgba(139, 92, 246, 0.85)",
        "rgba(245, 158, 11, 0.85)",
      ],
      borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(139, 92, 246)", "rgb(245, 158, 11)"],
      borderWidth: 1,
    },
  ],
}

const revenueBySegment = {
  labels: ["Subscriptions", "Add-ons", "One-time"],
  datasets: [
    {
      data: [68, 22, 10],
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

const topProducts = [
  { name: "CMS Pro Plan", revenue: "$16,709", orders: 341, change: "+8.2%" },
  { name: "CMS Starter Plan", revenue: "$11,856", orders: 624, change: "+12.5%" },
  { name: "SEO Toolkit Addon", revenue: "$4,383", orders: 487, change: "+23.1%" },
  { name: "Analytics Upgrade", revenue: "$1,920", orders: 128, change: "+4.7%" },
  { name: "Priority Support", revenue: "$2,208", orders: 92, change: "-1.9%" },
]

export function SalesReportContent() {
  const [range, setRange] = useState("12m")

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <FileText className="h-4 w-4" />
            Reports
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Sales Reports</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Revenue, orders, and performance over time.
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
          {
            title: "Total Revenue",
            value: "$319.2k",
            change: "+14.2%",
            up: true,
            icon: DollarSign,
          },
          {
            title: "Orders",
            value: "8,486",
            change: "+9.8%",
            up: true,
            icon: ShoppingCart,
          },
          {
            title: "Avg Order Value",
            value: "$37.63",
            change: "+3.1%",
            up: true,
            icon: TrendingUp,
          },
          {
            title: "Growth (MoM)",
            value: "+12.4%",
            change: "vs prior month",
            up: true,
            icon: FileText,
          },
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

      {/* Charts row 1: Sales over time + Revenue by segment */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Sales & orders over time
            </CardTitle>
            <p className="text-xs text-gray-500">Monthly revenue and order count</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80 w-full">
              <Line data={salesMonthly} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Revenue by segment
            </CardTitle>
            <p className="text-xs text-gray-500">Share of total</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-72 w-full flex items-center justify-center">
              <div className="w-full max-w-[220px] h-64">
                <Doughnut data={revenueBySegment} options={doughnutOptions} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2: Weekly revenue bar */}
      <Card className="border border-gray-200 dark:border-[#1F1F23]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            Revenue by week (this month)
          </CardTitle>
          <p className="text-xs text-gray-500">Weekly breakdown</p>
        </CardHeader>
        <CardContent>
          <div className="h-56 sm:h-64 w-full">
            <Bar data={revenueWeekly} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Top products table */}
      <Card className="border border-gray-200 dark:border-[#1F1F23]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            Top products by revenue
          </CardTitle>
          <p className="text-xs text-gray-500">Based on selected period</p>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Product</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-right">{row.revenue}</TableCell>
                    <TableCell className="text-right">{row.orders}</TableCell>
                    <TableCell
                      className={`text-right ${
                        row.change.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {row.change}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
