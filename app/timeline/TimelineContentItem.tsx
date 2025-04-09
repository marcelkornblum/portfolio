"use client";

import React, { forwardRef } from 'react';
import { TimelineItem } from '@/lib/sanity';
import { format, parseISO, intervalToDuration } from 'date-fns';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import { displayDuration } from '@/lib/utils';

interface TimelineContentItemProps {
    item: TimelineItem;
    handleItemClick: (item: TimelineItem) => void;
    selected: boolean;
    current: boolean;
}

const TimelineContentItem = forwardRef<HTMLDivElement, TimelineContentItemProps>(
    ({ item, handleItemClick, selected, current }, ref) => {


        // export default function TimelineContentItem(
        //     {
        //         item,
        //         ref,
        //         handleItemClick,
        //         selected
        //     }:
        //         {
        //             item: TimelineItem;
        //             ref: any;
        //             handleItemClick: (item: TimelineItem) => void;
        //             selected: boolean;
        //         }
        // ) {
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
            <sidebar-l
                id={item._id}
                ref={ref}
                onClick={() => handleItemClick(item)}
                role="listitem"
                className={classes}
            >
                <div className='date'>
                    {date}
                    <br />
                    {dateSecondLine}
                </div>
                <div>
                    <h2>
                        <span className="primaryTitle">{primaryTitle}</span>
                        <br />
                        <span className="secondaryTitle">{secondaryTitle}</span>
                    </h2>
                    <div>
                        {tags.map((tag) => (
                            <span className="tag" key={tag}>{tag}</span>
                        ))}
                    </div>
                    <div className='summary'>
                        {item.summary && (
                            <PortableText value={item.summary} />
                        )}
                    </div>
                </div>
            </sidebar-l>
        )
    }
);
TimelineContentItem.displayName = 'TimelineContentItem';

export default TimelineContentItem;
