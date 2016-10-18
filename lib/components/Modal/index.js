import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ModalContent from './ModalContent'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

import CustomPropTypes from '../../util/CustomPropTypes'
import { pickProps } from '../../util/passthroughProps'

import Overlay from '../Overlay'

/**
  A Modal component

  ```jsx_example
  const fpo = lorem.paragraphs(5)

  class App extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        isModalOpen: false,
        modalSize: 'auto'
      }

      this._applicationContainer = document.getElementById('example')
    }

    handleModalReady = () => {
      this._applicationContainer.setAttribute('aria-hidden', 'true')
    }

    handleModalClose = () => {
      this._applicationContainer.removeAttribute('aria-hidden')
      this._modalTrigger.focus()
    }

    handleModalRequestClose = () => {
      this.setState({ isModalOpen: false })
    }

    handleButtonClick = () => {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      })
    }

    handleSelectChange = (e) => {
      this.setState({
        modalSize: e.target.value
      })
    }

    render () {
      const variants = [
        {value: 'auto', label: 'Auto'},
        {value: 'small', label: 'Small'},
        {value: 'medium', label: 'Medium'},
        {value: 'large', label: 'Large'},
        {value: 'fullscreen', label: 'Full Screen'}
      ]

      return (
        <div style={{height: 750}}>
          <Select
            onChange={this.handleSelectChange}
            value={this.state.modalSize}
            label={<ScreenReaderContent>Modal size</ScreenReaderContent>}
            isBlock={false}
          >
            {variants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
          </Select>
          &nbsp;
          <Button onClick={this.handleButtonClick} ref={(c) => this._modalTrigger = c}>
            {this.state.isModalOpen ? 'Close' : 'Open'} the Modal
          </Button>
          <Modal
            isOpen={this.state.isModalOpen}
            shouldCloseOnOverlayClick={true}
            onReady={this.handleModalReady}
            onClose={this.handleModalClose}
            onRequestClose={this.handleModalRequestClose}
            transition="fade"
            size={this.state.modalSize}
            label="Modal Dialog: Hello World"
            closeButtonLabel="Close"
            zIndex="9999"
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

  <App />
  ```
**/
export default class Modal extends Component {
  static propTypes = {
    /**
     * Accessible label for the `<Modal />`
     */
    label: PropTypes.string.isRequired,
    /**
     * Whether or not the `<Modal />` is open
     */
    isOpen: PropTypes.bool,
    /**
     * Whether or not the `<Modal />` should close when `<Overlay />` is clicked
     */
    shouldCloseOnOverlayClick: PropTypes.bool,
    /**
     * The type of `<Transition />` to use for animating `<Overlay />`. No animation used when `null`.
     */
    transition: Overlay.propTypes.transition,
    /**
     * The children to be rendered within the `<Modal />`
     */
    children: CustomPropTypes.Children.enforceOrder(
      [ModalHeader, ModalBody, ModalFooter],
      [ModalHeader, ModalBody],
      [ModalBody, ModalFooter],
      [ModalBody]
    ),

    zIndex: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),

    /**
     * The size of the `<Modal />`
     */
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),
    /**
     * Callback fired when `<Modal />` content has been rendered
     */
    onReady: PropTypes.func,
    /**
     * Callback fired when `<Modal />` has been closed
     */
    onClose: PropTypes.func,
    /**
     * Event triggered when the `<Modal />` is requesting to be closed
     */
    onRequestClose: PropTypes.func,
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
    onExited: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    transition: null,
    size: 'auto'
  }

  static childContextTypes = {
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen'])
  }

  getChildContext () {
    return {
      size: this.props.size
    }
  }

  closeButtonRef = (c) => {
    this._closeButton = ReactDOM.findDOMNode(c)
  }

  getDefaultFocusElement = () => {
    return this._closeButton
  }

  render () {
    const props = pickProps(this.props, ModalContent.propTypes)
    return (
      <Overlay
        isOpen={this.props.isOpen}
        transition={this.props.transition}
        shouldCloseOnClick={this.props.shouldCloseOnOverlayClick}
        getDefaultFocusElement={this.getDefaultFocusElement}
        onReady={this.props.onReady}
        onClose={this.props.onClose}
        onRequestClose={this.props.onRequestClose}
        onEnter={this.props.onEnter}
        onEntering={this.props.onEntering}
        onEntered={this.props.onEntered}
        onExit={this.props.onExit}
        onExiting={this.props.onExiting}
        onExited={this.props.onExited}
        zIndex={this.props.zIndex}
      >
        <ModalContent
          {...props}
          isDismissable
          onClose={this.props.onRequestClose}
          closeButtonRef={this.closeButtonRef}
        />
      </Overlay>
    )
  }
}

export { default as ModalHeader } from './ModalHeader'
export { default as ModalBody } from './ModalBody'
export { default as ModalFooter } from './ModalFooter'
