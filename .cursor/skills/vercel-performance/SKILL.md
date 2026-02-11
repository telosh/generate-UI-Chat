---
name: vercel-performance
description: Apply Vercel best practices for fast display and rendering optimization. Use when implementing data fetching, caching, images, streaming, or optimizing Core Web Vitals (LCP, FCP, CLS) in Next.js apps deployed on Vercel.
---

# Vercel Performance & Rendering Best Practices

## Data Fetching & Caching

### Time-based Revalidation

```ts
// App Router: fetch with revalidate
const res = await fetch("https://api.example.com/data", {
  next: { revalidate: 3600 }, // 1 hour
});
```

### Tag-based On-demand Revalidation

```ts
// Fetch with tags
const res = await fetch("https://api.example.com/blog", {
  cache: "force-cache",
  next: { tags: ["blog"] },
});
// Invalidate: revalidateTag('blog')
```

### Runtime Cache (Next.js 15+)

```ts
import { cacheLife, cacheTag } from "next/cache";

async function getData() {
  "use cache: remote";
  cacheTag("products");
  cacheLife({ expire: 3600 });
  const res = await fetch("https://api.example.com/products");
  return res.json();
}
```

### CDN Cache Headers

```ts
return new Response(JSON.stringify(data), {
  headers: {
    "Cache-Control": "public, s-maxage=60", // CDN caches 60s
  },
});
```

## Image Optimization

### next/image (Required)

- MUST: Use `next/image` with explicit `width` and `height` to prevent CLS
- Formats: AVIF, WebP prioritized on Vercel
- Lazy-load below-fold images

```tsx
import Image from "next/image";
<Image src="/hero.png" alt="..." width={500} height={500} />;
```

### No CLS

- Set explicit dimensions; reserve space before load
- Use `sizes` for responsive images

## Streaming & Perceived Performance

- Use `Suspense` + `loading.tsx` for instant shell
- Stream slow data with `defer()` (Remix) or React `use()` + Suspense
- Show skeleton/loading state immediately; load data progressively

## Core Web Vitals

| Metric  | Target | Approach                                               |
| ------- | ------ | ------------------------------------------------------ |
| **LCP** | <2.5s  | Optimize above-fold images, preload critical resources |
| **FCP** | <1.8s  | Reduce render-blocking, static shell first             |
| **CLS** | <0.1   | Explicit image dimensions, stable skeletons            |
| **INP** | <200ms | Minimize main-thread work, defer non-critical JS       |

## Build & Runtime

- Use latest Node.js runtime
- Leverage build cache; configure `ignored-build-step` when appropriate
- Preconnect to origins: `<link rel="preconnect" href="...">`
- Preload critical fonts

## Avoid

- `fetch` in middleware (blocks every request)
- `transition: all` in CSS
- Animating layout props (`width`, `height`, `top`, `left`)
- Images without dimensions
