---
describes: Tooltip
---

Tooltips are small text-only  contextual overlays that are triggered by hover/focus. Use anywhere additional explanation might be needed but space is limited on the triggering element.

> ### What about 'focusable' elements?
> Content provided to the `tip` property __should not contain any focusable elements__. If you'd like to do
that you should use the [Popover](#Popover) component and handle focus management yourself or
consider using a [Modal](#Modal) or a [Tray](#Tray) as those will work better on smaller screens.

```js
---
example: true
---
<div>
  <p>
    <Tooltip
      tip="Hello. I'm a tool tip"
      as={Link}
      href="https://instructure.github.io/instructure-ui/"
      mountNode={() => document.getElementById('main')}
    >
      Hover or focus me
    </Tooltip>
  </p>
  <p>
    <Tooltip
      tip="Hello"
      placement="end"
      as={Button}
      mountNode={() => document.getElementById('main')}
    >
      Hover or focus me
    </Tooltip>
  </p>
  <p>
    <Tooltip
      variant="inverse"
      tip="Hello"
      placement="bottom"
      mountNode={() => document.getElementById('main')}
    >
      <TextInput
        inline
        label="Enter some text"
      >
        Hover or focus me
      </TextInput>
    </Tooltip>
  </p>
  <p>
    <Tooltip
      tip="Hello. I'm a tool tip"
      on={['click', 'hover', 'focus']}
    >
      <Button variant="icon" icon={IconInfo.Line}>
        <ScreenReaderContent>toggle tooltip</ScreenReaderContent>
      </Button>
    </Tooltip>
  </p>
</div>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Use on icons with no labels</FigureItem>
    <FigureItem>Use on condensed dates</FigureItem>
    <FigureItem>Use on table content if items are getting truncated</FigureItem>
    <FigureItem>Use to provide more specific data (ie. user hovers over a chart element, Tooltip shows precise info)</FigureItem>
    <FigureItem>Try to stay within 50 characters</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Repeat the exact information contained on the triggering element</FigureItem>
    <FigureItem>Contain links or focusable items</FigureItem>
    <FigureItem>Use icons inside Tooltips</FigureItem>
    <FigureItem>Use in place of a <Link href="/#Popover">Popover</Link> or <Link href="/#Menu">Menu</Link></FigureItem>
  </Figure>
</Guidelines>
```
