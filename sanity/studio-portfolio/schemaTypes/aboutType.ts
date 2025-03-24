import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
