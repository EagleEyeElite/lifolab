import {
  LucideIcon,
  Pencil,
  Users,
  Globe,
  Mail,
  FolderOpen,
  BookOpen,
  Tag,
} from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface PageConfig {
  name: string;
  icon: LucideIcon;
  href: string;
  id?: string;
}

// Single source of truth for all page/section configurations
const pageConfigs: Record<string, PageConfig> = {
  about: {
    name: "About",
    icon: Pencil,
    href: "/about"
  },
  people: {
    name: "People", 
    icon: Users,
    href: "/#people",
    id: "people"
  },
  places: {
    name: "Places",
    icon: Globe,
    href: "/#places",
    id: "places"
  },
  projects: {
    name: "Projects",
    icon: FolderOpen,
    href: "/#projects",
    id: "projects"
  },
  index: {
    name: "LiFo-Index",
    icon: BookOpen,
    href: "/lifo-index"
  },
  contact: {
    name: "Contact",
    icon: Mail,
    href: "/#footer"
  },
  tags: {
    name: "Categories",
    icon: Tag,
    href: "/categories"
  }
} as const;

export const siteConfig = {
  metadata: {
    title: "Living the Forest Lab",
    description: `
    Living the Forest Lab is a research initiative of the Faculty of 
    Electrical Engineering and Computer Science at TU Berlin, promoting 
    transdisciplinary forest conservation through experimental projects that 
    connect open-source communities with students and experts to develop 
    prototype solutions for climate change and biodiversity preservation.
  `.replace(/\s+/g, ' ').trim()
  },

  navbar: {
    livingTheForestLab: {
      title: "Living the Forest Lab",
      links: [
        pageConfigs.about,
        pageConfigs.people,
        pageConfigs.places,
        pageConfigs.contact
      ] as NavigationItem[]
    },
    activities: {
      title: "Activities",
      links: [
        pageConfigs.projects,
        pageConfigs.tags,
        { name: "LiFo-Index", href: pageConfigs.index.href, icon: pageConfigs.index.icon }
      ] as NavigationItem[]
    },
    menu: "Menu"
  },

  sections: pageConfigs,

  strings: {
    // Brand and company information
    brand: {
      name: "Living the Forest Lab",
      fullName: "Living the Forest Lab | Reallabor Wald",
      copyright: "Copyright: Living the Forest Lab | Reallabor Wald"
    },

    // Section-specific strings
    people: {
      teamTitle: "Living the Forest Lab Team",
      collaborationsTitle: "Collaborations"
    },
    tags: {
      categories: "Categories",
      category: "Category",
      noProjectsFound: "No projects found for this category.",
      categoryNotFound: "Category not found",
      categoryNotFoundMessage: "The requested category does not exist.",
    },
    notFound: {
      title: "Page Not Found",
      backToHome: "Back to Home",
    },
    postOverView: {
      collaborators: "Collaborators",
    },
    navigation: {
      scrollToExplore: "Scroll to explore"
    },

    // Footer strings
    footer: {
      addressNotAvailable: "Address not available"
    },

    // UI component strings
    ui: {
      loading: "Loading...",
      categoriesLabel: "Categories:",
      noCategoryProjects: "No projects found for this category.",
      showMore: "Show more",
      showLess: "Show less"
    },

    // Accessibility / Alt text strings
    altText: {
      logo: "Living the Forest Lab",
      featuredImage: "Featured image",
      genericImage: "image",
      indexEntry: "Index entry",
      imprintImage: "Imprint Image"
    }
  }
} as const;

// Export individual configs for convenience
export const { metadata, navbar, sections, strings } = siteConfig;
export { pageConfigs };
