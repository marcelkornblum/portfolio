// components/ThemeToggle.tsx (or .jsx)
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

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
        <button
            aria-label="Toggle theme"
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-button" // Apply the class from globals.css
        >
            {theme === 'dark' ? (
                <FaMoon />
            ) : (
                <FaSun />
            )
            }
        </button>
    );
}
