"use client";

import { Interest } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

// This is now a Client Component
export default function InterestsContent({ interests }: { interests: Interest[] }) {
    return (
        <>
            {interests.map((interest) => (
                <div key={interest._id}>
                    <h2>{interest.name}</h2>
                    <PortableText value={interest.details} />
                </div>
            ))}
        </>
    );
}
