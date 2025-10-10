# Transition

@module Transition
The `Transition` wrapper helps you easily transition elements in and out of your UI. The component defaults to the `fade` opacity transition.

> This component uses `setTimeout()` to fire events when the animations end (the duration is set in the theme).

```js
---
type: example
---
const Example = () => {
  const [isIn, setIsIn] = useState(true)

  const handleButtonClick = () => {
    setIsIn((prevIsIn) => !prevIsIn)
  }

  return (
    <div>
      <div>
        <Button margin="small 0" size="small" onClick={handleButtonClick}>
          <div aria-live="polite">Fade {isIn ? 'Out' : 'In'}</div>
        </Button>
      </div>
      <Transition
        onEnter={()=>console.log('onEnter')}
        onEntered={()=>console.log('onEntered')}
        onEntering={()=>console.log('onEntering')}
        onExit={()=>console.log('onExit')}
        onExited={()=>console.log('onExited')}
        onExiting={()=>console.log('onExiting')}
        onTransition={(to, from)=>console.log('onTransition', to,  from)}
        in={isIn}
        type="fade"
      >
        <Avatar name="Fade" />
      </Transition>
    </div>
  )
}

render(<Example />)
```

`scale` transitions both the opacity and size of the element.

```js
---
type: example
---
const Example = () => {
  const [isIn, setIsIn] = useState(true)

  const handleButtonClick = () => {
    setIsIn((prevIsIn) => !prevIsIn)
  }

  return (
    <div>
      <div>
        <Button margin="small 0" size="small" onClick={handleButtonClick}>
          <div aria-live="polite">{isIn ? 'Collapse' : 'Expand'}</div>
        </Button>
      </div>
      <Transition
        transitionOnMount
        unmountOnExit
        in={isIn}
        type="scale"
      >
        <Avatar name="Collapse" />
      </Transition>
    </div>
  )
}

render(<Example />)
```

`slide` transitions the horizontal or vertical position of the element. The slide direction can be
internationalized for right to left (rtl) languages. The following example uses the
[TextDirectionContext](#TextDirectionContext) util to mirror the slide direction for rtl.

```js
---
type: example
---
const Example = () => {
  const textDirection = useContext(TextDirectionContext)
  const [direction, setDirection] = useState('left')
  const [isIn, setIsIn] = useState(true)

  const handleDirectionChange = (e, value) => {
    setDirection(value)
    setIsIn(true)
  }

  const handleButtonClick = () => {
    setIsIn((prevIsIn) => !prevIsIn)
  }

  const mirrorDirection = (direction) => {
    const mirror = {
      left: 'right',
      right: 'left',
      up: 'up',
      down: 'down'
    }
    return mirror[direction]
  }

  const rtl = textDirection === 'rtl'
  const finalDirection = rtl ? mirrorDirection(direction) : direction
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
          onChange={handleDirectionChange}
          name="slideExample"
          description={<ScreenReaderContent>Select a direction</ScreenReaderContent>}
          value={finalDirection}
          variant="toggle"
        >
          {directionVariants.map(dir => <RadioInput key={dir.value} value={dir.value} label={dir.label} />)}
        </RadioInputGroup>
        <Button size="small" margin="medium none small" onClick={handleButtonClick}>
          <div aria-live="polite">Slide {isIn ? 'Out' : 'In'}</div>
        </Button>
      </div>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: '15rem',
        display: 'flex',
        justifyContent: (direction === 'right') ? 'flex-end' : 'flex-start'
      }}>
        <Transition
          transitionOnMount
          unmountOnExit
          in={isIn}
          type={`slide-${finalDirection}`}
        >
          <Avatar name="Slide" />
        </Transition>
      </div>
    </div>
  )
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

