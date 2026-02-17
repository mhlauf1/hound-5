import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorLabel',
      title: 'Author Label',
      type: 'string',
      description: 'e.g. "Multi-dog Family", "Daycare Client"',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
    },
  },
})
