import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import themeable from '../../themeable'
import ModalContent from './ModalContent'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

import createChainedFunction from '../../util/createChainedFunction'
import CustomPropTypes from '../../util/CustomPropTypes'
import focusManager from '../../util/dom/focusManager'
import scopeTab from '../../util/dom/scopeTab'
import { pickProps } from '../../util/passthroughProps'

import Overlay from '../Overlay'
import Transition from '../Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
category: dialogs
---
  A Modal component. The default `padding` is `medium` but can be overridden
  by using the `padding` prop on the ModalBody if the use case requires it.

  ```js_example
  const fpo = lorem.paragraphs(5)

  class Example extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        isModalOpen: false,
        modalSize: 'auto'
      }

      this._applicationContainer = document.getElementById('app')
    }

    handleModalOpen = () => {
      this._applicationContainer.setAttribute('aria-hidden', 'true')
    };

    handleModalClose = () => {
      setTimeout(() => {
        this._applicationContainer.removeAttribute('aria-hidden')
        this._modalTrigger.focus()
      }, 0)
    };

    handleModalDismiss = () => {
      this.setState({ isModalOpen: false })
    };

    handleButtonClick = () => {
      this.setState(function (state, props) {
        return { isModalOpen: !state.isModalOpen }
      })
    };

    handleSelectChange = (e) => {
      this.setState({ modalSize: e.target.value })
    };

    render () {
      const variants = [
        {value: 'auto', label: 'Auto'},
        {value: 'small', label: 'Small'},
        {value: 'medium', label: 'Medium'},
        {value: 'large', label: 'Large'},
        {value: 'fullscreen', label: 'Full Screen'}
      ]

      return (
        <div>
          <Select
            onChange={this.handleSelectChange}
            value={this.state.modalSize}
            label={<ScreenReaderContent>Modal size</ScreenReaderContent>}
            inline
          >
            {variants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
          </Select>
          &nbsp;
          <Button onClick={this.handleButtonClick} ref={(c) => this._modalTrigger = c}>
            {this.state.isModalOpen ? 'Close' : 'Open'} the Modal
          </Button>
          <Modal
            open={this.state.isModalOpen}
            shouldCloseOnOverlayClick
            onOpen={this.handleModalOpen}
            onClose={this.handleModalClose}
            onDismiss={this.handleModalDismiss}
            transition="fade"
            size={this.state.modalSize}
            label="Modal Dialog: Hello World"
            closeButtonLabel="Close"
          >
            <ModalHeader>
              <Heading>Hello World</Heading>
            </ModalHeader>
            <ModalBody>
              <Typography lineHeight="double">{fpo}</Typography>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
              <Button onClick={this.handleButtonClick} variant="primary">Submit</Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    }
  }

  <Example />
  ```
**/
@themeable(theme, styles)
export default class Modal extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * Accessible label for the `<Modal />`
     */
    label: PropTypes.string.isRequired,

    /**
     * Accessible label for the close button
     */
    closeButtonLabel: PropTypes.string.isRequired,

    /**
     * Whether or not the `<Modal />` is open
     */
    open: PropTypes.bool,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.func,

    /**
     * Whether or not the `<Modal />` should close when `<Overlay />` is clicked
     */
    shouldCloseOnOverlayClick: PropTypes.bool,

    /**
     * The type of `<Transition />`
     */
    transition: Transition.propTypes.type,

    /**
     * The children to be rendered within the `<Modal />`
     */
    children: CustomPropTypes.Children.enforceOrder(
      [ModalHeader, ModalBody, ModalFooter],
      [ModalHeader, ModalBody],
      [ModalBody, ModalFooter],
      [ModalBody]
    ),
    /**
     * The size of the `<Modal />`
     */
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),
    /**
     * Callback fired when `<Modal />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,
    /**
     * Callback fired when `<Modal />` has been closed
     */
    onClose: PropTypes.func,
    /**
     * Event triggered when the `<Modal />` has been dismissed
     */
    onDismiss: PropTypes.func,
    /**
     * Callback fired before the `<Modal />` transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the `<Modal />` begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the `<Modal />` finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the `<Modal />` transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the `<Modal />` begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the `<Modal />` finishes transitioning out
     */
    onExited: PropTypes.func,
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
    * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `padding="small none large"`.
    */
    padding: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    open: false,
    size: 'auto',
    transition: 'fade',
    contentRef: function (el) {},
    closeButtonRef: function (el) {},
    padding: 'large'
  }

  static childContextTypes = {
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen'])
  }

  _timeouts = []

  getChildContext () {
    return {
      size: this.props.size
    }
  }

  componentWillMount () {
    if (this.props.open) {
      this.setFocusAfterRender(true)
      this.open()
    }
  }

  componentWillReceiveProps (nextProps) {
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

  ownerHandlesClose () {
    return typeof this.props.onDismiss === 'function'
  }

  requestClose (event) {
    if (this.ownerHandlesClose()) {
      this.props.onDismiss(event)
    }
  }

  getDefaultFocusElement = () => {
    return this._closeButton
  }

  handleClick = event => {
    // <Modal /> needs to handle closing on click as it's layout
    // covers the <Overlay /> and won't inherit the behavior.
    if (event.target === this._content && this.props.shouldCloseOnOverlayClick) {
      this.requestClose(event)
    }
  }

  handleKeyDown = event => {
    if (event.keyCode === keycode.codes.tab) {
      scopeTab(this._content, event)
    }

    if (event.keyCode === keycode.codes.esc) {
      event.preventDefault()
      this.requestClose(event)
    }
  }

  handleOverlayOpen = () => {
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

  render () {
    const props = pickProps(this.props, ModalContent.propTypes)

    /* eslint-disable jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
    return (
      <Overlay
        open={this.props.open}
        transition={this.props.transition}
        shouldCloseOnClick={this.props.shouldCloseOnOverlayClick}
        onOpen={createChainedFunction(this.handleOverlayOpen, this.props.onOpen)}
        onClose={this.props.onClose}
        onDismiss={this.props.onDismiss}
        onEnter={this.props.onEnter}
        onEntering={this.props.onEntering}
        onEntered={this.props.onEntered}
        onExit={this.props.onExit}
        onExiting={this.props.onExiting}
        onExited={this.props.onExited}
        contentRef={c => {
          this._overlay = c
        }} // eslint-disable-line react/jsx-no-bind
      >
        <div // eslint-disable-line jsx-a11y/onclick-has-role
          className={classnames({
            [styles.layout]: true,
            [styles.fullscreen]: this.props.size === 'fullscreen'
          })}
          tabIndex={-1}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          ref={c => {
            this._content = c
            this.props.contentRef(c)
          }}
        >
          <ModalContent
            {...props}
            dismissible
            onDismiss={this.props.onDismiss}
            closeButtonRef={c => {
              // eslint-disable-line react/jsx-no-bind
              this._closeButton = c
              this.props.closeButtonRef(c)
            }}
          />
        </div>
      </Overlay>
    )
    /* eslint-enable jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
  }
}

export { default as ModalHeader } from './ModalHeader'
export { default as ModalBody } from './ModalBody'
export { default as ModalFooter } from './ModalFooter'
