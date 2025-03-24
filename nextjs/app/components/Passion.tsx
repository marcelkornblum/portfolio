import { PortableTextBlock } from "sanity";

interface Passion {
  _id: string;
  name: string;
  details: PortableTextBlock[];
}

const Passion: React.FC<{ passion: Passion }> = ({ passion }) => {
  return (
    <div className="passion">
      <h2>{passion.name}</h2>
      <div className="passion-details">
        {passion.details.map((detail, index) => (
          <p key={index}>{detail.children[0].text}</p>
        ))}
      </div>
    </div>
  );
};

export default Passion;
