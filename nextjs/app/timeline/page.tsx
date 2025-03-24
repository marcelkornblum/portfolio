import { getExperiences } from '@/lib/sanity';
import Timeline from '../components/Timeline';

export default async function TimelinePage() {
    const experiences = await getExperiences();

    return (
        <main>
            <Timeline experiences={experiences} />
        </main>
    );
}
