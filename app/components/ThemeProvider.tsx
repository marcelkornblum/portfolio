'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

// This component wraps the ThemeProvider from next-themes
// and handles ensuring it only renders on the client side
// to prevent hydration mismatches.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, after the initial render.
    // This ensures the theme is determined correctly based on localStorage
    // or default settings before rendering the actual provider.
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Until the component is mounted, return null or a basic fragment.
    // Returning null is often preferred to avoid rendering children
    // before the theme is properly applied, preventing potential layout shifts or flashes.
    if (!mounted) {
        return null;
        // Alternatively: return <>{children}</>; // If you want initial render without theme styles applied yet
    }

    // Once mounted, render the actual ThemeProvider from next-themes,
    // passing down all the props received (like attribute, defaultTheme, etc.)
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
