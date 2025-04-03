import { render, screen } from '@testing-library/react';
import Award from './Award';

describe('Award Component', () => {
    it('renders the award name', () => {
        const award = {
            _id: '1',
            name: 'Test Award',
            details: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: 'This is a test award',
                        },
                    ],
                },
            ],
            role: {
                role: 'Test Role',
            },
        };
        render(<Award award={award} />);
        const nameElement = screen.getByRole('heading', { name: /Test Award/i });
        expect(nameElement).toBeInTheDocument();
    });

    it('renders the award role', () => {
        const award = {
            _id: '1',
            name: 'Test Award',
            details: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: 'This is a test award',
                        },
                    ],
                },
            ],
            role: {
                role: 'Test Role',
            },
        };
        render(<Award award={award} />);
        const roleElement = screen.getByText(/Test Role/i);
        expect(roleElement).toBeInTheDocument();
    });

    it('renders the award details', () => {
        const award = {
            _id: '1',
            name: 'Test Award',
            details: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: 'This is a test award',
                        },
                    ],
                },
            ],
            role: {
                role: 'Test Role',
            },
        };
        render(<Award award={award} />);
        const detailsElement = screen.getByText(/This is a test award/i);
        expect(detailsElement).toBeInTheDocument();
    });
});
