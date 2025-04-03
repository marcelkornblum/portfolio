import { PortableTextBlock } from 'sanity';

interface Detail {
    _type: 'block';
    children: {
        _type: 'span';
        text: string;
    }[];
}

interface About {
    _id: string;
    name: string;
    details: Detail[];
}

const About: React.FC<{ about: About }> = ({ about }) => {
    return (
        <div className="about">
            <h2>{about.name}</h2>
            <div className="about-details">
                {about.details.map((detail, index) => (
                    <p key={index}>{detail.children[0].text}</p>
                ))}
            </div>
        </div>
    );
};

export default About;
