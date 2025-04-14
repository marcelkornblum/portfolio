"use client";

import { About, Contact } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import {Cover} from './components/layout/cover'
import {Sidebar} from './components/layout/sidebar'


const StyledHomeContent = styled(Sidebar)`
    & > :first-child {
      text-align: end;
      margin-block-start: 0.3em;

      a {
        display: block;
      }
    }

    & > :last-child {
        padding-inline-start: calc(2rem + 1px);
        padding-inline-end: calc(2rem + 1px);
    }

    h1 {
        color: var(--highlight-color);
    }
`;

export default function HomeContent({ about, contacts }: { about: About; contacts: Contact[] }) {
    // console.log(contacts)
    return (
        <Cover $principalElement="#me">
            <StyledHomeContent id="me">
                <div>
                    {contacts.map((contact, i) => {
                        return (
                            <a href={contact.link} target="_blank" rel="noopener noreferrer" key={i}>{contact.display}</a>
                        )
                    })}
                </div>
                <h1>Marcel Kornblum</h1>
            </StyledHomeContent>
        </Cover>
    );
}
