import { getTimeline, TimelineItem } from '@/lib/sanity';
import TimelineContent from './TimelineContent';
import TimelineWithState from './TimelineWithState';

// This is now a server component
export default async function Timeline() {
    const timeline = await getTimeline();
    return (
        <main className="timeline">
            <TimelineWithState timeline={timeline} />
        </main>
    );
}
