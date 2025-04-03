import { getAwards } from '@/lib/sanity';
import Award from '../components/Award';

export default async function AwardsPage() {
    const awards = await getAwards();

    return (
        <main className='awards'>
            <h1>Awards</h1>
            <div className='awards-list'>
                {awards.map((award: Award) => (
                    <Award key={award._id} award={award} />
                ))}
            </div>
        </main>
    );
}
