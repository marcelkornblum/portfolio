import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface Experience {
  _id: string;
  role: string;
  start: string;
  end: string;
  details: any[]; // You might want to define a more specific type for this
  company: {
    name: string;
    logo: any; // You might want to define a more specific type for this
    link: string;
  };
  slug: {
    current: string;
  };
}

const Timeline: React.FC<{ experiences: Experience[] }> = ({ experiences }) => {
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
                {experience.company?.name}
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
    </div>
  );
};

export default Timeline;
