"use client";

import React, { forwardRef } from 'react';
import { TimelineItem } from '@/lib/sanity';
import { format, parseISO, intervalToDuration } from 'date-fns';
import { PortableText } from '@portabletext/react';

import { displayDuration } from '@/lib/utils';

import { TimelineItemTitle } from './TimelineItemTitle';
import { StyledTimelineItem, Tag } from './styles';


interface TimelineContentItemProps {
    item: TimelineItem;
    handleItemClick: (item: TimelineItem) => void;
    selected: boolean;
    current: boolean;
}

const TimelineContentItem = forwardRef<HTMLDivElement, TimelineContentItemProps>(
    ({ item, handleItemClick, selected, current }, ref) => {

        let classes = "timeline-item";
        selected && (classes += " selected");
        current && (classes += " current");

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

        let date = item.startDate ? format(parseISO(item.startDate), 'MMMM, yyyy') : ''
        let duration = item.startDate && item.endDate ? intervalToDuration({
            start: parseISO(item.startDate),
            end: parseISO(item.endDate)
        }) : null;
        let dateSecondLine = displayDuration(duration);

        let tags = (item.type === 'Experience'
            ? [item.company?.sector, item.is_contract ? 'contract' : 'permanent']
            : []
        ).filter((tag): tag is string => tag !== null && tag !== undefined);

        return (
            <StyledTimelineItem
                id={item._id}
                ref={ref}
                role="listitem"
                className={classes}
            >
                <div className='date'>
                    {date}
                    <br />
                    {dateSecondLine}
                </div>
                <div
                    onClick={() => handleItemClick(item)}
                    >
                    <TimelineItemTitle primaryTitle={primaryTitle} secondaryTitle={secondaryTitle} highlighted={false} />
                    <div>
                        {tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </div>
                    <div className='summary'>
                        {item.summary && (
                            <PortableText value={item.summary} />
                        )}
                    </div>
                </div>
            </StyledTimelineItem>
        )
    }
);
TimelineContentItem.displayName = 'TimelineContentItem';

export default TimelineContentItem;
