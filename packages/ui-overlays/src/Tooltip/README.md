---
describes: DeprecatedTooltip
id: DeprecatedTooltip__README
---

**DEPRECATED:** Tooltip will be removed from `ui-overlays` in version 7.0.0. Use the [Tooltip from ui-tooltip](#Tooltip) instead.


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
    <DeprecatedTooltip
      tip="Hello. I'm a tool tip"
      as={Link}
      href="https://instructure.github.io/instructure-ui/"
      mountNode={() => document.getElementById('main')}
    >
      Hover or focus me
    </DeprecatedTooltip>
  </p>
  <p>
    <DeprecatedTooltip
      tip="Hello"
      placement="end"
      as={Button}
      mountNode={() => document.getElementById('main')}
    >
      Hover or focus me
    </DeprecatedTooltip>
  </p>
  <p>
    <DeprecatedTooltip
      variant="default"
      tip="Hello"
      placement="bottom"
      mountNode={() => document.getElementById('main')}
    >
      <TextInput
        inline
        label="Enter some text"
      />
    </DeprecatedTooltip>
  </p>
  <p>
    <DeprecatedTooltip
      tip="Hello. I'm a tool tip"
      placement="start"
      on={['click', 'hover', 'focus']}
    >
      <IconButton
        renderIcon={IconInfoLine}
        withBackground={false}
        withBorder={false}
        screenReaderLabel="Toggle Tooltip"
      />
    </DeprecatedTooltip>
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
    <Figure.Item>Use on icons with no labels</Figure.Item>
    <Figure.Item>Use on condensed dates</Figure.Item>
    <Figure.Item>Use on table content if items are getting truncated</Figure.Item>
    <Figure.Item>Use to provide more specific data (ie. user hovers over a chart element, Tooltip shows precise info)</Figure.Item>
    <Figure.Item>Try to stay within 50 characters</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Repeat the exact information contained on the triggering element</Figure.Item>
    <Figure.Item>Contain links or focusable items</Figure.Item>
    <Figure.Item>Use icons inside Tooltips</Figure.Item>
    <Figure.Item>Use in place of a <Link href="/#Popover">Popover</Link> or <Link href="/#Menu">Menu</Link></Figure.Item>
  </Figure>
</Guidelines>
```
