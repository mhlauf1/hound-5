import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {testimonial} from './documents/testimonial'
import {statItem} from './documents/statItem'
import {serviceOverview} from './documents/serviceOverview'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {homepage} from './singletons/homepage'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {badge} from './objects/badge'
import {feature} from './objects/feature'
import {heroSection} from './objects/heroSection'
import {servicesListSection} from './objects/servicesListSection'
import {whyChooseSection} from './objects/whyChooseSection'
import {statsSection} from './objects/statsSection'
import {testimonialsSection} from './objects/testimonialsSection'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  homepage,
  // Documents
  page,
  post,
  person,
  testimonial,
  statItem,
  serviceOverview,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  badge,
  feature,
  heroSection,
  servicesListSection,
  whyChooseSection,
  statsSection,
  testimonialsSection,
]
