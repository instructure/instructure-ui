---
describes: CloseButton
---

Some design patterns require a `CloseButton` to be placed in the start or end position. This is a helper component that gives you the close icon out of the box and facilitates placement.

The `placement` prop designates the `CloseButton` placement within the parent container. Note that in order to apply an `offset`, `placement` should be set to `start` or `end`. Also make sure that the container has a `position` css style applied other than `static`. In the following example we use [View](#View) as the container and set the `position` to `relative`.

```js
---
type: example
---
<View display="block" position="relative" height="5rem" background="primary" shadow="resting">
  <CloseButton placement="end" offset="small" screenReaderLabel="Close" />
</View>
```

If you need the `CloseButton` to work in a layout with other elements vs. absolutely positioning it, you can omit the `placement` prop or set it to `static`. You can then use another tool such as [Flex](#Flex) to handle the layout.

```js
---
type: example
---
<View display="block" position="relative" background="primary" shadow="resting">
  <Flex height="6rem" justifyItems="space-between" alignItems="center" padding="medium">
    <Flex.Item shouldShrink shouldGrow>
      <Heading level="h2">Some Heading Text</Heading>
    </Flex.Item>
    <Flex.Item padding="none none none medium">
      <CloseButton size="medium" screenReaderLabel="Close" />
    </Flex.Item>
  </Flex>
</View>
```

If you need even more customization, note that you can always compose this component using the [IconButton](#IconButton) directly. Supply the `renderIcon` prop with [IconXSolid](#icons) and set the `withBorder` and `withBackground` props to `false`.

```js
---
type: example
---
<View display="block" position="relative" height="5rem" background="primary" shadow="resting">
  <Flex justifyItems="end">
    <Flex.Item>
      <IconButton
        screenReaderLabel="Close"
        renderIcon={IconXSolid}
        size="small"
        withBackground={false}
        withBorder={false}
        margin="small"
      />
    </Flex.Item>
  </Flex>
</View>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Set the <code>color</code> prop to <code>primary</code> when a CloseButton appears on a dark background to ensure adequate contrast</Figure.Item>
    <Figure.Item>Ensure the CloseButton is labeled correctly using the <code>screenReaderLabel</code> prop so screen readers announce what action will be taken when selected</Figure.Item>
  </Figure>
</Guidelines>
```
