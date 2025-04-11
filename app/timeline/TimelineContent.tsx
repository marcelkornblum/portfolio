"use client";

import { TimelineItem } from '@/lib/sanity';
import { format, parseISO, intervalToDuration } from 'date-fns';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

import { displayDuration } from '@/lib/utils';
import TimelineContentItem from './TimelineContentItem';
import { TimelineItemTitle } from './TimelineItemTitle';
import { StyledDetailPane, StyledDetailPaneWrapper, TimelineFixed } from './styles';
import { Stack } from '../components/layout/stack';


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
    // const [dateSecondLine, setDateSecondLine] = useState<string | null>(null);
    const timelineRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
    const [currentSectionItem, setcurrentSectionItem] = useState<TimelineItem | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const fixedDateRef = useRef<HTMLDivElement>(null);

    const filteredTimeline = initialTimeline.filter((item) => {
        const typeMatch = filters.type.length === 0 || filters.type.includes(item.type.toLowerCase());
        const employmentMatch = filters.employment.length === 0 || (item.type === 'Experience' && filters.employment.includes(item.is_contract ? 'contract' : 'permanent'));
        return typeMatch && employmentMatch;
    });

    const currentIndex = selectedItem ? filteredTimeline.findIndex(i => i._id === selectedItem._id) : 0;
    const totalItems = filteredTimeline.length;

    const handleNext = () => {
        if (totalItems <= 1) return;
        const nextIndex = (currentIndex + 1) % totalItems; // Wrap around
        handleItemClick(filteredTimeline[nextIndex]);
    };

    const handlePrevious = () => {
        if (totalItems <= 1) return;
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems; // Wrap around correctly for negative
        handleItemClick(filteredTimeline[prevIndex]);
    };

    const updateFixedDate = useCallback(() => {
        if (selectedItem && selectedItem.startDate) {
            setCurrentDate(format(parseISO(selectedItem.startDate), 'MMMM, yyyy'));
            let duration = selectedItem.startDate && selectedItem.endDate ? intervalToDuration({
                start: parseISO(selectedItem.startDate),
                end: parseISO(selectedItem.endDate)
            }) : null;
            let contract = selectedItem.hasOwnProperty('is_contract') ? ( selectedItem.is_contract ? ', contract' : ', permanent') : '';
            // setDateSecondLine(`${displayDuration(duration)}${contract}`);
            return;
        }
        const fixedDateRect = fixedDateRef.current?.getBoundingClientRect();
        if (!fixedDateRect || filteredTimeline.length === 0) {
            setCurrentDate(null);
            // setDateSecondLine('');
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
                let duration = currentSectionItem.startDate && currentSectionItem.endDate ? intervalToDuration({
                    start: parseISO(currentSectionItem.startDate),
                    end: parseISO(currentSectionItem.endDate)
                }) : null;
                let contract = currentSectionItem.hasOwnProperty('is_contract') ? ( currentSectionItem.is_contract ? ', contract' : ', permanent') : '';
                // setDateSecondLine(`${displayDuration(duration)}${contract}`);
            } catch (e) {
                console.error("Error formatting date:", e);
                setCurrentDate("Invalid Date");
                // setDateSecondLine('');
            }
        } else {
            setCurrentDate(null);
            // setDateSecondLine('');
        }
    }, [currentSectionItem, selectedItem, filteredTimeline]);

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

    // console.log(filters);

    return (
        <>
            <TimelineFixed ref={fixedDateRef}>
                <div className='top-nav-buttons'>
                    <button
                        onClick={handleNext}
                        disabled={totalItems <= 1}
                        aria-label="Previous item"
                    >
                        &lt; Prev
                    </button>
                    <button
                        onClick={handlePrevious}
                        disabled={totalItems <= 1}
                        aria-label="Next item"
                    >
                        Next &gt;
                    </button>
                </div>
                <div className="main">{currentDate}</div>
                <div className='bottom'>
                    {/* {dateSecondLine} */}
                {/* Include <a onClick={() => handleFilterChange('type', 'experience')}>{filters.type.includes('experience') ? 'V' : 'O'} roles</a> (<a onClick={() => handleFilterChange('employment', 'contract')}>contract</a> or <a onClick={() => handleFilterChange('employment', 'permanent')}>permanent</a>), <a onClick={() => handleFilterChange('type', 'project')}>only projects</a> or <a onClick={() => handleFilterChange('type', 'education')}>only education</a> */}
                </div>
            </TimelineFixed>
            <Stack role="list">
                {filteredTimeline.map((item) => {
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
            </Stack>
            <StyledDetailPaneWrapper className={`${selectedItem ? 'selected' : ''}`}>
                {selectedItem && (
                    <DetailPane item={selectedItem} onClose={handleClosePane} />)
                }
            </StyledDetailPaneWrapper>
        </>
    );
}

function DetailPane({ item, onClose }: { item: TimelineItem | null; onClose: () => void }) {
    if( item == null) {
        return null;
    }

    let primaryTitle =
          item.type === 'Experience' ? item.role
        : item.type === 'Project' ? item.projectTitle
        : item.type === 'Education' ? item.course
        : null;

    let secondaryTitle =
          item.type === 'Experience' ? item.company?.name
        : item.type === 'Education' ? item.institution
        : null;

    return (
        <StyledDetailPane>
            <button className="detail-pane-close" onClick={onClose}>
                × Close
            </button>
            <div className="detail-pane-content">
                <TimelineItemTitle primaryTitle={primaryTitle} secondaryTitle={secondaryTitle} highlighted={true} />
                {item.details && (
                    <PortableText value={item.details} />
                )}
            </div>
        </StyledDetailPane>
    );
}
