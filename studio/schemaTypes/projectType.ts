import { defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
        }),
        defineField({
            name: 'role',
            type: 'reference',
            to: [{ type: 'experience' }],
        }),
        defineField({
            name: 'date',
            type: 'date',
        }),
        defineField({
            name: 'image',
            type: 'image',
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
            name: 'dateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        }
    ]
})
