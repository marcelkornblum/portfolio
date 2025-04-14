"use client";

import React from 'react';
import styled from 'styled-components';
import { LuPrinter } from 'react-icons/lu'; // Using Lucide Icons like ThemeToggle

// Define the styled component for the button
// Copy styles from ThemeToggle's StyledThemeToggle, removing position/bottom/right
// as those will be handled by a wrapper in layout.tsx
const StyledPrintButton = styled.button`
    svg {fill: none !important; }
`;

export function PrintButton() {
    const handlePrint = () => {
        window.print(); // Trigger the browser's print dialog
    };

    return (
        <StyledPrintButton
            onClick={handlePrint}
            aria-label="Print page"
            title="Print page" // Tooltip
        >
            <LuPrinter size={20} /> {/* Adjust size as needed */}
        </StyledPrintButton>
    );
}
