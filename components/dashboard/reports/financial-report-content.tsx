"use client"

import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const chartOptions = {
  responsive: true,
}

export function FinancialReportContent() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Financial Reports</h1>
      <p className="text-sm text-gray-600">Revenue expenses and profit analysis</p>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>$124800</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>$68420</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Profit</CardTitle>
          </CardHeader>
          <CardContent>$56380</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>45%</CardContent>
        </Card>
      </div>
    </div>
  )
}
