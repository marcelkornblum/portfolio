import { client } from "../sanity.config";
import { groq } from "next-sanity";

export async function getProjects() {
    return client.fetch(groq`
        *[_type == "project"] {
            _id,
            name,
            date,
            image,
            details,
            role-> {
                role
            }
        }
    `);
}

export async function getExperiences() {
    return client.fetch(groq`
        *[_type == "experience"] | order(start desc) {
            _id,
            role,
            is_contract,
            start,
            end,
            details,
            company->{
                name,
                logo,
                link,
                sector
            }
        }
    `);
}

export async function getEducation() {
    return client.fetch(groq`*[_type == "education"] | order(start desc)`);
}

export async function getAbout() {
    return client.fetch(groq`*[_type == "about"]`);
}

export async function getContact() {
    return client.fetch(groq`*[_type == "contact"]`);
}

export async function getSkills() {
    return client.fetch(groq`
        *[_type == "skill"] {
            _id,
            name,
            details,
            evidence[] {
                point,
                role-> {
                    _id,
                    role,
                    start,
                    end,
                    slug
                }
            }
        }
    `);
}

export async function getAwards() {
    return client.fetch(groq`
        *[_type == "award"] {
            _id,
            name,
            details,
            role-> {
                role
            }
        }
    `);
}

export async function getPassions() {
    return client.fetch(groq`
        *[_type == "passion"] {
            _id,
            name,
            details
        }
    `);
}
