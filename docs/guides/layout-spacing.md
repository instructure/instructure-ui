---
title: Layout Spacing
category: Guides
order: 8
---

# Layout Spacing

Our design system provides a set of spacing tokens for consistent layouts and components. Some tokens share values but should be used semantically. For instance, while both `space12` and `buttons` are 12px, `buttons` should be used for spacing between buttons.

## Tokens

| Key               | Value  |
|--------------------|--------|
| space0            | 0px    |
| space2            | 2px    |
| space4            | 4px    |
| space8            | 8px    |
| space12           | 12px   |
| space16           | 16px   |
| space24           | 24px   |
| space36           | 36px   |
| space48           | 48px   |
| space60           | 60px   |
| sections          | 36px   |
| sectionElements   | 24px   |
| trayElements      | 24px   |
| modalElements     | 24px   |
| moduleElements    | 16px   |
| paddingCardLarge  | 24px   |
| paddingCardMedium | 16px   |
| paddingCardSmall  | 12px   |
| selects           | 16px   |
| textAreas         | 16px   |
| inputFields       | 16px   |
| checkboxes        | 16px   |
| radios            | 16px   |
| toggles           | 16px   |
| buttons           | 12px   |
| tags              | 12px   |
| statusIndicators  | 12px   |
| dataPoints        | 12px   |

## Applying Spacing

There are three main ways to apply spacing in our component library:

### 1. Using the `margin` Prop

Most components in the library support a `margin` prop that works similarly to the CSS margin property. You can specify a single value or fine-tune individual margins (e.g., top, right, bottom, left).

```ts
---
type: example
---
<div>
  <Button margin="0 buttons 0 0">Button 1</Button>
  <Button>Button 2</Button>
</div>
```

### 2. Using a Container Component with the `gap` Prop

For layouts, container components like `Flex` and `Grid` can be used with the gap prop to manage spacing between child elements.

```ts
---
type: example
---
<Flex gap="buttons">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Flex>
```

### 3. Importing Values from the Theme

If you need to directly reference spacing values, you can import them from the theme. This approach is useful for applying spacing in inline styles or custom components.

```ts
---
type: code
---
// import the canvas theme
import canvas from '@instructure/ui-themes'

// use spacing values
<div style={{display: 'flex', gap: canvas.spacing.buttons}}>
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```
