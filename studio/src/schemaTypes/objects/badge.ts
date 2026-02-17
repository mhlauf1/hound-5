import {defineField, defineType} from 'sanity'

export const badge = defineType({
  name: 'badge',
  title: 'Badge',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'dotColor',
      title: 'Dot Color',
      type: 'string',
      options: {
        list: [
          {title: 'Orange', value: 'orange'},
          {title: 'Green', value: 'green'},
          {title: 'Brown', value: 'brown'},
        ],
      },
      initialValue: 'orange',
    }),
  ],
})
