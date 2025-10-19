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
  cyclopedia: {
    name: "LiFo-Cyclopedia",
    icon: BookOpen,
    href: "/cyclopedia"
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
        { name: "LiFo-Cyclopedia", href: pageConfigs.cyclopedia.href, icon: pageConfigs.cyclopedia.icon }
      ] as NavigationItem[]
    },
    menu: "Menu"
  },

  sections: pageConfigs,

  strings: {
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
    }
  }
} as const;

// Export individual configs for convenience
export const { navbar, sections, strings } = siteConfig;
export { pageConfigs };
