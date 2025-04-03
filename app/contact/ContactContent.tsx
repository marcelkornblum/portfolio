"use client";

import { Contact } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

// This is now a Client Component
export default function ContactContent({ contact }: { contact: Contact }) {
    return (
        <>
            <h1>{contact.title}</h1>
            <PortableText value={contact.details} />
        </>
    );
}
