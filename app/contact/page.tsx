import { getContact, Contact } from '@/lib/sanity';
import ContactContent from './ContactContent';

// This is now a Server Component
export default async function ContactPage() {
    const contact = await getContact();

    return (
        <main>
            <ContactContent contact={contact} />
        </main>
    );
}
