import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import { omitProps, pickProps } from '../../util/passthroughProps'
import createChainedFunction from '../../util/createChainedFunction'

import Portal from '../Portal'
import Dialog from '../Dialog'
import CloseButton from '../CloseButton'
import Transition from '../Transition'

import TrayContent from './TrayContent'

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
        open: false,
        size: 'small',
        placement: 'start'
      }
    }

    render () {
      const placementVariants = [
        {value: 'start', label: 'Left'},
        {value: 'top', label: 'Top'},
        {value: 'end', label: 'Right'},
        {value: 'bottom', label: 'Bottom'}
      ]

      const sizeVariants = [
        {value: 'x-small', label: 'Extra Small'},
        {value: 'small', label: 'Small'},
        {value: 'medium', label: 'Medium'},
        {value: 'large', label: 'Large'}
      ]

      return (
        <div>
          <Select
            onChange={(e) => { this.setState({ placement: e.target.value }) }}
            value={this.state.placement}
            label={<ScreenReaderContent>Tray Placement</ScreenReaderContent>}
            inline
          >
            {placementVariants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
          </Select>

          <Select
            onChange={(e) => { this.setState({ size: e.target.value }) }}
            value={this.state.size}
            label={<ScreenReaderContent>Tray Size</ScreenReaderContent>}
            inline
          >
            {sizeVariants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
          </Select>

          <Button
            onClick={() => { this.setState({ open: true }) }}
            ref={(c) => this._showButton = c}
          >
            Show the Tray
          </Button>

          <Tray
            label="Tray Example"
            closeButtonLabel="Close"
            open={this.state.open}
            onDismiss={() => { this.setState({ open: false }) }}
            size={this.state.size}
            placement={this.state.placement}
            applicationElement={() => document.getElementById('app') }
          >
            <Container as="div" padding="large medium">
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
class Tray extends Component {
  static propTypes = {
    ...Portal.propTypes,
    ...Dialog.propTypes,
    ...Transition.propTypes,
    ...TrayContent.propTypes,

    /*
     * The size of the `<Tray />`
     */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
    contentRef: PropTypes.func,
    closeButtonRef: PropTypes.func,
    closeButtonVariant: PropTypes.oneOf(['icon', 'icon-inverse'])
  }

  static defaultProps = {
    size: 'small',
    placement: 'start',
    contentRef: function (el) {},
    closeButtonRef: function (el) {},
    closeButtonVariant: 'icon',
    shouldCloseOnDocumentClick: false,
    shouldContainFocus: true,
    shouldReturnFocus: true,
    shouldCloseOnEscape: true
  }

  constructor (props) {
    super(props)

    this.state = {
      portalOpen: false,
      transitioning: false
    }
  }

  _timeouts = []

  componentDidMount () {
    this._isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.open && !nextProps.open) {
      // closing
      this.setState({
        transitioning: true
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  get transition () {
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

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  handlePortalOpen = () => {
    this._timeouts.push(
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({
            portalOpen: true
          })
        }
      })
    )
  }

  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }

  renderCloseButton () {
    return this.props.closeButtonLabel
      ? <CloseButton
        placement={this.props.placement === 'end' ? 'start' : 'end'}
        offset="x-small"
        variant={this.props.closeButtonVariant}
        buttonRef={el => {
          this._closeButton = el
          this.props.closeButtonRef(el)
        }}
        onClick={this.props.onDismiss}
      >
        {this.props.closeButtonLabel}
      </CloseButton>
      : null
  }

  render () {
    const { children, contentRef, open, onOpen, ...props } = this.props
    return (
      <Portal
        {...pickProps(props, Portal.propTypes)}
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, onOpen)}
      >
        <Transition
          {...pickProps(this.props, Transition.propTypes)}
          in={this.props.open}
          transitionOnMount
          transitionExit
          unmountOnExit
          type={this.transition}
          onExited={createChainedFunction(this.handleTransitionExited, this.props.onExited)}
        >
          <TrayContent {...pickProps(props, TrayContent.propTypes)} ref={contentRef}>
            <Dialog
              {...pickProps(props, Dialog.propTypes)}
              defaultFocusElement={this.defaultFocusElement}
              open={this.state.portalOpen || this.state.transitioning}
              role="region"
            >
              {this.renderCloseButton()}
              {children}
            </Dialog>
          </TrayContent>
        </Transition>
      </Portal>
    )
  }
}

export default Tray
