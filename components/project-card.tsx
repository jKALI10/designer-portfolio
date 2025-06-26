import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  category?: string
  imageSrc: string
  href: string
}

export function ProjectCard({ title, imageSrc, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group">
      <div className="overflow-hidden rounded-lg bg-card border transition-all hover:shadow-md">
        <div className="relative overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            width={300}
            height={200}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm md:text-base truncate">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">View details</p>
        </div>
      </div>
    </Link>
  )
}
