import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/content';
import ProjectDetail from '@/components/ProjectDetail';
import LarkMigrationFlow from '@/components/LarkMigrationFlow';

export default async function LarkMigrationPage() {
    const project = await getProjectBySlug('lark-platform-migration');

    if (!project) {
        notFound();
    }

    return (
        <ProjectDetail project={project}>
            <div className="mt-8">
                <LarkMigrationFlow />
            </div>
        </ProjectDetail>
    );
}
