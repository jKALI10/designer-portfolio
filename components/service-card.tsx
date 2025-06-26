import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, FileText, Film, Monitor, Palette, PenTool, Paintbrush } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = getIconComponent(icon)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconComponent className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function getIconComponent(iconName: string) {
  switch (iconName) {
    case "Palette":
      return Palette
    case "PenTool":
      return PenTool
    case "FileText":
      return FileText
    case "Monitor":
      return Monitor
    case "Compass":
      return Compass
    case "Film":
      return Film
    case "Paintbrush":
      return Paintbrush
    default:
      return Palette
  }
}
