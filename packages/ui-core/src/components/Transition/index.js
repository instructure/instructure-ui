import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import BaseTransition from './BaseTransition'

import styles from './styles.css'

/**
---
category: components/utilities
---
The `Transition` wrapper helps you easily transition elements in and out of
your UI. The component defaults to the `fade` opacity transition.

  ```jsx_example
  ---
  render: false
  ---
  class Example extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isOffscreen: true
      }
    }

    handleButtonClick = () => {
      this.setState({
        isOffscreen: !this.state.isOffscreen
      })
    };

    render () {
      const inOrOut = (this.state.isOffscreen) ? <span>in</span> : <span>out</span>

      return (
        <div>
          <Button size="small" onClick={this.handleButtonClick}>
            Fade {this.state.isOffscreen ? 'Out' : 'In'}
          </Button>
          <br/>
          <br/>

          <Transition
            transitionOnMount
            in={this.state.isOffscreen}
            type="fade">
            <Container>
              <Avatar name="Fade" />
            </Container>
          </Transition>
        </div>
      )
    }
  }

  render(<Example />)
  ```

`scale` transitions both the opacity and size of the element.

```jsx_example
---
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOffscreen: true
    }
  }

  handleButtonClick = () => {
    this.setState({
      isOffscreen: !this.state.isOffscreen
    })
  };

  render () {
    const inOrOut = (this.state.isOffscreen) ? <span>in</span> : <span>out</span>

    return (
      <div>
        <Button size="small" onClick={this.handleButtonClick}>
          {this.state.isOffscreen ? 'Collapse' : 'Expand'}
        </Button>
        <br/>
        <br/>

        <Transition
          transitionOnMount
          unmountOnExit
          in={this.state.isOffscreen}
          type="scale">
          <Container display="inline">
            <Avatar name="Collapse" />
          </Container>
        </Transition>
      </div>
    )
  }
}

render(<Example />)
```

`slide-` transitions the opacity and position of the element
```jsx_example
---
render: false
---

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: 'left',
      isOffscreen: true
    }
  }

  handleDirectionChange = (e) => {
    this.setState({
      direction: e.target.value
    })
  };

  handleButtonClick = () => {
    this.setState({
      isOffscreen: !this.state.isOffscreen
    })
  };

  render () {
    const transitionType = `slide-${this.state.direction}`
    const inOrOut = (this.state.isOffscreen) ? <span>in</span> : <span>out</span>
    const directionVariants = [
      {value: 'left', label: 'Left'},
      {value: 'right', label: 'Right'},
      {value: 'down', label: 'Down'},
      {value: 'up', label: 'Up'}
    ]

    return (
      <div>
        <Select
          onChange={this.handleDirectionChange}
          value={this.state.direction}
          label={<ScreenReaderContent>Transition Direction</ScreenReaderContent>}
          inline
        >
          {directionVariants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
        </Select>
        &nbsp;
        <Button size="small" onClick={this.handleButtonClick}>
          Slide {this.state.isOffscreen ? 'Out' : 'In'}
        </Button>
        <br/>
        <br/>

        <Transition
          transitionOnMount
          in={this.state.isOffscreen}
          type={transitionType}>
          <Container display="inline">
            <Avatar name="Slide" />
          </Container>
        </Transition>
      </div>
    )
  }
}

render(<Example />)
```
**/
@themeable(null, styles)
export default class Transition extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    type: PropTypes.oneOf([
      'fade',
      'scale',
      'slide-down',
      'slide-up',
      'slide-left',
      'slide-right'
    ]),
    /**
     * A single element to animate in and out
     */
    children: PropTypes.element,
    /**
     * Show the component; triggers the enter or exit animation
     */
    in: PropTypes.bool,
    /**
     * Unmount the component (remove it from the DOM) when it is not shown
     */
    unmountOnExit: PropTypes.bool,
    /**
     * Run the enter animation when the component mounts, if it is initially
     * shown
     */
    transitionOnMount: PropTypes.bool,
    /**
     * Run the enter animation
     */
    transitionEnter: PropTypes.bool,
    /**
     * Run the exit animation
     */
    transitionExit: PropTypes.bool,
    /**
     * Callback fired before the "entering" classes are applied
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired after the "entering" classes are applied
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the "enter" classes are applied
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired before the "exiting" classes are applied
     */
    onExit: PropTypes.func,
    /**
     * Callback fired after the "exiting" classes are applied
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the "exited" classes are applied
     */
    onExited: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    type: 'fade',
    in: false,
    unmountOnExit: false,
    transitionOnMount: false,
    transitionEnter: true,
    transitionExit: true,

    onEnter: function () {},
    onEntering: function () {},
    onEntered: function () {},
    onExit: function () {},
    onExiting: function () {},
    onExited: function () {}
  }

  static duration = 300 // needs to match the times in the CSS

  render () {
    const {
      type,
      children,
      ...props
    } = this.props

    return type ? (
      <BaseTransition
        {...props}
        enterDelay={Transition.duration}
        exitDelay={Transition.duration}
        transitionClassName={styles[type]}
        exitedClassName={styles[`${type}--exited`]}
        exitingClassName={styles[`${type}--exiting`]}
        enteredClassName={styles[`${type}--entered`]}
        enteringClassName={styles[`${type}--entering`]}
      >
        {children}
      </BaseTransition>
    ) : children
  }
}
