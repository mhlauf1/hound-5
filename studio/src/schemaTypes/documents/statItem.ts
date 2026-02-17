import {defineField, defineType} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'The stat value, e.g. "12+", "8,800", "4.4"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Description below the number, e.g. "Years of Care"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: [
          {title: 'Orange', value: 'orange'},
          {title: 'Green', value: 'green'},
          {title: 'Brown', value: 'brown'},
          {title: 'Grey', value: 'grey'},
        ],
        layout: 'radio',
      },
      initialValue: 'orange',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'label',
    },
  },
})
