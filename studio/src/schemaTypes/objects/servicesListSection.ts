import {defineField, defineType} from 'sanity'

export const servicesListSection = defineType({
  name: 'servicesListSection',
  title: 'Services List Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'badge',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'serviceOverview'}]}],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
        defineField({
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {list: ['solid', 'outline']},
          initialValue: 'solid',
        }),
      ],
    }),
  ],
})
