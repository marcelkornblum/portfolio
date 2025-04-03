import { getSkills, Skill } from '@/lib/sanity';
import SkillsContent from './SkillsContent';

// This is now a Server Component
export default async function Skills() {
    const skills = await getSkills();

    return (
        <main>
            <SkillsContent skills={skills} />
        </main>
    );
}
