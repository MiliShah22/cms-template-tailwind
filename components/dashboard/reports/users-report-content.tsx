"use client"

import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
import { TrendingUp, Users2, UserPlus, Activity, Download, FileText } from "lucide-react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const usersMonthly = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "New signups",
      data: [82, 94, 78, 112, 98, 128, 115, 142, 130, 156, 148, 172],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Active (MAU)",
      data: [680, 720, 758, 812, 848, 902, 924, 968, 1002, 1048, 1082, 1124],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
}

const signupsWeekly = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Signups",
      data: [38, 44, 41, 49],
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

const usersBySegment = {
  labels: ["New", "Returning", "VIP"],
  datasets: [
    {
      data: [38, 42, 20],
      backgroundColor: ["rgba(59, 130, 246, 0.9)", "rgba(16, 185, 129, 0.9)", "rgba(245, 158, 11, 0.9)"],
      borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(245, 158, 11)"],
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

const topUsers = [
  { name: "Jane Cooper", email: "jane.cooper@example.com", segment: "VIP", orders: 42, lastActive: "2h ago" },
  { name: "Cody Fisher", email: "cody.fisher@example.com", segment: "New", orders: 3, lastActive: "1d ago" },
  { name: "Kristin Watson", email: "kristin.watson@example.com", segment: "Returning", orders: 12, lastActive: "5h ago" },
  { name: "Devon Lane", email: "devon.lane@example.com", segment: "VIP", orders: 31, lastActive: "30m ago" },
  { name: "Sofia Davis", email: "sofia.davis@example.com", segment: "Returning", orders: 8, lastActive: "3d ago" },
]

export function UsersReportContent() {
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
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">User Reports</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Signups, active users, and segment breakdown.
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
          { title: "Total users", value: "1,284", change: "+5.1%", up: true, icon: Users2 },
          { title: "New this month", value: "172", change: "+12.3%", up: true, icon: UserPlus },
          { title: "Active (MAU)", value: "1,124", change: "+8.7%", up: true, icon: Activity },
          { title: "VIP users", value: "256", change: "20%", up: true, icon: Users2 },
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
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-600">{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row 1: Users over time + By segment */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Users over time
            </CardTitle>
            <p className="text-xs text-gray-500">New signups and monthly active users (MAU)</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80 w-full">
              <Line data={usersMonthly} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Users by segment
            </CardTitle>
            <p className="text-xs text-gray-500">Share of total</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-72 w-full flex items-center justify-center">
              <div className="w-full max-w-[220px] h-64">
                <Doughnut data={usersBySegment} options={doughnutOptions} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar: Signups by week */}
      <Card className="border border-gray-200 dark:border-[#1F1F23]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            New signups by week (this month)
          </CardTitle>
          <p className="text-xs text-gray-500">Weekly breakdown</p>
        </CardHeader>
        <CardContent>
          <div className="h-56 sm:h-64 w-full">
            <Bar data={signupsWeekly} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Top users table */}
      <Card className="border border-gray-200 dark:border-[#1F1F23]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            Top users by activity
          </CardTitle>
          <p className="text-xs text-gray-500">Orders and last active</p>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead className="hidden sm:table-cell">Segment</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Last active</TableHead>
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
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-xs text-gray-600 dark:text-gray-300">{row.segment}</span>
                    </TableCell>
                    <TableCell className="text-right">{row.orders}</TableCell>
                    <TableCell className="text-right text-xs text-gray-500">{row.lastActive}</TableCell>
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
