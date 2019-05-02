---
describes: Overlay
---

The Overlay component is a closable/dismissible component that transitions
in and out content rendered in a [Portal](#Portal)

```js
---
render: false
example: true
---
class Example extends React.Component {
  state = {
    open: false
  }

  render () {
    return (
      <div>
        <Button onClick={() => { this.setState({ open: true })}}>
          Show the Overlay
        </Button>
        <Overlay
          open={this.state.open}
          transition="fade"
          label="Overlay Example"
          shouldReturnFocus
          shouldContainFocus
          onDismiss={() => { this.setState({ open: false })}}
        >
          <Mask onClick={() => { this.setState({ open: false })}}>
            <Spinner title="Loading" size="large" margin="0 0 0 medium" />
          </Mask>
        </Overlay>
      </div>
    )
  }
}

render(<Example />)
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Ensure content behind the overlay is hidden from users so they cannot navigate to it when using keyboard navigation and screen readers</Figure.Item>
    <Figure.Item>Dismissable with the ESC key</Figure.Item>
  </Figure>
</Guidelines>
```
