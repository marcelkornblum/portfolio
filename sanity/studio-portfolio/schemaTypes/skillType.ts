import { defineField, defineType } from 'sanity';

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
        defineField({
            name: 'evidence',
            title: 'Evidence',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'point',
                            type: 'string',
                            title: 'Evidence Point',
                        },
                        {
                            name: 'role',
                            type: 'reference',
                            title: 'Associated Role',
                            to: [{ type: 'experience' }],
                        },
                    ],
                },
            ],
        }),
    ],
});
