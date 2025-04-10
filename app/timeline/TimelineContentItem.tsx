"use client";

import React, { forwardRef } from 'react';
import { TimelineItem } from '@/lib/sanity';
import { format, parseISO, intervalToDuration } from 'date-fns';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import styled, { css } from 'styled-components';

import { displayDuration } from '@/lib/utils';

import {Sidebar} from '../components/layout/sidebar'

const StyledTimelineItem = styled(Sidebar)`
    cursor: pointer;

    .date {
      text-align: right;
      margin-block-start: 0.3em;
      line-height: 1.2;
      color: var(--secondary-color);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      /* &.current {
                opacity: 1;
            } */
    }

    .primaryTitle {
      color: var(--accent-color);
    }

    .tag {
      color: var(--secondary-color);
      font-size: var(--s0);
    }

    .summary {
      color: var(--primary-color);
    }

    &:hover {
      .date {
        opacity: 1;
      }
    }
`;

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
            <StyledTimelineItem
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
            </StyledTimelineItem>
        )
    }
);
TimelineContentItem.displayName = 'TimelineContentItem';

export default TimelineContentItem;
