import {defineField, defineType} from 'sanity'

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Iconify icon name (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
})
