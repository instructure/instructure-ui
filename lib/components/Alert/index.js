import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'
import invariant from 'invariant'

import themeable from '../../themeable'
import CustomPropTypes from '../../util/CustomPropTypes'
import Container from '../Container'
import ScreenReaderContent from '../ScreenReaderContent'
import Button from '../Button'
import Transition from '../Transition'

import IconCompleteSolid from 'instructure-icons/lib/Solid/IconCompleteSolid'
import IconInfoSolid from 'instructure-icons/lib/Solid/IconInfoSolid'
import IconWarningSolid from 'instructure-icons/lib/Solid/IconWarningSolid'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: dialogs
---
Alert Component Success, Info, Error, Warning. The `margin` prop can be added to give
space above or below the alert. The timeout prop can be used to automatically close
the alert after a time.
```jsx_example
<div>
  <Alert
    variant="success"
    closeButtonLabel="Close"
    dismissible
    margin="small"
    transitionType="none"
  >
    Sample success alert text. I will close w/o a transition out if you close me
  </Alert>
  <Alert
    variant="info"
    closeButtonLabel="Close"
    dismissible
    margin="small"
  >
    Sample info text. I will fade out if you close me.
  </Alert>
  <Alert
    variant="error"
    closeButtonLabel="Close"
    dismissible
    margin="small"
  >
    Sample error text that continues for a while
    to demonstrate what happens when the content stretches over
    several lines. It really does take a lot of prose to get the
    text to wrap when you are on a high resolution screen.
  </Alert>
  <Alert
    variant="warning"
    dismissible={false}
    margin="small"
  >
    Sample warning text. This alert is not dismissible and cannot be closed.
  </Alert>
</div>
```

The timeout prop can be used to automatically dismiss an alert after a time
```jsx_example
<Alert
  variant="info"
  margin="small"
  timeout={5000}
>
  Sample info text. I will fade out after 5 seconds
</Alert>
```

Given a liveRegion property, Alerts will guarantee a screenreader will announce their text
```jsx_example
class Example extends React.Component {
  constructor (props) {
    super(props)

    this._alertContainer = null
    this.i = 0
    this.variants = ['info', 'success', 'warning', 'error']
  }

  addAlert () {
    const div = document.createElement('div')
    this._alertContainer.appendChild(div)
    this.renderAlert(div)
  }

  closeAlert (parent) {
      ReactDOM.unmountComponentAtNode(parent)
      parent.parentElement.removeChild(parent)
  }

  renderAlert (parent) {
    const variant = this.variants[this.i++ % this.variants.length]
    ReactDOM.render(
      <Container margin="small 0">
        <Alert
          variant={variant}
          closeButtonLabel="Close"
          onClose={this.closeAlert.bind(this, parent)}
          liveRegion={() => document.getElementById('flash-messages')}
          dismissible
          margin="small 0"
        >
          This is a {variant} alert
        </Alert>
      </Container>, parent)
  }

  render () {
    return (
      <div>
        <Button onClick={this.addAlert.bind(this)}>Add Alert</Button>
        <div ref={(elem) => { this._alertContainer = elem }} />
      </div>
    );
  }
}

<Example />
  ```
**/
@themeable(theme, styles)
export default class Alert extends Component {
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
    * If true, the Alert can be closed by the user, and must be accompanied by a `closeButtonLabel`
    */
    dismissible: PropTypes.bool,
    /**
    * Close button label. Required if `dismissible` is true
    */
    closeButtonLabel: PropTypes.string,
    /**
    * Callback after the alert is closed
    */
    onClose: PropTypes.func,
    /**
    * Transition used to make the alert appear and disappear
    */
    transitionType: PropTypes.oneOf(['none', 'fade']),
    /**
    * if open transitions from truthy to falsey, it's a signal to close and unmount the alert.
    * This is necessary to close the alert from the outside and still run the transition.
    */
    open: PropTypes.bool
  }

  static defaultProps = {
    dismissible: false,
    variant: 'info',
    margin: 'x-small 0',
    timeout: 0,
    transitionType: 'fade',
    open: true
  }

  static transitionDuration = Transition.duration

  constructor (props) {
    super(props)
    invariant(!props.dismissible ||
              (props.dismissible && props.closeButtonLabel),
              'If dismissible is true, then closeButtonLabel must also be provided')

    this.state = {
      open: true
    }
    this.timer = 0
  }

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

  handleTimeout () {
    if (this.props.timeout > 0) {
      this.timer = setTimeout(() => { this.close() }, this.props.timeout)
    }
  }

  onExitTransition = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  close = () => {
    clearTimeout(this.timer)
    this.removeScreenreaderAlert()
    this.setState({open: false}, () => {
      if (this.props.onClose && this.props.transitionType === 'none') {
        this.props.onClose()
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
    if (liveRegion) {
      liveRegion.setAttribute('role', 'alert')
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
        // Comment coppied from railsFlashNotificationsHelper.js:
        // Accessibility attributes must be removed for the deletion of the node
        // and then reapplied because JAWS/IE will not respect the
        // "aria-relevant" attribute and read when the node is deleted if
        // the attributes are in place
        liveRegion.removeAttribute('role')
        liveRegion.removeAttribute('aria-live')
        liveRegion.removeAttribute('aria-relevant')
        liveRegion.removeAttribute('aria-atomic')

        ReactDOM.unmountComponentAtNode(div)
        div.parentNode.removeChild(div)

        this.initLiveRegion()
      }
    }
  }

  handleKey = (event) => {
    if (this.props.dismissible && event.keyCode === 27) {
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
  }

  renderIcon () {
    const { Icon } = this.variantUI()
    return (
      <div className={styles.icon}>
        <Icon className={styles.alertIcon} />
      </div>
    )
  }

  // copied from ../../util/dismissible.js
  // we cannot use dismissible directly, because it adds the close button to children,
  // violating Transition's constraint of a single child
  renderCloseButton () {
    return this.props.dismissible ? (
      <div className={styles.closeButton} key="closeButton">
        <Button
          onClick={this.close}
          size="small"
          variant="icon"
        >
          <IconXSolid />
          <ScreenReaderContent>{this.props.closeButtonLabel}</ScreenReaderContent>
        </Button>
      </div>
    ) : null
  }

  renderAlert () {
    const { classNames } = this.variantUI()
    return (
      <Container
        as="div"
        margin={this.props.margin}
        className={classNames}
        onKeyDown={this.handleKey}
      >
        {this.renderIcon()}
        <div className={styles.content}>
          {this.props.children}
        </div>
        {this.renderCloseButton()}
      </Container>
    )
  }

  render () {
    if (this.props.transitionType === 'none') {
      return this.state.open ? this.renderAlert() : null
    }
    return (
      <Transition
        type={this.props.transitionType}
        transitionOnMount
        in={this.state.open}
        unmountOnExit={false}
        onExited={this.onExitTransition}
      >
        {this.renderAlert()}
      </Transition>
    )
  }
}
