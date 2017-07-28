import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import classnames from 'classnames'

import { pickProps } from '../../util/passthroughProps'
import themeable from '../../themeable'

import createChainedFunction from '../../util/createChainedFunction'
import focusManager from '../../util/dom/focusManager'
import scopeTab from '../../util/dom/scopeTab'

import Portal from '../Portal'
import Transition from '../Transition'
import TrayContent from './TrayContent'

import styles from './styles.css'
import theme from './theme'
/**
---
category: dialogs
---
  A Tray component based on react-tray.

  By default, Tray appears with a box-shadow. To remove the shadow, set the
  `shadow` prop to `false`. You can also display Tray with a border
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
        trayPlacement: 'start'
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
        {value: 'start', label: 'Left (start)'},
        {value: 'end', label: 'Right (end)'}
      ]

      return (
        <div>
          <Select
            onChange={this.handlePlacementSelectChange}
            value={this.state.trayPlacement}
            label={<ScreenReaderContent>Tray Placement</ScreenReaderContent>}
            inline
          >
            {placementVarients.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
          </Select>

          <Button onClick={this.handleTrayOpen} ref={(c) => this._showButton = c}>
            Show the Tray
          </Button>
          <Tray
            label="Tray Example"
            dismissible
            open={this.state.isTrayOpen}
            onDismiss={this.handleTrayClose}
            placement={this.state.trayPlacement}
            closeButtonLabel="Close"
          >
            <Container as="div" style={{width: '23rem'}} padding="medium">
              <Heading>Hello</Heading>
              <Typography as="p" lineHeight="double">{lorem.paragraph()}</Typography>
            </Container>
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
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * Accessible label for the `<Tray />`
     */
    label: PropTypes.string.isRequired,
    /**
     *
     * Whether or not the `<Tray />` is open
     */
    open: PropTypes.bool,

    /**
     * Get the default element to focus when the `<Tray />` opens. Will be close button by default.
     */
    defaultFocusElement: PropTypes.func,

    /**
     * Callback fired when `<Tray />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

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
    placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),

    /**
     * The children to be rendered within the `<Tray />`
     */
    children: PropTypes.node,

    /**
     *
     * Callback fired when `<Tray />` has requested to be closed
     */
    onDismiss: PropTypes.func,

    /**
     *
     * Should the `<Tray />` have a close button
     */
    dismissible: PropTypes.bool,
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
    /**
     *
     * The variant of close button to render. Defaults to `icon`.
     */
    closeButtonVariant: PropTypes.oneOf(['icon', 'icon-inverse'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    placement: 'start',
    dismissible: true,
    shadow: true,
    border: false,
    contentRef: function (el) {},
    closeButtonRef: function (el) {},
    closeButtonVariant: 'icon'
  }

  constructor (props) {
    super(props)

    this.state = {
      transitioning: false
    }
  }

  _timeouts = []

  componentWillMount () {
    if (this.props.open) {
      this.setFocusAfterRender(true)
      this.open()
    }
  }

  componentWillReceiveProps (nextProps) {
    // Flag component to be forced open while transition is running
    if (this.props.open && !nextProps.open) {
      this.setState({
        transitioning: true
      })
    }

    // Focus only needs to be set once when the modal is being opened
    if (!this.props.open && nextProps.open) {
      this.setFocusAfterRender(true)
      this.open()
    } else if (this.props.open && !nextProps.open) {
      this.close()
    }
  }

  componentWillUnMount () {
    this.isUnMounted = true

    this._timeouts.forEach(timeout => {
      clearTimeout(timeout)
    })

    this._timeouts = null
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

    if (typeof this.props.defaultFocusElement === 'function') {
      el = this.props.defaultFocusElement()
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
    if (typeof this.props.onDismiss === 'function') {
      this.props.onDismiss(event)
    }
  }

  transitionType () {
    return classnames({
      'slide-down':
        (this.props.placement === 'top' && this.props.open) || (this.props.placement === 'bottom' && !this.props.open),
      'slide-up':
        (this.props.placement === 'bottom' && this.props.open) || (this.props.placement === 'top' && !this.props.open),
      'slide-left':
        (this.props.placement === 'start' && !this.props.open) || (this.props.placement === 'end' && this.props.open),
      'slide-right':
        (this.props.placement === 'end' && !this.props.open) || (this.props.placement === 'start' && this.props.open)
    })
  }

  getDefaultFocusElement = () => {
    return this._closeButton
  }

  handleKeyUp = event => {
    if (event.keyCode === keycode.codes.tab) {
      scopeTab(this._content, event)
    }

    if (event.keyCode === keycode.codes.escape) {
      event.preventDefault()
      this.requestClose(event)
    }
  }

  handlePortalOpen = () => {
    // Timeout is needed to ensure componentDidUpdate runs before
    // maybeFocusContent, which is needed to flag focusAfterRender
    this._timeouts.push(
      setTimeout(() => {
        if (!this.isUnMounted) {
          this.maybeFocusContent()
        }
      }, 0)
    )
  }

  handleTransitionExited = () => {
    if (!this.isUnMounted) {
      this.setState({
        transitioning: false
      })
    }
  }

  render () {
    const closeButtonRef = c => {
      this._closeButton = c
      this.props.closeButtonRef(c)
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <Portal
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, this.props.onOpen)}
        onClose={this.props.onClose}
      >
        <Transition
          in={this.props.open}
          transitionOnMount
          unmountOnExit
          type={this.transitionType()}
          onEnter={this.props.onEnter}
          onEntering={this.props.onEntering}
          onEntered={this.props.onEntered}
          onExit={this.props.onExit}
          onExiting={this.props.onExiting}
          onExited={createChainedFunction(this.handleTransitionExited, this.props.onExited)}
        >
          <div
            className={classnames({
              [styles.root]: true,
              [styles.border]: this.props.border,
              [styles.shadow]: this.props.shadow,
              [styles[`placement--${this.props.placement}`]]: true
            })}
            ref={el => {
              this._content = el
              this.props.contentRef(el)
            }}
            onKeyUp={this.handleKeyUp}
          >
            <TrayContent
              {...pickProps(this.props, TrayContent.propTypes)}
              dismissible={this.props.dismissible}
              closeButtonRef={closeButtonRef}
              closeButtonVariant={this.props.closeButtonVariant}
              onDismiss={this.props.onDismiss}
              placement={this.props.placement}
            >
              {this.props.children}
            </TrayContent>
          </div>
        </Transition>
      </Portal>
    )
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}

export default Tray
