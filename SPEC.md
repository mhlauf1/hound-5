# Hound Around Resort — Template 5 Project Spec

## Instructions for Claude Code

**Before writing any code, explore the existing project structure.** This project was scaffolded from `sanity-io/sanity-template-nextjs-clean` and uses npm workspaces with two packages: `frontend/` (Next.js app) and `studio/` (Sanity Studio).

1. **Read the existing codebase first.** Walk through `frontend/app/`, `frontend/sanity/`, `studio/src/`, and all config files (`tailwind.config.ts`, `next.config.ts`, `postcss.config.mjs`, `sanity.config.ts`, etc.) to understand the starter's conventions, existing schemas, existing components, utility patterns, and routing setup before making architectural decisions.
2. **Follow the starter's patterns.** This template has its own way of handling Sanity client setup, GROQ queries, portable text, image handling, and live preview. Extend those patterns — don't replace them. If the starter uses a specific Sanity client wrapper or image builder, use it.
3. **Build within the existing structure.** The `frontend/app/` directory already exists. Add page routes, sections, and components following the architecture defined in this spec, but respect any existing layout.tsx, not-found.tsx, or other files the starter provides.
4. **Sanity schemas go in `studio/src/`.** Follow whatever schema organization pattern the starter uses (likely `schemaTypes/` or similar). Register all new schemas in the studio config.
5. **Install dependencies as needed** in the correct workspace (`--workspace=frontend` for Next.js deps like framer-motion, `--workspace=studio` for Sanity plugins).
6. **Reference the design screenshots** in the project folder for visual guidance. The spec below describes each section in detail, but the screenshots are the source of truth for layout and visual treatment.

---

## Project Overview

**Client:** Hound Around Resort — Dog daycare, boarding, grooming & self-wash facility
**Location:** 8607 W Point Douglas Rd S, Cottage Grove, MN 55201
**Tagline:** "The place your dog actually wants to go."
**Founded:** 2013, family-owned and operated
**Parent Company:** Embark Pet Services (Cadence Private Capital portfolio)

**Template ID:** Template 5 — "Warm Editorial"
**Aesthetic Direction:** Boutique-hotel warmth meets modern editorial restraint. Soft tans, rich browns, and burnt orange create an inviting, premium feel. The design communicates trust and sophistication without pretension — like a high-end lifestyle brand that happens to be a dog resort.

---

## Tech Stack

- **Framework:** Next.js (latest stable via sanity-template-nextjs-clean)
- **CMS:** Sanity v5 (project ID: `yx5plwlo`, dataset: `production`)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Iconify
- **Fonts:** Google Fonts (Libre Caslon Text, Geist)
- **Starter:** `sanity-io/sanity-template-nextjs-clean`

---

## Design Tokens / Style Guide

### Colors

| Token                | Hex       | Usage                                                        |
| -------------------- | --------- | ------------------------------------------------------------ |
| `--color-light-tan`  | `#FEF5EF` | Main page background, card backgrounds                       |
| `--color-dark-brown` | `#3B2B28` | Dark section backgrounds (services, testimonials), body text |
| `--color-brown`      | `#703527` | Headlines, primary heading color                             |
| `--color-orange`     | `#E37C3C` | CTAs, badges/dots, accent borders on stat cards              |
| `--color-grey`       | `#E6DFDA` | Subtle borders, dividers, muted backgrounds                  |
| `--color-green`      | `#B7E1C4` | Decorative accent strip, secondary accent                    |
| `--color-white`      | `#FFFFFF` | Card surfaces, stat cards, text on dark backgrounds          |

**Opacity Pattern:** Subtext on light backgrounds uses `dark-brown` at 70% opacity. Subtext on dark backgrounds uses `white` at 70-80% opacity.

### Typography

| Role                     | Font              | Weight        | Size    | Line Height | Letter Spacing | Case      |
| ------------------------ | ----------------- | ------------- | ------- | ----------- | -------------- | --------- |
| **H1 / Hero Heading**    | Libre Caslon Text | 400 (Regular) | 84px    | 90% (0.9)   | -1px           | Sentence  |
| **H2 / Section Heading** | Libre Caslon Text | 400 (Regular) | 48-56px | 95%         | -0.5px         | Sentence  |
| **H3 / Card Heading**    | Libre Caslon Text | 400 (Regular) | 32-36px | 100%        | 0              | Sentence  |
| **Stat Number**          | Libre Caslon Text | 400 (Regular) | 64-72px | 100%        | -1px           | —         |
| **Body / Paragraph**     | Geist             | 400 (Regular) | 20-24px | 150%        | 0              | Sentence  |
| **Badge / Label**        | Geist             | 400-500       | 12-14px | 100%        | 10% (0.1em)    | UPPERCASE |
| **Nav Links**            | Geist             | 400           | 16px    | 100%        | 0              | Sentence  |
| **Button Text**          | Geist             | 500 (Medium)  | 16px    | 100%        | 0              | Sentence  |
| **Stat Label**           | Geist             | 400           | 14-16px | 130%        | 0              | Sentence  |
| **Footer Body**          | Geist             | 400           | 14px    | 150%        | 0              | Sentence  |
| **Footer Heading**       | Geist             | 500           | 14px    | 100%        | 0.05em         | Sentence  |

**Font Loading:** Import Libre Caslon Text (400, 400 italic) and Geist (400, 500) via Google Fonts / next/font.

### Spacing & Layout

| Token                 | Value                             | Usage                                        |
| --------------------- | --------------------------------- | -------------------------------------------- |
| `--radius`            | 8px                               | All rounded corners (buttons, cards, images) |
| `--section-padding-y` | 96-120px                          | Vertical padding on full-width sections      |
| `--section-padding-x` | 64-80px (desktop) / 24px (mobile) | Horizontal page gutters                      |
| `--max-content-width` | 1280px                            | Max width for content container              |
| `--gap-sm`            | 8px                               | Tight spacing                                |
| `--gap-md`            | 16px                              | Default gap                                  |
| `--gap-lg`            | 32px                              | Section internal spacing                     |
| `--gap-xl`            | 48-64px                           | Between major elements                       |

### Component Patterns

**Badges:** Circle dot (8px, `orange`) + uppercase Geist label with 10% letter-spacing. Used as section eyebrow labels. Light text on dark bgs, orange/brown text on light bgs.

**CTAs / Buttons:** Solid `orange` background, `white` text, `8px` border-radius, right arrow (→), horizontal padding ~24-32px, height ~48px. Hover: slight darken or scale.

**Dividers:** 1px `dark-brown` at ~20% opacity on light backgrounds, 1px `white` at ~20% opacity on dark backgrounds.

**Cards:** `white` background, `8px` border-radius, subtle shadow or no shadow (flat), left-border accent (`orange` or color-coded by service).

---

## Global Animation System (Framer Motion)

### Scroll-Triggered Fade-In

Every section and element should animate in as it enters the viewport. Use a reusable `<FadeIn>` wrapper component.

```tsx
// components/ui/FadeIn.tsx
'use client'
import {motion} from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
}

const directionOffset = {
  up: {y: 24},
  down: {y: -24},
  left: {x: 24},
  right: {x: -24},
  none: {},
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{opacity: 0, ...directionOffset[direction]}}
      whileInView={{opacity: 1, x: 0, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{duration, delay, ease: [0.25, 0.1, 0.25, 1]}}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Staggered Children

For groups (stat cards, service items, footer columns), stagger children with incremental delays (0.1s apart).

### Interaction Animations

- **Buttons:** `whileHover={{ scale: 1.02 }}` + slight background darken
- **Nav links:** Underline slide-in from left on hover
- **Service rows:** Subtle background highlight on hover
- **Testimonial carousel:** Slide transition between items
- **Stat numbers:** Optional count-up animation on first view

---

## Page Architecture

### File Structure (Frontend)

> **Note for Claude Code:** The structure below is the target architecture. Adapt it to work within the existing starter's conventions. If the starter already has an `app/` directory with layout files, build around them. The key organizational principle is: **sections live in page-specific folders**, not in one flat components directory.

```
frontend/
├── app/
│   ├── layout.tsx                    # Already exists — extend with fonts, metadata
│   ├── page.tsx                      # Homepage — compose from home sections
│   ├── globals.css                   # Extend with custom properties / design tokens
│   │
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── daycare/
│   │   │   └── page.tsx
│   │   ├── boarding/
│   │   │   └── page.tsx
│   │   ├── grooming/
│   │   │   └── page.tsx
│   │   └── self-wash/
│   │       └── page.tsx
│   ├── webcams/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── sections/                         # Page-specific section components
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyChooseSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── index.ts                  # Barrel export
│   ├── about/
│   │   └── ...
│   ├── services/
│   │   └── ...
│   ├── pricing/
│   │   └── ...
│   ├── webcams/
│   │   └── ...
│   └── contact/
│       └── ...
│
├── components/                       # Shared / global components
│   ├── global/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── FadeIn.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── StatCard.tsx
│       ├── TestimonialCard.tsx
│       ├── ServiceRow.tsx
│       └── SectionWrapper.tsx
│
├── sanity/                           # Already exists — extend with queries
│   └── ... (use existing client, image helpers, etc.)
│
└── ... (existing config files)
```

### Pages Overview

| Page          | Route                 | Sections                                          |
| ------------- | --------------------- | ------------------------------------------------- |
| **Home**      | `/`                   | Hero, Services, Why Choose, Stats, Testimonials   |
| **About Us**  | `/about`              | Hero, Our Story, Team/Values, Stats (reused), CTA |
| **Daycare**   | `/services/daycare`   | Service Hero, Detail, Features, Testimonial, CTA  |
| **Boarding**  | `/services/boarding`  | Service Hero, Detail, Features, Testimonial, CTA  |
| **Grooming**  | `/services/grooming`  | Service Hero, Detail, Features, Testimonial, CTA  |
| **Self-Wash** | `/services/self-wash` | Service Hero, Detail, Features, Testimonial, CTA  |
| **Webcams**   | `/webcams`            | Hero, Webcam Feeds/Embeds                         |
| **Pricing**   | `/pricing`            | Hero, Pricing Tables per Service                  |
| **Contact**   | `/contact`            | Hero, Contact Form, Map, Hours                    |

All pages include global **Navbar** and **Footer**.

---

## Homepage Section Specs (from Screenshots)

### 1. Navbar

**Layout:** Full-width, sticky top, transparent initially → solid `light-tan` on scroll.
**Left:** Logo text "Hound Around" (serif, ~20px) with "RESORT" below (sans, uppercase, letter-spaced, ~10px, `orange`).
**Right:** Nav links — "Services" (with dropdown chevron), "About Us", "Web Cams", "Pricing". Geist 16px, `dark-brown` text (or `white` on hero overlay depending on scroll state).
**Dropdown (Services):** Flyout with: Daycare, Boarding, Grooming, Self-Wash.
**Mobile:** Hamburger menu → full-screen or slide-out drawer.
**Height:** ~72-80px.

### 2. Hero Section

**Background:** `light-tan` base.
**Layout:** Two-row composition.

**Top Row:** Full-width image area. Dog (golden retriever) reaching up to a "WELCOME" sign. Image has warm, natural tones. Image crops at roughly 60% viewport height. Slight rounded corners on container (8px) or no radius on full-bleed.

**Bottom Row:** Two columns.

- **Left Column (~55%):** Badge ("Cottage Grove's Premier Pet Resort" with circle dot), H1 headline "The place your dog actually wants to go." (serif, 84px, `brown`), Subline "Family-owned since 2013." (sans, 20px, `dark-brown` at 70%).
- **Right Column (~45%):** Body copy "More than daycare. It's a resort. Where every pup gets the royal treatment, from spacious suites to all-day play." (sans, 20-24px, `dark-brown`), CTA button "Make A Reservation →" (`orange` bg, `white` text).

**Accent Strips:** At the very bottom of the hero, a row of small horizontal color blocks: `green`, teal/muted, `orange`/tan — ~8-12px tall, used as a decorative divider. These are purely decorative. Implement as a flex row of colored divs.

### 3. Services Section

**Background:** `dark-brown` (#3B2B28), full-width.
**Layout:** Single column, left-aligned.

**Badge:** Circle dot (`orange`) + "Cottage Grove's Premier Pet Resort" in `white`/cream uppercase Geist.
**Heading:** Multi-line serif heading: "We've been taking care of Cottage Grove's dogs since 2013, and we're just getting started. One place for everything your dog needs." — Libre Caslon Text, ~48px, `white`, ~90% line-height.

**Service List:** Numbered list with horizontal dividers.
Each row:

- Left: Number (serif, ~48px, `white`)
- Right: Service name (serif, ~36-48px, `white`, right-aligned)
- Divider: 1px `white` at ~15% opacity between each row
- Rows: 1 — Daycare, 2 — Boarding, 3 — Grooming, 4 — Self-Wash
- Hover: Subtle highlight (white at ~5% bg) + slight text shift

**CTA:** "Explore Services →" button, `orange` bg, `white` text, bottom-left.

**Animation:** Badge and heading fade in first, then service rows stagger in (0.1s delay each).

### 4. Why Choose Section

**Background:** `light-tan` to `white` gradient or split.
**Layout:** Two columns, roughly 50/50.

**Left Column:** Large editorial photo — woman walking white dog through modern lobby. Image has intentional motion blur (lifestyle/editorial feel). Image fills the column height with 8px rounded corners.

**Right Column:** Contained in a light card/panel (`white` or very light tan bg).

- Badge: Circle dot (`orange`) + "Why Choose Hound Around"
- Heading: "The only dog care partner you need for your piece of mind" (serif, ~40-48px, `dark-brown`)
- Body: Two paragraphs of descriptive text (sans, 18-20px, `dark-brown` at 80%)
- Feature Bullets: 2-column grid of bullet points with orange dots:
  - Live Webcams | Play Included
  - Family Owned | Genuine Care
  - Expert Staff | Suites, Not Kennels
- CTA: "Learn More →" outlined or `orange` solid button

**Animation:** Left image slides in from left, right content fades in from right with stagger.

### 5. Stats Section

**Background:** `light-tan`.
**Layout:** Two areas.

**Top Area:**

- Left: Large heading "Suites, Not Kennels." (serif, ~56-72px, `brown`)
- Right: Body copy about the facility (sans, 18-20px, `dark-brown`)

**Bottom Area:** 4-column grid of stat cards.
Each card:

- `white` background, 8px border-radius
- Colored left border (4px): alternating `orange`, teal-ish blue, green, `orange` — or use the brand accent colors
- Large number (serif, ~64px, `dark-brown`): "12+", "8,800", "4.4", "365"
- Label below (sans, 14-16px, `dark-brown` at 70%): "Years of Care", "Sq Ft of Play Space", "On Google Reviews", "Open Year Round"

**Animation:** Heading fades in, then cards stagger in left to right. Optional: numbers count up from 0.

### 6. Testimonials Section

**Background:** `dark-brown` (#3B2B28), full-width.
**Layout:** Two columns, roughly 50/50.

**Left Column:**

- Badge: Circle dot (`orange`) + "Why Choose Hound Around"
- Heading: "Don't take our word for it" (serif, ~48px, `white`)
- Testimonial Card: `light-tan`/cream bg, 8px radius
  - Quote text (serif italic or sans, 20-24px, `dark-brown`)
  - Attribution: "— Michon B." (serif bold, 16px) + "Multi-dog Family" (sans, 14px, `dark-brown` at 60%)
- Carousel Dots: Row of 10 dots (8px circles), active = `orange` filled, inactive = `white` outlined or `white` at 30% opacity

**Right Column:** Editorial still-life photo — leather leashes hanging on a wall hook, warm golden light. 8px rounded corners.

**Carousel Logic:** Auto-rotate every 5-6 seconds, swipeable on mobile, clickable dots, smooth slide transition.

**Animation:** Content fades in from left, image from right.

### 7. Footer

**Background:** `light-tan`.
**Layout:** 4-column grid.

**Column 1 — Brand:**

- Logo: "Hound Around" (serif) + "RESORT" (sans, uppercase, `orange`)
- Tagline: "Your dog's home away from home. Family-owned and operated since 2013, providing exceptional care in Cottage Grove, MN." (sans, 14px, `dark-brown` at 70%)

**Column 2 — Services:**

- Heading: "Services"
- Links: Daycare, Boarding, Grooming, Self-Wash

**Column 3 — Company:**

- Heading: "Company"
- Links: About Us, Pricing, Webcams, New Clients

**Column 4 — Contact:**

- Heading: "Contact"
- Address: 8607 W Point Douglas Rd S, Cottage Grove, MN 55201
- Phone: 841-525-4923
- Email: contact@houndaroundresort.com

**Bottom Bar:** Divider line, then "© 2026 Hound Around Resort. Part of the Embark Pet Services family." on left, "Privacy Policy" and "Terms of Service" on right.

**Link Styling:** `dark-brown` at 70%, hover: `orange` or full `dark-brown`.

---

## Sanity Schema Map

### Document Types

```
// Page-level documents
homepage           → Single document, references section content
aboutPage          → Single document
servicePage        → Multiple (one per service: daycare, boarding, grooming, self-wash)
pricingPage        → Single document
webcamsPage        → Single document
contactPage        → Single document

// Reusable content documents
testimonial        → { quote, authorName, authorLabel, rating? }
teamMember         → { name, role, bio, photo }
statItem           → { number, label, accentColor? }
serviceOverview    → { title, slug, shortDescription, icon?, order }
siteSettings       → { logo, siteName, tagline, phone, email, address, socialLinks }
navigation         → { mainNav[], footerNav{} }
```

### Key Object Types

```
// Portable Text blocks for rich content
blockContent       → Standard Sanity portable text

// Section-level objects (used within page documents)
heroSection        → { badge, headline, subline, bodyText, cta, heroImage, accentStrips[] }
servicesListSection → { badge, heading, services[] ref, cta }
whyChooseSection   → { badge, heading, bodyText, features[], cta, image }
statsSection       → { heading, bodyText, stats[] ref }
testimonialsSection → { badge, heading, testimonials[] ref, image }

// Shared objects
cta                → { label, href, style: 'solid' | 'outline' }
badge              → { text, dotColor? }
feature            → { label, icon? }
```

---

## Reusable Component Inventory

| Component         | Props                                               | Used In                     |
| ----------------- | --------------------------------------------------- | --------------------------- |
| `Navbar`          | `navigation, siteSettings`                          | All pages (global layout)   |
| `Footer`          | `navigation, siteSettings`                          | All pages (global layout)   |
| `FadeIn`          | `delay, direction, duration, className`             | Wraps all animated elements |
| `SectionWrapper`  | `bg, paddingY, className, children`                 | Every section               |
| `Badge`           | `text, dotColor?, variant: 'light' \| 'dark'`       | Section eyebrows            |
| `Button`          | `label, href, variant: 'solid' \| 'outline', icon?` | CTAs throughout             |
| `StatCard`        | `number, label, accentColor`                        | Stats section               |
| `TestimonialCard` | `quote, authorName, authorLabel`                    | Testimonials section        |
| `ServiceRow`      | `number, title, href`                               | Services section            |

---

## Image Asset Requirements

All images will be uploaded to Sanity. These are the image slots needed:

| Image                             | Aspect Ratio    | Treatment                           | Section              |
| --------------------------------- | --------------- | ----------------------------------- | -------------------- |
| Hero dog photo                    | ~16:9 landscape | Warm, natural tones, editorial      | Hero                 |
| Lobby/walking dog photo           | ~3:4 portrait   | Motion blur, lifestyle editorial    | Why Choose           |
| Leash still-life                  | ~3:4 portrait   | Moody, warm golden light, editorial | Testimonials         |
| Service-specific hero images (×4) | ~16:9           | Per-service editorial photography   | Service detail pages |
| Team/about photos                 | ~1:1 or 3:4     | Warm, professional                  | About page           |
| Facility photos                   | Various         | Interior/exterior shots             | About, Services      |

---

## Responsive Breakpoints

| Breakpoint  | Width       | Key Changes                                                                                  |
| ----------- | ----------- | -------------------------------------------------------------------------------------------- |
| **Mobile**  | < 768px     | Single column, stacked layouts, hamburger nav, reduced heading sizes (~50-60%), 24px gutters |
| **Tablet**  | 768-1024px  | 2-column where applicable, slightly reduced headings                                         |
| **Desktop** | 1024-1280px | Full layout as designed                                                                      |
| **Wide**    | > 1280px    | Content max-width 1280px, centered                                                           |

### Mobile Typography Scale

- H1: 40-48px (down from 84px)
- H2: 32-36px (down from 48-56px)
- H3: 24-28px (down from 32-36px)
- Body: 16-18px (down from 20-24px)
- Stat numbers: 40-48px (down from 64-72px)

---

## Implementation Notes

### Phase 0: Explore & Understand

1. Read through all existing files in `frontend/` and `studio/` to understand the starter's patterns
2. Identify existing Sanity client setup, image helpers, GROQ query patterns, and component conventions
3. Check what dependencies are already installed (`frontend/package.json`, `studio/package.json`)
4. Review `tailwind.config.ts` and `globals.css` for existing theme setup

### Phase 1: Foundation

5. Install new dependencies: `framer-motion` and `@iconify/react` in frontend workspace
6. Extend `tailwind.config.ts` with all design tokens (colors, fonts, spacing)
7. Import fonts (Libre Caslon Text via Google Fonts + Geist via `next/font` or Google Fonts)
8. Build `FadeIn`, `SectionWrapper`, `Badge`, `Button` utility components in `components/ui/`
9. Build `Navbar` and `Footer` in `components/global/`
10. Create Sanity schemas in `studio/src/` for all document and object types, register in studio config

### Phase 2: Homepage

11. Build all 5 homepage sections in `sections/home/` following the specs above
12. Compose homepage in `app/page.tsx` by importing and stacking sections
13. Wire up to Sanity data (GROQ queries using the starter's existing query patterns)
14. Implement Framer Motion animations (scroll-triggered fade-ins with stagger)
15. Implement testimonial carousel
16. Responsive pass on all sections

### Phase 3: Inner Pages

17. Build service detail page template (shared across 4 services, dynamic route or individual pages)
18. Build About, Pricing, Webcams, Contact pages
19. Wire all to Sanity

### Phase 4: Polish

20. Page transitions
21. Loading states
22. SEO metadata
23. Accessibility pass (ARIA labels, focus states, keyboard nav)
24. Performance (image optimization via Sanity CDN / next/image, lazy loading)

---

## Key Conventions

- **All sections** get the scroll-triggered `FadeIn` treatment — nothing should appear without animating in
- **Stagger delay** for grouped elements: 0.1s increments
- **Section backgrounds alternate** between `light-tan` and `dark-brown` to create rhythm
- **Badge pattern** is consistent everywhere: dot + uppercase label as section eyebrow
- **CTA style** is consistent: `orange` solid with arrow, same height/padding
- **Image treatment** is always warm, editorial, lifestyle — not stock-photo clean
- **"Suites, Not Kennels"** is the brand differentiator tagline — use prominently
