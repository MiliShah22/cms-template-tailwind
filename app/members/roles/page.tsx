import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { MembersRolesContent } from "@/components/members/roles-content"

export const metadata: Metadata = {
    title: "Member Roles - CMSFullForm Dashboard",
    description: "Manage member roles and permissions.",
}

export default function MembersRolesPage() {
    return (
        <Layout>
            <MembersRolesContent />
        </Layout>
    )
}
