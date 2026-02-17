import {defineField, defineType} from 'sanity'

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'statItem'}]}],
    }),
  ],
})
