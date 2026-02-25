"use client"

import { useState, useEffect } from "react"
import { Activity, Users, ShoppingCart, DollarSign, TrendingUp, Server, Zap, Clock } from "lucide-react"

interface RealtimeStat {
    title: string
    value: string
    change: string
    changeType: "increase" | "decrease" | "neutral"
    icon: React.ReactNode
    live?: boolean
}

const initialStats: RealtimeStat[] = [
    {
        title: "Active Users Right Now",
        value: "247",
        change: "+12",
        changeType: "increase",
        icon: <Users className="h-4 w-4" />,
        live: true,
    },
    {
        title: "Orders Today",
        value: "1,284",
        change: "+84",
        changeType: "increase",
        icon: <ShoppingCart className="h-4 w-4" />,
        live: true,
    },
    {
        title: "Revenue Today",
        value: "$12,480",
        change: "+$1,240",
        changeType: "increase",
        icon: <DollarSign className="h-4 w-4" />,
        live: true,
    },
    {
        title: "Server Load",
        value: "42%",
        change: "-3%",
        changeType: "decrease",
        icon: <Server className="h-4 w-4" />,
        live: true,
    },
]

const liveEvents = [
    { id: 1, type: "order", message: "New order #12849 from John D.", time: "2s ago", amount: "$149.00" },
    { id: 2, type: "user", message: "New user registered: sarah_m", time: "5s ago" },
    { id: 3, type: "order", message: "Order #12848 completed", time: "12s ago", amount: "$89.00" },
    { id: 4, type: "user", message: "User upgraded to Pro: mike_dev", time: "18s ago" },
    { id: 5, type: "order", message: "New order #12847 from Alice W.", time: "25s ago", amount: "$234.00" },
    { id: 6, type: "user", message: "New user registered: alex_r", time: "32s ago" },
    { id: 7, type: "order", message: "Order #12846 refunded", time: "41s ago", amount: "$45.00" },
    { id: 8, type: "user", message: "User subscription renewed", time: "55s ago" },
]

const topProducts = [
    { name: "Premium Subscription", sales: 124, revenue: "$12,400" },
    { name: "Basic Plan", sales: 89, revenue: "$4,450" },
    { name: "Enterprise License", sales: 45, revenue: "$22,500" },
    { name: "Add-on: Analytics", sales: 67, revenue: "$3,350" },
    { name: "Add-on: Storage", sales: 52, revenue: "$2,600" },
]

const activePages = [
    { page: "/dashboard", users: 89, avgTime: "4m 32s" },
    { page: "/products", users: 67, avgTime: "2m 15s" },
    { page: "/checkout", users: 34, avgTime: "1m 45s" },
    { page: "/blog", users: 28, avgTime: "5m 12s" },
    { page: "/settings", users: 12, avgTime: "1m 08s" },
]

export default function RealtimeContent() {
    const [stats, setStats] = useState(initialStats)
    const [events, setEvents] = useState(liveEvents)
    const [isConnected, setIsConnected] = useState(true)

    // Simulate realtime updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Update stats with slight variations
            setStats((prevStats) =>
                prevStats.map((stat) => {
                    if (stat.live) {
                        let newValue = stat.value
                        let newChange = stat.change

                        if (stat.title === "Active Users Right Now") {
                            const currentVal = parseInt(stat.value)
                            const change = Math.floor(Math.random() * 5) - 2
                            const newVal = Math.max(200, currentVal + change)
                            newValue = newVal.toString()
                            newChange = (change >= 0 ? "+" : "") + change.toString()
                        } else if (stat.title === "Orders Today") {
                            const currentVal = parseInt(stat.value.replace(/,/g, ""))
                            const newVal = currentVal + Math.floor(Math.random() * 3)
                            newValue = newVal.toLocaleString()
                            newChange = "+" + Math.floor(Math.random() * 3).toString()
                        } else if (stat.title === "Revenue Today") {
                            const currentVal = parseInt(stat.value.replace(/[$,]/g, ""))
                            const change = Math.floor(Math.random() * 50) + 10
                            const newVal = currentVal + change
                            newValue = "$" + newVal.toLocaleString()
                            newChange = "+$" + change.toString()
                        } else if (stat.title === "Server Load") {
                            const currentVal = parseInt(stat.value)
                            const change = Math.floor(Math.random() * 7) - 3
                            const newVal = Math.max(20, Math.min(80, currentVal + change))
                            newValue = newVal + "%"
                            newChange = (change >= 0 ? "+" : "") + change + "%"
                        }

                        return {
                            ...stat,
                            value: newValue,
                            change: newChange,
                            changeType: stat.changeType === "decrease" ? "decrease" : "increase",
                        }
                    }
                    return stat
                })
            )

            // Simulate new events occasionally
            if (Math.random() > 0.7) {
                const newEvent = {
                    id: Date.now(),
                    type: Math.random() > 0.5 ? "order" : "user",
                    message: Math.random() > 0.5
                        ? `New order #${12850 + Math.floor(Math.random() * 100)} placed`
                        : `New user registered: user_${Math.floor(Math.random() * 1000)}`,
                    time: "just now",
                    amount: Math.random() > 0.5 ? "$" + (Math.floor(Math.random() * 200) + 50).toFixed(2) : undefined,
                }
                setEvents((prev) => [newEvent, ...prev.slice(0, 7)])
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
            {/* Header with Connection Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Real-time Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Live data updates every 2 seconds</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isConnected ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                        <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                        {isConnected ? "Live Connected" : "Disconnected"}
                    </div>
                    <button
                        onClick={() => setIsConnected(!isConnected)}
                        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        {isConnected ? "Pause" : "Resume"}
                    </button>
                </div>
            </div>

            {/* Realtime Stats Grid */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl p-3 sm:p-6 border border-gray-200 dark:border-[#1F1F23] hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{stat.title}</h3>
                            <div className="text-gray-600 dark:text-gray-400 flex-shrink-0 flex items-center gap-1">
                                {stat.icon}
                                {stat.live && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{stat.value}</div>
                            <div className="flex items-center text-xs">
                                {stat.changeType === "increase" ? (
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                ) : stat.changeType === "decrease" ? (
                                    <TrendingUp className="h-3 w-3 text-red-500 mr-1 flex-shrink-0 rotate-180" />
                                ) : (
                                    <Activity className="h-3 w-3 text-gray-500 mr-1 flex-shrink-0" />
                                )}
                                <span className={`font-medium ${stat.changeType === "increase" ? "text-green-600 dark:text-green-400" : stat.changeType === "decrease" ? "text-red-600 dark:text-red-400" : "text-gray-500"}`}>
                                    {stat.change}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 ml-1">vs last hour</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
                {/* Live Events Feed */}
                <div className="lg:col-span-2 bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl border border-gray-200 dark:border-[#1F1F23]">
                    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#1F1F23]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Events</h2>
                                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                                    {events.length} events
                                </span>
                            </div>
                            <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                    <div className="p-4 sm:p-6">
                        <div className="space-y-3">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] animate-in fade-in slide-in-from-top-2"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${event.type === "order" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-purple-100 dark:bg-purple-900/30"}`}>
                                            {event.type === "order" ? (
                                                <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            ) : (
                                                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{event.message}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                                        </div>
                                    </div>
                                    {event.amount && (
                                        <span className="text-sm font-semibold text-green-600 dark:text-green-400 flex-shrink-0">{event.amount}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Active Pages */}
                <div className="bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl border border-gray-200 dark:border-[#1F1F23]">
                    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#1F1F23]">
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Pages</h2>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6">
                        <div className="space-y-4">
                            {activePages.map((page, index) => (
                                <div key={page.page} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="text-sm font-medium text-gray-400 dark:text-gray-500 w-4">{index + 1}</span>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{page.page}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Avg: {page.avgTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <div className="w-16 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${(page.users / 100) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">{page.users}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Products Realtime */}
            <div className="bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl border border-gray-200 dark:border-[#1F1F23]">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products (Today)</h2>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Live updates</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Product</th>
                                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Sales</th>
                                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                            {topProducts.map((product) => (
                                <tr key={product.name} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-400">{product.sales}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-green-600 dark:text-green-400">{product.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
