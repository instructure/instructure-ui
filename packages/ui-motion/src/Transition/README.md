---
describes: Transition
---

The `Transition` wrapper helps you easily transition elements in and out of
your UI. The component defaults to the `fade` opacity transition.

```js
---
render: false
example: true
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
            Fade {this.state.in ? 'Out' : 'In'}
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
render: false
example: true
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
            {this.state.in ? 'Collapse' : 'Expand'}
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
[TextDirectionContext](#TextDirectionContext) util to mirror the slide direction for rtl.

```js
---
render: false
example: true
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
            Slide {this.state.in ? 'Out' : 'In'}
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
