import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
//import { ContactForm } from "@/components/contact-form";
import {
  ArrowRight,
  Instagram,
  Twitter,
  Linkedin,
  Dribbble,
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ServiceCard } from "@/components/service-card";
import { MobileNav } from "@/components/mobile-nav";
import { HeroBackground } from "@/components/hero-background";
import { featuredProjects } from "@/lib/projects";

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight">
            MOT-IV<span className="text-primary">STUDIO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="#work"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Work
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Interactive Background */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          <HeroBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background/5 dark:from-primary/5 dark:to-background/0" />
          <div className="absolute inset-0 backdrop-blur-[80px]" />
          <div className="container relative z-10 px-4 md:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 py-10 md:py-16 lg:py-20">
            <div className="flex flex-col justify-center space-y-6 lg:w-1/2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 backdrop-blur-md px-3 py-1 text-sm text-primary">
                  Graphic Designer
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Crafting Visual <span className="text-primary">Stories</span>{" "}
                  That Inspire
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Creating bold, innovative designs that elevate brands and
                  captivate audiences.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  asChild
                  className="backdrop-blur-sm bg-primary/90"
                >
                  <Link href="/portfolio">
                    Let's Design <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="backdrop-blur-sm bg-background/50"
                >
                  <Link href="/portfolio">View Portfolio</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-square overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-br from-primary/20 via-background/40 to-primary/10 p-1">
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
                <div className="h-full w-full rounded-lg flex items-center justify-center">
                  <div className="text-center p-8 backdrop-blur-sm bg-background/30 rounded-xl border border-primary/20">
                    <h2 className="text-3xl font-bold mb-4">
                      MO-TIV Design Solutions
                    </h2>
                    <p className="text-muted-foreground">
                      Product Design • Poster Design • Illustration • Print •
                      Logo Design
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        <section id="work" className="py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Portfolio
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Featured Work
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  A selection of my recent projects across branding, poster
                  design, and illustration.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  imageSrc={project.coverImage}
                  href={`/portfolio/${project.slug}`}
                />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/mo.png?height=800&width=800"
                  alt="Designer portrait"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  About Me
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Passionate about creating visual experiences that matter
                </h2>
                <p className="text-muted-foreground"></p>
                <p className="text-muted-foreground">
                  I’m passionate about graphic design and inspired by the power
                  of visual storytelling. I enjoy creating thoughtful, clean,
                  and impactful designs that communicate clearly and creatively.
                  Whether it’s working on logos,Product design, layouts, or
                  digital graphics, I’m always eager to challenge myself and
                  improve my craft.
                </p>
                <div className="space-y-2">
                  <h3 className="font-medium">Area of Interest</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Product Design",
                      "Poster Design",
                      "Logo Design",
                      "Typography",
                      "Print Design",
                      "Illustration",
                    ].map((skill) => (
                      <div
                        key={skill}
                        className="rounded-full bg-muted px-3 py-1 text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section
        <section id="services" className="py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What I Offer
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Comprehensive design solutions tailored to your specific needs
                  and goals.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Poster Design"
                description="Create eye-catching posters and promotional materials that communicate your message effectively and attract attention."
                icon="Palette"
              />
              <ServiceCard
                title="Logo Design"
                description="Create distinctive, memorable logos that capture your brand essence and stand out in the marketplace."
                icon="PenTool"
              />
              <ServiceCard
                title="Print Design"
                description="Design impactful print materials from business cards and brochures to packaging and large format displays."
                icon="FileText"
              />
              <ServiceCard
                title="Digital Design"
                description="Craft compelling digital assets for social media, email campaigns, and digital advertising."
                icon="Monitor"
              />
              <ServiceCard
                title="Illustration"
                description="Custom illustrations that bring your ideas to life with unique artistic style and visual storytelling."
                icon="Paintbrush"
              />
            </div>
          </div>
        </section> */}

        {/* Process Section
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How I Work
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  A collaborative approach focused on achieving your goals
                  through thoughtful design.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Discovery</h3>
                <p className="text-muted-foreground">
                  Understanding your goals, audience, and competitive landscape.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Strategy</h3>
                <p className="text-muted-foreground">
                  Developing a creative approach that aligns with your
                  objectives.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Design</h3>
                <p className="text-muted-foreground">
                  Creating visual solutions through an iterative process.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <h3 className="text-xl font-bold">Delivery</h3>
                <p className="text-muted-foreground">
                  Finalizing and implementing designs across all required
                  platforms.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Contact
                </div>
                {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Let's create something amazing together
                </h2> */}
                {/* <p className="text-muted-foreground">
                  I'm currently available for freelance projects,
                  collaborations, and consulting opportunities. If you have a
                  project in mind or just want to chat about design, I'd love to
                  hear from you.
                </p> */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-mail"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        edenroba3@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Virginia, USA
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex gap-4">
                  <Link
                    href="#"
                    className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Behance</span>
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/edenn/"
                    className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="https://dribbble.com/MO-TIV"
                    className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors"
                  >
                    <Dribbble className="h-5 w-5" />
                    <span className="sr-only">Dribbble</span>
                  </Link>
                </div> */}
              </div>
              {/* <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className="flex flex-col space-y-1.5 pb-6">
                  <h3 className="font-semibold tracking-tight text-2xl">
                    Get in Touch
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below to start a conversation.
                  </p>
                </div>
                <ContactForm />
              </div> */}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:h-24">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <Link href="/" className="font-bold text-lg tracking-tight">
              MO-TIV<span className="text-primary">STUDIO</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MO-TIVStudio. All rights
              reserved.
            </p>
          </div>
          {/* <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://dribbble.com/MO-TIV"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Dribbble className="h-5 w-5" />
              <span className="sr-only">Dribbble</span>
            </Link>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
