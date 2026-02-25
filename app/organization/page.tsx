import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { OrganizationContent } from "@/components/organization/content"

export const metadata: Metadata = {
    title: "Organization - CMSFullForm Dashboard",
    description: "Manage your organization settings and team.",
}

export default function OrganizationPage() {
    return (
        <Layout>
            <OrganizationContent />
        </Layout>
    )
}
