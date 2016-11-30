import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { pickProps } from '../../util/passthroughProps'
import themeable from '../../util/themeable'

import classnames from 'classnames'

import Portal from '../Portal'
import Transition from '../Transition'
import TrayContent from './TrayContent'

import styles from './styles.css'
import theme from './theme.js'
/**
  A Tray component based on react-tray.

  By default, Tray appears with a box-shadow. To remove the shadow, set the
  `shadow` prop to `false`. You can also display Tray with a simple 1px border
  via the `border` prop.

  Tray has no defined width/height or padding: Add CSS rules to the element that
  contains the Tray's content to set these properties (see the code for the
  example below).

  ```js_example
  class Example extends React.Component {
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
    };

    handlePlacementSelectChange = (e) => {
      this.setState({
        trayPlacement: e.target.value
      })
    };

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
            zIndex={9999}
          >
            <div style={{width: '23rem', padding: '3rem 2rem 2rem', boxSizing: 'border-box'}}>
              <Heading>Hello</Heading>
              <Typography tag="p" lineHeight="double">{lorem.paragraph()}</Typography>
            </div>
          </Tray>
        </div>
      )
    }
  }

  <Example />
  ```
**/
@themeable(theme, styles)
class Tray extends Component {
  static propTypes = {
    /**
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
     *
     * Variant to control `<Tray />` placement.
     */
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),

    /**
     * Z-Index value to be applied to <Tray /> div.
     */
    zIndex: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),

    /**
     * The children to be rendered within the `<Tray />`
     */
    children: PropTypes.node,

    /**
     *
     * Callback fired when `<Tray />` has requested to be closed
     */
    onRequestClose: PropTypes.func,
    /**
     *
     * Should the `<Tray />` have a close button
     */
    isDismissable: PropTypes.bool,
    /**
     *
     * Should the `<Tray />` have a box shadow
     */
    shadow: PropTypes.bool,
    /**
     *
     * Should the `<Tray />` have a border
     */
    border: PropTypes.bool
  }

  static defaultProps = {
    placement: 'left',
    isDismissable: true,
    shadow: true,
    border: false
  }

  closeButtonRef = (c) => {
    this._closeButton = ReactDOM.findDOMNode(c)
  }

  transitionType () {
    return classnames({
      'slide-down': (
        (
          this.props.placement === 'top' && this.props.isOpen
        ) || (
          this.props.placement === 'bottom' && !this.props.isOpen
        )
      ),
      'slide-up': (
        (
          this.props.placement === 'bottom' && this.props.isOpen
        ) || (
          this.props.placement === 'top' && !this.props.isOpen
        )
      ),
      'slide-left': (
        (
          this.props.placement === 'left' && !this.props.isOpen
        ) || (
          this.props.placement === 'right' && this.props.isOpen
        )
      ),
      'slide-right': (
        (
          this.props.placement === 'right' && !this.props.isOpen
        ) || (
          this.props.placement === 'left' && this.props.isOpen
        )
      )
    })
  }

  render () {
    const trayContentProps = pickProps(this.props, TrayContent.propTypes)
    return (
      <Portal
        isOpen={this.props.isOpen}
        onReady={this.props.onReady}
        onClose={this.props.onClose}
      >
        <Transition
          in={this.props.isOpen}
          transitionOnMount
          unmountOnExit
          type={this.transitionType()}
          onEnter={this.props.onEnter}
          onEntering={this.props.onEntering}
          onEntered={this.props.onEntered}
          onExit={this.props.onExit}
          onExiting={this.props.onExiting}
          onExited={this.props.onExited}
        >
          <div
            className={
              classnames({
                [styles.root]: true,
                [styles.border]: this.props.border,
                [styles.shadow]: this.props.shadow,
                [styles[`placement--${this.props.placement}`]]: true
              })
            }
            style={{ zIndex: this.props.zIndex }}
          >
            <TrayContent
              {...trayContentProps}
              isDismissable={this.props.isDismissable}
              closeButtonRef={this.closeButtonRef}
              onClose={this.props.onRequestClose}
              placement={this.props.placement}
            >
              {this.props.children}
            </TrayContent>
          </div>
        </Transition>
      </Portal>
    )
  }
}

export default Tray
