"use client";

import { TimelineItem } from '@/lib/sanity';
import TimelineContent from './TimelineContent';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const getQueryParamAsArray = (param: string | string[] | null): string[] => {
    if (!param) return [];
    if (Array.isArray(param)) return param;
    return param.split(',').map(s => s.trim()).filter(Boolean);
};

export default function TimelineWithState({ timeline: initialTimeline }: { timeline: TimelineItem[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
    const [filters, setFilters] = useState<{
        type: string[];
        employment: string[]
    }>(() => {
        const initialType = getQueryParamAsArray(searchParams.get('type'));
        const initialEmployment = getQueryParamAsArray(searchParams.get('employment'));
        return {
            type: initialType,
            employment: initialEmployment,
        };
    });

    useEffect(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (filters.type.length > 0) {
            current.set('type', filters.type.join(','));
        } else {
            current.delete('type');
        }

        if (filters.employment.length > 0) {
            current.set('employment', filters.employment.join(','));
        } else {
            current.delete('employment');
        }

        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.replace(`/timeline${query}`, { scroll: false });
    }, [filters, router, searchParams])

    const handleItemClick = (item: TimelineItem) => {
        if (item == selectedItem) {
            setSelectedItem(null);
            const scrollY = document.body.style.top;
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            const mainElement = document.getElementsByTagName('main')[0];
            if (mainElement) {
                mainElement.style.pointerEvents = 'auto';
            }
            const topNavButtons = document.getElementById('top-nav-buttons');
            if (topNavButtons) {
                topNavButtons.style.visibility = 'hidden';
            }
        } else {
            setSelectedItem(item);
            document.body.style.top = `-${window.scrollY}px`;
            const mainElement = document.getElementsByTagName('main')[0];
            if (mainElement) mainElement.style.pointerEvents = 'none';
            const topNavButtons = document.getElementById('top-nav-buttons'); if (topNavButtons) topNavButtons.style.visibility = 'visible';
        }
    }

    const handleClosePane = () => {
        setSelectedItem(null);
        const scrollY = document.body.style.top;
        // document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        const mainElement = document.getElementsByTagName('main')[0];
        if (mainElement) mainElement.style.pointerEvents = 'auto';
        const topNavButtons = document.getElementById('top-nav-buttons');
        if (topNavButtons) {
            topNavButtons.style.visibility = 'hidden';
        }
    };

    const handleFilterChange = useCallback((filterType: string, value: string) => {
        setFilters((prevFilters) => {
            const currentValues = prevFilters[filterType as keyof typeof filters];
            let updatedValues;
            if (currentValues.includes(value)) {
                updatedValues = currentValues.filter((item) => item !== value);
            } else {
                updatedValues = [...currentValues, value];
            }
            return {
                ...prevFilters,
                [filterType]: updatedValues,
            };
        });
    }, []);

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
