import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { MembersContent } from "@/components/members/content"

export const metadata: Metadata = {
    title: "Members - CMSFullForm Dashboard",
    description: "Manage team members and roles.",
}

export default function MembersPage() {
    return (
        <Layout>
            <MembersContent />
        </Layout>
    )
}
