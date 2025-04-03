import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface Experience {
    _id: string;
    role: string;
    is_contract: boolean;
    start: string;
    end: string;
    details: any[]; // You might want to define a more specific type for this
    company: {
        name: string;
        logo: any; // You might want to define a more specific type for this
        link: string;
        sector: string[];
    };
}

interface Education {
    _id: string;
    institution: string;
    course: string;
    start: string;
    end: string;
    details: any[];
}


const Timeline: React.FC<{ experiences: Experience[], educations: Education[] }> = ({ experiences, educations }) => {
    return (
        <div className="timeline">
            {experiences.map((experience, index) => (
                <div key={experience._id} className={`timeline-item`}>
                    <div className="timeline-item-content">
                        <div className="timeline-item-header">
                            {experience.company?.logo && (
                                <Image
                                    src={experience.company.logo.asset.url}
                                    alt={experience.company.name}
                                    width={50}
                                    height={50}
                                />
                            )}
                            <h3 className="font-bold">{experience.role}</h3>
                            <a
                                href={experience.company?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {experience.company?.name} ({experience.company?.sector})
                            </a>
                        </div>
                        <div className="timeline-item-date">
                            {format(new Date(experience.start), "MMM yyyy")} -{" "}
                            {experience.end
                                ? format(new Date(experience.end), "MMM yyyy")
                                : "Present"}
                        </div>
                        <div className="timeline-item-details">
                            {/* Render details here */}
                            {experience.details?.map((detail, index) => (
                                <p key={index}>{detail.children[0].text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {educations.map((education, index) => (
                <div key={education._id} className={`timeline-item`}>
                    <div className="timeline-item-content">
                        <div className="timeline-item-header">#
                            <h3 className="font-bold">{education.institution}</h3>
                            {education.course}
                        </div>
                        <div className="timeline-item-date">
                            {format(new Date(education.start), "MMM yyyy")} -{" "}
                            {education.end
                                ? format(new Date(education.end), "MMM yyyy")
                                : "Present"}
                        </div>
                        <div className="timeline-item-details">
                            {/* Render details here */}
                            {education.details?.map((detail, index) => (
                                <p key={index}>{detail.children[0].text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
