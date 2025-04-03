import { PortableTextBlock } from 'sanity';

interface Detail {
    _type: 'block';
    children: {
        _type: 'span';
        text: string;
    }[];
}

interface Award {
    _id: string;
    name: string;
    details: Detail[];
    role: {
        role: string;
    };
}

const Award: React.FC<{ award: Award }> = ({ award }) => {
    return (
        <div className="award">
            <h2>{award.name}</h2>
            <p>{award.role.role}</p>
            <div className="award-details">
                {award.details.map((detail, index) => (
                    <p key={index}>{detail.children[0].text}</p>
                ))}
            </div>
        </div>
    );
};

export default Award;
