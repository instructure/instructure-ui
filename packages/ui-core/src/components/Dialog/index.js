import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import contains from '@instructure/ui-utils/lib/dom/contains'
import addEventListener from '@instructure/ui-utils/lib/dom/addEventListener'
import ownerDocument from '@instructure/ui-utils/lib/dom/ownerDocument'
import focusManager from '@instructure/ui-utils/lib/dom/focusManager'
import scopeTab from '@instructure/ui-utils/lib/dom/scopeTab'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import findTabbable from '@instructure/ui-utils/lib/dom/findTabbable'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import warning from '@instructure/ui-utils/lib/warning'

import Container from '../Container'

/**
---
category: utilities
---

  The Dialog component is a utility that is used by
  [Popover](#Popover), [Modal](#Modal) and [Tray](#Tray) for keyboard accessibility.

  ```js_example
  class Example extends React.Component {
    constructor (props) {
      super(props)
      this.state = { open: false }
    }

    render () {
      return (
        <Container as="div" padding="large">
          <Button
            onClick={() => this.setState({ open: true })}
          >
            Show the Dialog
          </Button>
          <Portal open={this.state.open}>
            <Mask>
              <Dialog
                open={this.state.open}
                shouldContainFocus
                applicationElement={() => [document.getElementById('app'), document.getElementById('flash-messages')] }
                defaultFocusElement={() => this._firstName}
                shouldReturnFocus
                onDismiss={() => this.setState({ open: false })}
              >
                <ContextBox withArrow={false} padding="medium">
                  <CloseButton placement="end" onClick={() => this.setState({ open: false })}>
                    Close
                  </CloseButton>
                  <FormFieldGroup description={<Heading level="h4" as="span">Full name</Heading>} layout="columns">
                    <TextInput label="First" inputRef={(c) => this._firstName = c} />
                    <TextInput label="Last" />
                  </FormFieldGroup>
                </ContextBox>
              </Dialog>
            </Mask>
          </Portal>
        </Container>
      )
    }
  }

  <Example />
  ```
**/

class Dialog extends Component {
  static propTypes = {
    ...Container.propTypes,

    /**
     * The children to be rendered within the `<Dialog />`
     */
    children: PropTypes.node, // eslint-disable-line react/require-default-props

    label: PropTypes.string, // eslint-disable-line react/require-default-props

    /**
     * Whether or not the `<Dialog />` is openn
     */
    open: PropTypes.bool,

    onDismiss: PropTypes.func,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * An element or a function returning an element to apply `aria-hidden` to
     */
    applicationElement: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
     * An element or a function returning an element that wraps the content of the `<Dialog />`
     */
    contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    shouldContainFocus: PropTypes.bool,
    shouldReturnFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool
  }

  static defaultProps = {
    open: false,
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true,
    applicationElement: null,
    defaultFocusElement: null,
    contentElement: null,
    onDismiss: () => {}
  }

  _preventCloseOnDocumentClick = false

  _timeouts = []

  componentDidMount () {
    if (this.props.open) {
      this.setup()
    }
  }

  componentDidUpdate (prevProps) {
    const { open } = this.props

    if (open && !prevProps.open) {
      this.setup()
    } else if (!open && prevProps.open) {
      this.teardown()
    }
  }

  componentWillUnmount () {
    if (this.props.open) {
      this.teardown()
    }

    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  setup () {
    this._timeouts.push(
      setTimeout(() => {
        this.addDocumentListeners()

        if (this.props.shouldReturnFocus) {
          focusManager.markForFocusLater()
        }

        if (this.props.shouldContainFocus) {
          this.setupScopedFocus()
        }

        !this.focused && this.focus()
      }, 0)
    )
  }

  teardown () {
    this.removeDocumentListeners()

    if (this.props.shouldContainFocus) {
      this.teardownScopedFocus()
    }

    if (this.props.shouldReturnFocus) {
      focusManager.returnFocus()
    }
  }

  addDocumentListeners () {
    const doc = ownerDocument(this)

    if (!this._documentListeners) {
      this._documentListeners = []
      this._documentListeners.push(addEventListener(doc, 'click', this.captureDocumentClick, true))
      this._documentListeners.push(addEventListener(doc, 'click', this.handleDocumentClick))
      this._documentListeners.push(addEventListener(doc, 'keyup', this.handleKeyUp))
    }
  }

  removeDocumentListeners () {
    this._preventCloseOnDocumentClick = false

    if (this._documentListeners) {
      this._documentListeners.forEach(listener => {
        listener.remove()
      })
      this._documentListeners = null
    }
  }

  captureDocumentClick = event => {
    const { target } = event

    this._preventCloseOnDocumentClick = event.button !== 0 || contains(this.contentElement, target)
  }

  handleDocumentClick = event => {
    if (this.props.open && this.props.shouldCloseOnDocumentClick && !this._preventCloseOnDocumentClick &&
        !event.defaultPrevented) {
      this.props.onDismiss(event)
    }
  }

  handleKeyUp = event => {
    if (this.focused && this.props.open && this.props.shouldCloseOnEscape &&
        !event.defaultPrevented && event.keyCode === keycode.codes.escape) {
      this.props.onDismiss(event)
    }
  }

  handleKeyDown = event => {
    if (this.props.open && this.props.shouldContainFocus && event.keyCode === keycode.codes.tab) {
      scopeTab(this.contentElement, event)
    }
  }

  hideApplicationElement () {
    this.applicationElement.forEach(element => {
      element.setAttribute('aria-hidden', 'true')
    })
  }

  openApplicationElement () {
    this.applicationElement.forEach(element => {
      element.removeAttribute('aria-hidden')
    })
  }

  setupScopedFocus () {
    if (!this._keyDownListener) {
      this._keyDownListener = addEventListener(ownerDocument(this), 'keydown', this.handleKeyDown)
    }

    focusManager.setupScopedFocus(this.contentElement)
    this.hideApplicationElement()
  }

  teardownScopedFocus () {
    this._keyDownListener && this._keyDownListener.remove()
    this._keyDownListener = null

    focusManager.teardownScopedFocus()
    this.openApplicationElement()
  }

  focus () {
    const element = this.defaultFocusElement
    this._timeouts.push(setTimeout(() => {
      !this.focused && element && element.focus()
    }, 0))
  }

  get focused () {
    return containsActiveElement(this.contentElement)
  }

  get defaultFocusElement () {
    let { defaultFocusElement } = this.props

    if (typeof defaultFocusElement === 'function') {
      defaultFocusElement = defaultFocusElement()
    }

    if (defaultFocusElement) {
      defaultFocusElement = findDOMNode(defaultFocusElement)
    }

    if (!defaultFocusElement) {
      const tabbable = findTabbable(this.contentElement)
      defaultFocusElement = tabbable && tabbable[0]
    }

    if (this.props.shouldContainFocus) {
      warning(
        defaultFocusElement && defaultFocusElement.focus,
        '[Dialog] A default focusable element is required in order to contain focus.'
      )
    }

    return defaultFocusElement
  }

  get applicationElement () {
    let { applicationElement } = this.props

    if (typeof applicationElement === 'function') {
      applicationElement = applicationElement()
    }

    if (Array.isArray(applicationElement)) {
      applicationElement = applicationElement.map(el => findDOMNode(el))
    } else if (applicationElement) {
      applicationElement = [findDOMNode(applicationElement)]
    }

    if (this.props.shouldContainFocus) {
      warning(
        applicationElement,
        `[Dialog] The applicationElement prop is required in order to contain focus.`
      )
    }

    return applicationElement
  }

  get contentElement () {
    let { contentElement } = this.props

    if (typeof contentElement === 'function') {
      contentElement = contentElement()
    }

    if (contentElement) {
      contentElement = findDOMNode(contentElement)
    }

    if (!contentElement) {
      contentElement = this._root
    }

    return contentElement
  }

  render () {
    return this.props.open
      ? <Container
        {...omitProps(this.props, Dialog.propTypes)}
        {...pickProps(this.props, Container.propTypes)}
        ref={el => {
          this._root = el
        }}
        role={this.props.label ? 'region' : null}
        aria-label={this.props.label}
      >
        {this.props.children}
      </Container>
      : null
  }
}

export default Dialog
