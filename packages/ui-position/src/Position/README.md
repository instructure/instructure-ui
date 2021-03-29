---
describes: Position
---

A component that positions content with respect to a designated target.

### Important Upgrade Notes

Codemods are available to automatically update any props that have changed. However, there are some breaking changes that will need to be addressed manually. These changes and are described below.

- `Position.Target` and `Position.Content` are no longer in use. The target is now defined via the `renderTarget` prop and the children of a Position will be rendered as the positioned content.

### Internationalization

`Position` placement can be internationalized for right to left languages. The
following examples are configured utilizing the [ApplyTextDirection](#ApplyTextDirection)
component in conjunction with the [mirrorHorizontalPlacement](#mirrorPlacement)
utility function.

```js
---
render: false
example: true
---
const fpo = lorem.sentence()
class Example extends React.Component {
constructor (props) {
  super(props)

  this.state = { placement: 'end', adjusted: 'end' }
}

handleButtonClick = () => {
  const placements = [
    'top',
    'end',
    'bottom',
    'start',
    'top start',
    'start top',
    'start center',
    'start bottom',
    'bottom start',
    'bottom center',
    'bottom end',
    'end bottom',
    'end center',
    'end top',
    'top end',
    'top center',
    'center end',
    'center start'
  ]

  let { placement } = this.state

  placement = placements[placements.indexOf(placement) + 1] || placements[0]

  this.setState({ placement })
};

handlePositionChanged = ({ placement }) => {
  this.setState({ adjusted: placement })
};

render () {
  const { placement, adjusted } = this.state

  let offset = {
    x: 0,
    y: 0
  }

  if (['top', 'bottom'].indexOf(placement.split(' ')[0]) >= 0) {
    offset.y = 16
  } else {
    offset.x = 16
  }

  return (
    <View
      as="div"
      margin="x-large"
      padding="x-large"
      textAlign="center"
    >
      <ApplyTextDirection>
        {(dir, rtl) => (
          <Position
            placement={rtl ? mirrorHorizontalPlacement(placement, ' ') : placement}
            offsetX={offset.x}
            offsetY={offset.y}
            onPositionChanged={this.handlePositionChanged}
            renderTarget={
              <Button color="primary" onClick={this.handleButtonClick}>
                Change Placement
              </Button>
            }
          >
            <ContextView
              placement={rtl ? mirrorHorizontalPlacement(adjusted, ' ') : adjusted}
              maxWidth="22rem" padding="small"
            >
              <Heading level="h3">{placement}</Heading>
              <p>{fpo}</p>
            </ContextView>
          </Position>
        )
      }
      </ApplyTextDirection>
    </View>
  )
}
}

render(<Example />)
```

The `mountNode` prop renders the positioned content inside the configured element (instead of the body).

```js
---
render: false
example: true
---

const fpo = lorem.sentence()
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      placement: 'end',
      adjusted: 'end'
    }
  }

  handleButtonClick = () => {
    const placements = [
      'top',
      'end',
      'bottom',
      'start',
      'top start',
      'start top',
      'start center',
      'start bottom',
      'bottom start',
      'bottom center',
      'bottom end',
      'end bottom',
      'end center',
      'end top',
      'top end',
      'top center',
      'center end',
      'center start'
    ]

    let { placement } = this.state

    placement = placements[placements.indexOf(placement) + 1] || placements[0]

    this.setState({ placement })
  };

  handlePositionChanged = ({ placement }) => {
    this.setState({ adjusted: placement })
  };

  render () {
    const { placement, adjusted } = this.state

    let offsetX = 0
    let offsetY = 0

    if (['top', 'bottom'].indexOf(placement.split(' ')[0]) >= 0) {
      offsetY = 16
    } else {
      offsetX = 16
    }

    return (
    <span>
      <View
        as="div"
        margin="x-large"
        padding="x-large"
        textAlign="center"
      >
        <ApplyTextDirection>
          {(dir, rtl) => (
            <Position
              placement={rtl ? mirrorHorizontalPlacement(placement, ' ') : placement}
              offsetX={offsetX}
              offsetY={offsetY}
              mountNode={() => this._mountNode}
              onPositionChanged={this.handlePositionChanged}
              renderTarget={
                <Button color="primary" onClick={this.handleButtonClick}>
                  Change Placement
                </Button>
              }
            >
              <ContextView
                placement={rtl ? mirrorHorizontalPlacement(adjusted, ' ') : adjusted}
                maxWidth="20rem"
                padding="small"
              >
                <Heading level="h3">{placement}</Heading>
                <p>
                  {fpo}
                </p>
              </ContextView>
            </Position>
          )}
        </ApplyTextDirection>
      </View>
      <div
        style={{
          position: 'relative',
          padding: 100
        }}
        ref={(c) => { this._mountNode = c }}
      />
    </span>
    )
  }
}

render(<Example />)
```

`shouldPositionOverTarget` prop with `stretch` placement.

```js
---
render: false
example: true
---
const fpo = lorem.paragraphs(7)

class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      placement: 'top stretch'
    }
  }

  handleButtonClick = () => {
    const placements = [
      'top stretch',
      'bottom stretch',
      'end stretch',
      'start stretch'
    ]

    let { placement } = this.state

    placement = placements[placements.indexOf(placement) + 1] || placements[0]

    this.setState({ placement })
  };

  render () {
    const { placement } = this.state

    return (
      <div>
        <ApplyTextDirection>
          {(dir, rtl) => (
            <Position
              placement={rtl ? mirrorHorizontalPlacement(placement, ' ') : placement}
              shouldPositionOverTarget
              insertAt="top"
              mountNode={() => this._mountNode}
              renderTarget={
                <div
                  ref={(c) => { this._mountNode = c }}
                  style={{
                    overflowY: 'auto',
                    maxHeight: '10rem',
                    marginBottom: '1rem',
                    padding: '0.5rem'
                  }}
                >
                  {fpo}
                </div>
              }
            >
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '1rem'
                }}
              >
                <Heading level="h3">{placement}</Heading>
              </div>
            </Position>
          )}
        </ApplyTextDirection>
        <Button color="primary" onClick={this.handleButtonClick}>
          Change Placement
        </Button>
      </div>
    )
  }
}

render(<Example />)
```
