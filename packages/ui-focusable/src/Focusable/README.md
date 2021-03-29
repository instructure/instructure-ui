---
describes: Focusable
---

The `Focusable` component can be used to identify when an element receives focus. `Focusable` accepts
a `render` or `children` method that returns content which must have exactly one
[focusable](https://html.spec.whatwg.org/multipage/interaction.html#focusable-area) element.

```javascript
---
example: true
---
<Focusable>
{({ focused }) => (
  <span>
    <div>
      <Button>Focus me!</Button>
    </div>
    {focused && (
      <ContextView
        margin="small 0"
        placement="bottom"
        as="div"
        background="primary"
        padding="small"
        borderWidth="small"
        display="block"
      >
        I&#39;m focused!
      </ContextView>
    )}
  </span>
)}
</Focusable>
```

Easily implement a "skip to content" link for keyboard-only or screenreader users.

```javascript
---
example: true
---
<Focusable>
{({ focused }) => {
  return (
    <div>
      {
        focused ?
          <Link href="#mainContentExample">Skip to content</Link> :
          <ScreenReaderContent tabIndex="0">Skip to content</ScreenReaderContent>
      }
      <View as="p" id="mainContentExample">
        Tab into this code example to see a 'Skip to Content' link appear
      </View>
    </div>
  )
}}
</Focusable>
```
