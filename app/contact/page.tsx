import { getAbout, getContact } from '@/lib/sanity';
import AboutType from '../components/About';
import ContactType from '../components/Contact';

export default async function ContactPage() {
    const about = await getAbout();
    const contact = await getContact();

    return (
        <main className='contact'>
            <h1>Contact</h1>
            <div className='contact-info'>
                {contact.map((item: ContactType) => (
                    <ContactType key={item._id} contact={item} />
                ))}
            </div>
            <div className='about-info'>
                {about.map((item: AboutType) => (
                    <AboutType key={item._id} about={item} />
                ))}
            </div>
        </main>
    );
}
