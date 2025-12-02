import { readFile } from 'fs/promises';
import { join } from 'path';
import { Profile, Project } from './types';
import { validateProfile, validateProject, validateProjects } from './validators';

let cachedProfile: Profile | null = null;
let cachedProjects: Project[] | null = null;

const contentDir = join(process.cwd(), 'content');

export async function getProfile(): Promise<Profile> {
  if (cachedProfile) {
    return cachedProfile;
  }

  try {
    const filePath = join(contentDir, 'profile.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    cachedProfile = validateProfile(data);
    return cachedProfile;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error('Profile content file not found');
    }
    throw new Error(`Failed to load profile: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getProjects(): Promise<Project[]> {
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    const filePath = join(contentDir, 'projects.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    cachedProjects = validateProjects(data);
    return cachedProjects;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error('Projects content file not found');
    }
    throw new Error(`Failed to load projects: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

