"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, Send } from "lucide-react"

interface DirectThread {
  id: string
  name: string
  initials: string
  lastMessage: string
  time: string
  unread: number
}

interface DirectMessage {
  id: string
  threadId: string
  fromMe: boolean
  content: string
  time: string
}

const threads: DirectThread[] = [
  {
    id: "jane",
    name: "Jane Cooper",
    initials: "JC",
    lastMessage: "I'll send you the latest sitemap export.",
    time: "08:41",
    unread: 0,
  },
  {
    id: "cody",
    name: "Cody Fisher",
    initials: "CF",
    lastMessage: "The invoices page looks great now.",
    time: "Yesterday",
    unread: 2,
  },
  {
    id: "kristin",
    name: "Kristin Watson",
    initials: "KW",
    lastMessage: "Can we enable Super Cache in staging?",
    time: "Mon",
    unread: 0,
  },
]

const dmMessages: DirectMessage[] = [
  {
    id: "dm1",
    threadId: "cody",
    fromMe: false,
    content: "The invoices page looks great now.",
    time: "08:21",
  },
  {
    id: "dm2",
    threadId: "cody",
    fromMe: true,
    content: "Nice! I'll connect it to Stripe test data next.",
    time: "08:24",
  },
  {
    id: "dm3",
    threadId: "cody",
    fromMe: false,
    content: "Perfect. Ping me when it's ready for QA.",
    time: "08:30",
  },
]

export function ChatDM() {
  const [activeThreadId, setActiveThreadId] = useState<string>("cody")
  const [draft, setDraft] = useState("")

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? threads[0]
  const visibleMessages = dmMessages.filter((m) => m.threadId === activeThreadId)

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-4 lg:flex-row">
      {/* Left: people list */}
      <Card className="flex h-full w-full flex-col lg:w-72 lg:flex-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              Direct messages
            </CardTitle>
            <p className="mt-1 text-xs text-gray-500">1:1 chats with your team</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 pt-0">
          <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1.5 text-xs">
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <Input
              placeholder="Search people..."
              className="h-6 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
            />
          </div>
          <ScrollArea className="mt-1 flex-1">
            <div className="space-y-1">
              {threads.map((thread) => {
                const isActive = thread.id === activeThreadId
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`
                      flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs
                      ${isActive ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200" : "hover:bg-gray-50 dark:hover:bg-gray-900/40"}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-[11px]">
                          {thread.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{thread.name}</p>
                        <p className="mt-0.5 line-clamp-1 text-[11px] text-gray-500 dark:text-gray-400">
                          {thread.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] text-gray-400">{thread.time}</span>
                      {thread.unread > 0 && (
                        <Badge className="px-1.5 py-0 text-[10px]" variant="outline">
                          {thread.unread}
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

      {/* Right: conversation */}
      <Card className="flex h-full flex-1 flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {activeThread.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm font-medium">
                {activeThread.name}
              </CardTitle>
              <p className="text-[11px] text-gray-500">Typically replies in a few minutes</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 pt-0">
          <ScrollArea className="flex-1 rounded-md border bg-background/40 p-3">
            <div className="space-y-2 text-sm">
              {visibleMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[70%] rounded-lg px-3 py-2 text-xs
                      ${message.fromMe ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900 dark:bg-gray-900/60 dark:text-gray-100"}
                    `}
                  >
                    <p>{message.content}</p>
                    <span className="mt-1 block text-[10px] opacity-70 text-right">
                      {message.time}
                    </span>
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
              placeholder={`Message ${activeThread.name}`}
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


