"use client";

import { TimelineItem } from '@/lib/sanity';
import TimelineContent from './TimelineContent';
import { useState } from 'react';

export default function TimelineWithState({ timeline: initialTimeline }: { timeline: TimelineItem[] }) {
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
    const [filters, setFilters] = useState<{ type: string[]; employment: string[] }>({ type: [], employment: [] }); // State for filters

    const handleItemClick = (item: TimelineItem) => {
        if (item == selectedItem) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        };
    }

    const handleClosePane = () => {
        setSelectedItem(null); // Clear the selected item
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[filterType as keyof typeof updatedFilters].includes(value)) {
                updatedFilters[filterType as keyof typeof updatedFilters] = updatedFilters[filterType as keyof typeof updatedFilters].filter((item) => item !== value);
            } else {
                updatedFilters[filterType as keyof typeof updatedFilters].push(value);
            }
            return updatedFilters;
        });
    };

    return (
        <TimelineContent
            timeline={initialTimeline}
            selectedItem={selectedItem}
            filters={filters}
            handleItemClick={handleItemClick}
            handleClosePane={handleClosePane}
            handleFilterChange={handleFilterChange}
        />
    );
}
