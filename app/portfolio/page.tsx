import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { allProjects } from "@/lib/projects";
import { ArrowLeft } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="py-8 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4 mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Portfolio
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Explore my design work and visual projects.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {allProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg bg-card border transition-all hover:shadow-md">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.coverImage || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm md:text-base truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Explore Design
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MO-TIVStudio. All rights reserved.
          </p>
          <Button variant="outline" asChild>
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
