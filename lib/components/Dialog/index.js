import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import invariant from 'invariant'
import classnames from 'classnames'

import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import themeable from '../../themeable'
import { pickProps, omitProps } from '../../util/passthroughProps'
import contains from '../../util/dom/contains'
import addEventListener from '../../util/dom/addEventListener'
import ownerDocument from '../../util/dom/ownerDocument'
import focusManager from '../../util/focusManager'
import scopeTab from '../../util/dom/scopeTab'
import containsActiveElement from '../../util/dom/containsActiveElement'
import ensureSingleChild from '../../util/ensureSingleChild'
import safeCloneElement from '../../util/safeCloneElement'

import Button from '../Button'
import ScreenReaderContent from '../ScreenReaderContent'

import styles from './styles.css'
import theme from './theme'

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
          <Dialog
            open={this.state.open}
            shouldContainFocus
            closeButtonLabel="Close"
            applicationElement={() => [document.getElementById('app'), document.getElementById('flash-messages')] }
            defaultFocusElement={() => this._firstName}
            shouldReturnFocus
            onDismiss={() => this.setState({ open: false })}
          >
            <ContextBox withArrow={false} padding="medium">
              <FormFieldGroup description={<Heading level="h4" as="span">Full name</Heading>} layout="columns">
                <TextInput label="First" ref={(c) => this._firstName = c} />
                <TextInput label="Last" />
              </FormFieldGroup>
            </ContextBox>
          </Dialog>
        </Container>
      )
    }
  }

  <Example />
  ```
**/
@themeable(theme, styles)
class Dialog extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * The children to be rendered within the `<Dialog />`
     */
    children: PropTypes.node,

    label: PropTypes.string,

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

    shouldContainFocus: PropTypes.bool,
    shouldReturnFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool,

    closeButtonLabel: PropTypes.string,
    closeButtonPlacement: PropTypes.oneOf(['start', 'end']),
    closeButtonOffset: PropTypes.oneOf(['none', 'x-small', 'small', 'medium']),
    closeButtonRef: PropTypes.func,
    closeButtonVariant: PropTypes.oneOf(['icon', 'icon-inverse'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    open: false,
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true,
    applicationElement: null,
    defaultFocusElement: null,
    onDismiss: () => {},
    closeButtonVariant: 'icon',
    closeButtonRef: el => {},
    closeButtonPlacement: 'end',
    closeButtonOffset: 'x-small'
  }

  _preventCloseOnDocumentClick = false

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
  }

  setup () {
    if (this.props.shouldCloseOnDocumentClick) {
      this.addDocumentListeners()
    }

    if (this.props.shouldReturnFocus) {
      focusManager.markForFocusLater()
    }

    if (this.props.shouldContainFocus) {
      this.setupScopedFocus()
    }

    !this.focused && this.focus()
  }

  teardown () {
    if (this.props.shouldCloseOnDocumentClick) {
      this.removeDocumentListeners()
    }

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

    this._preventCloseOnDocumentClick = event.button !== 0 || contains(this._root, target)
  }

  handleDocumentClick = event => {
    if (this.props.open && this.props.shouldCloseOnDocumentClick && !this._preventCloseOnDocumentClick) {
      this.props.onDismiss(event)
    }
  }

  handleKeyUp = event => {
    if (this.focused && this.props.open && this.props.shouldCloseOnEscape && event.keyCode === keycode.codes.escape) {
      this.props.onDismiss(event)
    }
  }

  handleKeyDown = event => {
    if (this.props.open && this.props.shouldContainFocus && event.keyCode === keycode.codes.tab) {
      scopeTab(this._root, event)
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

    focusManager.setupScopedFocus(this._root)
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

    !this.focused && element && element.focus()
  }

  get focused () {
    return containsActiveElement(this._root)
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
      defaultFocusElement = this._closeButton
    }

    if (this.props.shouldContainFocus) {
      invariant(
        defaultFocusElement && defaultFocusElement.focus,
        `
        Dialog: A default focusable element is required in order to contain focus.
      `
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
      invariant(
        applicationElement,
        `
        Dialog: The applicationElement prop is required in order to contain focus.
      `
      )
    }

    return applicationElement
  }

  renderCloseButton () {
    const { closeButtonPlacement, closeButtonOffset, closeButtonLabel, closeButtonVariant, closeButtonRef } = this.props

    return (
      <span
        className={classnames({
          [styles.closeButton]: true,
          [styles[`placement--${closeButtonPlacement}`]]: closeButtonPlacement,
          [styles[`offset--${closeButtonOffset}`]]: closeButtonOffset,
          [styles.inverse]: closeButtonVariant === 'icon-inverse'
        })}
        key={closeButtonLabel}
      >
        <Button
          onClick={this.props.onDismiss}
          size="small"
          variant={closeButtonVariant}
          buttonRef={el => {
            this._closeButton = el
            if (typeof this.props.closeButtonRef === 'function') {
              this.props.closeButtonRef(el)
            }
          }}
        >
          <IconXSolid />
          <ScreenReaderContent>
            {closeButtonLabel}
          </ScreenReaderContent>
        </Button>
      </span>
    )
  }

  render () {
    const { closeButtonOffset, closeButtonPlacement, closeButtonLabel } = this.props

    let content = ensureSingleChild(this.props.children, {
      ...omitProps(this.props, Dialog.propTypes),
      ref: el => {
        this._root = el
      },
      role: this.props.label ? 'region' : null,
      'aria-label': this.props.label,
      style: this.props.style, // pass through style for positioned dialogs
      className: classnames({
        [styles.root]: true,
        [styles.withCloseButton]: closeButtonLabel,
        [styles[`placement--${closeButtonPlacement}`]]: closeButtonPlacement,
        [styles[`offset--${closeButtonOffset}`]]: closeButtonOffset,
        [this.props.className]: this.props.className
      })
    })

    if (this.props.closeButtonLabel) {
      content = safeCloneElement(content, { children: [this.renderCloseButton()].concat(content.props.children) })
    }

    return this.props.open ? content : null
  }
}

export default Dialog
