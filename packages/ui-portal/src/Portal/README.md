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
    this.setState(state => {
      return { isPortalOpen: !state.isPortalOpen }
    })
  };

  render () {
    const firstParagraph = lorem.paragraph()
    const secondParagraph = lorem.paragraph()
    return (
      <div>
        <Button onClick={this.handleButtonClick}>
          {this.state.isPortalOpen ? 'Close' : 'Open'} the Portal
        </Button>
        <Portal
          mountNode={this._mountNode}
          open={this.state.isPortalOpen}
        >
          <ContextView placement="center start" padding="0 x-small">
            <p>Greetings from the portal!</p>
          </ContextView>
        </Portal>
        <Text>
          <p>{firstParagraph}</p>
          <div ref={(c) => this._mountNode = c}></div>
          <p>{secondParagraph}</p>
        </Text>
      </div>
    )
  }
}

render(<Example />)
```
