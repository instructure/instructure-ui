---
title: Adding new icons
category: Contributor Guides
order: 9
---

## Lucide Icons

The bulk of the icon set comes from [Lucide](https://lucide.dev). These are not manually maintained
— they are automatically picked up from the `lucide-react` npm package at build time.

**To get a new or updated Lucide icon**, bump the `lucide-react` version in
`packages/ui-icons/package.json`. The index is regenerated automatically as part of
`pnpm run bootstrap` (via `build-icons`), so no manual step is needed.

Every icon exported by `lucide-react` becomes `<LucideIconName>InstUIIcon` in `@instructure/ui-icons`,
**except** for icons that are shadowed by a custom icon of the same name (see below).

If a Lucide icon is missing or looks wrong, check whether it exists in the installed version of
`lucide-react` first — if not, the only path is to add it as a custom icon.

## Adding Custom Icons

Custom icons live in `packages/ui-icons/svg/Custom/` and are consumed directly by the build script (`scripts/generateCustomIndex.ts`).

- Use kebab-case filenames ending in `.svg`. The filename becomes the React export name: `ai-info.svg` → `AiInfoInstUIIcon`, `canvas-logo.svg` → `CanvasLogoInstUIIcon`.

- For solid/filled icons, the filename must end in `-solid.svg` (e.g. `bell-solid.svg`).

- If a custom icon has the same name as a Lucide icon (e.g. `message-square-check.svg`), the custom version takes precedence and the Lucide one is hidden from the package.

- After dropping the file into `svg/Custom/`, the index is regenerated automatically as part of
  `pnpm run bootstrap` (via `build-icons`).

- Run `pnpm run dev` and verify the icon looks correct in the Icons gallery.

### Drawing Guidelines

- Uncheck "Clip content" on the frame before exporting. Otherwise Figma wraps every layer in `<g clip-path="url(#…)">` and adds a `<defs><clipPath>…</clipPath></defs>` block, which can cause rendering issues

- Use `currentColor` for all path fills and strokes. The build script reads the SVG as-is — no color replacement happens. If you exported with a hardcoded hex value, replace it manually before regenerating the index

- Stroke icons: set `fill="none"` on every path, not just on the root `<svg>`. Select all shape layers and set Fill to None in the Design panel

- Remove `width` and `height` from the `<svg>` root — keep only `viewBox` and `xmlns`. Export at 1× in Figma

- Flatten all transforms before exporting (Object → Flatten Selection)

- Standard icons use `viewBox="0 0 24 24"`. Brand/logo icons can use any square viewBox (e.g. `0 0 1920 1920`)

- Mixed stroke + fill icons are supported. Paths with `fill="currentColor"` render filled; paths with `fill="none"` and a `stroke` render as outlines

- Do not use per-element `stroke-width`. The wrapper applies a uniform stroke width derived from the icon size

- Do not use `<mask>` or `<use>` elements. These are not supported — flatten or redesign the layer
