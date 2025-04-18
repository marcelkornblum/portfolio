"use client";

import React, { forwardRef } from 'react';
import { TimelineItem } from '@/lib/sanity';
import { format, parseISO, intervalToDuration } from 'date-fns';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import styled, { css } from 'styled-components';

import { displayDuration } from '@/lib/utils';

import {Sidebar} from '../components/layout/sidebar'
import { TimelineItemTitle } from './TimelineItemTitle';

const StyledTimelineItem = styled(Sidebar)`
    .date {
      text-align: end;
      margin-block-start: 0.3em;
      line-height: 1.2;
      color: var(--secondary-color);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    & > :last-child {
        cursor: pointer;
        padding-inline-start: calc(2rem + 1px);
    }

    .tag {
      color: var(--secondary-color);
      font-size: var(--s0);
    }

    .summary {
      color: var(--primary-color);
    }

    &:hover {
      .primaryTitle {
        color: var(--highlight-color);
        transition: color 0.2s ease-in-out;
      }


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
