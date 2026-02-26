"use client"

import { useState, useEffect } from "react"
import { Activity, Users, FileText, Image, MessageSquare, MessageCircle, Eye, TrendingUp, Zap, Clock, PenTool, Upload, Bell } from "lucide-react"

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
        value: "127",
        change: "+8",
        changeType: "increase",
        icon: <Users className="h-4 w-4" />,
        live: true,
    },
    {
        title: "Published Posts Today",
        value: "24",
        change: "+5",
        changeType: "increase",
        icon: <FileText className="h-4 w-4" />,
        live: true,
    },
    {
        title: "New Comments",
        value: "89",
        change: "+12",
        changeType: "increase",
        icon: <MessageSquare className="h-4 w-4" />,
        live: true,
    },
    {
        title: "Media Files Uploaded",
        value: "156",
        change: "+23",
        changeType: "increase",
        icon: <Image className="h-4 w-4" />,
        live: true,
    },
]

const liveEvents = [
    { id: 1, type: "post", message: "New article published: 'Getting Started with Next.js'", time: "2s ago", author: "John D." },
    { id: 2, type: "comment", message: "New comment on 'React Best Practices'", time: "5s ago", author: "sarah_m" },
    { id: 3, type: "media", message: "15 images uploaded to Media Library", time: "12s ago", author: "admin" },
    { id: 4, type: "user", message: "New user registered: dev_alex", time: "18s ago" },
    { id: 5, type: "comment", message: "Reply on 'CMS Tutorial'", time: "25s ago", author: "mike_w" },
    { id: 6, type: "post", message: "Page updated: 'About Us'", time: "32s ago", author: "editor_1" },
    { id: 7, type: "user", message: "User profile updated: jane_smith", time: "41s ago" },
    { id: 8, type: "media", message: "Video uploaded: product-demo.mp4", time: "55s ago", author: "marketing" },
]

const topPages = [
    { page: "/blog/react-tips", views: 1247, avgTime: "3m 45s" },
    { page: "/blog/nextjs-guide", views: 892, avgTime: "5m 12s" },
    { page: "/", views: 756, avgTime: "1m 20s" },
    { page: "/about", views: 534, avgTime: "2m 15s" },
    { page: "/contact", views: 312, avgTime: "1m 45s" },
]

const recentComments = [
    { id: 1, post: "Getting Started with Next.js", author: "dev_user", comment: "Great tutorial! This helped me a lot...", status: "approved" },
    { id: 2, post: "React Best Practices", author: "newbie_coder", comment: "Can you explain more about hooks?", status: "pending" },
    { id: 3, post: "CSS Tips & Tricks", author: "style_master", comment: "Love the dark mode implementation!", status: "approved" },
    { id: 4, post: "JavaScript Fundamentals", author: "js_fan", comment: "Would love to see more examples...", status: "pending" },
]

const pendingActions = [
    { id: 1, type: "comment", message: "3 comments awaiting moderation", icon: MessageCircle, count: 3 },
    { id: 2, type: "draft", message: "5 posts in draft", icon: PenTool, count: 5 },
    { id: 3, type: "upload", message: "2 media files pending review", icon: Upload, count: 2 },
    { id: 4, type: "notification", message: "8 system notifications", icon: Bell, count: 8 },
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
                            const newVal = Math.max(80, currentVal + change)
                            newValue = newVal.toString()
                            newChange = (change >= 0 ? "+" : "") + change.toString()
                        } else if (stat.title === "Published Posts Today") {
                            const currentVal = parseInt(stat.value)
                            const newVal = currentVal + (Math.random() > 0.8 ? 1 : 0)
                            newValue = newVal.toString()
                            newChange = "+" + (Math.random() > 0.8 ? 1 : 0).toString()
                        } else if (stat.title === "New Comments") {
                            const currentVal = parseInt(stat.value)
                            const newVal = currentVal + Math.floor(Math.random() * 2)
                            newValue = newVal.toString()
                            newChange = "+" + Math.floor(Math.random() * 2).toString()
                        } else if (stat.title === "Media Files Uploaded") {
                            const currentVal = parseInt(stat.value)
                            const newVal = currentVal + (Math.random() > 0.7 ? 1 : 0)
                            newValue = newVal.toString()
                            newChange = "+" + (Math.random() > 0.7 ? 1 : 0).toString()
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
                const eventTypes = ["post", "comment", "media", "user"] as const
                const newEvent = {
                    id: Date.now(),
                    type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
                    message: Math.random() > 0.5
                        ? `New article published: 'Blog Post #${100 + Math.floor(Math.random() * 50)}'`
                        : Math.random() > 0.5
                            ? `New comment on recent post`
                            : Math.random() > 0.5
                                ? `Media file uploaded to library`
                                : `New user registered: user_${Math.floor(Math.random() * 1000)}`,
                    time: "just now",
                    author: Math.random() > 0.5 ? "admin" : "editor",
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
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Live CMS activity updates every 2 seconds</p>
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
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live CMS Events</h2>
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
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${event.type === "post" ? "bg-blue-100 dark:bg-blue-900/30" :
                                            event.type === "comment" ? "bg-purple-100 dark:bg-purple-900/30" :
                                                event.type === "media" ? "bg-green-100 dark:bg-green-900/30" :
                                                    "bg-orange-100 dark:bg-orange-900/30"
                                            }`}>
                                            {event.type === "post" ? (
                                                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            ) : event.type === "comment" ? (
                                                <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            ) : event.type === "media" ? (
                                                <Image className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            ) : (
                                                <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{event.message}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}{event.author && ` • by ${event.author}`}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pending Actions */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Pending Actions Card */}
                    <div className="bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl border border-gray-200 dark:border-[#1F1F23]">
                        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#1F1F23]">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-orange-500" />
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Actions</h2>
                            </div>
                        </div>
                        <div className="p-4 sm:p-6">
                            <div className="space-y-4">
                                {pendingActions.map((action) => (
                                    <div key={action.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                                <action.icon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <p className="text-sm text-gray-900 dark:text-white truncate">{action.message}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex-shrink-0">{action.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Comments */}
                    <div className="bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl border border-gray-200 dark:border-[#1F1F23]">
                        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#1F1F23]">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-purple-500" />
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Comments</h2>
                            </div>
                        </div>
                        <div className="p-4 sm:p-6">
                            <div className="space-y-4">
                                {recentComments.map((comment) => (
                                    <div key={comment.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{comment.post}</p>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${comment.status === "approved"
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                                }`}>
                                                {comment.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{comment.comment}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">by {comment.author}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Pages Realtime */}
            <div className="bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl border border-gray-200 dark:border-[#1F1F23]">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-blue-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Most Viewed Pages (Today)</h2>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Live updates</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Page</th>
                                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Views</th>
                                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Avg. Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                            {topPages.map((page) => (
                                <tr key={page.page} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{page.page}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-400">{page.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-400">{page.avgTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
