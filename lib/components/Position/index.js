import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Portal from '../Portal'
import ComponentIdentifier, { pick } from '../../util/ComponentIdentifier'
import safeCloneElement from '../../util/safeCloneElement'
import trackPosition from '../../util/trackPosition'

class Target extends ComponentIdentifier {
  static displayName = 'Target'
}

class Content extends ComponentIdentifier {
  static displayName = 'Content'
}

/**
  A Position component

  ```jsx_example
  const { Target, Content } = Position

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
            <Target>
              <Button variant="primary" onClick={this.handleButtonClick}>
                Change placement
              </Button>
            </Target>
            <Content>
              <ContextBox placement={placement}>
                <div style={{ padding: '5px 15px' }}>
                  Content to the {placement}
                </div>
              </ContextBox>
            </Content>
          </Position>
        </div>
      )
    }
  }

  <App />
  ```
**/
class Position extends Component {
  static Target = Target
  static Content = Content

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
    offsetY: PropTypes.number
  }

  static defaultProps = {
    placement: 'right',
    offsetX: 0,
    offsetY: 0
  }

  componentWillUnmount () {
    if (typeof this._cancelTracking === 'function') {
      this._cancelTracking()
      this._cancelTracking = null
    }
  }

  componentDidMount () {
    this.updatePosition()
  }

  componentDidUpdate () {
    this.updatePosition()
  }

  handlePositionChange = () => {
    this.updatePosition()
  }

  handlePortalReady = () => {
    this.updatePosition()
  }

  updatePosition () {
    const target = ReactDOM.findDOMNode(this._target)
    const content = ReactDOM.findDOMNode(this._content)
    const targetRect = target ? target.getBoundingClientRect() : {}

    if (content) {
      if (!this._cancelTracking) {
        this._cancelTracking = trackPosition(target, this.handlePositionChange)
      }

      const contentRect = content.getBoundingClientRect()
      const { offsetX, offsetY } = this.props

      if (process.env.NODE_ENV === 'test') {
        content.setAttribute('data-position-component', true)
      }
      content.style.position = 'absolute'
      content.style.top = 0
      content.style.left = 0

      switch (this.props.placement) {
        case 'top':
          content.style.top = `${targetRect.top - contentRect.height + offsetY}px`
          content.style.left = `${hCenter(targetRect, contentRect) + offsetX}px`
          break

        case 'bottom':
          content.style.top = `${targetRect.bottom + offsetY}px`
          content.style.left = `${hCenter(targetRect, contentRect) + offsetX}px`
          break

        case 'left':
          content.style.top = `${vCenter(targetRect, contentRect) + offsetY}px`
          content.style.left = `${targetRect.left - contentRect.width + offsetX}px`
          break

        case 'right':
          content.style.top = `${vCenter(targetRect, contentRect) + offsetY}px`
          content.style.left = `${targetRect.right + offsetX}px`
          break
      }
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

    if (content) {
      content = safeCloneElement(content, {
        ref: (el) => { this._content = el }
      })
    }

    return (
      <span>
        {target}
        <Portal isOpen onReady={this.handlePortalReady}>
          {content}
        </Portal>
      </span>
    )
  }
}

export default Position
export { Target, Content }

function hCenter (target, content) {
  return target.left + ((target.width / 2) - (content.width / 2))
}

function vCenter (target, content) {
  return target.top + ((target.height / 2) - (content.height / 2))
}

