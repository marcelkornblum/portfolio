import { PortableTextBlock } from 'sanity';
import { format } from 'date-fns';
import Image from 'next/image';

interface Detail {
    _type: 'block';
    children: {
        _type: 'span';
        text: string;
    }[];
}

interface Project {
    _id: string;
    name: string;
    date: string;
    image: any;
    details: Detail[];
    role: {
        role: string;
    };
}

const Project: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="project">
            <h2>{project.name}</h2>
            <div className='project-header'>
                {project.image && (
                    <Image
                        src={project.image.asset.url}
                        alt={project.name}
                        width={200}
                        height={100}
                    />
                )}
                <p>{project.role.role}</p>
                <p>{format(new Date(project.date), 'MMM yyyy')}</p>
            </div>
            <div className="project-details">
                {project.details.map((detail, index) => (
                    <p key={index}>{detail.children[0].text}</p>
                ))}
            </div>
        </div>
    );
};

export default Project;
