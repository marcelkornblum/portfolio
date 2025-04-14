import { getContacts, Contact } from '@/lib/sanity';
import ContactContent from './ContactContent';

// This is now a Server Component
export default async function ContactPage() {
    const contacts = await getContacts();

    return (
        <main>
            <ContactContent contacts={contacts} />
        </main>
    );
}
