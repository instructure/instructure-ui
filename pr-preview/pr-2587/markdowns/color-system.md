
## Colors

Colors are divided into two main technical groups: primitive and semantic colors. Primitive colors store the pure hex values. The primitive colors are the building blocks of the semantic colors. Examples of semantic colors: ui, contrasts, dataVisualization.

### Primitives

These are here for reference only, usually not needed for InstUI development. Available from the themes and from `@instructure/ui-themes`

```jsx
---
type: example
---
<ThemeColors colors={canvas.colors.primitives} label=""></ThemeColors>
```

### Additional Primitives

These are here for reference only, usually not needed for InstUI development. Available from `@instructure/ui-themes`

```jsx
---
type: example
---
<ThemeColors colors={additionalPrimitives} label=""></ThemeColors>
```

### Data visualization

The color names show their hue value and their contrast value on a white background. They don't tell how to use them or for what data they can be applied to. Each hue has 4 primary and 5 secondary colors.

- The data visualization color palette is for data representation only. Like graphs, chars and plots.
- These are solid colors and can not be used for creating gradients.
- First you have to use all 4 of the primary colors of a hue, then you can use the 5 secondary ones.
- Use them on a white background

Available from `@instructure/ui-themes`

```jsx
---
type: example
---
<ColorTable colors={dataVisualization} colorNames={additionalPrimitives}></ColorTable>
```


