import { defineField, defineType } from 'sanity'

export const awardType = defineType({
    name: 'award',
    title: 'Award',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'role',
            type: 'reference',
            to: [{ type: 'experience' }],
        }),
        defineField({
            name: 'project',
            type: 'reference',
            to: [{ type: 'project' }],
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
