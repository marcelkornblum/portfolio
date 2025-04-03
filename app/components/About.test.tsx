import { render, screen } from '@testing-library/react';
import About from './About';

describe('About Component', () => {
    it('renders the about name', () => {
        const about = {
            _id: '1',
            name: 'About Me',
            details: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: 'This is a test about me',
                        },
                    ],
                },
            ],
        };
        render(<About about={about} />);
        const nameElement = screen.getByRole('heading', { name: /About Me/i });
        expect(nameElement).toBeInTheDocument();
    });

    it('renders the about details', () => {
        const about = {
            _id: '1',
            name: 'About Me',
            details: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: 'This is a test about me',
                        },
                    ],
                },
            ],
        };
        render(<About about={about} />);
        const detailsElement = screen.getByText(/This is a test about me/i);
        expect(detailsElement).toBeInTheDocument();
    });
});
