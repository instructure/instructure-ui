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
        background="default"
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

The `FocusableView` component can be used with `Focusable` to render a minimal focus outline when
`focused` is set. By default, `FocusableView` renders as a focusable element.

```javascript
---
example: true
---
<Focusable>
{({ focused }) => (
  <FocusableView focused={focused}>
    Hello! Focus me!
  </FocusableView>
)}
</Focusable>
```

`FocusableView` can also be used presentationally in conjunction with another focusable element.
In the following example we render a `button` element and use `FocusableView`'s focus indication in
place of the browser default.

```javascript
---
example: true
---
<Focusable>
{({ focused }) => (
  <FocusableView as="button" focused={focused}>
    Focus me!
  </FocusableView>
)}
</Focusable>
```

To indicate focus for keyboard only ([for certain types of focusable elements](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo)),
you can use the `focusVisible` argument. The value of `focusVisible` should
correspond to the proposed [focus-visible](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo)
CSS selector behavior.

```javascript
---
example: true
---
<Focusable>
{({ focusVisible }) => (
  <FocusableView focused={focusVisible}>
    Show focus via keyboard only
  </FocusableView>
)}
</Focusable>
```

Focusable should set `focusVisible` appropriately for elements that are focused programmatically
as well:

```javascript
---
example: true
render: false
---
class Example extends React.Component {
  render () {
    return (
      <div>
        <View margin="small" as="div">
          <Focusable ref={(el) => this._focusable = el}>
            {({ focused }) => (
              <FocusableView focused={focused}>
                Focus me using the Button below
              </FocusableView>
            )}
          </Focusable>
        </View>
        <Button onClick={() => this._focusable.focus()}>Set focus programmatically</Button>
      </div>
    )
  }
}
render(<Example />)
```
