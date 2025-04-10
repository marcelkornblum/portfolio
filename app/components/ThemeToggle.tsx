// components/ThemeToggle.tsx (or .jsx)
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

import styled, { css } from 'styled-components';

const ThemeToggleButton = styled.button`
  position: fixed;
  bottom: 1.25rem; /* 20px */
  left: 1.25rem; /* 20px */
  z-index: 50;
  padding: 0.75rem; /* 12px */
  border-radius: 9999px; /* full */
  border: none;
  cursor: pointer;
  background-color: var(--button-bg);
  color: var(--button-text);
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  display: flex; /* Needed for icon alignment if not already handled */
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--button-hover-bg);
    color: var(--button-hover-text);
  }

  svg {
    width: 1.25rem; /* 20px */
    height: 1.25rem; /* 20px */
  }
`;

export function ThemeToggle() {
    const [mounted, setMounted] = React.useState(false);
    const { theme, setTheme } = useTheme();

    // Ensure component only renders on the client
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeToggleButton
            aria-label="Toggle theme"
            type="button"
            onClick={toggleTheme}
        >
            {theme === 'dark' ? (
                <FaMoon />
            ) : (
                <FaSun />
            )
            }
        </ThemeToggleButton>
    );
}
