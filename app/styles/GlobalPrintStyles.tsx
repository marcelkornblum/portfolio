// /home/marcel/projects/portfolio/app/styles/GlobalPrintStyles.tsx
'use client'; // Required for createGlobalStyle

import { createGlobalStyle } from 'styled-components';

// Paste the entire content of your print.css file inside the @media print block
const GlobalPrintStyles = createGlobalStyle`
  @media print {

    /* --- Page Setup & Basic Reset --- */
    @page {
        margin: 0.75in; /* Standard document margins */
        size: A4; /* Or 'letter' depending on your target audience */
    }

    body {
        font-family: Georgia, 'Times New Roman', Times, serif; /* Classic serif font */
        font-size: 11pt; /* Standard document font size */
        line-height: 1.4;
        color: #000 !important; /* Force black text */
        background-color: #fff !important; /* Force white background */
        width: auto !important; /* Remove any fixed widths */
        min-width: 0 !important;
        max-width: 100% !important;
        margin: 0;
        padding: 0;
        border: none !important;
        box-shadow: none !important;
    }

    /* --- Hide Unnecessary Elements --- */
    /* Theme Toggle */
    [data-theme-toggle], /* Adjust if your toggle has a different selector */
    .theme-toggle, /* Common class name */
    [class*="ThemeToggle__StyledThemeToggle"], /* Target styled component */
    [class*="ThemeToggle__ThemeToggleButton"] /* Target specific button */ {
        display: none !important;
    }

    /* Print Button */
    [class*="PrintButton__StyledPrintButton"] /* Target styled component */ {
         display: none !important;
    }

    /* Hide the container div as well */
    [class*="FixedControls__FixedButtonContainer"] /* Target styled component - name might vary slightly */ {
        display: none !important;
    }

    /* Timeline Controls (Nav buttons, filters) */
    #top-nav-buttons,
    [class*="styles__TimelineFixed"] .bottom /* Hide the filter links container */ {
        display: none !important;
    }

    /* Detail Pane Close Button */
    .detail-pane-close {
        display: none !important;
    }

    /* Hide interactive cues like hover effects (though they won't work anyway) */
    *:hover {
        color: inherit !important; /* Prevent color changes */
        background-color: transparent !important; /* Prevent background changes */
        box-shadow: none !important;
        border-color: inherit !important;
    }

    /* Remove animations/transitions */
    * {
        transition: none !important;
        animation: none !important;
    }

    /* --- Layout Simplification --- */
    main {
        padding: 0 !important; /* Remove padding from main container if any */
        pointer-events: auto !important; /* Ensure main content is always interactive (for selection) */
    }

    /* Reset complex layout components like Sidebar, Cover, Stack */
    /* Use attribute selectors as styled-components classes can be dynamic */
    [class*="Sidebar__"], /* Targets styled(Sidebar) */
    [class*="Cover__"],   /* Targets styled(Cover) */
    [class*="Stack__"] {  /* Targets styled(Stack) */
        display: block !important; /* Force block layout */
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
    }

    /* Specific overrides for HomeContent (StyledHomeContent) */
    [class*="HomeContent__StyledHomeContent"] {
        margin-bottom: 2em !important; /* Space after home section */
    }
    [class*="HomeContent__StyledHomeContent"] > :first-child, /* Contact links */
    [class*="HomeContent__StyledHomeContent"] > :last-child { /* Name */
        text-align: left !important; /* Align left */
        padding-inline-start: 0 !important;
        padding-inline-end: 0 !important;
        width: 100% !important; /* Take full width */
    }

    /* Specific overrides for TimelineContentItem (StyledTimelineItem) */
    [class*="TimelineContentItem__StyledTimelineItem"] {
        margin-bottom: 1.5em !important; /* Space between timeline items */
        padding-bottom: 1em !important; /* Space below item content */
        border-bottom: 1px dotted #ccc !important; /* Separator */
        page-break-inside: avoid; /* Try to keep items on one page */
    }
    [class*="TimelineContentItem__StyledTimelineItem"] > :first-child, /* Date div */
    [class*="TimelineContentItem__StyledTimelineItem"] > :last-child { /* Content div */
        padding-inline-start: 0 !important;
        padding-inline-end: 0 !important;
        width: 100% !important;
    }

    /* --- Typography & Content Styling --- */
    h1, h2, h3, h4, h5, h6 {
        font-family: Georgia, 'Times New Roman', Times, serif; /* Consistent font */
        color: #000 !important;
        margin-top: 1.2em;
        margin-bottom: 0.4em;
        page-break-after: avoid; /* Keep headings with their content */
        font-weight: bold;
    }

    h1 { font-size: 18pt; }
    h2 { font-size: 16pt; }
    h3 { font-size: 13pt; } /* e.g., TimelineItemTitle */

    p {
        margin-bottom: 0.8em;
        orphans: 3; /* Min lines at bottom of page */
        widows: 3;  /* Min lines at top of page */
    }

    a {
        color: #000 !important; /* Black links */
        text-decoration: none !important; /* No underlines */
    }

    /* Show URLs for external links */
    a[href^="http"]::after,
    a[href^="mailto"]::after {
        content: " [" attr(href) "]";
        font-size: 9pt;
        color: #444 !important;
        word-wrap: break-word;
        display: inline; /* Ensure it flows with text */
    }
    /* Don't show URLs for internal/non-http links */
    a[href^="#"]::after,
    a[href^="/"]::after,
    [class*="HomeContent__StyledHomeContent"] a::after { /* Don't show URLs for contact links */
        content: "" !important;
    }

    /* --- Component-Specific Styling --- */

    /* Home Content */
    [class*="HomeContent__StyledHomeContent"] h1 { /* Marcel Kornblum */
        text-align: center !important;
        font-size: 22pt;
        margin-bottom: 0.5em;
        padding-bottom: 0.2em;
        border-bottom: 1px solid #000;
    }
    [class*="HomeContent__StyledHomeContent"] > div:first-child { /* Contact links container */
        text-align: center !important;
        margin-bottom: 1.5em;
    }
    [class*="HomeContent__StyledHomeContent"] div:first-child a {
        display: inline-block !important;
        margin: 0 0.75em;
        font-size: 10pt;
    }

    /* Timeline Fixed Date Header */
    [class*="styles__TimelineFixed"] { /* Target TimelineFixed styled component */
        position: static !important; /* NOT sticky/fixed */
        border-bottom: 1px solid #999 !important;
        padding: 0.2em 0 0.5em 0 !important;
        margin-bottom: 1.5em !important;
        text-align: left !important;
        background-color: transparent !important;
        z-index: auto !important;
    }
    [class*="styles__TimelineFixed"] .middle { /* The date text */
        font-size: 14pt;
        font-weight: bold;
        color: #000 !important;
    }

    /* Timeline Items */
    [class*="TimelineContentItem__StyledTimelineItem"] .date {
        opacity: 1 !important; /* Make date visible */
        color: #333 !important;
        font-size: 10pt;
        text-align: left !important; /* Align date left */
        margin-bottom: 0.3em;
        line-height: 1.3;
    }
    [class*="TimelineItemTitle__StyledTitle"] { /* Target specific styled component */
         margin-bottom: 0.2em !important;
         line-height: 1.3;
    }
    [class*="TimelineItemTitle__StyledTitle"] .primaryTitle,
    [class*="TimelineItemTitle__StyledTitle"] .secondaryTitle {
         color: #000 !important; /* Ensure titles are black */
         display: block; /* Stack titles */
    }
     [class*="TimelineItemTitle__StyledTitle"] .primaryTitle {
         font-weight: bold;
         font-size: 13pt; /* Match h3 */
     }
     [class*="TimelineItemTitle__StyledTitle"] .secondaryTitle {
         font-weight: normal;
         font-size: 11pt; /* Slightly smaller */
         color: #333 !important;
     }
    [class*="TimelineContentItem__StyledTimelineItem"] .tag {
        display: inline-block;
        margin-right: 0.8em;
        font-size: 9pt;
        color: #555 !important;
        font-style: italic;
    }
    [class*="TimelineContentItem__StyledTimelineItem"] .summary {
        color: #000 !important;
        margin-top: 0.5em;
    }
    [class*="TimelineContentItem__StyledTimelineItem"] .summary p {
        font-size: 10.5pt; /* Slightly smaller summary text */
        margin-bottom: 0.5em;
    }

    /* Detail Pane (Should generally be hidden unless explicitly printed) */
    /* This assumes the pane is only rendered when selectedItem is not null */
    [class*="styles__StyledDetailPaneWrapper"] {
        position: static !important;
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background-color: transparent !important;
        padding: 0 !important;
        margin: 1.5em 0 0 0 !important; /* Add space if it appears */
        border: none !important;
        box-shadow: none !important;
        display: block !important; /* Ensure it's block if rendered */
        border-top: 1px dashed #aaa !important; /* Separate it visually */
        page-break-before: auto; /* Allow page break before details if needed */
    }
    [class*="styles__StyledDetailPane"] {
        padding: 1em 0 !important;
    }
    [class*="styles__StyledDetailPane"] .detail-pane-content {
        /* Styles within detail pane */
    }
    [class*="styles__StyledDetailPane"] .detail-pane-content h3 { /* Title within pane */
        margin-top: 0; /* Remove top margin for title inside pane */
    }

    /* Portable Text Content */
    .portable-text-content p, /* Add class if needed */
    [class*="TimelineContentItem__StyledTimelineItem"] .summary p,
    [class*="styles__StyledDetailPane"] .detail-pane-content p {
        /* General paragraph styles already set */
    }
    .portable-text-content ul,
    .portable-text-content ol,
    [class*="TimelineContentItem__StyledTimelineItem"] .summary ul,
    [class*="TimelineContentItem__StyledTimelineItem"] .summary ol,
    [class*="styles__StyledDetailPane"] .detail-pane-content ul,
    [class*="styles__StyledDetailPane"] .detail-pane-content ol {
        margin-bottom: 1em;
        padding-left: 1.5em; /* Standard list indent */
        list-style-position: outside;
    }
    .portable-text-content ul,
    [class*="TimelineContentItem__StyledTimelineItem"] .summary ul,
    [class*="styles__StyledDetailPane"] .detail-pane-content ul {
        list-style-type: disc; /* Standard bullets */
    }
    .portable-text-content ol,
    [class*="TimelineContentItem__StyledTimelineItem"] .summary ol,
    [class*="styles__StyledDetailPane"] .detail-pane-content ol {
        list-style-type: decimal; /* Standard numbers */
    }
    .portable-text-content li,
    [class*="TimelineContentItem__StyledTimelineItem"] .summary li,
    [class*="styles__StyledDetailPane"] .detail-pane-content li {
        margin-bottom: 0.4em;
    }

    /* Images */
    img {
        max-width: 100% !important; /* Don't overflow page */
        max-height: 6in; /* Limit image height */
        height: auto !important;
        display: block; /* Prevent inline spacing issues */
        margin: 1em auto; /* Center images with margin */
        page-break-inside: avoid; /* Try to keep images on one page */
        border: 1px solid #ccc; /* Optional: subtle border */
        background-color: #eee; /* Placeholder if image fails */
    }
  }
`;

export default GlobalPrintStyles;
