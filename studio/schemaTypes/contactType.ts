import { defineField, defineType } from 'sanity'

export const contactType = defineType({
    name: 'contact',
    title: 'Contact',
    type: 'document',
    fields: [
        defineField({
            name: 'type',
            type: 'string',
        }),
        defineField({
            name: 'display',
            type: 'string',
        }),
        defineField({
            name: 'link',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            type: 'image',
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
