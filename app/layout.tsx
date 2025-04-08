import './reset.css';
import './globals.css';
import './layouts.css';
import './main.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';

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
        <html lang="en">
            <head>
                <script src="/sidebar.js" defer></script>
                <script src="/stack.js" defer></script>
                <script src="/switcher.js" defer></script>
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Poppins" />
            </head>
            <body>
                {/* <div className='gradient-background' /> */}
                {/* <Navbar /> */}
                {children}
            </body>
        </html>
    );
}
