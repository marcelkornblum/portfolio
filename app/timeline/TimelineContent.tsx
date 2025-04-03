"use client";

import { TimelineItem } from '@/lib/sanity';
import { format, parseISO } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

// This is now a client component
export default function TimelineContent({ timeline: initialTimeline, selectedItem, filters, handleItemClick, handleClosePane, handleFilterChange }: { timeline: TimelineItem[]; selectedItem: TimelineItem | null; filters: { type: string[]; employment: string[] }; handleItemClick: (item: TimelineItem) => void; handleClosePane: () => void; handleFilterChange: (filterType: string, value: string) => void }) {
    const [currentDate, setCurrentDate] = useState<string | null>(null);
    const timelineRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const observer = useRef<IntersectionObserver | null>(null);
    const fixedDateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateFixedDate = () => {
            const fixedDateRect = fixedDateRef.current?.getBoundingClientRect();
            if (!fixedDateRect) return;

            let closestItem: TimelineItem | null = null;
            let closestDistance = Infinity;

            timelineRefs.current.forEach((ref, id) => {
                if (ref) {
                    const itemRect = ref.getBoundingClientRect();
                    const distance = Math.abs(itemRect.top - fixedDateRect.top);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestItem = initialTimeline.find((item) => item._id === id) || null;
                    }
                }
            });

            if (closestItem && closestItem.startDate) {
                setCurrentDate(format(parseISO(closestItem.startDate), 'MMMM, yyyy'));
            }
        };

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                const target = entry.target as HTMLElement;
                if (entry.isIntersecting) {
                    target.classList.add('in-view');
                } else {
                    target.classList.remove('in-view');
                }
            });
            requestAnimationFrame(updateFixedDate);
        };

        observer.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.1, // Adjust the threshold
        });

        timelineRefs.current.forEach((ref) => {
            if (ref) {
                observer.current?.observe(ref);
            }
        });

        requestAnimationFrame(updateFixedDate);

        return () => {
            observer.current?.disconnect();
        };
    }, [initialTimeline]);

    const filteredTimeline = initialTimeline.filter((item) => {
        const typeMatch = filters.type.length === 0 || filters.type.includes(item.type.toLowerCase());
        const employmentMatch = filters.employment.length === 0 || (item.type === 'Experience' && filters.employment.includes(item.is_contract ? 'contract' : 'permanent'));
        return typeMatch && employmentMatch;
    });

    // const handleItemClick = (item: TimelineItem) => {
    //     handleItemClick(item);
    // };

    // const handleClosePane = () => {
    //     handleClosePane();
    // };

    return (
        <div className='timeline-container'>
            <div className="timeline-fixed-date" ref={fixedDateRef}>
                {currentDate}
            </div>
            <div className="timeline-filters">
                <div className="timeline-filter-group">
                    <button className={filters.type.includes('experience') ? 'active' : ''} onClick={() => handleFilterChange('type', 'experience')}>Experience</button>
                    <button className={filters.type.includes('project') ? 'active' : ''} onClick={() => handleFilterChange('type', 'project')}>Project</button>
                    <button className={filters.type.includes('education') ? 'active' : ''} onClick={() => handleFilterChange('type', 'education')}>Education</button>
                </div>
                <div className="timeline-filter-group">
                    <button className={filters.employment.includes('contract') ? 'active' : ''} onClick={() => handleFilterChange('employment', 'contract')}>Contract</button>
                    <button className={filters.employment.includes('permanent') ? 'active' : ''} onClick={() => handleFilterChange('employment', 'permanent')}>Permanent</button>
                </div>
            </div>
            <div className="timeline-items">
                {filteredTimeline.map((item) => {
                    console.log("item", item)
                    return (
                        <div
                            key={item.key}
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
                                        <Link href={`/company/${item.company?._id}`}>
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
