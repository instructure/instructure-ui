import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { pickProps } from '../../util/passthroughProps'
import themeable from '../../util/themeable'

import classnames from 'classnames'

import Portal from '../Portal'
import TrayContent from './TrayContent'

import styles from './styles.css'
import theme from './theme.js'
/**
  A Tray component [WIP] based on react-tray

  ```jsx_example
  class App extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isTrayOpen: false,
        trayPlacement: 'left'
      }
    }

    handleTrayToggle = () => {
      const isTrayOpen = !this.state.isTrayOpen
      this.setState({
        isTrayOpen
      })

      if (!isTrayOpen) {
        this._showButton.focus()
      }
    }

    handlePlacementSelectChange = (e) => {
      this.setState({
        trayPlacement: e.target.value
      })
    }

    render () {
      const placementVarients = [
        {value: 'left', label: 'Left'},
        {value: 'right', label: 'Right'}
      ]

      return (
        <div style={{height: 750}}>
          <Select
            onChange={this.handlePlacementSelectChange}
            value={this.state.trayPlacement}
            label={<ScreenReaderContent>Tray Placement</ScreenReaderContent>}
            isBlock={false}
          >
            {placementVarients.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
          </Select>

          <Button onClick={this.handleTrayToggle} ref={(c) => this._showButton = c}>
            Show the Tray
          </Button>
          <Tray
            isDismissable
            isOpen={this.state.isTrayOpen}
            onRequestClose={this.handleTrayToggle}
            placement={this.state.trayPlacement}
            closeButtonLabel="Close"
            closeButtonRef={this.closeButtonRef}
          >
            <div style={{width: '300px'}}>
              <h1>Hello</h1>
              <Typography tag="p" lineHeight="double">{lorem.paragraph()}</Typography>
            </div>
          </Tray>
        </div>
      )
    }
  }

  <App />
  ```
**/
@themeable(theme, styles)
class Tray extends Component {
  static propTypes = {
    /**
     * For the <Portal />
     *
     * Whether or not the `<Tray />` is open
     */
    isOpen: PropTypes.bool,

    /**
     * Callback fired when `<Tray />` content has been rendered
     */
    onReady: PropTypes.func,

    /**
     * Callback fired when `<Tray />` has been closed
     */
    onClose: PropTypes.func,

    /**
     * For <Transition />
     *
     * Callback fired before the `<Tray />` transitions in
     */
    onEnter: PropTypes.func,

    /**
     * Callback fired as the `<Tray />` begins to transition in
     */
    onEntering: PropTypes.func,

    /**
     * Callback fired after the `<Tray />` finishes transitioning in
     */
    onEntered: PropTypes.func,

    /**
     * Callback fired right before the `<Tray />` transitions out
     */
    onExit: PropTypes.func,

    /**
     * Callback fired as the `<Tray />` begins to transition out
     */
    onExiting: PropTypes.func,

    /**
     * Callback fired after the `<Tray />` finishes transitioning out
     */
    onExited: PropTypes.func,

    /**
     * For <Tray />
     *
     * Variant to control `<Tray />` placement.
     */
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),

    /**
     * The children to be rendered within the `<Tray />`
     */
    children: PropTypes.node,

    /**
     * For close button
     *
     * Callback fired when `<Tray />` has requested to be closed
     */
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    placement: 'left'
  }

  closeButtonRef = (c) => {
    this._closeButton = ReactDOM.findDOMNode(c)
  }

  render () {
    const trayContentProps = pickProps(this.props, TrayContent.propTypes)
    return (
      <Portal
        isOpen={this.props.isOpen}
        onReady={this.props.onReady}
        onClose={this.props.onClose}
      >
        <div
          className={
            classnames({
              [styles.root]: true,
              [styles[`placement--${this.props.placement}`]]: true
            })
          }
        >
          <TrayContent
            {...trayContentProps}
            isDismissable
            closeButtonRef={this.closeButtonRef}
            onClose={this.props.onRequestClose}
          >
            {this.props.children}
          </TrayContent>
        </div>
      </Portal>
    )
  }
}

export default Tray
