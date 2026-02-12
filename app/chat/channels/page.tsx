import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ChatChannels } from "@/components/chat/channels"

export const metadata: Metadata = {
  title: "Chat Channels - CMSFullForm Dashboard",
  description: "Team channels for collaborating inside CMSFullForm.",
}

export default function ChatChannelsPage() {
  return (
    <Layout>
      <ChatChannels />
    </Layout>
  )
}


