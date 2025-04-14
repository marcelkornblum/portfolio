"use client";

import { Contact } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

// This is now a Client Component
export default function ContactContent({ contacts }: { contacts: Contact[] }) {
    return (
        <>
            <h1>{contacts[0].type}</h1>
            <PortableText value={contacts[0].details} />
        </>
    );
}
