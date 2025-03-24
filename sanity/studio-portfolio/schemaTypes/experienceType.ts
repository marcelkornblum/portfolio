import {defineField, defineType} from 'sanity'

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
      name: 'slug',
      type: 'slug',
    }),
    defineField({
      name: 'company',
      type: 'reference',
      to: [{type: 'company'}],
    }),
    defineField({
      name: 'start',
      type: 'datetime',
    }),
    defineField({
      name: 'end',
      type: 'datetime',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
