// /app/company/[id]/page.tsx

import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';

interface Company {
    name: string;
    details: any;
    logo: any;
    link: string;
    sector: string;
    // ... other fields
}

interface Props {
    params: {
        id: string; // Changed from slug to id
    };
}

export default async function CompanyPage({ params }: Props) {
    const { id } = params; // Changed from slug to id

    const query = groq`
        *[_type == "company" && _id == $id][0] { // Changed from slug.current to _id
            name,
            details,
            logo,
            link,
            sector,
            // ... other fields
        }
    `;

    const company: Company = await client.fetch(query, { id });

    if (!company) {
        return <div>Company not found</div>;
    }

    return (
        <div>
            <h1>{company.name}</h1>
            {company.logo && <img src={company.logo.asset.url} alt={company.name} />}
            <p>Sector: {company.sector}</p>
            <a href={company.link} target="_blank" rel="noopener noreferrer">Company Website</a>
            {company.details && <PortableText value={company.details} />}
            {/* ... render other company details ... */}
        </div>
    );
}
