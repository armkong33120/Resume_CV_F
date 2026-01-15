export interface LocalizedText {
  en: string;
  th: string;
}

export interface Education {
  institution: LocalizedText;
  period: string;
  degree: LocalizedText;
  field: LocalizedText;
}

export interface Profile {
  name: LocalizedText;
  title: LocalizedText;
  location: LocalizedText;
  address?: LocalizedText;
  birthday?: string;
  age?: string;
  summary: LocalizedText;
  education?: Education[];
  skills: {
    [category: string]: LocalizedText[];
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
  title: LocalizedText;
  tagline: LocalizedText;
  year: string;
  role: LocalizedText;
  stack: string[];
  coverImage: string;
  highlights: LocalizedText[];
  problem: LocalizedText;
  approach: LocalizedText;
  results: LocalizedText;
  galleryImages: string[];
  links: {
    [key: string]: string;
  };
}

export interface ProjectListItem {
  slug: string;
  title: LocalizedText;
  tagline: LocalizedText;
  year: string;
  role: LocalizedText;
  stack: string[];
  coverImage: string;
}

