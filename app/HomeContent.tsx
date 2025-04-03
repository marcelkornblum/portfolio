"use client";

import { About, Contact } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

// This is now a Client Component
export default function HomeContent({ about, contact }: { about: About; contact: Contact }) {
    return (
        <>
            <h1>{about.title}</h1>
            <PortableText value={about.details} />
            <h1>{contact.title}</h1>
            <PortableText value={contact.details} />
        </>
    );
}
