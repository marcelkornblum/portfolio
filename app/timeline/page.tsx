"use client";

import { getTimeline, TimelineItem } from '@/lib/sanity';
import { format, parseISO } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

// This is now a server component
export default async function Timeline() {
    const timeline = await getTimeline();

    return (
        <main className="timeline">
            <TimelineContent timeline={timeline} />
        </main>
    );
}

// This is now a client component
function TimelineContent({ timeline }: { timeline: TimelineItem[] }) {
    const [currentDate, setCurrentDate] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null); // State for selected item
    const timelineRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleIntersection: IntersectionObserverCallback = (entries) => {
            let mostVisibleEntry: IntersectionObserverEntry | null = null;
            let maxRatio = 0;

            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    mostVisibleEntry = entry;
                }
            });

            if (mostVisibleEntry) {
                const id = mostVisibleEntry.target.id;
                const item = timeline.find((item) => item._id === id);
                if (item && item.startDate) {
                    setCurrentDate(format(parseISO(item.startDate), 'MMMM, yyyy'));
                }
            }
        };

        observer.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        timelineRefs.current.forEach((ref) => {
            if (ref) {
                observer.current?.observe(ref);
            }
        });

        return () => {
            observer.current?.disconnect();
        };
    }, [timeline]);

    const handleItemClick = (item: TimelineItem) => {
        setSelectedItem(item); // Set the selected item
    };

    const handleClosePane = () => {
        setSelectedItem(null); // Clear the selected item
    };

    return (
        <div className='timeline-container'>
            <div className="timeline-fixed-date">
                {currentDate}
            </div>
            <div className="timeline-items">
                {timeline.map((item) => {
                    console.log("item", item)
                    return (
                        <div
                            key={item._id}
                            id={item._id}
                            className="timeline-item"
                            ref={(el) => timelineRefs.current.set(item._id, el as HTMLDivElement)}
                            onClick={() => handleItemClick(item)} // Add click handler
                        >
                            <div className="timeline-item-date">
                                {item.startDate ? format(parseISO(item.startDate), 'MMMM, yyyy') : 'No Date'}
                            </div>
                            <div className="timeline-item-content">
                                <h3 className="timeline-item-title">
                                    {item.type === 'Experience' ? (
                                        <Link href={`/company/${item.company?._id}`}> {/* Changed to _id */}
                                            {`${item.role} @ ${item.company?.name}`}
                                        </Link>
                                    ) : item.type === 'Project' ? (
                                        item.projectTitle
                                    ) : item.type === 'Education' ? (
                                        item.course ? `${item.course} @ ${item.institution}` : `${item.institution}`
                                    ) : null}
                                </h3>
                                <div className="timeline-item-tags">
                                    {item.type === 'Experience' && item.company?.sector && (
                                        <span className="timeline-item-tag">{item.company.sector}</span>
                                    )}
                                    {item.type === 'Experience' && item.is_contract && (
                                        <span className="timeline-item-tag">Contract</span>
                                    )}
                                    {item.type === 'Experience' && !item.is_contract && (
                                        <span className="timeline-item-tag">Permanent</span>
                                    )}
                                </div>
                                {item.summary && (
                                    <div className='timeline-item-summary'>
                                        <PortableText value={item.summary} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            {selectedItem && <DetailPane item={selectedItem} onClose={handleClosePane} />} {/* Render DetailPane */}
        </div>
    );
}

function DetailPane({ item, onClose }: { item: TimelineItem; onClose: () => void }) {
    return (
        <div className="detail-pane">
            <button className="detail-pane-close" onClick={onClose}>
                Close
            </button>
            <div className="detail-pane-content">
                <h2 className="detail-pane-title">
                    {item.type === 'Experience' ? (
                        <>
                            {item.company?.logo && (
                                <Image
                                    src={item.company.logo.asset.url}
                                    alt={item.company.name}
                                    width={50}
                                    height={50}
                                />
                            )}
                            {`${item.role} @ ${item.company?.name}`}
                        </>
                    ) : item.type === 'Project' ? (
                        item.projectTitle
                    ) : item.type === 'Education' ? (
                        item.course ? `${item.course} @ ${item.institution}` : `${item.institution}`
                    ) : null}
                </h2>
                <p className="detail-pane-date">
                    {item.startDate ? format(parseISO(item.startDate), 'MMMM, yyyy') : 'No Date'}
                    {item.endDate && ` - ${format(parseISO(item.endDate), 'MMMM, yyyy')}`}
                </p>
                {item.details && (
                    <div className="detail-pane-details">
                        <PortableText value={item.details} />
                    </div>
                )}
            </div>
        </div>
    );
}
