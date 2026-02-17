import {defineField, defineType} from 'sanity'

export const whyChooseSection = defineType({
  name: 'whyChooseSection',
  title: 'Why Choose Section',
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
      type: 'string',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'blockContentTextOnly',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'feature'}],
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
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
})
