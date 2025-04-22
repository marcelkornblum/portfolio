"use client";

import { TimelineItem } from '@/lib/sanity';
import { format, parseISO, intervalToDuration } from 'date-fns';
import { useEffect, useRef, useState, useCallback } from 'react';
// Removed unused Link import
// import Link from 'next/link';
import { PortableText } from '@portabletext/react';
// Removed unused Image import
// import Image from 'next/image';

import { displayDuration } from '@/lib/utils';
import TimelineContentItem from './TimelineContentItem';
import { TimelineItemTitle } from './TimelineItemTitle';
import { StyledDetailPane, StyledDetailPaneWrapper, TimelineFixed } from './styles';
import { Stack } from '../components/layout/stack';
import styled from 'styled-components';
import { Sidebar } from '../components/layout/sidebar';

const StyledTimelineTitle = styled(Sidebar)`
    position: sticky;
    top: 0;
    margin-block-start: calc(0px - var(--s4));
    background-color: var(--background-color);

    & > :last-child {
        padding-inline-start: calc(2rem + 1px);

        .title-and-filter {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-block-end: var(--s-1);
            margin-block-end: var(--s0);
        }

        h2 {
            border-block-end: 1px solid var(--primary-color);
        }

        button {
            cursor: pointer;
            background: none;
            border: none;
            padding: 1rem 0;
            text-align: left;
            font-size: var(--s0);

            &:hover {
                color: var(--accent-color);
            }
        }
    }
`;

const FilterAccordionContent = styled.div`
    padding: var(--s0);
    border-bottom: 1px solid var(--border-color, #ccc); /* Example border */
    margin-top: var(--s-1);

    button {
        display: block; /* Make buttons stack vertically */
        margin-bottom: var(--s-2);
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        text-align: left;
        color: var(--text-color, inherit); /* Inherit text color */
        font-size: var(--s0);

        &:hover {
            color: var(--highlight-color);
        }

        &.subfilter {
            margin-left: var(--s1); /* Indent sub-filters */
        }

        &:disabled {
            color: var(--disabled-color, #999);
            cursor: not-allowed;
            text-decoration: line-through;
        }
    }
`;


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
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State for accordion

    const observer = useRef<IntersectionObserver | null>(null);
    const fixedDateRef = useRef<HTMLDivElement>(null);

    const filteredTimeline = initialTimeline.filter((item) => {
        const typeMatch = filters.type.length === 0 || filters.type.includes(item.type.toLowerCase());
        const employmentMatch = filters.employment.length === 0 || (item.type === 'Experience' && filters.employment.includes(item.is_contract ? 'contract' : 'permanent')) || item.type != 'Experience';
        return typeMatch && employmentMatch;
    });

    const currentIndex = selectedItem ? filteredTimeline.findIndex(i => i._id === selectedItem._id) : -1; // Use -1 if not found
    const totalItems = filteredTimeline.length;

    const handleNext = () => {
        if (totalItems <= 1 || currentIndex === -1) return;
        const nextIndex = (currentIndex + 1) % totalItems; // Wrap around
        handleItemClick(filteredTimeline[nextIndex]);
    };

    const handlePrevious = () => {
        if (totalItems <= 1 || currentIndex === -1) return;
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems; // Wrap around correctly for negative
        handleItemClick(filteredTimeline[prevIndex]);
    };

    // Toggle function for the filter accordion
    const toggleFilterAccordion = () => {
        setIsFilterOpen(prev => !prev);
    };

    // --- (updateFixedDate and useEffect logic remains the same) ---
    const updateFixedDate = useCallback(() => {
        // ... (keep existing logic)
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
            return;
        }

        let closestDistance = Infinity;

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
            }
        } else {
            setCurrentDate(null);
        }
    }, [selectedItem, filteredTimeline, currentSectionItem]);

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
            // Use requestAnimationFrame for smoother updates related to scroll
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

        // Initial call to set the date
        requestAnimationFrame(updateFixedDate);

        // Add scroll listener for more immediate date updates
        window.addEventListener('scroll', updateFixedDate);

        // Cleanup function
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
            window.removeEventListener('scroll', updateFixedDate); // Clean up scroll listener
        };
    }, [filteredTimeline, updateFixedDate]); // Dependency on filteredTimeline and updateFixedDate


    const setTimelineRef = useCallback((node: HTMLDivElement | null, id: string) => {
        const map = timelineRefs.current;
        if (node) {
            map.set(id, node);
        } else {
            map.delete(id);
        }
    }, []);

    // Determine if employment filters should be active/enabled
    const isExperienceSelected = filters.type.includes('experience');

    return (
        <>
            <TimelineFixed ref={fixedDateRef}>
                <div id='top-nav-buttons' style={{ visibility: selectedItem ? 'visible' : 'hidden' }}> {/* Control visibility */}
                    <button
                        onClick={handlePrevious} // Corrected order
                        disabled={totalItems <= 1}
                        aria-label="Previous item"
                    >
                        &lt; Prev
                    </button>
                    <button
                        onClick={handleNext} // Corrected order
                        disabled={totalItems <= 1}
                        aria-label="Next item"
                    >
                        Next &gt;
                    </button>
                </div>
                <div className="middle">{currentDate}</div>
                <div className='bottom'>
                    {/* {dateSecondLine} */}
                </div>
            </TimelineFixed>
            <Stack role="list">
                <StyledTimelineTitle>
                    <div></div>
                    <div>
                        <h2>Timeline</h2>
                        <button onClick={toggleFilterAccordion}>
                            Filters {isFilterOpen ? '▵' : '▿'}
                        </button>
                        {isFilterOpen && (
                            <FilterAccordionContent>
                                <a onClick={() => handleFilterChange('type', 'experience')}>{filters.type.includes('experience') ? '●' : '○'} roles</a>
                                <br />
                                <a className='subfilter' onClick={() => handleFilterChange('employment', 'permanent')}> {filters.employment.includes('permanent') ? '●' : '○'} permanent</a>
                                <br />
                                <a className='subfilter' onClick={() => handleFilterChange('employment', 'contract')}>{filters.employment.includes('contract') ? '●' : '○'} contract</a>
                                <br />
                                <a onClick={() => handleFilterChange('type', 'project')}> {filters.type.includes('project') ? '●' : '○'} projects</a>
                                <br />
                                <a onClick={() => handleFilterChange('type', 'education')}>{filters.type.includes('education') ? '●' : '○'} education</a>

{/*
                                <button onClick={() => handleFilterChange('type', 'experience')}>
                                    Experience {filters.type.includes('experience') ? '●' : '○'}
                                </button>
                                <button
                                    className='subfilter'
                                    onClick={() => handleFilterChange('employment', 'permanent')}
                                    disabled={!isExperienceSelected} // Disable if experience is not selected
                                >
                                    Permanent {filters.employment.includes('permanent') ? '●' : '○'}
                                </button>
                                <button
                                    className='subfilter'
                                    onClick={() => handleFilterChange('employment', 'contract')}
                                    disabled={!isExperienceSelected} // Disable if experience is not selected
                                >
                                    Contract {filters.employment.includes('contract') ? '●' : '○'}
                                </button>
                                <button onClick={() => handleFilterChange('type', 'project')}>
                                    Projects {filters.type.includes('project') ? '●' : '○'}
                                </button>
                                <button onClick={() => handleFilterChange('type', 'education')}>
                                    Education {filters.type.includes('education') ? '●' : '○'}
                                </button> */}
                            </FilterAccordionContent>
                        )}
                    </div>
                </StyledTimelineTitle>
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

// --- DetailPane function remains the same ---
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
