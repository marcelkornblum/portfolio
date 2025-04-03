import { getAwards, Award } from '@/lib/sanity';
import AwardsContent from './AwardsContent';

// This is now a Server Component
export default async function Awards() {
    const awards = await getAwards();

    return (
        <main>
            <AwardsContent awards={awards} />
        </main>
    );
}
