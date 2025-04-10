"use client";

import { TimelineItem } from '@/lib/sanity';
import { format, parseISO } from 'date-fns';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

import TimelineContentItem from './TimelineContentItem';



export default function TimelineContent({
    timeline: initialTimeline,
    selectedItem,
    filters,
    handleItemClick,
    handleClosePane,
    handleFilterChange
}: {
    timeline: TimelineItem[];
    selectedItem: TimelineItem | null;
    filters: {
        type: string[];
        employment: string[]
    };
    handleItemClick: (item: TimelineItem) => void;
    handleClosePane: () => void;
    handleFilterChange: (filterType: string, value: string) => void
}) {
    const [currentDate, setCurrentDate] = useState<string | null>(null);
    const timelineRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
    const [currentSectionItem, setcurrentSectionItem] = useState<TimelineItem | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const fixedDateRef = useRef<HTMLDivElement>(null);

    const filteredTimeline = initialTimeline.filter((item) => {
        const typeMatch = filters.type.length === 0 || filters.type.includes(item.type.toLowerCase());
        const employmentMatch = filters.employment.length === 0 || (item.type === 'Experience' && filters.employment.includes(item.is_contract ? 'contract' : 'permanent'));
        return typeMatch && employmentMatch;
    });


    const updateFixedDate = useCallback(() => {
        if (selectedItem) {
            setCurrentDate(format(parseISO(selectedItem.startDate), 'MMMM, yyyy'));
            return;
        }
        const fixedDateRect = fixedDateRef.current?.getBoundingClientRect();
        if (!fixedDateRect || filteredTimeline.length === 0) {
            setCurrentDate(null);
            return;
        }

        let closestDistance = Infinity;

        // Find the first item whose top is at or below the fixed date line
        for (const item of filteredTimeline) {
            const ref = timelineRefs.current.get(item._id);
            if (ref) {
                const itemRect = ref.getBoundingClientRect();
                const distance = Math.abs(itemRect.top - fixedDateRect.top);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    setcurrentSectionItem(item);
                }
            }
        }

        // If no item found below (scrolled past all items), use the last ite
        if (!currentSectionItem && filteredTimeline.length > 0) {
            for (let i = filteredTimeline.length - 1; i >= 0; i--) {
                const item = filteredTimeline[i];
                if (timelineRefs.current.has(item._id) && timelineRefs.current.get(item._id)) {
                    setcurrentSectionItem(item);
                    break;
                }
            }
        }

        if (currentSectionItem && currentSectionItem.startDate) {
            try {
                setCurrentDate(format(parseISO(currentSectionItem.startDate), 'MMMM, yyyy'));
            } catch (e) {
                console.error("Error formatting date:", e);
                setCurrentDate("Invalid Date");
            }
        } else {
            setCurrentDate(null);
        }
    }, [filteredTimeline]);

    useEffect(() => {
        const map = timelineRefs.current;

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

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(handleIntersection, {
            rootMargin: '0px 0px -50% 0px',
            threshold: 0,
        });

        filteredTimeline.forEach(item => {
            const node = map.get(item._id);
            if (node) {
                observer.current?.observe(node);
            }
        });

        requestAnimationFrame(updateFixedDate);

        // Cleanup function
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [initialTimeline, filteredTimeline, updateFixedDate]);


    const setTimelineRef = useCallback((node: HTMLDivElement | null, id: string) => {
        const map = timelineRefs.current;
        if (node) {
            map.set(id, node);
        } else {
            map.delete(id);
        }
    }, []);

    return (
        <>
            <main className="timeline">
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
                <stack-l role="list">
                    {filteredTimeline.map((item) => {
                        // console.log("item", item)
                        return (
                            <TimelineContentItem
                                key={item._id}
                                item={item}
                                ref={(node) => setTimelineRef(node, item._id)}
                                handleItemClick={handleItemClick}
                                selected={selectedItem ? selectedItem._id === item._id : false}
                                current={currentSectionItem ? currentSectionItem._id === item._id : false}
                            />
                        )
                    })}
                </stack-l>
            </main>
            <section className='timeline'>
                {selectedItem && <DetailPane item={selectedItem} onClose={handleClosePane} />}
            </section>
        </>
    );
}

function DetailPane({ item, onClose }: { item: TimelineItem; onClose: () => void }) {

    let primaryTitle = item.type === 'Experience' ? (
        item.role
    ) : item.type === 'Project' ? (
        item.projectTitle
    ) : item.type === 'Education' ? (
        item.course
    ) : null

    let secondaryTitle = item.type === 'Experience' ? (
        item.company?.name
    ) : item.type === 'Education' ? (
        item.institution
    ) : null
    return (
        <imposter-l>
            <button className="detail-pane-close" onClick={onClose}>
                Close
            </button>
            <div className="detail-pane-content">
                <h2>
                    <span className="primaryTitle">{primaryTitle}</span>
                    <br />
                    <span className="secondaryTitle">{secondaryTitle}</span>
                </h2>
                {/* <p className="detail-pane-date">
                    {item.startDate ? format(parseISO(item.startDate), 'MMMM, yyyy') : 'No Date'}
                    {item.endDate && ` - ${format(parseISO(item.endDate), 'MMMM, yyyy')}`}
                </p> */}
                {item.details && (
                    <PortableText value={item.details} />
                )}
            </div>
        </imposter-l>
    );
}
