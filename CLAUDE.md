# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hound Around Resort website — a dog daycare/boarding/grooming facility. Built from `sanity-io/sanity-template-nextjs-clean` using **Template 5 ("Warm Editorial")** aesthetic. Monorepo with npm workspaces.

**Sanity Project ID:** `yx5plwlo` | **Dataset:** `production`

## Commands

```bash
# Start both frontend and studio in parallel
npm run dev

# Start individually
npm run dev --workspace=frontend    # Next.js on :3000
npm run dev --workspace=studio      # Sanity Studio on :3333

# Lint (frontend only)
npm run lint

# Type-check all workspaces
npm run type-check

# Format with Prettier
npm run format

# Install deps in specific workspace
npm install <pkg> --workspace=frontend
npm install <pkg> --workspace=studio

# Generate Sanity types (runs automatically as predev/prebuild)
cd studio && sanity schema extract && sanity typegen generate

# Import sample data
npm run import-sample-data

# Deploy studio
cd studio && npx sanity deploy
```

## Architecture

### Workspace Structure

- **`frontend/`** — Next.js 16 app (App Router, React 19, Tailwind CSS v4)
- **`studio/`** — Sanity Studio v5 with presentation tool, structure tool, Unsplash, AI Assist, Vision

### Frontend (`frontend/`)

- **`app/`** — Next.js App Router pages. Routes: `/` (home), `/[slug]` (pages), `/posts/[slug]` (blog posts), `/api/draft-mode/enable`
- **`app/components/`** — React components (Header, Footer, PageBuilder, PortableText, SanityImage, etc.)
- **`sanity/lib/`** — Sanity client integration:
  - `api.ts` — exports projectId, dataset, apiVersion, studioUrl from env vars
  - `queries.ts` — all GROQ queries defined with `defineQuery()` from next-sanity
  - `live.ts` — `sanityFetch` and `SanityLive` via `defineLive()` for real-time content
  - `utils.ts` — image URL builder (`urlForImage`), OG image resolver, link resolver

### Studio (`studio/`)

- **`src/schemaTypes/`** — Schema definitions organized by type:
  - `documents/` — `post`, `page`, `person`
  - `objects/` — `blockContent`, `blockContentTextOnly`, `callToAction`, `infoSection`, `link`, `button`
  - `singletons/` — `settings`
  - `index.ts` — barrel export of all schemas
- **`src/structure/`** — Custom Studio document tree configuration

### Key Patterns

- **GROQ queries** use `defineQuery()` for type generation. Reusable fragments (`postFields`, `linkReference`, `linkFields`) are composed via template literals.
- **Page Builder** — `page` documents use a `pageBuilder` array of `callToAction` and `infoSection` blocks, rendered by `PageBuilder` component.
- **Links** — The `link` object type supports multiple targets (href, page reference, post reference). GROQ resolves references inline via `linkReference` fragment.
- **Live Preview** — Uses next-sanity `defineLive()` + `VisualEditing` component in layout. Draft mode enabled via `/api/draft-mode/enable`.
- **Images** — `@sanity/image-url` builder configured in `utils.ts`. Next.js config allows `cdn.sanity.io` images.

## SPEC.md & Design Reference

`SPEC.md` contains the full project specification including design tokens, page sections, and component details. `designs/` contains screenshot mockups. Key design tokens:

- **Fonts:** Libre Caslon Text (headings), Geist (body) — note: the starter currently uses Inter + IBM Plex Mono which need updating
- **Colors:** Light Tan `#FEF5EF`, Dark Brown `#3B2B28`, Brown `#703527`, Orange `#E37C3C`, Grey `#E6DFDA`, Green `#B7E1C4`
- **Required deps not yet installed:** `framer-motion` (frontend), `@iconify/react` (frontend)

## Environment Variables

Required in `frontend/.env.local` (see `frontend/.env.example`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SANITY_STUDIO_URL`
- `SANITY_API_READ_TOKEN`
