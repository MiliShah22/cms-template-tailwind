"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, MessageSquare, AlertTriangle, CheckCircle2, Settings } from "lucide-react"

interface ChatNotification {
  id: string
  type: "message" | "mention" | "system"
  title: string
  description: string
  time: string
  unread: boolean
}

const notifications: ChatNotification[] = [
  {
    id: "n1",
    type: "mention",
    title: "@you mentioned in #support",
    description: "Jane Cooper: Can you review the Super Cache rules for `/blog/*`?",
    time: "3 min ago",
    unread: true,
  },
  {
    id: "n2",
    type: "message",
    title: "New DM from Cody Fisher",
    description: "“The invoices QA build is ready, can you take a look?”",
    time: "12 min ago",
    unread: true,
  },
  {
    id: "n3",
    type: "system",
    title: "Chat channels synchronized",
    description: "Workspace channels have been synced with your CMSFullForm projects.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: "n4",
    type: "message",
    title: "New message in #general",
    description: "Devon Lane: Pushed a new layout for the dashboard overview.",
    time: "2 hours ago",
    unread: false,
  },
]

export function ChatNotifications() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Bell className="h-4 w-4" />
            Chat center
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Chat notifications</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See unread mentions, direct messages and system alerts related to collaboration.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Notification settings
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-sm font-medium">Inbox</CardTitle>
            <p className="mt-1 text-xs text-gray-500">
              {unreadCount} unread · {notifications.length} total
            </p>
          </div>
          <Button size="sm" variant="outline">
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="mentions">@ Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="pt-3">
              <NotificationList items={notifications} />
            </TabsContent>
            <TabsContent value="unread" className="pt-3">
              <NotificationList items={notifications.filter((n) => n.unread)} />
            </TabsContent>
            <TabsContent value="mentions" className="pt-3">
              <NotificationList items={notifications.filter((n) => n.type === "mention")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationList({ items }: { items: ChatNotification[] }) {
  if (!items.length) {
    return (
      <div className="flex h-32 flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-500" />
        No notifications in this view.
      </div>
    )
  }

  return (
    <ScrollArea className="max-h-[420px]">
      <div className="space-y-2">
        {items.map((notification) => (
          <div
            key={notification.id}
            className={`
              flex items-start gap-3 rounded-md border px-3 py-2 text-xs
              ${notification.unread ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-500/5" : "border-gray-200 bg-background dark:border-gray-800"}
            `}
          >
            <IconForType type={notification.type} />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {notification.title}
                </p>
                <span className="text-[11px] text-gray-400">{notification.time}</span>
              </div>
              <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

function IconForType({ type }: { type: ChatNotification["type"] }) {
  if (type === "message") {
    return (
      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
        <MessageSquare className="h-3.5 w-3.5" />
      </div>
    )
  }

  if (type === "mention") {
    return (
      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
        @
      </div>
    )
  }

  return (
    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
      <AlertTriangle className="h-3.5 w-3.5" />
    </div>
  )
}


