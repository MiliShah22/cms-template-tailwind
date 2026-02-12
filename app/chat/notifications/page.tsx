import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ChatNotifications } from "@/components/chat/notifications"

export const metadata: Metadata = {
  title: "Chat Notifications - CMSFullForm Dashboard",
  description: "Review chat-related notifications and mentions.",
}

export default function ChatNotificationsPage() {
  return (
    <Layout>
      <ChatNotifications />
    </Layout>
  )
}


