import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ProjectDetailContent } from "@/components/projects/project-detail-content"

export const metadata: Metadata = {
    title: "Project Details - CMSFullForm Dashboard",
    description: "View and manage project details.",
}

interface ProjectDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { id } = await params
    return (
        <Layout>
            <ProjectDetailContent projectId={id} />
        </Layout>
    )
}

