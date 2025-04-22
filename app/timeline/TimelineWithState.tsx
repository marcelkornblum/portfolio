"use client";

import { TimelineItem } from '@/lib/sanity';
import TimelineContent from './TimelineContent';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const getQueryParamAsArray = (param: string | string[] | null): string[] => {
    if (!param) return [];
    if (Array.isArray(param)) return param;
    return param.split(',').map(s => s.trim()).filter(Boolean);
};

const allFiltersActive = {
    type: ['experience', 'project', 'education'],
    employment: ['permanent', 'contract']
}

// Helper function to update URL query parameters
const updateQueryParams = (
    searchParams: URLSearchParams,
    updates: { [key: string]: string | null } // null means delete the key
): string => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
            current.delete(key);
        } else {
            current.set(key, value);
        }
    });
    return current.toString();
};


export default function TimelineWithState({ timeline: initialTimeline }: { timeline: TimelineItem[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isInitialLoad = useRef(true); // Flag to handle initial load logic correctly

    // Initialize filters based on URL or defaults
    const [filters, setFilters] = useState<{
        type: string[];
        employment: string[]
    }>(() => {
        let initialType = getQueryParamAsArray(searchParams.get('type'));
        let initialEmployment = getQueryParamAsArray(searchParams.get('employment'));
        // If no filters are set in the URL, default to all active
        if (initialType.length === 0 && initialEmployment.length === 0 && !searchParams.has('type') && !searchParams.has('employment')) {
            initialType = allFiltersActive.type;
            initialEmployment = allFiltersActive.employment;
        }
        return {
            type: initialType,
            employment: initialEmployment,
        };
    });

    // Initialize selectedItem based on URL
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

    // Effect to set initial selected item from URL only on mount
    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false; // Mark initial load as done

            const itemIdFromUrl = searchParams.get('item');
            if (itemIdFromUrl) {
                const itemFromUrl = initialTimeline.find(item => item._id === itemIdFromUrl);
                if (itemFromUrl) {
                    // Set state and trigger side effects *without* updating the URL again
                    setSelectedItem(itemFromUrl);
                    // Apply side effects for opened pane
                    document.body.style.top = `-${window.scrollY}px`; // Lock scroll
                    const mainElement = document.getElementsByTagName('main')[0];
                    if (mainElement) mainElement.style.pointerEvents = 'none';
                    const topNavButtons = document.getElementById('top-nav-buttons');
                    if (topNavButtons) topNavButtons.style.visibility = 'visible';
                } else {
                    // Optional: Clean up invalid item ID from URL on load
                    const newQueryString = updateQueryParams(searchParams, { item: null });
                    const query = newQueryString ? `?${newQueryString}` : '';
                    router.replace(`${pathname}${query}`, { scroll: false });
                }
            }
        }
    }, [initialTimeline, searchParams, pathname, router]); // Dependencies needed for access

    // Effect to update URL when filters change
    useEffect(() => {
        // Don't run this logic on the very first render pass if we handled item selection above
        if (isInitialLoad.current) return;

        const filterUpdates: { [key: string]: string | null } = {};

        if (filters.type.length > 0 && filters.type.length < allFiltersActive.type.length) {
            filterUpdates['type'] = filters.type.join(',');
        } else {
             // Remove 'type' if all are selected (default) or none are selected (shouldn't happen with current logic but safe)
            filterUpdates['type'] = null;
        }

        if (filters.employment.length > 0 && filters.employment.length < allFiltersActive.employment.length) {
            filterUpdates['employment'] = filters.employment.join(',');
        } else {
            // Remove 'employment' if all are selected (default) or none are selected
             filterUpdates['employment'] = null;
        }

        // Preserve existing 'item' parameter if present
        const currentItem = searchParams.get('item');
        const newQueryString = updateQueryParams(searchParams, filterUpdates);

        // Re-add item if it was removed by updateQueryParams logic (it shouldn't be, but defensive)
        const finalParams = new URLSearchParams(newQueryString);
        if (currentItem && !finalParams.has('item')) {
            finalParams.set('item', currentItem);
        }

        const finalQueryString = finalParams.toString();
        const query = finalQueryString ? `?${finalQueryString}` : '';

        // Only push history if the query string actually changes
        if (`${pathname}${query}` !== window.location.pathname + window.location.search) {
             router.replace(`${pathname}${query}`, { scroll: false });
        }

    }, [filters, router, pathname, searchParams]); // Rerun when filters change

    const handleFilterChange = useCallback((filterType: string, value: string) => {
        setFilters((prevFilters) => {
            const currentValues = prevFilters[filterType as keyof typeof filters];
            let updatedValues;
            let otherFilterValues: Array<string> = []
            let nextFilters = { ...prevFilters }; // Start with a copy

            // Logic to handle dependencies between 'experience' type and employment filters
            if (filterType === 'type' && value === 'experience') {
                if (!currentValues.includes(value)) { // If adding 'experience'
                    otherFilterValues = allFiltersActive.employment; // Activate all employment filters
                    nextFilters = { ...nextFilters, employment: otherFilterValues };
                } else { // If removing 'experience'
                    nextFilters = { ...nextFilters, employment: [] }; // Deactivate all employment filters
                }
            } else if (filterType === 'employment') {
                const currentEmployment = prevFilters.employment;
                const currentType = prevFilters.type;
                if (currentEmployment.includes(value)) { // If removing an employment filter
                    if (currentEmployment.length === 1) { // If it's the last one
                        // Also remove 'experience' type if it exists
                        nextFilters = { ...nextFilters, type: currentType.filter(t => t !== 'experience') };
                    }
                } else { // If adding an employment filter
                    if (currentEmployment.length === 0) { // If it's the first one
                        // Also add 'experience' type if it doesn't exist
                        if (!currentType.includes('experience')) {
                             nextFilters = { ...nextFilters, type: [...currentType, 'experience'] };
                        }
                    }
                }
            }

            // Update the specific filter being changed
            const targetValues = nextFilters[filterType as keyof typeof filters];
            if (targetValues.includes(value)) {
                updatedValues = targetValues.filter((item) => item !== value);
            } else {
                updatedValues = [...targetValues, value];
            }

            return {
                ...nextFilters,
                [filterType]: updatedValues,
            };
        });
    }, []);

    const handleItemClick = (item: TimelineItem) => {
        let newItemId: string | null = null;

        if (item === selectedItem) {
            // Deselecting the current item
            setSelectedItem(null);
            newItemId = null; // Remove item from URL

            // Restore scroll position etc.
            const scrollY = document.body.style.top;
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            const mainElement = document.getElementsByTagName('main')[0];
            if (mainElement) mainElement.style.pointerEvents = 'auto';
            const topNavButtons = document.getElementById('top-nav-buttons');
            if (topNavButtons) topNavButtons.style.visibility = 'hidden';

        } else {
            // Selecting a new item
            setSelectedItem(item);
            newItemId = item._id; // Add item to URL

            // Freeze scroll position etc.
            document.body.style.top = `-${window.scrollY}px`;
            const mainElement = document.getElementsByTagName('main')[0];
            if (mainElement) mainElement.style.pointerEvents = 'none';
            const topNavButtons = document.getElementById('top-nav-buttons');
            if (topNavButtons) topNavButtons.style.visibility = 'visible';
        }

        // Update URL with the new item state
        const newQueryString = updateQueryParams(searchParams, { item: newItemId });
        const query = newQueryString ? `?${newQueryString}` : '';
        router.replace(`${pathname}${query}`, { scroll: false });
    }

    const handleClosePane = () => {
        if (!selectedItem) return; // Avoid unnecessary updates if already closed

        setSelectedItem(null);

        // Restore scroll position etc.
        const scrollY = document.body.style.top;
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        const mainElement = document.getElementsByTagName('main')[0];
        if (mainElement) mainElement.style.pointerEvents = 'auto';
        const topNavButtons = document.getElementById('top-nav-buttons');
        if (topNavButtons) topNavButtons.style.visibility = 'hidden';

        // Update URL to remove item parameter
        const newQueryString = updateQueryParams(searchParams, { item: null });
        const query = newQueryString ? `?${newQueryString}` : '';
        router.replace(`${pathname}${query}`, { scroll: false });
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
