// /lib/sanity.ts

import { createClient, groq } from 'next-sanity';
import { format, parseISO } from 'date-fns';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const useCDN = (process.env.NEXT_SANITY_USE_CDN === "true");

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: useCDN,
});

export interface TimelineItem {
    _id: string;
    startDate: string | null;
    endDate: string | null;
    type: 'Experience' | 'Project' | 'Education';
    role?: string;
    company?: {
        name: string;
        logo: any;
        link: string;
        sector: string;
        _id: string;
    };
    is_contract?: boolean;
    projectTitle?: string;
    projectLink?: string;
    institution?: string;
    course?: string;
    summary: any;
    details: any;
    key: string; // Added key field
}

export async function getTimeline(): Promise<TimelineItem[]> {
    const query = groq`
    *[_type in ["experience", "project", "education"]] | order(coalesce(start, date) desc) {
      _id,
      _type,

      // Experience fields
      role,
      is_contract,
      start,
      end,
      company->{
        name,
        logo,
        link,
        sector,
        _id
      },

      // Project fields
      name,
      date,

      // Education fields
      institution,
      course,
      start,
      end,

      // Common fields
      summary,
      details,
    }
  `;

    const result = await client.fetch<
        {
            _id: string;
            _type: 'experience' | 'project' | 'education';
            role?: string;
            is_contract?: boolean;
            start?: string;
            end?: string;
            company?: {
                name: string;
                logo: any;
                link: string;
                sector: string;
                _id: string;
            };
            name?: string;
            date?: string;
            institution?: string;
            course?: string;
            summary: any;
            details: any;
        }[]
    >(query);

    return result.map((item) => {
        const timelineItem: TimelineItem = {
            _id: item._id,
            startDate: item._type === 'experience' ? item.start || null : item._type === 'project' ? item.date || null : item.start || null,
            endDate: item._type === 'experience' || item._type === 'education' ? item.end || null : null,
            type: item._type.charAt(0).toUpperCase() + item._type.slice(1) as 'Experience' | 'Project' | 'Education',
            summary: item.summary,
            details: item.details,
            key: `${item._type}-${item._id}`, // Added key field
        };

        if (item._type === 'experience') {
            timelineItem.role = item.role;
            timelineItem.company = item.company;
            if (timelineItem.company) {
                timelineItem.company._id = item.company?._id ?? '';
            }
            timelineItem.is_contract = item.is_contract;
        } else if (item._type === 'project') {
            timelineItem.projectTitle = item.name;
        } else if (item._type === 'education') {
            timelineItem.institution = item.institution;
            timelineItem.course = item.course;
        }
        // console.log("timelineItem", timelineItem);
        return timelineItem;
    });
}

export interface About {
    _id: string;
    name: string;
    details: any;
}


export async function getAbout(): Promise<About> {
    const query = groq`
        *[_type == "about"][0] {
            _id,
            name,
            details,
        }
    `;
    const result = await client.fetch<About>(query);
    return result;
}

export interface Contact {
    _id: string;
    type: string;
    display: string;
    link: string;
    logo: string;
    details: any;
}

export async function getContacts(): Promise<Contact[]> {
    const query = groq`
        *[_type == "contact"] {
            _id,
            type,
            display,
            link,
            logo,
            details,
        }
    `;
    const result = await client.fetch<Contact[]>(query);
    return result;
}

export interface Skill {
    _id: string;
    name: string;
    details: any;
}

export async function getSkills(): Promise<Skill[]> {
    const query = groq`
        *[_type == "skill"] {
            _id,
            name,
            details,
        }
    `;
    const result = await client.fetch<Skill[]>(query);
    return result;
}

export interface Award {
    _id: string;
    name: string;
    details: any;
}

export async function getAwards(): Promise<Award[]> {
    const query = groq`
        *[_type == "award"] {
            _id,
            name,
            details,
        }
    `;
    const result = await client.fetch<Award[]>(query);
    return result;
}

export interface Interest {
    _id: string;
    name: string;
    details: any;
}

export async function getInterests(): Promise<Interest[]> {
    const query = groq`
        *[_type == "interest"] {
            _id,
            name,
            details,
        }
    `;
    const result = await client.fetch<Interest[]>(query);
    return result;
}

export interface Project {
    _id: string;
    title: string;
    details: any;
    // ... other fields
}

export async function getProjects(): Promise<Project[]> {
    const query = groq`
        *[_type == "project"] {
            _id,
            title,
            details,
            // Add other fields as needed from your schema
        }
    `;
    const result = await client.fetch<Project[]>(query);
    return result;
}
