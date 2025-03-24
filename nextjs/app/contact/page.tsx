import { getAbout, getContact } from "@/lib/sanity";
import About from "../components/About";
import Contact from "../components/Contact";

export default async function ContactPage() {
  const about = await getAbout();
  const contact = await getContact();

  return (
    <main className="contact">
      <h1>Contact</h1>
      <div className="contact-info">
        {contact.map((item) => (
          <Contact key={item._id} contact={item} />
        ))}
      </div>
      <div className="about-info">
        {about.map((item) => (
          <About key={item._id} about={item} />
        ))}
      </div>
    </main>
  );
}
