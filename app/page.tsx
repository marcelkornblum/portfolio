import { getAbout, getContacts } from '@/lib/sanity';
import HomeContent from './HomeContent';
import { getTimeline } from '@/lib/sanity';
import TimelineWithState from './timeline/TimelineWithState';

export default async function Home() {
    const about = await getAbout();
    const contacts = await getContacts();
    const timeline = await getTimeline();

    return (
        <main>
            <HomeContent about={about} contacts={contacts} />
            <TimelineWithState timeline={timeline} />
        </main>
    );
}
