import { defineField, defineType } from 'sanity'

export const educationType = defineType({
    name: 'education',
    title: 'Education',
    type: 'document',
    fields: [
        defineField({
            name: 'institution',
            type: 'string',
        }),
        defineField({
            name: 'course',
            type: 'string',
        }),
        defineField({
            name: 'start',
            type: 'date',
        }),
        defineField({
            name: 'end',
            type: 'date',
        }),
        defineField({
            name: 'summary',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ], orderings: [
        {
            title: 'Date, New',
            name: 'startDesc',
            by: [
                { field: 'start', direction: 'desc' }
            ]
        }
    ]
})
