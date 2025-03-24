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
            type: 'datetime',
        }),
        defineField({
            name: 'image',
            type: 'image',
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
