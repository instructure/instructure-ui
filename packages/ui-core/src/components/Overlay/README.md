---
describes: Overlay
---

The Overlay component is a [Dialog](#Dialog) component that transitions
in and out content rendered in a [Portal](#Portal)

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render () {
    return (
      <div>
        <Button
          onClick={() => { this.setState({ open: true })}}
          ref={(c) => this._showButton = c}
        >
          Show the Overlay
        </Button>
        <Overlay
          open={this.state.open}
          transition="fade"
          onDismiss={() => { this.setState({ open: false })}}
          label="Overlay Example"
          defaultFocusElement={() => { return this._hideButton }}
          shouldReturnFocus
        >
          <Mask onDismiss={() => { this.setState({ open: false })}}>
            <Button
              onClick={() => { this.setState({ open: false })}}
              ref={(c) => this._hideButton = c}
            >
              Hide the Overlay
            </Button>
          </Mask>
        </Overlay>
      </div>
    )
  }
}

render(<Example />)
```
