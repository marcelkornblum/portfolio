import { getAbout, getContact } from "@/lib/sanity";
import Link from "next/link";

export default async function Home() {
  const about = await getAbout();
  const contact = await getContact();

  return (
    <main className="home">
      <div className="home-header">
        <h1>Marcel Kornblum</h1>
        {about.map((item) => (
          <div key={item._id} className="home-about">
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <div className="home-contact">
        {contact.map((item) => {
          if (item.type === "email") {
            return (
              <div key={item._id} className="home-contact-item">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.display}
                </a>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="home-links">
        <Link href="/timeline" className="home-timeline-link">
          Experience
        </Link>
        <Link href="/skills" className="home-skills-link">
          Skills
        </Link>
      </div>
    </main>
  );
}
