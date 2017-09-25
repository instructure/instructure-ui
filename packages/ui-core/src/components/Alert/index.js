import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'
import keycode from 'keycode'

import IconCompleteSolid from 'instructure-icons/lib/Solid/IconCompleteSolid'
import IconInfoSolid from 'instructure-icons/lib/Solid/IconInfoSolid'
import IconWarningSolid from 'instructure-icons/lib/Solid/IconWarningSolid'

import themeable from '@instructure/ui-themeable'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import warning from '@instructure/ui-utils/lib/warning'

import Container from '../Container'
import CloseButton from '../CloseButton'
import ScreenReaderContent from '../ScreenReaderContent'

import Transition from '../Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
category: dialogs
---

The Alert component can be used to notify the user. It supports serveral
variants to provide context to the message.

Alert can optionally render as a dismissible 'dialog' with a close button.

The `margin` prop can be added to give
space above or below the alert.

```jsx_example
<div>
  <Alert
    variant="success"
    closeButtonLabel="Close"
    margin="small"
    transition="none"
  >
    Sample success alert text. I will close w/o a transition out if you close me
  </Alert>
  <Alert
    variant="info"
    closeButtonLabel="Close"
    margin="small"
  >
    Sample info text. I will fade out if you close me.
  </Alert>
  <Alert
    variant="error"
    closeButtonLabel="Close"
    margin="small"
  >
    Sample error text that continues for a while
    to demonstrate what happens when the content stretches over
    several lines. It really does take a lot of prose to get the
    text to wrap when you are on a high resolution screen.
  </Alert>
  <Alert
    variant="warning"
    margin="small"
  >
    Sample warning text. This alert is not dismissible and cannot be closed.
  </Alert>
</div>
```

The `timeout` prop can be used to automatically dismiss an alert after a time.

```jsx_example
<Alert
  variant="info"
  margin="small"
  timeout={5000}
>
  Sample info text. I will fade out after 5 seconds
</Alert>
```
Given a `liveRegion` property, Alerts will guarantee a screenreader will announce their text.

```jsx_example
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      alerts: []
    }

    this.i = 0
    this.variants = ['info', 'success', 'warning', 'error']
  }

  addAlert () {
    const variant = this.variants[this.i++ % this.variants.length]
    const alerts = [...this.state.alerts]
    const key = new Number(this.i)
    alerts.push({
      key,
      variant,
      onDismiss: () => this.closeAlert(key)
    })
    this.setState({ alerts })
  }

  closeAlert (key) {
    const alerts = this.state.alerts.filter((alert) => {
      return alert.key !== key
    })
    this.setState({ alerts })
  }

  render () {
    return (
      <div>
        <Button onClick={this.addAlert.bind(this)}>Add Alert</Button>
        {this.state.alerts.map((alert) => {
          return (
            <Container
              key={alert.key}
              margin="small 0"
            >
              <Alert
                variant={alert.variant}
                closeButtonLabel="Close"
                onDismiss={alert.onDismiss}
                liveRegion={() => document.getElementById('flash-messages')}
                margin="small 0"
              >
                This is a {alert.variant} alert
              </Alert>
            </Container>
          )
        })}
      </div>
    );
  }
}

<Example />
  ```
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
        Icon: IconWarningSolid,
        classNames: classNames(styles.alert, styles.error)
      },
      info: {
        Icon: IconInfoSolid,
        classNames: classNames(styles.alert, styles.info)
      },
      success: {
        Icon: IconCompleteSolid,
        classNames: classNames(styles.alert, styles.success)
      },
      warning: {
        Icon: IconWarningSolid,
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
      this.srid = shortid.generate()

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
