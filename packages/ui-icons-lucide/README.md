# @instructure/ui-icons-lucide

Lucide icons for Instructure UI with RTL (Right-to-Left) support.

## Installation

```bash
npm install @instructure/ui-icons-lucide lucide-react
```

or with pnpm:

```bash
pnpm add @instructure/ui-icons-lucide lucide-react
```

## Usage

```tsx
import { Plus, Check, ArrowLeft } from '@instructure/ui-icons-lucide'

function MyComponent() {
  return (
    <div>
      <Plus size={24} />
      <Check size={24} color="green" />
      <ArrowLeft size={24} /> {/* Automatically flips in RTL */}
    </div>
  )
}
```

## Features

- **Pure Lucide API**: Direct access to Lucide's native API
- **RTL Support**: Bidirectional icons automatically flip in RTL contexts
- **Tree-shakable**: Only bundle the icons you use
- **TypeScript**: Full type support
- **1,500+ Icons**: Access to the full Lucide icon library

## Migrating from @instructure/ui-icons

Run the automated codemod:

```bash
npx @instructure/ui-codemods migrate-lucide-icons src/
```

See the [migration guide](https://instructure.design/guides/migrating-to-lucide-icons) for more details.

## API

All icons support the standard Lucide props:

- `size`: Number (pixels) - e.g., `24`
- `color`: CSS color value - e.g., `"#FF0000"` or `"currentColor"`
- `strokeWidth`: Number - e.g., `2`
- Plus all standard SVG props (className, style, onClick, etc.)

## RTL Support

Icons that need RTL support (arrows, directional icons) automatically handle flipping based on `document.dir`:

```tsx
// In LTR: points left
// In RTL: points right (flipped)
<ArrowLeft size={24} />
```

## License

MIT
