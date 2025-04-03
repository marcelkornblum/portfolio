"use client";

import { Skill } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

// This is now a Client Component
export default function SkillsContent({ skills }: { skills: Skill[] }) {
    return (
        <>
            {skills.map((skill) => (
                <div key={skill._id}>
                    <h2>{skill.name}</h2>
                    <PortableText value={skill.details} />
                </div>
            ))}
        </>
    );
}
