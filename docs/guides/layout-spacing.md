---
title: Layout Spacing
category: Guides
order: 9
relevantForAI: true
---

# Layout Spacing

Our design system provides a set of spacing tokens for consistent layouts and components. Some tokens share values but should be used semantically. For instance, while both `tags` and `buttons` are 0.75rem, `buttons` should be used for spacing between buttons.

## Tokens

| Key               | Value    | Value in pixels |
| ----------------- | -------- | --------------- |
| space0            | 0rem     | 0px             |
| space2            | 0.125rem | 2px             |
| space4            | 0.25rem  | 4px             |
| space8            | 0.5rem   | 8px             |
| space12           | 0.75rem  | 12px            |
| space16           | 1rem     | 16px            |
| space24           | 1.5rem   | 24px            |
| space36           | 2.25rem  | 36px            |
| space48           | 3rem     | 48px            |
| space60           | 3.75rem  | 60px            |
| sections          | 2.25rem  | 36px            |
| sectionElements   | 1.5em    | 24px            |
| trayElements      | 1.5em    | 24px            |
| modalElements     | 1.5em    | 24px            |
| moduleElements    | 1em      | 16px            |
| paddingCardLarge  | 1.5rem   | 24px            |
| paddingCardMedium | 1rem     | 16px            |
| paddingCardSmall  | 0.75rem  | 12px            |
| selects           | 1rem     | 16px            |
| textAreas         | 1rem     | 16px            |
| inputFields       | 1rem     | 16px            |
| checkboxes        | 1rem     | 16px            |
| radios            | 1rem     | 16px            |
| toggles           | 1rem     | 16px            |
| buttons           | 0.75rem  | 12px            |
| tags              | 0.75rem  | 12px            |
| statusIndicators  | 0.75rem  | 12px            |
| dataPoints        | 0.75rem  | 12px            |

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

## Legacy tokens

For compatibility reasons we still provide the legacy spacing tokens (`xxLarge`, `medium`, etc.) so old layouts don't break when updating InstUI but these tokens shouldn't be used when creating new layouts.
