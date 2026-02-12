import type { Metadata } from "next"
import Layout from "@/components/cmsfullform/layout"
import { ProjectsContent } from "@/components/projects/content"

export const metadata: Metadata = {
  title: "Projects - CMSFullForm Dashboard",
  description: "Track CMS implementation and campaign projects.",
}

export default function ProjectsPage() {
  return (
    <Layout>
      <ProjectsContent />
    </Layout>
  )
}


