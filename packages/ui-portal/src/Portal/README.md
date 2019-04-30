---
describes: Portal
---

The `<Portal/>` component allows you to render a subtree into a DOM element.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPortalOpen: false
    }
  }

  handleButtonClick = () => {
    this.setState({
      isPortalOpen: !this.state.isPortalOpen
    })
  };

  render () {
    return (
      <div>
        <Button onClick={this.handleButtonClick}>
          {this.state.isPortalOpen ? 'Close' : 'Open'} the Portal
        </Button>
        <Portal
          mountNode={() => this._mountNode}
          open={this.state.isPortalOpen}
        >
          <ContextView placement="center start" padding="0 x-small">
            <p>Greetings from the portal!</p>
          </ContextView>
        </Portal>
        <Text>
          <p>{lorem.paragraph()}</p>
          <div ref={(c) => this._mountNode = c}></div>
          <p>{lorem.paragraph()}</p>
        </Text>
      </div>
    )
  }
}

render(<Example />)
```
