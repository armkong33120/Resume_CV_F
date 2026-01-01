import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/content';
import ProjectDetail from '@/components/ProjectDetail';
import LarkMigrationFlow from '@/components/LarkMigrationFlow';
import LarkImpact from '@/components/LarkImpact';

export default async function LarkMigrationPage() {
    const project = await getProjectBySlug('lark-platform-migration');

    if (!project) {
        notFound();
    }

    return (
        <ProjectDetail project={project}>
            <div className="mt-8 space-y-12">
                <LarkImpact />
                <LarkMigrationFlow />
            </div>
        </ProjectDetail>
    );
}

// Force Vercel Deploy: Triggering new build
