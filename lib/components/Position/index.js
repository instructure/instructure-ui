import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import deepEqual from 'deep-equal'

import themeable from '../../themeable'

import ComponentIdentifier, { pick } from '../../util/ComponentIdentifier'
import safeCloneElement from '../../util/safeCloneElement'
import addPositionChangeListener from '../../util/dom/addPositionChangeListener'
import shallowEqual from '../../util/shallowEqual'
import isValidPropType from '../../util/isValidPropType'
import CustomPropTypes from '../../util/CustomPropTypes'
import debounce from '../../util/debounce'
import calculateElementPosition from '../../util/dom/calculateElementPosition'

import Portal from '../Portal'

import styles from './styles.css'
import theme from './theme'

class PositionTarget extends ComponentIdentifier {
  static displayName = 'PositionTarget'
}

class PositionContent extends ComponentIdentifier {
  static displayName = 'PositionContent'
  static propTypes = {
    children: PropTypes.node,
    placement: CustomPropTypes.placement
  }
}

/**
---
category: utilities
---
  A Position component

  ```js_example
  const fpo = lorem.paragraph()
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = { placement: 'end' }
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

  render () {
    const { placement } = this.state

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
      <Container as="div" padding="medium" textAlign="center">
        <Position
          placement={placement}
          offsetX={offset.x}
          offsetY={offset.y}
        >
          <PositionTarget>
            <Button variant="primary" onClick={this.handleButtonClick}>
              Change placement
            </Button>
          </PositionTarget>
          <PositionContent>
            <ContextBox placement={placement} size="small" padding="small">
              <Heading level="h3">{placement}</Heading>
              <p>
              {fpo}
              </p>
            </ContextBox>
          </PositionContent>
        </Position>
      </Container>
    )
  }
}

<Example />
```

  ```js_example
  const fpo = lorem.paragraph()
  class Example extends React.Component {
    constructor (props) {
      super(props)

      this.state = { placement: 'end' }
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

    render () {
      const { placement } = this.state

      let offsetX = 0
      let offsetY = 0

      if (['top', 'bottom'].indexOf(placement.split(' ')[0]) >= 0) {
        offsetY = 16
      } else {
        offsetX = 16
      }

      return (
      <span>
        <Container as="div" padding="x-large" textAlign="center">
          <Position
            placement={placement}
            offsetX={offsetX}
            offsetY={offsetY}
            mountNode={() => this._mountNode}
          >
            <PositionTarget>
              <Button
                variant="primary"
                onClick={this.handleButtonClick}
              >
                Change placement
              </Button>
            </PositionTarget>
            <PositionContent>
              <ContextBox
                placement={placement}
                size="small"
                padding="small"
              >
                <Heading level="h3">{placement}</Heading>
                <p>
                  {fpo}
                </p>
              </ContextBox>
            </PositionContent>
          </Position>
        </Container>
        <div style={{
          position: 'relative',
          padding: 100
        }}>
          <span
            id="position_container"
            ref={(c) => { this._mountNode = c }}
          />
        </div>
      </span>
      )
    }
  }

  <Example />
  ```


  ```js_example
  const fpo = lorem.paragraphs(7)

  class Example extends React.Component {
    constructor (props) {
      super(props)

      this.state = { placement: 'top stretch' }
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
          <Position
            placement={placement}
            over
            insertAt="top"
            mountNode={() => this._mountNode}
          >
            <PositionContent>
              <ContextBox
                placement={placement}
                size="small"
                padding="small"
                withArrow={false}
              >
                <Heading level="h3">{placement}</Heading>
              </ContextBox>
            </PositionContent>
            <PositionTarget>
              <div
                ref={(c) => { this._mountNode = c }}
                style={{
                  overflowY: 'auto',
                  maxHeight: '10rem',
                  border: '1px solid grey'
                }}
              >
                {fpo}
              </div>
            </PositionTarget>
          </Position>
          <Button variant="primary" onClick={this.handleButtonClick}>
            Change placement
          </Button>
        </div>
      )
    }
  }

  <Example />
  ```
**/
@themeable(theme, styles)
class Position extends Component {
  static Target = PositionTarget
  static Content = PositionContent

  static propTypes = {
    /**
     * The children to be rendered within the `<Position />`
     */
    children: PropTypes.node, // eslint-disable-line react/require-default-props

    /**
     * The target to be used when not using `<PositionTarget />`
     */
    target: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),

    /**
     * Whether or not you want the content to position over the `<PositionTarget />`
     */
    over: PropTypes.bool,

    /**
     * The placement of the content in relation to the trigger
     */
    placement: CustomPropTypes.placement,

    /**
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Callback fired when the position changes
     */
    onPositionChanged: PropTypes.func,

    /**
     * Callback fired when `<Position />` content has been mounted and is initially positioned
     */
    onPositioned: PropTypes.func,

    /**
     * Whether or not position of the target should be tracked or just set statically on render
     */
    trackPosition: PropTypes.bool,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Position />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),

    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    constrain: PropTypes.oneOf(['window', 'scroll-parent', 'parent', 'none'])
  }

  static defaultProps = {
    trackPosition: true,
    placement: 'bottom center',
    offsetX: 0,
    offsetY: 0,
    mountNode: null,
    target: null,
    insertAt: 'bottom',
    over: false,
    onPositioned: position => {},
    onPositionChanged: position => {},
    constrain: 'window'
  }

  constructor (props) {
    super(props)

    this.state = {
      positioned: false,
      ...this.calculatePosition(props)
    }

    this.position = debounce(this.position, 0, { leading: false, trailing: true })
  }

  _timeouts = []

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return (
      !deepEqual(this.state, nextState) ||
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context, nextContext)
    )
  }

  componentDidUpdate (prevProps, prevState) {
    this.position()

    if (this.props.trackPosition !== prevProps.trackPosition) {
      this.props.trackPosition ? this.startTracking() : this.stopTracking()
    }

    const { style, placement, positioned } = this.state

    if (placement !== prevState.placement || style.top !== prevState.style.top || style.left !== prevState.style.left) {
      this.props.onPositionChanged({
        top: style.top,
        left: style.left,
        placement
      })
    }
  }

  componentWillUnmount () {
    this.position.cancel()
    this.stopTracking()
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  handlePortalOpen = () => {
    this.position()

    if (this.props.trackPosition) {
      this.startTracking()
    }

    this._timeouts.push(
      setTimeout(() => {
        if (this.state.positioned && typeof this.props.onPositioned === 'function') {
          this.props.onPositioned({
            top: this.state.style.top,
            left: this.state.style.left,
            placement: this.state.placement
          })
        }
      }, 0)
    )
  }

  calculatePosition (props) {
    return calculateElementPosition(this._content, this._target, {
      placement: props.placement,
      offsetX: props.offsetX,
      offsetY: props.offsetY,
      constrain: props.constrain,
      container: props.mountNode,
      over: props.over
    })
  }

  position = () => {
    this.setState({
      positioned: true,
      ...this.calculatePosition(this.props)
    })
  }

  startTracking () {
    this._listener = this._listener || addPositionChangeListener(this._target, this.position)
  }

  stopTracking () {
    if (this._listener) {
      this._listener.remove()
      this._listener = null
    }
  }

  renderContent () {
    let content = pick(Position.Content, this.props.children)

    if (content && React.Children.count(content.props.children) > 0) {
      const props = {
        ref: el => {
          this._content = el
        },
        style: {
          ...this.props.style, // eslint-disable-line react/prop-types
          ...this.state.style
        },
        className: classnames({
          [styles.root]: true,
          [content.props.className]: content.props.className // eslint-disable-line react/prop-types
        })
      }

      if (isValidPropType(content, 'placement')) {
        props.placement = this.state.placement
      }

      content = safeCloneElement(content, props)

      content = (
        <Portal open onOpen={this.handlePortalOpen} mountNode={this.props.mountNode} insertAt={this.props.insertAt}>
          {content}
        </Portal>
      )
    }

    return content
  }

  renderTarget () {
    let target = pick(Position.Target, this.props.children)
    if (target) {
      target = safeCloneElement(target, {
        ref: el => {
          this._target = el
        }
      })
    } else if (this.props.target) {
      this._target = this.props.target
    }

    return target
  }

  render () {
    return (
      <span>
        {this.renderTarget()}
        {this.renderContent()}
      </span>
    )
  }
}

export default Position
export { PositionTarget, PositionContent }
