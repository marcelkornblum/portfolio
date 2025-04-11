import './reset.css';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ["400"],
    variable: '--font-poppins'
});

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
        <html lang="en" className={`${poppins.variable} font-sans`} suppressHydrationWarning>
            <head>
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
