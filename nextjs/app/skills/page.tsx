import { getSkills } from '@/lib/sanity';
import Skill from '../components/Skill';

export default async function SkillsPage() {
    const skills = await getSkills();

    return (
        <main className='skills'>
            <h1>Skills</h1>
            <div className='skills-list'>
                {skills.map((skill) => (
                    <Skill key={skill._id} skill={skill} />
                ))}
            </div>
        </main>
    );
}
