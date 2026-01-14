---
describes: Tooltip
---

Tooltips are small text-only contextual overlays that are triggered by hover/focus. Use anywhere additional explanation might be needed but space is limited on the triggering element.

> ### What about 'focusable' elements?
>
> Content provided to the `renderTip` prop **should not contain any focusable elements**. If you'd like to do
> that you should use the [Popover](Popover) component and handle focus management yourself or
> consider using a [Modal](Modal) or a [Tray](Tray) as those will work better on smaller screens.

#### Uncontrolled Tooltips

```js
---
type: example
---
<div>
  <p>
    <Tooltip
      renderTip="Hello. I'm a tool tip"
      as={Button}
      onShowContent={() => console.log('showing')}
      onHideContent={() => console.log('hidden')}
    >
      Hover or focus me
    </Tooltip>
  </p>
  <p>
    <Tooltip
      color="primary-inverse"
      renderTip="Hello. I'm a tool tip"
      placement="bottom"
      offsetX="5px"
    >
      <TextInput
        display="inline-block"
        renderLabel="Enter some text"
      />
    </Tooltip>
  </p>
  <p>
    <Tooltip
      renderTip="Hello. I'm a tool tip"
      placement="start"
      on={['click', 'hover', 'focus']}
    >
      <IconButton
        renderIcon={<InfoInstUIIcon color="baseColor"/>}
        withBackground={false}
        withBorder={false}
        screenReaderLabel="Toggle Tooltip"
      />
    </Tooltip>
  </p>
</div>
```

#### Controlled Tooltips

```js
---
type: example
---
const Example = () => {
  const [isShowingContent, setIsShowingContent] = useState(false)

  return (
    <>
      <p>
        <Tooltip
          renderTip="Hello. I'm a tool tip"
          isShowingContent={isShowingContent}
          onShowContent={(e) => {
            console.log('expecting to show tooltip')
          }}
          onHideContent={(e) => {
            console.log('expecting to hide tooltip')
          }}
        >
          <Link href="#">This link has a tooltip</Link>
        </Tooltip>
      </p>
      <Checkbox
        label="show tooltip?"
        variant="toggle"
        value="toggled"
        onChange={(event) => {
          setIsShowingContent(event.target.checked)
        }}
      />
    </>
  )
}

render(<Example />)
```

### Custom elements as renderTrigger

Popover and Tooltip attach mouse and focus event listeners to their render trigger components via props. These need to be propagated to the component for the listeners to work:

```js
---
type: example
---
const MyComponent = forwardRef((props, ref) => {
  return (
    <View background="primary" padding='space12' {...props} ref={ref}>
      My custom component
    </View>
  )
})

;<Tooltip renderTip="Tooltip text to display">
  <MyComponent />
</Tooltip>
```

### Guidelines

```js
---
type: embed
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
