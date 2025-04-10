import './reset.css';
import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';

export const metadata: Metadata = {
    title: 'Marcel Kornblum',
    description: "Marcel's portfolio, interests and projects"
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Poppins" />
            </head>
            <body>
                <ThemeProvider
                    attribute="data-theme" // Use data-theme attribute
                    defaultTheme="dark"    // Default to dark
                    enableSystem={false}   // Disable system theme detection if desired
                >
                    {children}
                    <ThemeToggle />
                </ThemeProvider>
            </body>
        </html>
    );
}
