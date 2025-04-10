// app/custom-elements.d.ts
import React from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'imposter-l': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'sidebar-l': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'stack-l': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'switcher-l': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
