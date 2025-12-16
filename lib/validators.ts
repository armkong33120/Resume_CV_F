import { Profile, Project, LocalizedText } from './types';

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isLocalizedText(value: unknown): value is LocalizedText {
  return (
    isRecord(value) &&
    typeof value.en === 'string' &&
    typeof value.th === 'string'
  );
}

function isLocalizedTextArray(value: unknown): value is LocalizedText[] {
  return Array.isArray(value) && value.every(isLocalizedText);
}

export function validateProfile(data: unknown): Profile {
  if (!isRecord(data)) {
    throw new Error('Profile must be an object');
  }

  if (!isLocalizedText(data.name)) throw new Error('Profile.name is required (en/th)');
  if (!isLocalizedText(data.title)) throw new Error('Profile.title is required (en/th)');
  if (!isLocalizedText(data.location)) throw new Error('Profile.location is required (en/th)');
  if (!isLocalizedText(data.summary)) throw new Error('Profile.summary is required (en/th)');

  if (!isRecord(data.skills)) {
    throw new Error('Profile.skills must be an object');
  }

  for (const [key, value] of Object.entries(data.skills)) {
    if (!isLocalizedTextArray(value)) {
      throw new Error(`Profile.skills.${key} must be an array of LocalizedText objects`);
    }
  }

  if (!isRecord(data.social)) {
    throw new Error('Profile.social must be an object');
  }

  return {
    name: data.name as LocalizedText,
    title: data.title as LocalizedText,
    location: data.location as LocalizedText,
    address: isLocalizedText(data.address) ? data.address : undefined,
    birthday: isString(data.birthday) ? data.birthday : undefined,
    age: isString(data.age) ? data.age : undefined,
    summary: data.summary as LocalizedText,
    skills: data.skills as Record<string, LocalizedText[]>,
    social: data.social as Record<string, string | undefined>,
  };
}

export function validateProject(data: unknown): Project {
  if (!isRecord(data)) {
    throw new Error('Project must be an object');
  }

  if (!isString(data.slug)) throw new Error('Project.slug is required');
  if (!isLocalizedText(data.title)) throw new Error('Project.title is required (en/th)');
  if (!isLocalizedText(data.tagline)) throw new Error('Project.tagline is required (en/th)');
  if (!isString(data.year)) throw new Error('Project.year is required');
  if (!isLocalizedText(data.role)) throw new Error('Project.role is required (en/th)');
  if (!isStringArray(data.stack)) throw new Error('Project.stack must be an array of strings');
  if (!isString(data.coverImage)) throw new Error('Project.coverImage is required');
  if (!isLocalizedTextArray(data.highlights)) throw new Error('Project.highlights must be an array of LocalizedText');
  if (!isLocalizedText(data.problem)) throw new Error('Project.problem is required (en/th)');
  if (!isLocalizedText(data.approach)) throw new Error('Project.approach is required (en/th)');
  if (!isLocalizedText(data.results)) throw new Error('Project.results is required (en/th)');
  if (!isStringArray(data.galleryImages)) throw new Error('Project.galleryImages must be an array of strings');

  if (!isRecord(data.links)) {
    throw new Error('Project.links must be an object');
  }

  return {
    slug: data.slug,
    title: data.title as LocalizedText,
    tagline: data.tagline as LocalizedText,
    year: data.year,
    role: data.role as LocalizedText,
    stack: data.stack,
    coverImage: data.coverImage,
    highlights: data.highlights as LocalizedText[],
    problem: data.problem as LocalizedText,
    approach: data.approach as LocalizedText,
    results: data.results as LocalizedText,
    galleryImages: data.galleryImages,
    links: data.links as Record<string, string>,
  };
}

export function validateProjects(data: unknown): Project[] {
  if (!Array.isArray(data)) {
    throw new Error('Projects must be an array');
  }

  return data.map((item, index) => {
    try {
      return validateProject(item);
    } catch (error) {
      throw new Error(`Invalid project at index ${index}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });
}

