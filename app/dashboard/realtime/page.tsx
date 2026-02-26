import type { Metadata } from "next"
import Content from "@/components/dashboard/realtime-content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
    title: "Real-time Dashboard - CMSFullForm",
    description: "Real-time CMS analytics and live updates",
}

export default function RealtimePage() {
    return (
        <Layout>
            <Content />
        </Layout>
    )
}
