---
title: Layout Spacing
category: Guides
order: 7
relevantForAI: true
---

## Layout Spacing

```js
---
type: embed
---
<Alert variant="warning" margin="0 0 medium">
  The spacing tokens documented on this page (such as <code>general.spaceMd</code>) require <strong>v11.7+</strong> components and are applied through the <code>margin</code> and <code>padding</code> props. If you are viewing the v11.6 version, <Link href={window.location.pathname.match(/v\d+_\d+/) ? window.location.pathname.replace(/v\d+_\d+/, 'v11_7') : `/v11_7${window.location.pathname}`}>switch to v11.7</Link> to see the examples working correctly.
</Alert>
```

Our design system provides a set of spacing tokens for consistent layouts and components. The current tokens are organized into a general t-shirt scale plus a handful of semantic tokens. Some tokens share a value but carry different meaning — prefer the semantically correct token for the context (e.g. use `gap.buttons` for spacing between buttons).

The `margin` and `padding` props on InstUI components accept these tokens via **dot-path notation** (for example `margin="general.spaceMd"` or `padding="padding.card.lg"`), and support the familiar CSS-like 1–4 value shorthand.

## Tokens

### General scale

| Key               | Value    | Value in pixels |
| ----------------- | -------- | --------------- |
| general.spaceNone | 0rem     | 0px             |
| general.space2xs  | 0.125rem | 2px             |
| general.spaceXs   | 0.25rem  | 4px             |
| general.spaceSm   | 0.5rem   | 8px             |
| general.spaceMd   | 0.75rem  | 12px            |
| general.spaceLg   | 1rem     | 16px            |
| general.spaceXl   | 1.5rem   | 24px            |
| general.space2xl  | 2rem     | 32px            |

### Semantic tokens

| Key                           | Value   | Value in pixels |
| ----------------------------- | ------- | --------------- |
| gap.sections                  | 3rem    | 48px            |
| gap.buttons                   | 0.75rem | 12px            |
| gap.cards.sm                  | 0.75rem | 12px            |
| gap.cards.md                  | 1rem    | 16px            |
| gap.cards.lg                  | 1.5rem  | 24px            |
| gap.cards.nestedContainers.sm | 0.5rem  | 8px             |
| gap.cards.nestedContainers.md | 0.75rem | 12px            |
| gap.cards.nestedContainers.lg | 1rem    | 16px            |
| gap.inputs.horizontal         | 0.75rem | 12px            |
| gap.inputs.vertical           | 1rem    | 16px            |
| padding.card.sm               | 0.5rem  | 8px             |
| padding.card.md               | 0.75rem | 12px            |
| padding.card.lg               | 1rem    | 16px            |

## Applying spacing

### Using the `margin` prop

Most components support a `margin` prop that works like the CSS `margin` property. Pass a single token or use the 1–4 value shorthand to fine-tune individual edges.

```js
---
type: example
---
<View as="div" display="block" borderWidth="small" padding="general.spaceSm">
  <Button margin="0 general.spaceSm 0 0">Button 1</Button>
  <Button>Button 2</Button>
</View>
```

### Using the `padding` prop

Components that render their own surface accept a `padding` prop, which resolves the same tokens. Semantic `padding.card.*` tokens are a good fit for card-like containers.

```js
---
type: example
---
<View as="div" display="block" borderWidth="small" padding="padding.card.lg">
  This container uses <code>padding.card.lg</code>.
</View>
```

## Deprecated tokens

For compatibility reasons we still resolve two earlier generations of spacing tokens at runtime, but they should **not** be used when creating new layouts — prefer the current tokens above.

### Phased-out tokens

The flat `space0`–`space60` scale and the flat semantic tokens (`sections`, `buttons`, `paddingCardLarge`, `selects`, `tags`, etc.) were an interim set and have been superseded by the current general scale and dot-path semantic tokens.

### Legacy tokens

The original legacy keywords (`xxxSmall`, `small`, `medium`, `large`, `xxLarge`, etc.) remain so old layouts don't break when updating InstUI.
