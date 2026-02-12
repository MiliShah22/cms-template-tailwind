"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Hash, Search, Plus, Send, Pin, Users2, MessageCircle,Zap } from "lucide-react"

interface Channel {
  id: string
  name: string
  label: string
  unread: number
  pinned?: boolean
  description?: string
}

interface Message {
  id: string
  channelId: string
  author: string
  initials: string
  content: string
  time: string
}

const channels: Channel[] = [
  {
    id: "general",
    name: "general",
    label: "General",
    unread: 3,
    pinned: true,
    description: "Team‑wide announcements and updates",
  },
  {
    id: "support",
    name: "support",
    label: "Support",
    unread: 1,
    description: "Customer questions & triage",
  },
  {
    id: "product",
    name: "product",
    label: "Product",
    unread: 0,
    description: "Roadmap & feature discussions",
  },
  {
    id: "marketing",
    name: "marketing",
    label: "Marketing",
    unread: 0,
    description: "Campaigns, content and launches",
  },
]

const messages: Message[] = [
  {
    id: "m1",
    channelId: "general",
    author: "Jane Cooper",
    initials: "JC",
    content: "Welcome to the new CMSFullForm dashboard. Let us know if you find any rough edges.",
    time: "09:12",
  },
  {
    id: "m2",
    channelId: "general",
    author: "Cody Fisher",
    initials: "CF",
    content: "I’ve connected our staging domain and enabled AllSite SEO — everything looks good.",
    time: "09:18",
  },
  {
    id: "m3",
    channelId: "support",
    author: "Kristin Watson",
    initials: "KW",
    content: "Customer #2041 is asking about how to regenerate their sitemap after a bulk import.",
    time: "09:24",
  },
  {
    id: "m4",
    channelId: "product",
    author: "Devon Lane",
    initials: "DL",
    content: "Next sprint: invoice export CSV + per‑project SEO presets.",
    time: "09:30",
  },
]

export function ChatChannels() {
  const [activeChannelId, setActiveChannelId] = useState<string>("general")
  const [draft, setDraft] = useState("")

  const visibleMessages = messages.filter((m) => m.channelId === activeChannelId)
  const activeChannel = channels.find((c) => c.id === activeChannelId) ?? channels[0]

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-4 lg:flex-row">
      {/* Left: channel list */}
      <Card className="flex h-full w-full flex-col lg:w-72 lg:flex-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              Channels
            </CardTitle>
            <p className="mt-1 text-xs text-gray-500">Team chat inside your workspace</p>
          </div>
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 pt-0">
          <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1.5 text-xs">
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <Input
              placeholder="Search channels..."
              className="h-6 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
            />
          </div>
          <ScrollArea className="mt-1 flex-1">
            <div className="space-y-1">
              {channels.map((channel) => {
                const isActive = channel.id === activeChannelId
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setActiveChannelId(channel.id)}
                    className={`
                      flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs
                      ${isActive ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200" : "hover:bg-gray-50 dark:hover:bg-gray-900/40"}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="h-3 w-3 text-gray-400" />
                      <div>
                        <p className="font-medium">{channel.label}</p>
                        {channel.description && (
                          <p className="mt-0.5 line-clamp-1 text-[11px] text-gray-500 dark:text-gray-400">
                            {channel.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {channel.pinned && (
                        <Pin className="h-3 w-3 text-amber-500" />
                      )}
                      {channel.unread > 0 && (
                        <Badge className="px-1.5 py-0 text-[10px]" variant="outline">
                          {channel.unread}
                        </Badge>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right: messages */}
      <Card className="flex h-full flex-1 flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Hash className="h-4 w-4 text-gray-400" />
              {activeChannel.label}
            </CardTitle>
            <p className="mt-1 text-xs text-gray-500">{activeChannel.description}</p>
          </div>
          <Tabs defaultValue="team" className="hidden sm:block">
            <TabsList className="h-8">
              <TabsTrigger value="team" className="h-7 px-3 text-xs">
                <Users2 className="mr-1 h-3 w-3" />
                Team
              </TabsTrigger>
              <TabsTrigger value="system" className="h-7 px-3 text-xs">
                <Zap className="mr-1 h-3 w-3" />
                System
              </TabsTrigger>
            </TabsList>
            <TabsContent value="team" />
            <TabsContent value="system" />
          </Tabs>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 pt-0">
          <ScrollArea className="flex-1 rounded-md border bg-background/40 p-3">
            <div className="space-y-3 text-sm">
              {visibleMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="mt-0.5 h-7 w-7">
                    <AvatarFallback className="text-[11px]">
                      {message.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {message.author}
                      </span>
                      <span className="text-[11px] text-gray-500">{message.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form
            className="flex items-end gap-2 rounded-md border bg-background px-2 py-1.5"
            onSubmit={(e) => {
              e.preventDefault()
              setDraft("")
            }}
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message #${activeChannel.name}`}
              className="h-8 border-0 bg-transparent px-1 text-sm shadow-none focus-visible:ring-0"
            />
            <Button size="icon" type="submit" disabled={!draft.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


