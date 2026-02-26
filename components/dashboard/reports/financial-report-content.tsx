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
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Download, FileText, Wallet, PiggyBank } from "lucide-react"

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

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" as const, labels: { usePointStyle: true, padding: 12, font: { size: 11 } } },
    tooltip: { callbacks: { label: (ctx: { label: string; parsed: number }) => `${ctx.label}: $${ctx.parsed.toLocaleString()}` } },
  },
}

// Profit/Loss over time data
const profitLossMonthly = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [12400, 18900, 15200, 24800, 22100, 29800, 28200, 35200, 31800, 39800, 38100, 44800],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
    {
      label: "Expenses ($)",
      data: [8200, 9100, 8800, 9600, 10200, 11800, 12400, 13200, 12800, 14100, 13800, 15200],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4,
    },
    {
      label: "Net Profit ($)",
      data: [4200, 9800, 6400, 15200, 11900, 18000, 15800, 22000, 19000, 25700, 24300, 29600],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
  ],
}

// Income vs Expenses comparison
const incomeVsExpenses = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Income",
      data: [12400, 18900, 15200, 24800, 22100, 29800, 28200, 35200, 31800, 39800, 38100, 44800],
      backgroundColor: "rgba(16, 185, 129, 0.85)",
      borderColor: "rgb(16, 185, 129)",
      borderWidth: 1,
    },
    {
      label: "Expenses",
      data: [8200, 9100, 8800, 9600, 10200, 11800, 12400, 13200, 12800, 14100, 13800, 15200],
      backgroundColor: "rgba(239, 68, 68, 0.85)",
      borderColor: "rgb(239, 68, 68)",
      borderWidth: 1,
    },
  ],
}

// Expense breakdown by category
const expenseBreakdown = {
  labels: ["Salaries", "Marketing", "Server Costs", "Software", "Office", "Utilities", "Other"],
  datasets: [
    {
      data: [32000, 12000, 8500, 5200, 4800, 3200, 2720],
      backgroundColor: [
        "rgba(59, 130, 246, 0.9)",
        "rgba(16, 185, 129, 0.9)",
        "rgba(139, 92, 246, 0.9)",
        "rgba(245, 158, 11, 0.9)",
        "rgba(236, 72, 153, 0.9)",
        "rgba(34, 211, 238, 0.9)",
        "rgba(156, 163, 175, 0.9)",
      ],
      borderColor: [
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)",
        "rgb(139, 92, 246)",
        "rgb(245, 158, 11)",
        "rgb(236, 72, 153)",
        "rgb(34, 211, 238)",
        "rgb(156, 163, 175)",
      ],
      borderWidth: 2,
    },
  ],
}

const topExpenses = [
  { category: "Salaries", amount: "$32,000", percentage: "46.8%", change: "+5.2%" },
  { category: "Marketing", amount: "$12,000", percentage: "17.5%", change: "+12.8%" },
  { category: "Server Costs", amount: "$8,500", percentage: "12.4%", change: "+8.1%" },
  { category: "Software", amount: "$5,200", percentage: "7.6%", change: "-2.3%" },
  { category: "Office", amount: "$4,800", percentage: "7.0%", change: "+1.5%" },
]

const incomeSources = [
  { source: "Product Sales", amount: "$248,500", percentage: "68.2%", change: "+15.4%" },
  { source: "Subscriptions", amount: "$72,400", percentage: "19.9%", change: "+8.7%" },
  { source: "Services", amount: "$28,200", percentage: "7.7%", change: "+22.1%" },
  { source: "Other", amount: "$15,500", percentage: "4.2%", change: "-3.2%" },
]

export function FinancialReportContent() {
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
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Revenue, expenses, and profit analysis.
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
            value: "$364.6k",
            change: "+14.2%",
            up: true,
            icon: DollarSign,
          },
          {
            title: "Total Expenses",
            value: "$68.4k",
            change: "+8.6%",
            up: false,
            icon: CreditCard,
          },
          {
            title: "Net Profit",
            value: "$296.2k",
            change: "+18.4%",
            up: true,
            icon: PiggyBank,
          },
          {
            title: "Profit Margin",
            value: "81.3%",
            change: "+3.2%",
            up: true,
            icon: TrendingUp,
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

      {/* Charts row 1: Profit/Loss + Expense Breakdown */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Profit & Loss over time
            </CardTitle>
            <p className="text-xs text-gray-500">Monthly revenue, expenses, and net profit</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80 w-full">
              <Line data={profitLossMonthly} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Expense breakdown
            </CardTitle>
            <p className="text-xs text-gray-500">By category</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-72 w-full flex items-center justify-center">
              <div className="w-full max-w-[220px] h-64">
                <Doughnut data={expenseBreakdown} options={doughnutOptions} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2: Income vs Expenses bar chart */}
      <Card className="border border-gray-200 dark:border-[#1F1F23]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            Income vs Expenses
          </CardTitle>
          <p className="text-xs text-gray-500">Monthly comparison</p>
        </CardHeader>
        <CardContent>
          <div className="h-56 sm:h-64 w-full">
            <Bar data={incomeVsExpenses} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Tables row: Top Expenses + Income Sources */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Top Expenses Table */}
        <Card className="border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Top expenses
            </CardTitle>
            <p className="text-xs text-gray-500">Largest expense categories</p>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topExpenses.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {row.category}
                      </TableCell>
                      <TableCell className="text-right">{row.amount}</TableCell>
                      <TableCell className="text-right">{row.percentage}</TableCell>
                      <TableCell
                        className={`text-right ${row.change.startsWith("+") ? "text-red-600" : "text-green-600"
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

        {/* Income Sources Table */}
        <Card className="border border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Income sources
            </CardTitle>
            <p className="text-xs text-gray-500">Revenue by source</p>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Source</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeSources.map((row) => (
                    <TableRow key={row.source}>
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {row.source}
                      </TableCell>
                      <TableCell className="text-right">{row.amount}</TableCell>
                      <TableCell className="text-right">{row.percentage}</TableCell>
                      <TableCell
                        className={`text-right ${row.change.startsWith("+") ? "text-green-600" : "text-red-600"
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
    </div>
  )
}
