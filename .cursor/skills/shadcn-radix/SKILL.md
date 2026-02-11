---
name: shadcn-radix
description: Build accessible UI with shadcn/ui and Radix primitives. Use when creating or modifying components in components/ui or app/components, using DropdownMenu, Button, Input, or other Radix-based components in genUIAI.
---

# shadcn/ui + Radix for genUIAI

## Quick Reference

- **UI**: `components/ui/` (Button, Input, DropdownMenu, Card, etc.)
- **Rules**: `.cursor/rules/ui-components.mdc`
- **Utils**: `cn()` from `@/lib/utils` for class merging

## Component Pattern

```tsx
import * as Primitive from "@radix-ui/react-*";
import { cn } from "@/lib/utils";

const Component = React.forwardRef<
  React.ComponentRef<typeof Primitive.Root>,
  React.ComponentPropsWithoutRef<typeof Primitive.Root> & { inset?: boolean }
>(({ className, ...props }, ref) => (
  <Primitive.Root
    ref={ref}
    className={cn("base-classes", className)}
    {...props}
  />
));
Component.displayName = Primitive.Root.displayName;
```

## Key Primitives

- **DropdownMenu**: Root, Trigger, Content, Item, Separator, RadioGroup
- **Button**: Uses `Slot` from radix-ui for `asChild` prop
- **CVA**: `class-variance-authority` for variant/size props

## Accessibility

- Icon-only buttons: `aria-label` required
- Trigger: `aria-haspopup="listbox"` for dropdowns
- Disabled items: `disabled` prop on DropdownMenuItem
- Focus: `focus-visible:ring-2` for visible focus ring

## Button Variants (cva)

| variant   | Use case              |
| --------- | --------------------- |
| default   | Primary action        |
| secondary | Toggle, group active  |
| outline   | Model selector, menus |
| ghost     | Group inactive        |
| link      | Text links            |

## Sizes

- `xs`: Compact (h-6, text-xs)
- `sm`: Standard compact
- `default`: Default
- `lg`: Large
- `icon`, `icon-xs`, `icon-sm`: Icon-only

## Touch Targets

- Mobile: `min-h-[44px]` for interactive elements
- Responsive: `min-h-[44px] sm:min-h-0`
