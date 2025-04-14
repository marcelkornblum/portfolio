'use client';

import styled from 'styled-components';
import { PrintButton } from './PrintButton';
import { ThemeToggle } from './ThemeToggle';

// Define the styled container *inside* the Client Component file
const FixedButtonContainer = styled.div`
    position: fixed;
    bottom: var(--s1);
    left: var(--s1);
    z-index: 50;
    display: flex;
    gap: var(--s-1);
    z-index: 1000;

    > button {
        cursor: pointer;
        padding: var(--s-3);
        border-radius: 50%;
        background-color: var(--background-color);
        color: var(--primary-color);
        border: none;
        transition:
            background-color 0.2s ease-in-out,
        color 0.2s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover,
        &:focus {
            background-color: var(--background-color-inverse);

            svg {
                stroke: var(--primary-color-inverse);
                fill: var(--primary-color-inverse);
            }
        }

        svg {
            width: var(--s1);
            height: var(--s1);
        }
    }

    @media print {
        display: none !important;
    }
`;

// Component that renders the container and buttons
export function FixedControls() {
    return (
        <FixedButtonContainer>
            <ThemeToggle />
            <PrintButton />
        </FixedButtonContainer>
    );
}
