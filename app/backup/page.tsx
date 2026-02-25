import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { BackupContent } from "@/components/backup/content"

export const metadata: Metadata = {
    title: "Backup - CMSFullForm Dashboard",
    description: "Manage backups and restore points.",
}

export default function BackupPage() {
    return (
        <Layout>
            <BackupContent />
        </Layout>
    )
}
