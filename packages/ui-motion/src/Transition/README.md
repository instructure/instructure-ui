---
describes: Transition
---

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
[TextDirectionContext](TextDirectionContext) util to mirror the slide direction for rtl.

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
