"use client";

import { TimelineItem } from '@/lib/sanity';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';


export default function TimelineContentItem(
    {
        item,
        ref,
        handleItemClick,
        selected
    }:
        {
            item: TimelineItem;
            ref: any;
            handleItemClick: (item: TimelineItem) => void;
            selected: boolean;
        }
) {
    let classes = "timeline-item"
    if (selected) {
        classes += " selected"
    }
    return (
        <sidebar-l
            key={item.key}
            id={item._id}
            ref={ref}
            onClick={() => handleItemClick(item)}
            role="listitem"
            class={classes}
        >
            <div>
                {item.startDate ? format(parseISO(item.startDate), 'MMMM, yyyy') : 'No Date'}
            </div>
            <div>
                <h2>
                    {item.type === 'Experience' ? (
                        <>
                            <span className="color:accent">{item.role}</span>
                            <br />
                            {item.company?.name}
                        </>
                    ) : item.type === 'Project' ? (
                        <span className="color:secondary">{item.projectTitle}</span>
                    ) : item.type === 'Education' ? (
                        item.course ? (
                            <>
                                <span className="color:accent">{item.course}</span>
                                <br />
                                {item.institution}
                            </>
                        ) : `${item.institution}`
                    ) : null}
                </h2>
                <div>
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
                    <PortableText value={item.summary} />
                )}
            </div>
        </sidebar-l>
    )
}
