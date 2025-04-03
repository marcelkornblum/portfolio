import { defineField, defineType } from 'sanity'

export const experienceType = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'role',
            type: 'string',
        }),
        defineField({
            name: 'is_contract',
            type: 'boolean',
        }),
        defineField({
            name: 'company',
            type: 'reference',
            to: [{ type: 'company' }],
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
