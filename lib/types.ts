export interface Profile {
  name: string;
  title: string;
  location: string;
  address?: string;
  birthday?: string;
  age?: string;
  summary: string;
  skills: {
    [category: string]: string[];
  };
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    dribbble?: string;
    email?: string;
    phone?: string;
    line?: string;
    [key: string]: string | undefined;
  };
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  coverImage: string;
  highlights: string[];
  problem: string;
  approach: string;
  results: string;
  galleryImages: string[];
  links: {
    [key: string]: string;
  };
}

export interface ProjectListItem {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  coverImage: string;
}

