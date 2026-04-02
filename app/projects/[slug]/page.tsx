import { notFound } from 'next/navigation'
import { PROJECTS } from '@/lib/projects'
import ProjectDetail from './_ProjectDetail'

export function generateStaticParams() {
  return PROJECTS.filter(p => !p.comingSoon).map(p => ({ slug: p.slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find(p => p.slug === params.slug)
  if (!project || project.comingSoon) notFound()
  return <ProjectDetail project={project} />
}
