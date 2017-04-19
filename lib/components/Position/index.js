import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ComponentIdentifier, { pick } from '../../util/ComponentIdentifier'
import safeCloneElement from '../../util/safeCloneElement'
import addPositionChangeListener from '../../util/dom/addPositionChangeListener'
import themeable from '../../themeable'
import shallowEqual from '../../util/shallowEqual'
import isValidPropType from '../../util/isValidPropType'
import CustomPropTypes from '../../util/CustomPropTypes'
import debounce from '../../util/debounce'
import calculateElementPosition, { getPositionStyle } from '../../util/dom/calculateElementPosition'
import classnames from 'classnames'
import deepEqual from 'deep-equal'

import Portal from '../Portal'

import styles from './styles.css'
import theme from './theme.js'

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
  class Example extends React.Component {
    constructor (props) {
      super(props)

      this.state = { placement: 'right' }
    }

    handleButtonClick = () => {
      const placements = [
        'top',
        'right',
        'bottom',
        'left',
        'top left',
        'left top',
        'left middle',
        'left bottom',
        'bottom left',
        'bottom center',
        'bottom right',
        'right bottom',
        'right middle',
        'right top',
        'top right',
        'top center',
        'middle right',
        'middle left'
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
        <Container padding="medium" textAlign="center">
          <Position
            placement={placement}
            offsetX={offsetX}
            offsetY={offsetY}
          >
            <PositionTarget>
              <Button variant="primary" onClick={this.handleButtonClick}>
                Change placement
              </Button>
            </PositionTarget>
            <PositionContent>
              <ContextBox placement={placement} size="small" padding="small">
                <Heading level="h3">{placement}</Heading>
              </ContextBox>
            </PositionContent>
          </Position>
        </Container>
      )
    }
  }

  <Example />
  ```
**/
@themeable(theme, styles)
class Position extends Component {
  static Target = PositionTarget;
  static Content = PositionContent;

  static propTypes = {
    /**
     * The children to be rendered within the `<Position />`
     */
    children: PropTypes.node,

    /**
     * The placement of the content in relation to the trigger
     */
    placement: CustomPropTypes.placement,

    /**
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Callback fired when `<Position />` content has been rendered
     */
    onReady: PropTypes.func,

    /**
     * Whether or not position of the target should be tracked or just set statically on render
     */
    trackPosition: PropTypes.bool
  }

  static defaultProps = {
    trackPosition: true,
    placement: 'bottom center',
    offsetX: 0,
    offsetY: 0
  }

  constructor (props) {
    super(props)

    this.state = {
      positioned: false,
      style: getPositionStyle(),
      container: document.body,
      placement: props.placement
    }

    this.position = debounce(this.position, 0, { leading: false, trailing: true })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return (!deepEqual(this.state, nextState)) ||
            !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.context, nextContext)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.trackPosition !== nextProps.trackPosition) {
      nextProps.trackPosition ? this.startTracking() : this.stopTracking()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    this.position()
  }

  componentWillUnmount () {
    this.position.cancel()
    this.stopTracking()
  }

  handlePortalReady = () => {
    this.position()
    this.startTracking()

    if (this.state.positioned && typeof this.props.onReady === 'function') {
      setTimeout(() => {
        this.props.onReady()
      }, 0)
    }
  }

  getContainer = () => {
    return this.state.container || document.body
  }

  position = (callback) => {
    const { style, placement, container } = calculateElementPosition(
      this._content,
      this._target,
      {
        placement: this.props.placement,
        offsetX: this.props.offsetX,
        offsetY: this.props.offsetY,
        constrainToWindow: true
      }
    )

    this.setState({
      positioned: true,
      style,
      placement,
      container
    })
  }

  startTracking () {
    if (this.props.trackPosition) {
      this._listener = this._listener ||
        addPositionChangeListener(this._target, this.position)
    }
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
        ref: (el) => {
          this._content = el
        },
        className: classnames({
          [content.props.className]: content.props.className,
          [styles.content]: true
        }),
        style: {
          ...this.props.style, // eslint-disable-line react/prop-types
          ...this.state.style
        }
      }

      if (isValidPropType(content, 'placement')) {
        props.placement = this.state.placement
      }

      content = safeCloneElement(content, props)

      content = (
        <Portal
          container={this.getContainer}
          isOpen
          onReady={this.handlePortalReady}
        >
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
        ref: (el) => {
          this._target = el
        }
      })
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
