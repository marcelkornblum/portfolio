import { PortableTextBlock } from "sanity";
import { format } from "date-fns";
import Link from "next/link";

interface Skill {
  _id: string;
  name: string;
  details: PortableTextBlock[];
  evidence: {
    point: string;
    role: {
      _id: string;
      role: string;
      start: string;
      end: string;
      slug: {
        current: string;
      };
    };
  }[];
}

const Skill: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <div className="skill">
      <h2>{skill.name}</h2>
      <div className="skill-details">
        {skill.details.map((detail, index) => (
          <p key={index}>{detail.children[0].text}</p>
        ))}
      </div>
      <div className="skill-evidence">
        <h3>Evidence</h3>
        <ul>
          {skill.evidence.map((evidence, index) => (
            <li key={index}>
              <p>{evidence.point}</p>
              <Link href={`/timeline/${evidence.role.slug.current}`}>
                {evidence.role.role} (
                {format(new Date(evidence.role.start), "MMM yyyy")} -{" "}
                {evidence.role.end
                  ? format(new Date(evidence.role.end), "MMM yyyy")
                  : "Present"}
                )
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skill;
