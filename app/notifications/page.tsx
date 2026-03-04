import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import NotificationsPageClient from "./notifications-client"

export const metadata: Metadata = {
    title: "Notifications - CMSFullForm Dashboard",
    description: "View and manage all your notifications.",
}

export default function NotificationsPage() {
    return (
        <Layout>
            <NotificationsPageClient />
        </Layout>
    )
}

