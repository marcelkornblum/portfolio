import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact Component', () => {
    it('renders the contact link', () => {
        const contact = {
            _id: '1',
            type: 'email',
            display: 'test@example.com',
            link: 'mailto:test@example.com',
        };
        render(<Contact contact={contact} />);
        const linkElement = screen.getByRole('link', { name: /test@example.com/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'mailto:test@example.com');
    });
});
