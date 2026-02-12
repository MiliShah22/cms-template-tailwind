import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ChatDM } from "@/components/chat/dm"

export const metadata: Metadata = {
  title: "Direct Messages - CMSFullForm Dashboard",
  description: "1:1 conversations with your team inside CMSFullForm.",
}

export default function ChatDMPage() {
  return (
    <Layout>
      <ChatDM />
    </Layout>
  )
}


