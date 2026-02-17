import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'servicesListSection',
    }),
    defineField({
      name: 'whyChoose',
      title: 'Why Choose Section',
      type: 'whyChooseSection',
    }),
    defineField({
      name: 'stats',
      title: 'Stats Section',
      type: 'statsSection',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'testimonialsSection',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
