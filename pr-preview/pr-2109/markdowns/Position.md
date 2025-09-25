# Position


A component that positions content with respect to a designated target.

### Important Upgrade Notes

Codemods are available to automatically update any props that have changed. However, there are some breaking changes that will need to be addressed manually. These changes and are described below.

- `Position.Target` and `Position.Content` are no longer in use. The target is now defined via the `renderTarget` prop and the children of a Position will be rendered as the positioned content.

### Internationalization

`Position` placement can be internationalized for right to left languages. The
following examples are configured utilizing the [TextDirectionContext](#TextDirectionContext)
component in conjunction with the [mirrorHorizontalPlacement](#mirrorPlacement)
utility function.

```js
---
type: example
---
const fpo = lorem.sentence()
class Example extends React.Component {

static contextType = TextDirectionContext

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
  const rtl = this.context === 'rtl'
  return (
    <View
      as="div"
      margin="x-large"
      padding="x-large"
      textAlign="center"
    >
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
    </View>
  )
}
}

render(<Example />)
```

The `mountNode` prop renders the positioned content inside the configured element (instead of the body).

```js
---
type: example
---

const fpo = lorem.sentence()
class Example extends React.Component {

  static contextType = TextDirectionContext

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
    const rtl = this.context === 'rtl'

    return (
    <span>
      <View
        as="div"
        margin="x-large"
        padding="x-large"
        textAlign="center"
      >
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
type: example
---
const fpo = lorem.paragraphs(7)

class Example extends React.Component {

  static contextType = TextDirectionContext

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
    const rtl = this.context === 'rtl'
    return (
      <div>
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
        <Button color="primary" onClick={this.handleButtonClick}>
          Change Placement
        </Button>
      </div>
    )
  }
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Position | renderTarget | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | The node to use as the position target |
| Position | target | `Element \| (() => Element \| null) \| null` | No | - | The target to be used when not using `renderTarget` |
| Position | placement | `\| 'top' \| 'bottom' \| 'start' \| 'end' \| 'top start' \| 'top center' \| 'top end' \| 'top stretch' \| 'bottom start' \| 'bottom center' \| 'bottom end' \| 'bottom stretch' \| 'start top' \| 'start center' \| 'start bottom' \| 'start stretch' \| 'end top' \| 'end center' \| 'end bottom' \| 'end stretch' \| 'center start' \| 'center end' \| 'offscreen'` | No | `'bottom center'` | The placement of the content in relation to the target |
| Position | mountNode | `Element \| (() => Element \| null) \| null` | No | `null` | An element or a function returning an element to use as the mount node for the `<Position />` (defaults to `document.body`) |
| Position | insertAt | `'bottom' \| 'top'` | No | `'bottom'` | Insert the element at the 'top' of the mountNode or at the 'bottom' |
| Position | constrain | `\| PositionMountNode \| 'window' \| 'scroll-parent' \| 'parent' \| 'none'` | No | `'window'` | The parent in which to constrain the placement. One of?: 'window', 'scroll-parent', 'parent', 'none', an element, or a function returning an element |
| Position | offsetX | `string \| number` | No | `0` | The horizontal offset for the positioned content |
| Position | offsetY | `string \| number` | No | `0` | The vertical offset for the positioned content |
| Position | id | `string` | No | - | An id will be generated if not provided |
| Position | shouldTrackPosition | `boolean` | No | `true` | Whether or not position of the target should be tracked or just set statically on render |
| Position | shouldPositionOverTarget | `boolean` | No | `false` | Whether or not you want the content to position over the target |
| Position | onPositionChanged | `(position: PositionObject) => void` | No | - | Callback fired when the position changes |
| Position | onPositioned | `(position: PositionObject) => void` | No | - | Callback fired when `<Position />` content has been mounted and is initially positioned |
| Position | children | `React.ReactNode` | No | `null` | The content to be positioned |
| Position | containerDisplay | `'inline-block' \| 'block'` | No | - | Set the CSS `display` property on the outermost `<span>` container element |
| Position | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying HTML root element (the target) |

### Usage

Install the package:

```shell
npm install @instructure/ui-position
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Position } from '@instructure/ui-position'
```

