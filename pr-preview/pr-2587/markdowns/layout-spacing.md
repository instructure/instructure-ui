
# Layout Spacing

Our design system provides a set of spacing tokens for consistent layouts and components. The current tokens are organized into a general t-shirt scale plus a handful of semantic tokens. Some tokens share a value but carry different meaning — prefer the semantically correct token for the context (e.g. use `gap.buttons` for spacing between buttons).

The `margin` and `padding` props on InstUI components accept these tokens via **dot-path notation** (for example `margin="general.spaceMd"` or `padding="padding.card.lg"`), and support the familiar CSS-like 1–4 value shorthand.

## Tokens

### General scale

| Key                  | Value    | Value in pixels |
| -------------------- | -------- | --------------- |
| general.spaceNone    | 0rem     | 0px             |
| general.space2xs     | 0.125rem | 2px             |
| general.spaceXs      | 0.25rem  | 4px             |
| general.spaceSm      | 0.5rem   | 8px             |
| general.spaceMd      | 0.75rem  | 12px            |
| general.spaceLg      | 1rem     | 16px            |
| general.spaceXl      | 1.5rem   | 24px            |
| general.space2xl     | 2rem     | 32px            |

### Semantic tokens

| Key                                | Value    | Value in pixels |
| ---------------------------------- | -------- | --------------- |
| gap.sections                       | 3rem     | 48px            |
| gap.buttons                        | 0.75rem  | 12px            |
| gap.cards.sm                       | 0.75rem  | 12px            |
| gap.cards.md                       | 1rem     | 16px            |
| gap.cards.lg                       | 1.5rem   | 24px            |
| gap.cards.nestedContainers.sm      | 0.5rem   | 8px             |
| gap.cards.nestedContainers.md      | 0.75rem  | 12px            |
| gap.cards.nestedContainers.lg      | 1rem     | 16px            |
| gap.inputs.horizontal              | 0.75rem  | 12px            |
| gap.inputs.vertical                | 1rem     | 16px            |
| padding.card.sm                    | 0.5rem   | 8px             |
| padding.card.md                    | 0.75rem  | 12px            |
| padding.card.lg                    | 1rem     | 16px            |

## Applying Spacing

There are three main ways to apply spacing in our component library:

### 1. Using the `margin` Prop

Most components in the library support a `margin` prop that works similarly to the CSS margin property. You can specify a single value or fine-tune individual margins (e.g., top, right, bottom, left).

```ts
---
type: example
---
<div>
  <Button margin="0 general.spaceSm 0 0">Button 1</Button>
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

## Deprecated tokens

For compatibility reasons we still resolve two earlier generations of spacing tokens at runtime, but they should **not** be used when creating new layouts — prefer the current tokens above.

### Phased-out tokens

The flat `space0`–`space60` scale and the flat semantic tokens (`sections`, `buttons`, `paddingCardLarge`, `selects`, `tags`, etc.) were an interim set and have been superseded by the current general scale and dot-path semantic tokens.

### Legacy tokens

The original legacy keywords (`xxxSmall`, `small`, `medium`, `large`, `xxLarge`, etc.) remain so old layouts don't break when updating InstUI.


