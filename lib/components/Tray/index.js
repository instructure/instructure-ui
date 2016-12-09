import React, { Component, PropTypes } from 'react'

import { pickProps } from '../../util/passthroughProps'
import themeable from '../../util/themeable'

import classnames from 'classnames'
import createChainedFunction from '../../util/createChainedFunction'
import focusManager from '../../util/focusManager'
import scopeTab from '../../util/scopeTab'
import keycode from 'keycode'

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

    handleTrayOpen = () => {
      this.setState({
        isTrayOpen: true
      })
    }

    handleTrayClose = () => {
      this.setState({
        isTrayOpen: false
      })

      this._showButton.focus()
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

          <Button onClick={this.handleTrayOpen} ref={(c) => this._showButton = c}>
            Show the Tray
          </Button>
          <Tray
            label="Tray Example"
            isDismissable
            isOpen={this.state.isTrayOpen}
            onRequestClose={this.handleTrayClose}
            placement={this.state.trayPlacement}
            closeButtonLabel="Close"
            zIndex={9999}
          >
            <div style={{width: '23rem', padding: '3rem 2rem 2rem', boxSizing: 'border-box'}}>
              <Heading>Hello</Heading>
              <Typography as="p" lineHeight="double">{lorem.paragraph()}</Typography>
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
     * Accessible label for the `<Tray />`
     */
    label: PropTypes.string.isRequired,
    /**
     *
     * Whether or not the `<Tray />` is open
     */
    isOpen: PropTypes.bool,

    /**
     * Get the default element to focus when the `<Tray />` opens. Will be close button by default.
     */
    getDefaultFocusElement: PropTypes.func,

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
     * Callback fired when `<Tray />` has been opened
     */
    onAfterOpen: PropTypes.func,

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
    border: PropTypes.bool,
    /**
     *
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,
    /**
     *
     * A function that returns a reference to the close button element
     */
    closeButtonRef: PropTypes.func,

    trapFocus: PropTypes.bool
  }

  static defaultProps = {
    trapFocus: false,
    placement: 'left',
    isDismissable: true,
    shadow: true,
    border: false,
    contentRef: function (el) {},
    closeButtonRef: function (el) {}
  }

  constructor (props) {
    super(props)

    this.state = {
      isTransitioning: false
    }
  }

  componentWillMount () {
    if (this.props.isOpen) {
      this.setFocusAfterRender(true)
      this.open()
    }
  }

  componentWillReceiveProps (nextProps) {
    // Flag component to be forced open while transition is running
    if (this.props.isOpen && !nextProps.isOpen) {
      this.setState({
        isTransitioning: true
      })
    }

    // Focus only needs to be set once when the modal is being opened
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setFocusAfterRender(true)
      this.open()
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.close()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.isOpen && !prevProps.isOpen && this.props.onAfterOpen) {
      this.props.onAfterOpen()
    }
  }

  componentWillUnMount () {
    this.isUnMounted = true
  }

  setFocusAfterRender (focus) {
    this.focusAfterRender = focus
  }

  maybeFocusContent () {
    if (this.focusAfterRender && !this.isUnMounted) {
      this.focusContent()
      this.setFocusAfterRender(false)
    }
  }

  focusContent () {
    let el

    if (typeof this.props.getDefaultFocusElement === 'function') {
      el = this.props.getDefaultFocusElement()
    } else {
      el = this.getDefaultFocusElement()
    }

    if (el) {
      el.focus()
    }
  }

  open () {
    focusManager.setupScopedFocus(this._content)
    focusManager.markForFocusLater()
  }

  close () {
    focusManager.returnFocus()
    focusManager.teardownScopedFocus()
  }

  requestClose (event) {
    if (typeof this.props.onRequestClose === 'function') {
      this.props.onRequestClose(event)
    }
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

  getDefaultFocusElement = () => {
    return this._closeButton
  }

  handleKeyDown = (event) => {
    if (this.props.trapFocus && (event.keyCode === keycode.codes.tab)) {
      scopeTab(this._content, event)
    }

    if (event.keyCode === keycode.codes.escape) {
      event.preventDefault()
      this.requestClose(event)
    }
  }

  handlePortalReady = () => {
    // Timeout is needed to ensure componentDidUpdate runs before
    // maybeFocusContent, which is needed to flag focusAfterRender
    window.setTimeout(() => {
      if (!this.isUnMounted) {
        this.maybeFocusContent()
      }
    }, 0)
  }

  handleTransitionExited = () => {
    if (!this.isUnMounted) {
      this.setState({
        isTransitioning: false
      })
    }
  }

  render () {
    const closeButtonRef = (c) => {
      this._closeButton = c
      this.props.closeButtonRef(c)
    }

    return (
      <Portal
        isOpen={this.props.isOpen || this.state.isTransitioning}
        onReady={createChainedFunction(
          this.handlePortalReady,
          this.props.onReady
        )}
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
          onExited={createChainedFunction(
            this.handleTransitionExited,
            this.props.onExited
          )}
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
            ref={(el) => {
              this._content = el
              this.props.contentRef(el)
            }}
            onKeyDown={this.handleKeyDown}
          >
            <TrayContent
              {...pickProps(this.props, TrayContent.propTypes)}
              isDismissable={this.props.isDismissable}
              closeButtonRef={closeButtonRef}
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
