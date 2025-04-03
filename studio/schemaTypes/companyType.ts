import { defineField, defineType } from 'sanity'

export const companyType = defineType({
    name: 'company',
    title: 'Company',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            type: 'image',
        }),
        defineField({
            name: 'link',
            type: 'url',
        }),
        defineField({
            name: 'sector',
            type: 'array',
            of: [{
                type: 'string',
            }],
            options: {
                list: [
                    { title: "Advertising", value: "advertising" },
                    { title: "Government", value: "government" },
                    { title: "Media", value: "media" },
                    { title: "Retail", value: "retail" },
                ],
            }
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
