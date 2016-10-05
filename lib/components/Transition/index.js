import React, { PropTypes, Component } from 'react'
import BaseTransition from '../../util/BaseTransition'
import styleable from '../../util/styleable'

import styles from './styles.css'

/**

The `Transition` wrapper helps you easily transition elements in and out of
your UI. The component defaults to the `fade` opacity transition.

```jsx_example
<Transition transitionAppear in>
  <Heading>I Fade in</Heading>
</Transition>
```

`scale` transitions both the opacity and size of the element.
```jsx_example
<Transition type="scale" transitionAppear in>
  <Avatar userName="Collapsing User" />
</Transition>
```

`slide-` transitions the opacity and position of the element
```jsx_example
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: 'left',
      open: true
    }
  }

  randomDirection () {
    const directions = [
      'left', 'right', 'up', 'down'
    ]

    return directions[Math.floor(Math.random() * directions.length)]
  }

  cycleTransition = () => {
    this.setState({
      direction: this.randomDirection(),
      open: !this.state.open
    })
  }

  render () {
    const transitionType = `slide-${this.state.direction}`

    return (
      <div>
        <Button size="small" onClick={this.cycleTransition}>
          Random Slide Transition:&nbsp;
          {transitionType}&nbsp;
          ({(this.state.open) ? <span>enter</span> : <span>exit</span>})
        </Button>
        <Transition transitionAppear
          in={this.state.open}
          type={transitionType}>
          <h1 style={{textAlign: 'center', backgroundColor: '#ddd'}}>Sliiiide!</h1>
        </Transition>
      </div>
    )
  }
}

<App />
```
**/
@styleable(styles)
export default class Transition extends Component {
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
    transitionAppear: PropTypes.bool,
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

  static defaultProps = {
    type: 'fade',
    in: false,
    unmountOnExit: false,
    transitionAppear: false,
    transitionEnter: true,
    transitionExit: true,

    onEnter: function () {},
    onEntering: function () {},
    onEntered: function () {},
    onExit: function () {},
    onExiting: function () {},
    onExited: function () {}
  }

  render () {
    const {
      type,
      children,
      ...props
    } = this.props

    return (
      <BaseTransition
        {...props}
        enterDelay={300} // these times need to match the times in the CSS
        exitDelay={300}
        transitionClassName={styles[type]}
        exitedClassName={styles[type + '--exited']}
        exitingClassName={styles[type + '--exiting']}
        enteredClassName={styles[type + '--entered']}
        enteringClassName={styles[type + '--entering']}>
        {children}
      </BaseTransition>
    )
  }
}

export function makeTransitionClass (type) {
  return class TransitionClass extends Component {
    static propTypes = {
      children: PropTypes.node
    }
    render () {
      const {
        children,
        ...props
      } = this.props

      return (
        <Transition {...props} type={type}>
          {children}
        </Transition>
      )
    }
  }
}
