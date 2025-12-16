import { getProjects } from '@/lib/content';
import WorkContent from '@/components/WorkContent';

export default async function WorkPage() {
  const projects = await getProjects();

  return <WorkContent initialProjects={projects} />;
}

