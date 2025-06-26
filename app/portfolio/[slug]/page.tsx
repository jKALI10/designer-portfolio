import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, allProjects } from "@/lib/projects"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  // Find next and previous projects for navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Header */}
        <section className="py-6 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/portfolio">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </Link>
              </Button>
              <h1 className="text-xl md:text-2xl font-bold">{project.title}</h1>
              <div className="w-[120px]"></div> {/* Spacer for centering */}
            </div>
          </div>
        </section>

        {/* Main Image */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={project.detailImage || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain bg-gray-50"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 border-t bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center max-w-3xl mx-auto">
              <Link
                href={`/portfolio/${prevProject.slug}`}
                className="group flex items-center gap-2 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Previous</p>
                  <p className="font-medium text-sm md:text-base">{prevProject.title}</p>
                </div>
              </Link>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {currentIndex + 1} of {allProjects.length}
                </p>
              </div>

              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="group flex items-center gap-2 hover:text-primary transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Next</p>
                  <p className="font-medium text-sm md:text-base">{nextProject.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DesignStudio. All rights reserved.
          </p>
          <Button variant="outline" asChild>
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </div>
      </footer>
    </div>
  )
}
