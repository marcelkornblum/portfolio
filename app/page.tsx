import { getAbout, getContact } from '@/lib/sanity';
import HomeContent from './HomeContent';
import { getTimeline } from '@/lib/sanity';
import TimelineWithState from './timeline/TimelineWithState';

export default async function Home() {
    const about = await getAbout();
    const contact = await getContact();
    const timeline = await getTimeline();

    return (
        <main>
            <HomeContent about={about} contact={contact} />
            <TimelineWithState timeline={timeline} />
        </main>
    );
}
