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

### Basic Usage (Lucide API)

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

### InstUI Semantic Props

```tsx
import { Plus, Check, ArrowLeft } from '@instructure/ui-icons-lucide'

function MyComponent() {
  return (
    <div>
      {/* Semantic sizing */}
      <Plus size="small" />
      <Check size="medium" color="success" />

      {/* Rotation and RTL control */}
      <ArrowLeft size="large" rotate="90" />
      <ArrowLeft size="large" bidirectional={false} />

      {/* Accessibility */}
      <Check
        size="medium"
        title="Completed"
        description="This task has been completed"
      />
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

### InstUI-Specific Props

All icons are wrapped with InstUI theming support and accept semantic props:

- `size`: Semantic string (`'x-small'`, `'small'`, `'medium'`, `'large'`, `'x-large'`) OR number (pixels)
  - `'x-small'` → 18px
  - `'small'` → 32px
  - `'medium'` → 48px
  - `'large'` → 80px
  - `'x-large'` → 160px
- `color`: Semantic color (`'primary'`, `'secondary'`, `'success'`, `'error'`, etc.) OR CSS color
- `rotate`: Rotation in degrees (`'0'`, `'90'`, `'180'`, `'270'`)
- `bidirectional`: Boolean (default: `true`) - Enable/disable RTL flipping
- `inline`: Boolean (default: `true`) - Display mode (inline-block vs block)
- `title`: String - Accessible title for the icon
- `description`: String - Additional accessible description

### Lucide Native Props

Plus all standard Lucide props:

- `size`: Number (pixels) - e.g., `24`
- `color`: CSS color value - e.g., `"#FF0000"` or `"currentColor"`
- `strokeWidth`: Number - e.g., `2`
- Plus all standard SVG props (className, style, onClick, etc.)

**Note:** Lucide icons do not inherit `fontSize` from parent elements. When using semantic sizes, the wrapper automatically converts them to explicit pixel values that Lucide understands.

## RTL Support

Icons that need RTL support (arrows, directional icons) automatically handle flipping based on `document.dir`:

```tsx
// In LTR: points left
// In RTL: points right (flipped)
<ArrowLeft size={24} />
```

## License

MIT
