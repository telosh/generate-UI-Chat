---
name: ui-development
description: Develop accessible, performant UI components following Vercel Design Guidelines and project conventions. Use when building or modifying UI components, chat interfaces, or generative UI in genUIAI.
---

# UI Development for genUIAI

## Quick Reference

- **Guidelines**: See [AGENTS.md](../../AGENTS.md) and [Vercel Design Guidelines](https://vercel.com/design/guidelines)
- **Rules**: `.cursor/rules/ui-components.mdc` for component patterns
- **Performance**: See [vercel-performance](../vercel-performance/SKILL.md) for caching, images, Core Web Vitals

## Key Patterns

### Loading States

```tsx
// Button: keep label, append ellipsis
<Button disabled={isLoading}>{isLoading ? "Send…" : "Send"}</Button>
```

### Placeholders

- End with `…` (U+2026), not `...`
- Example: `placeholder="Ask about projects, skills, or impact…"`

### Touch Targets

- Mobile: `min-h-[44px]` for interactive elements
- Desktop: ≥24px; use `min-h-[44px] sm:min-h-0` for responsive

### Animations

- Use `useReducedMotion()` from framer-motion
- Animate only `opacity`, `transform`; never `width`, `height`, `top`, `left`
- Provide reduced variant when `reducedMotion === true`

### Conditional Links

- Only show "Live Demo" when `liveUrl` is non-empty
- Use `<a>` or `<Link>` for navigation; never `<button>`

## Component Structure

```
app/components/
├── chat/        # Chat UI, messages, input
├── generative/  # Dynamic UI cards/charts/tables/lists
├── layout/      # Header, chat layout, tools navigation
├── theme-provider.tsx
└── theme-toggle.tsx
```
