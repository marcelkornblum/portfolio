// app/custom-elements.d.ts
import React from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'sidebar-l': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'stack-l': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'switcher-l': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
