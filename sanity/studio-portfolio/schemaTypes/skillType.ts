import { defineField, defineType } from 'sanity'

export const skillType = defineType({
    name: 'skill',
    title: 'Skill',
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
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
