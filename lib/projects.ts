export interface Project {
  id: number;
  slug: string;
  title: string;
  coverImage: string;
  detailImage: string;
  galleryImages?: string[];
}

export const allProjects: Project[] = [
  {
    id: 1,
    slug: "project-1",
    title: "Visit Ethiopia poster design",
    coverImage: "/Visit-Eth.jpg?height=400&width=600",
    detailImage: "/Visit-Eth2.jpg?height=800&width=1200",
  },
  {
    id: 2,
    slug: "project-2",
    title: "Feel the Vibe poster design",
    coverImage: "/feel.jpg?height=500&width=400",
    detailImage: "/feel2.jpg?height=900&width=1100",
  },
  {
    id: 3,
    slug: "project-3",
    title: "Zena Logo design",
    coverImage: "/zena-wh.jpg?height=600&width=500",
    detailImage: "/mock.jpg?height=1000&width=1300",
    galleryImages: [
      "/zena1.jpg?height=800&width=600",
      "/zena2.jpg?height=800&width=600",
      "/zena3.jpg?height=800&width=600",
    ],
  },
  // {
  //   id: 4,
  //   slug: "project-4",
  //   title: "Creative Design 4",
  //   coverImage: "/placeholder.svg?height=450&width=650",
  //   detailImage: "/placeholder.svg?height=850&width=1250",
  // },
  // {
  //   id: 5,
  //   slug: "project-5",
  //   title: "Creative Design 5",
  //   coverImage: "/placeholder.svg?height=550&width=450",
  //   detailImage: "/placeholder.svg?height=950&width=1150",
  // },
  // {
  //   id: 6,
  //   slug: "project-6",
  //   title: "Creative Design 6",
  //   coverImage: "/placeholder.svg?height=400&width=700",
  //   detailImage: "/placeholder.svg?height=800&width=1400",
  // },
  // {
  //   id: 7,
  //   slug: "project-7",
  //   title: "Creative Design 7",
  //   coverImage: "/placeholder.svg?height=500&width=550",
  //   detailImage: "/placeholder.svg?height=900&width=1200",
  // },
  // {
  //   id: 8,
  //   slug: "project-8",
  //   title: "Creative Design 8",
  //   coverImage: "/placeholder.svg?height=600&width=400",
  //   detailImage: "/placeholder.svg?height=1000&width=1100",
  // },
  // {
  //   id: 9,
  //   slug: "project-9",
  //   title: "Creative Design 9",
  //   coverImage: "/placeholder.svg?height=450&width=600",
  //   detailImage: "/placeholder.svg?height=850&width=1300",
  // },
  // {
  //   id: 10,
  //   slug: "project-10",
  //   title: "Creative Design 10",
  //   coverImage: "/placeholder.svg?height=550&width=500",
  //   detailImage: "/placeholder.svg?height=950&width=1250",
  // },
];

export const featuredProjects: Project[] = allProjects.slice(0, 3);

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}
