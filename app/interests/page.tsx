import { getInterests, Interest } from '@/lib/sanity';
import InterestsContent from './InterestsContent';

// This is now a Server Component
export default async function Interests() {
    const interests = await getInterests();

    return (
        <main>
            <InterestsContent interests={interests} />
        </main>
    );
}
