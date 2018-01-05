import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import keycode from 'keycode'

import Container from '@instructure/ui-container/lib/components/Container'

import IconComplete from '@instructure/ui-icons/lib/Solid/IconComplete'
import IconInfo from '@instructure/ui-icons/lib/Solid/IconInfo'
import IconWarning from '@instructure/ui-icons/lib/Solid/IconWarning'

import themeable from '@instructure/ui-themeable'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import warning from '@instructure/ui-utils/lib/warning'
import uid from '@instructure/ui-utils/lib/uid'

import CloseButton from '../CloseButton'
import ScreenReaderContent from '../ScreenReaderContent'

import Transition from '../Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/dialogs
---
**/

@deprecated('3.0.0', {
  dismissable: true,
  onClose: 'onDismiss',
  transitionType: 'transition',
  isOpen: 'open'
})
@themeable(theme, styles)
export default class Alert extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * content to be rendered within Alert
    */
    children: PropTypes.node,
    /**
    * Determines color and icon
    */
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * Function that returns the DIV where screenreader alerts will be placed.
    */
    liveRegion: PropTypes.func,
    /**
    * Milliseconds until the Alert is dismissed automatically
    */
    timeout: PropTypes.number,
    /**
    * Close button label
    */
    closeButtonLabel: PropTypes.string,
    /**
    * Callback after the alert is closed
    */
    onDismiss: PropTypes.func,
    /**
    * Transition used to make the alert appear and disappear
    */
    transition: PropTypes.oneOf(['none', 'fade']),
    /**
    * if open transitions from truthy to falsey, it's a signal to close and unmount the alert.
    * This is necessary to close the alert from the outside and still run the transition.
    */
    open: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    variant: 'info',
    margin: 'x-small 0',
    timeout: 0,
    transition: 'fade',
    open: true
  }

  static transitionDuration = Transition.duration

  constructor (props) {
    super(props)

    this.state = {
      open: true
    }
  }

  _timeouts = []

  variantUI () {
    return {
      error: {
        Icon: IconWarning,
        classNames: classNames(styles.alert, styles.error)
      },
      info: {
        Icon: IconInfo,
        classNames: classNames(styles.alert, styles.info)
      },
      success: {
        Icon: IconComplete,
        classNames: classNames(styles.alert, styles.success)
      },
      warning: {
        Icon: IconWarning,
        classNames: classNames(styles.alert, styles.warning)
      }
    }[this.props.variant]
  }

  handleTimeout = () => {
    if (this.props.timeout > 0) {
      this._timeouts.push(
        setTimeout(() => {
          this.close()
        }, this.props.timeout)
      )
    }
  }

  clearTimeouts () {
    this._timeouts.forEach(timeout => clearTimeout(timeout))
    this._timeouts = []
  }

  onExitTransition = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }

  close = () => {
    this.clearTimeouts()
    this.removeScreenreaderAlert()
    this.setState({ open: false }, () => {
      if (this.props.onDismiss && this.props.transition === 'none') {
        this.props.onDismiss()
      }
    })
  }

  // duck type for a dom node
  isDOMNode (n) {
    return n && typeof n === 'object' && n.nodeType === 1
  }

  getLiveRegion () {
    let lr = null
    if (typeof this.props.liveRegion === 'function') {
      lr = this.props.liveRegion()
    }

    return this.isDOMNode(lr) ? lr : null
  }

  initLiveRegion () {
    const liveRegion = this.getLiveRegion()

    warning(
      liveRegion.getAttribute('role') === 'alert',
      `[Alert] live region must have role='alert' set on page load in order to announce content`
    )

    if (liveRegion) {
      liveRegion.setAttribute('aria-live', 'assertive')
      liveRegion.setAttribute('aria-relevant', 'additions text')
      liveRegion.setAttribute('aria-atomic', 'false')
    }
  }

  createScreenreaderContentNode () {
    return (
      <ScreenReaderContent>
        {this.props.children}
      </ScreenReaderContent>
    )
  }

  createScreenreaderAlert () {
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      this.srid = uid()

      const div = document.createElement('div')
      div.setAttribute('id', this.srid)

      const content = this.createScreenreaderContentNode()
      ReactDOM.render(content, div)
      liveRegion.appendChild(div)
    }
  }

  updateScreenreaderAlert () {
    if (this.getLiveRegion()) {
      const div = document.getElementById(this.srid)
      if (div) {
        ReactDOM.unmountComponentAtNode(div)
        const content = this.createScreenreaderContentNode()
        ReactDOM.render(content, div)
      }
    }
  }

  removeScreenreaderAlert () {
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      const div = document.getElementById(this.srid)
      if (div) {
        // Accessibility attributes must be removed for the deletion of the node
        // and then reapplied because JAWS/IE will not respect the
        // "aria-relevant" attribute and read when the node is deleted if
        // the attributes are in place
        liveRegion.removeAttribute('aria-live')
        liveRegion.removeAttribute('aria-relevant')
        liveRegion.removeAttribute('aria-atomic')

        ReactDOM.unmountComponentAtNode(div)
        div.parentNode.removeChild(div)

        this.initLiveRegion()
      }
    }
  }

  handleKeyUp = event => {
    if (this.props.closeButtonLabel && event.keyCode === keycode.codes.esc) {
      this.close()
    }
  }

  componentWillMount () {
    if (this.getLiveRegion()) {
      this.initLiveRegion()
    }
  }

  componentDidMount () {
    this.handleTimeout()
    this.createScreenreaderAlert()
  }

  componentDidUpdate (prevProps) {
    if (!!this.props.open === false && !!this.props.open !== !!prevProps.open) {
      // this outside world is asking us to close the alert, which needs to
      // take place internally so the transition runs
      this.close()
    } else {
      this.updateScreenreaderAlert()
    }
  }

  componentWillUnmount () {
    this.removeScreenreaderAlert()
    this.clearTimeouts()
  }

  renderIcon () {
    const { Icon } = this.variantUI()
    return (
      <div className={styles.icon}>
        <Icon className={styles.alertIcon} />
      </div>
    )
  }

  renderCloseButton () {
    return this.props.closeButtonLabel
      ? <div className={styles.closeButton} key="closeButton">
        <CloseButton onClick={this.close} size="small" variant="icon">
          {this.props.closeButtonLabel}
        </CloseButton>
      </div>
      : null
  }

  renderAlert () {
    const { classNames } = this.variantUI()
    return (
      <Container as="div" margin={this.props.margin} className={classNames} onKeyUp={this.handleKeyUp}>
        {this.renderIcon()}
        <div className={styles.content}>
          {this.props.children}
        </div>
        {this.renderCloseButton()}
      </Container>
    )
  }

  render () {
    if (this.props.transition === 'none') {
      return this.state.open ? this.renderAlert() : null
    }
    return (
      <Transition
        type={this.props.transition}
        transitionOnMount
        in={this.state.open}
        unmountOnExit
        onExited={this.onExitTransition}
      >
        {this.renderAlert()}
      </Transition>
    )
  }
}
