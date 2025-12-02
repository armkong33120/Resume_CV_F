import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/content';
import { ProjectListItem } from '@/lib/types';

export async function GET() {
  try {
    const projects = await getProjects();
    // Return minimal data for list view
    const listItems: ProjectListItem[] = projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      tagline: p.tagline,
      year: p.year,
      role: p.role,
      stack: p.stack,
      coverImage: p.coverImage,
    }));

    return NextResponse.json(listItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

