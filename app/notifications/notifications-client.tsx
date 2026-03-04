"use client"

import { useState } from "react"
import { Bell, Trash2, Check, CheckCircle, AlertCircle, AlertTriangle, Info, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Notification {
    id: string
    title: string
    message: string
    timestamp: string
    read: boolean
    type: "success" | "warning" | "error" | "info"
}

export default function NotificationsPageClient() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "New Order Received",
            message: "You received a new order #ORD-3241 from Sarah Johnson for $588.00",
            timestamp: "5 minutes ago",
            read: false,
            type: "success",
        },
        {
            id: "2",
            title: "System Maintenance Scheduled",
            message: "System maintenance is scheduled for tonight from 10 PM to 2 AM. Services may be unavailable.",
            timestamp: "1 hour ago",
            read: false,
            type: "warning",
        },
        {
            id: "3",
            title: "Payment Processing Failed",
            message: "Payment processing failed for invoice #INV-2041. Please retry the payment.",
            timestamp: "2 hours ago",
            read: true,
            type: "error",
        },
        {
            id: "4",
            title: "New Comment on Your Post",
            message: "Emma Wilson commented on 'The Future of AI in Healthcare'",
            timestamp: "3 hours ago",
            read: true,
            type: "info",
        },
        {
            id: "5",
            title: "Subscription Renewed",
            message: "Your CMS Pro Plan subscription has been successfully renewed.",
            timestamp: "1 day ago",
            read: true,
            type: "success",
        },
        {
            id: "6",
            title: "API Rate Limit Warning",
            message: "You have used 85% of your monthly API quota.",
            timestamp: "2 days ago",
            read: true,
            type: "warning",
        },
        {
            id: "7",
            title: "Backup Completed",
            message: "Your data backup has been completed successfully.",
            timestamp: "3 days ago",
            read: true,
            type: "success",
        },
        {
            id: "8",
            title: "New Feature Available",
            message: "Advanced analytics dashboard is now available for Pro users.",
            timestamp: "1 week ago",
            read: true,
            type: "info",
        },
    ])

    const [filter, setFilter] = useState<"all" | "unread" | "success" | "warning" | "error" | "info">("all")
    const [searchTerm, setSearchTerm] = useState("")

    const filteredNotifications = notifications.filter((n) => {
        const matchesFilter =
            filter === "all" || (filter === "unread" ? !n.read : n.type === filter)
        const matchesSearch =
            n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.message.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const unreadCount = notifications.filter((n) => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })))
    }

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter((n) => n.id !== id))
    }

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case "warning":
                return <AlertTriangle className="h-5 w-5 text-amber-500" />
            case "error":
                return <AlertCircle className="h-5 w-5 text-red-500" />
            default:
                return <Info className="h-5 w-5 text-blue-500" />
        }
    }

    const getNotificationBgColor = (type: string) => {
        switch (type) {
            case "success":
                return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50"
            case "warning":
                return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50"
            case "error":
                return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50"
            default:
                return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50"
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Bell className="h-8 w-8" />
                    Notifications
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-[#1A1A1F] rounded-lg p-4 mb-6 border border-gray-200 dark:border-[#2A2A2F]">
                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search notifications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {(["all", "unread", "success", "warning", "error", "info"] as const).map((f) => (
                        <Button
                            key={f}
                            variant={filter === f ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter(f)}
                            className="capitalize"
                        >
                            {f === "all" && `All (${notifications.length})`}
                            {f === "unread" && `Unread (${unreadCount})`}
                            {f === "success" && `Success (${notifications.filter((n) => n.type === "success").length})`}
                            {f === "warning" && `Warning (${notifications.filter((n) => n.type === "warning").length})`}
                            {f === "error" && `Error (${notifications.filter((n) => n.type === "error").length})`}
                            {f === "info" && `Info (${notifications.filter((n) => n.type === "info").length})`}
                        </Button>
                    ))}
                </div>

                {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="mt-3 text-blue-600 hover:text-blue-700">
                        <Check className="h-4 w-4 mr-2" />
                        Mark all as read
                    </Button>
                )}
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                    <div className="bg-white dark:bg-[#1A1A1F] rounded-lg p-12 text-center border border-gray-200 dark:border-[#2A2A2F]">
                        <Bell className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {searchTerm ? "No notifications match your search" : "No notifications"}
                        </p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`bg-white dark:bg-[#1A1A1F] rounded-lg p-4 border transition-all hover:shadow-md dark:border-[#2A2A2F] ${!notification.read ? "border-blue-300 dark:border-blue-700" : ""
                                } ${getNotificationBgColor(notification.type)}`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="mt-1 flex-shrink-0">{getNotificationIcon(notification.type)}</div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                                                {!notification.read && (
                                                    <Badge variant="secondary" className="bg-blue-500 text-white">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{notification.timestamp}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 flex-shrink-0">
                                            {!notification.read && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => markAsRead(notification.id)}
                                                    title="Mark as read"
                                                    className="p-2 h-auto"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteNotification(notification.id)}
                                                title="Delete notification"
                                                className="p-2 h-auto text-gray-400 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

