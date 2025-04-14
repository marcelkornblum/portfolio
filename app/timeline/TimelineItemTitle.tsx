"use client";
import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h3<{ $highlighted: boolean }>`
    margin-block-end: 0.3em;

    .primaryTitle {
      color: var(${({ $highlighted }) => $highlighted ? '--highlight-color' : '--accent-color'});
    }

`;

export function TimelineItemTitle({ primaryTitle, secondaryTitle, highlighted=false
}: {
    primaryTitle: string | undefined | null;
    secondaryTitle: string | undefined | null;
    highlighted: boolean;
}) {
    return (
        <StyledTitle $highlighted={highlighted}>
            {primaryTitle && (
                <span className="primaryTitle">{primaryTitle}</span>
            )}
            {primaryTitle && secondaryTitle && (<br />)}
            {secondaryTitle && (
                <span className="secondaryTitle">{secondaryTitle}</span>
            )}
        </StyledTitle>
    );
}
