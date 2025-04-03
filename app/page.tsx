import { getAbout, getContact } from '@/lib/sanity';
import HomeContent from './HomeContent';

// This is now a Server Component
export default async function Home() {
    const about = await getAbout();
    const contact = await getContact();

    return (
        <main>
            <HomeContent about={about} contact={contact} />
        </main>
    );
}
