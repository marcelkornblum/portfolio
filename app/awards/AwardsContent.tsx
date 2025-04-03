"use client";

import { Award } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

// This is now a Client Component
export default function AwardsContent({ awards }: { awards: Award[] }) {
    return (
        <>
            {awards.map((award) => (
                <div key={award._id}>
                    <h2>{award.name}</h2>
                    <PortableText value={award.details} />
                </div>
            ))}
        </>
    );
}
