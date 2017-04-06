import React, { Component, PropTypes } from 'react'
import Portal from '../Portal'
import ComponentIdentifier, { pick } from '../../util/ComponentIdentifier'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import addPositionChangeListener from '../../util/dom/addPositionChangeListener'
import shallowEqual from '../../util/shallowEqual'
import getBoundingClientRect from '../../util/dom/getBoundingClientRect'

class PositionTarget extends ComponentIdentifier {
  static displayName = 'PositionTarget'
}

class PositionContent extends ComponentIdentifier {
  static displayName = 'PositionContent'
}

const DEFAULT_STATE = {
  top: '-999em',
  left: '-999em',
  visibility: 'hidden',
  isUpdatingPosition: false
}

/**
---
category: utilities
---
  A Position component

  ```js_example
  class App extends React.Component {
    constructor (props) {
      super(props)

      this.state = { placement: 'right' }
    }

    handleButtonClick = () => {
      const placements = ['right', 'bottom', 'left', 'top']
      let { placement } = this.state

      placement = placements[placements.indexOf(placement) + 1] || placements[0]

      this.setState({ placement })
    }

    render () {
      const { placement } = this.state
      let offsetX = 0
      let offsetY = 0

      if (placement === 'left') {
        offsetX = -8
      }
      if (placement === 'top') {
        offsetY = -8
      }

      return (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Position
            placement={this.state.placement}
            offsetX={offsetX}
            offsetY={offsetY}
          >
            <PositionTarget>
              <Button variant="primary" onClick={this.handleButtonClick}>
                Change placement
              </Button>
            </PositionTarget>
            <PositionContent>
              <ContextBox placement={placement}>
                <div style={{ padding: '5px 15px' }}>
                  Content to the {placement}
                </div>
              </ContextBox>
            </PositionContent>
          </Position>
        </div>
      )
    }
  }

  <App />
  ```
**/
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
    placement: PropTypes.oneOf([
      'top',
      'bottom',
      'left',
      'right'
    ]).isRequired,

    /**
     * The X pixel offset for position
     */
    offsetX: PropTypes.number,

    /**
     * The Y pixel offset for position
     */
    offsetY: PropTypes.number,

    /**
     * Callback fired when `<Position />` content has been rendered
     */
    onReady: PropTypes.func,

    /**
     * Whether or not position should be tracked or just set statically on render
     */
    trackPosition: PropTypes.bool
  };

  static defaultProps = {
    trackPosition: true,
    placement: 'bottom',
    offsetX: 0,
    offsetY: 0
  };

  constructor (props) {
    super(props)

    this.state = { ...DEFAULT_STATE }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) &&
      shallowEqual(this.state, nextState)
    )
  }

  componentWillUnmount () {
    this._disableTracking()
    this._isUnmounted = true
  }

  componentWillReceiveProps (nextProps) {
    const content = pick(Position.Content, this.props.children)

    if (!this._isUnmounted && (!content || !content.children)) {
      this.setState({ ...DEFAULT_STATE })
    }

    if (nextProps.trackPosition) {
      this._enableTracking()
    } else {
      this._disableTracking()
    }
  }

  handlePortalReady = () => {
    if (this.props.trackPosition) {
      this._enableTracking()
    }
    this.updatePosition()
  }

  _enableTracking () {
    if (this.props.trackPosition) {
      this._listener = this._listener ||
        addPositionChangeListener(this._target, this.updatePosition)
    }
  }

  _disableTracking () {
    if (this._listener) {
      this._listener.remove()
      this._listener = null
    }
  }

  updatePosition = (lastTargetRect) => {
    // Avoid infinite render loop
    if (this.state.isUpdatingPosition) {
      this.state.isUpdatingPosition = false
      return
    }

    if (!this._isUnmounted && this._content && this._target) {
      const targetRect = lastTargetRect || getBoundingClientRect(this._target) || {}
      const contentRect = this._contentRect || getBoundingClientRect(this._content) || {}
      const { offsetX, offsetY } = this.props

      let left = this.state.left
      let top = this.state.top

      switch (this.props.placement) {
        case 'top':
          top = targetRect.top - contentRect.height + offsetY
          left = hCenter(targetRect, contentRect) + offsetX
          break

        case 'bottom':
          top = targetRect.top + targetRect.height + offsetY
          left = hCenter(targetRect, contentRect) + offsetX
          break

        case 'left':
          top = vCenter(targetRect, contentRect) + offsetY
          left = targetRect.left - contentRect.width + offsetX
          break

        case 'right':
          top = vCenter(targetRect, contentRect) + offsetY
          left = targetRect.left + targetRect.width + offsetX
          break
      }

      this.setState({
        top,
        left,
        visibility: 'visible',
        isUpdatingPosition: true
      })
    }
  }

  render () {
    let target = pick(Position.Target, this.props.children)
    let content = pick(Position.Content, this.props.children)

    if (target) {
      target = safeCloneElement(target, {
        ref: (el) => { this._target = el }
      })
    }

    if (content && React.Children.count(content.props.children) > 0) {
      content = safeCloneElement(content, {
        // Flag for testing needed b/c content renders outside render tree
        // via `<Portal />` and cannot be found using enzyme `subject.find`.
        // TODO: update tests to use the contentRef prop instead
        'data-position-component': (process.env.NODE_ENV === 'test') ? true : null,
        ref: (el) => {
          this._content = el
          this._contentRect = getBoundingClientRect(this._content)
        },
        style: {
          ...this.props.style, // eslint-disable-line react/prop-types
          position: 'absolute',
          top: this.state.top,
          left: this.state.left,
          visibility: this.state.visibility
        }
      })

      content = (
        <Portal
          isOpen
          onReady={createChainedFunction(this.handlePortalReady, this.props.onReady)}
        >
          {content}
        </Portal>
      )
    }

    return (
      <span>
        {target}
        {content}
      </span>
    )
  }
}

export default Position
export { PositionTarget, PositionContent }

function hCenter (target, content) {
  return target.left + ((target.width / 2) - (content.width / 2))
}

function vCenter (target, content) {
  return target.top + ((target.height / 2) - (content.height / 2))
}
