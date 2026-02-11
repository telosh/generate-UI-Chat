---
name: nextjs-app-router
description: Navigate Next.js 16 App Router structure, routing, layouts, and conventions. Use when adding pages, API routes, layouts, dynamic segments, or modifying the app directory structure in genUIAI.
---

# Next.js 16 App Router for genUIAI

## Quick Reference

- **Framework**: Next.js 16 App Router
- **Base**: `app/` directory
- **Rules**: See AGENTS.md for middleware, fetch constraints

## Directory Structure

```
app/
├── layout.tsx          # Root layout (metadata, fonts, ThemeProvider)
├── page.tsx             # Home (/)
├── api/
│   └── chat/route.ts    # Edge runtime API
├── og/route.tsx         # Dynamic OG image (Edge)
├── tools/
│   ├── layout.tsx       # Tools section layout
│   ├── page.tsx         # /tools
│   └── [slug]/page.tsx  # Dynamic: /tools/cards, /tools/chart, etc.
├── components/
├── lib/
└── hooks/
```

## Conventions

### Layouts

- `layout.tsx`: Wraps children; metadata at root
- `suppressHydrationWarning` on `<html>` for next-themes
- Skip link: `<a href="#main-content">` with `sr-only focus:not-sr-only`

### Dynamic Routes

- `[slug]` for optional segments (e.g. `/tools/[slug]`)
- Use `notFound()` from `next/navigation` when slug invalid

### API Routes

- `route.ts` with `export async function GET/POST`
- Edge: `export const runtime = "edge";`
- Return `Response` or `NextResponse`

### Metadata

- `export const metadata: Metadata` in layout.tsx
- `metadataBase` for OG absolute URLs
- `viewport` for theme-color

## Avoid

- `fetch` in middleware (blocks every request)
- Blocking synchronous ops in route handlers
