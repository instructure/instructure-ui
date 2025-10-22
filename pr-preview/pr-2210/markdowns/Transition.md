# Transition

@module Transition
The `Transition` wrapper helps you easily transition elements in and out of
your UI. The component defaults to the `fade` opacity transition.

```js
---
type: example
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      in: true
    }
  }

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        in: !state.in
      }
    })
  };

  render () {
    return (
      <div>
        <div>
          <Button margin="small 0" size="small" onClick={this.handleButtonClick}>
            <div aria-live="polite">Fade {this.state.in ? 'Out' : 'In'}</div>
          </Button>
        </div>
        <Transition
          transitionOnMount
          in={this.state.in}
          type="fade"
        >
          <Avatar name="Fade" />
        </Transition>
      </div>
    )
  }
}

render(<Example />)
```

`scale` transitions both the opacity and size of the element.

```js
---
type: example
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      in: true
    }
  }

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        in: !state.in
      }
    })
  };

  render () {
    return (
      <div>
        <div>
          <Button margin="small 0" size="small" onClick={this.handleButtonClick}>
            <div aria-live="polite">{this.state.in ? 'Collapse' : 'Expand'}</div>
          </Button>
        </div>
        <Transition
          transitionOnMount
          unmountOnExit
          in={this.state.in}
          type="scale"
        >
          <Avatar name="Collapse" />
        </Transition>
      </div>
    )
  }
}

render(<Example />)
```

`slide` transitions the horizontal or vertical position of the element. The slide direction can be
internationalized for right to left (rtl) languages. The following example uses the
[TextDirectionContext](TextDirectionContext) util to mirror the slide direction for rtl.

```js
---
type: example
---
class Example extends React.Component {

  static contextType = TextDirectionContext

  constructor (props) {
    super(props)
    this.state = {
      direction: 'left',
      in: true
    }
  }

  handleDirectionChange = (e, value) => {
    this.setState({
      direction: value,
      in: true
    })
  };

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        in: !state.in
      }
    })
  };

  mirrorDirection (direction) {
    const mirror = {
      left: 'right',
      right: 'left',
      up: 'up',
      down: 'down'
    }
    return mirror[direction]
  };

  render () {
    const rtl = this.context === 'rtl'
    const direction = rtl ? this.mirrorDirection(this.state.direction) : this.state.direction
    const directionVariants = [
      {value: 'left', label: 'Start'},
      {value: 'right', label: 'End'},
      {value: 'down', label: 'Down'},
      {value: 'up', label: 'Up'}
    ]
    return (
      <div>
        <div>
          <RadioInputGroup
            onChange={this.handleDirectionChange}
            name="slideExample"
            description={<ScreenReaderContent>Select a direction</ScreenReaderContent>}
            value={direction}
            variant="toggle"
          >
            {directionVariants.map(dir => <RadioInput key={dir.value} value={dir.value} label={dir.label} />)}
          </RadioInputGroup>
          <Button size="small" margin="medium none small" onClick={this.handleButtonClick}>
            <div aria-live="polite">Slide {this.state.in ? 'Out' : 'In'}</div>
          </Button>
        </div>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '15rem',
          display: 'flex',
          justifyContent: (this.state.direction === 'right') ? 'flex-end' : 'flex-start'
        }}>
          <Transition
            transitionOnMount
            unmountOnExit
            in={this.state.in}
            type={`slide-${direction}`}
          >
            <Avatar name="Slide" />
          </Transition>
        </div>
      </div>
    )
  }
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Transition | type | `\| 'fade' \| 'scale' \| 'slide-down' \| 'slide-up' \| 'slide-left' \| 'slide-right'` | No | `'fade'` |  |
| Transition | in | `boolean` | No | `false` | Show the component? Triggers the enter or exit animation. |
| Transition | unmountOnExit | `boolean` | No | `false` | Unmount the component (remove it from the DOM) when it is not shown. |
| Transition | transitionOnMount | `boolean` | No | `false` | Run the enter animation when the component mounts, if it is initially shown |
| Transition | transitionEnter | `boolean` | No | `true` | Run the enter animation |
| Transition | transitionExit | `boolean` | No | `true` | Run the exit animation |
| Transition | onTransition | `( toState: BaseTransitionStatesType, fromState: BaseTransitionStatesType ) => void` | No | - | Callback fired when transitioning to the next state |
| Transition | onEnter | `() => void` | No | - | Callback fired before the "entering" classes are applied |
| Transition | onEntering | `() => void` | No | - | Callback fired after the "entering" classes are applied |
| Transition | onEntered | `(type?: TransitionType) => void` | No | - | Callback fired after the "enter" classes are applied |
| Transition | onExit | `() => void` | No | - | Callback fired before the "exiting" classes are applied |
| Transition | onExiting | `() => void` | No | - | Callback fired after the "exiting" classes are applied |
| Transition | onExited | `(type?: TransitionType) => void` | No | - | Callback fired after the "exited" classes are applied |
| Transition | children | `React.ReactNode` | No | - | A single element to animate in and out |
| Transition | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |

### Usage

Install the package:

```shell
npm install @instructure/ui-motion
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Transition } from '@instructure/ui-motion'
```

