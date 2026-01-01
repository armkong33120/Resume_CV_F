import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/content';
import ProjectDetail from '@/components/ProjectDetail';
import LarkProjectContent from '@/components/LarkProjectContent';

export default async function LarkMigrationPage() {
    const project = await getProjectBySlug('lark-platform-migration');

    if (!project) {
        notFound();
    }

    return (
        <ProjectDetail project={project}>
            <LarkProjectContent />
        </ProjectDetail>
    );
}

