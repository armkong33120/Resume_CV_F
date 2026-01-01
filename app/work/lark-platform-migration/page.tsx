import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/content';
import ProjectDetail from '@/components/ProjectDetail';

const LarkMigrationFlow = dynamic(() => import('@/components/LarkMigrationFlow'), { ssr: false });
const LarkImpact = dynamic(() => import('@/components/LarkImpact'), { ssr: false });

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
