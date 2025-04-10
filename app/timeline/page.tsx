import { getTimeline } from '@/lib/sanity';
import TimelineWithState from './TimelineWithState';

export default async function Timeline() {
    const timeline = await getTimeline();
    return (
        <TimelineWithState timeline={timeline} />
    );
}
