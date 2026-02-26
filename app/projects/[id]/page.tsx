import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ProjectDetailContent } from "@/components/projects/project-detail-content"

export const metadata: Metadata = {
    title: "Project Details - CMSFullForm Dashboard",
    description: "View and manage project details.",
}

interface ProjectDetailPageProps {
    params: {
        id: string
    }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    return (
        <Layout>
            <ProjectDetailContent projectId={params.id} />
        </Layout>
    )
}
