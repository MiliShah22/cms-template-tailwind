import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { MeetingsContent } from "@/components/meetings/content"

export const metadata: Metadata = {
    title: "Meetings - CMSFullForm Dashboard",
    description: "Manage meetings and video conferences.",
}

export default function MeetingsPage() {
    return (
        <Layout>
            <MeetingsContent />
        </Layout>
    )
}
