import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import ModalContent from './ModalContent'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

import Portal from '../Portal'
import Dialog from '../Dialog'
import Transition from '../Transition'
import CloseButton from '../CloseButton'

/**
---
category: components/dialogs
---
  The Modal is a dialog component that is centered in the viewport. The Modal
  overlays the application content and applies a mask to it.

  The default `padding` of the Modal content is `medium` but can be overridden
  by using the `padding` prop on the `<ModalBody/>` if the use case requires it.

  ```jsx_example
  ---
  render: false
  ---
   const fpo = lorem.paragraphs(5)

   class Example extends React.Component {
     constructor (props) {
       super(props)

       this.state = {
         open: false,
         size: 'auto'
       }
     }

     handleButtonClick = () => {
       this.setState(function (state) {
         return { open: !state.open }
       })
     };

     handleSelectChange = (e) => {
       this.setState({ size: e.target.value })
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
             value={this.state.size}
             label={<ScreenReaderContent>Modal size</ScreenReaderContent>}
             inline
           >
             {variants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
           </Select>
           &nbsp;
           <Button onClick={this.handleButtonClick}>
             {this.state.open ? 'Close' : 'Open'} the Modal
           </Button>
           <Modal
             open={this.state.open}
             onDismiss={() => { this.setState({ open: false }) }}
             size={this.state.size}
             label="Modal Dialog: Hello World"
             shouldCloseOnOverlayClick
             closeButtonLabel="Close"
             applicationElement={() => [document.getElementById('app'), document.getElementById('flash-messages')] }
           >
             <ModalHeader>
               <Heading>Hello World</Heading>
             </ModalHeader>
             <ModalBody>
               <Text lineHeight="double">{fpo}</Text>
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

   render(<Example />)
   ```

   A Modal may contain components which "break out" of their container using absolute position elements,
   such as an Autocomplete and it's options list.

  ```jsx_example
  ---
  render: false
  ---
  const fpo = lorem.paragraphs(1)
   class Example extends React.Component {
     constructor (props) {
       super(props)

       this.state = {
         open: false,
         size: 'auto'
       }
     }

     handleButtonClick = () => {
       this.setState(function (state) {
         return { open: !state.open }
       })
     };

     render () {
       return (
         <div>
           <Button onClick={this.handleButtonClick}>
             {this.state.open ? 'Close' : 'Open'} the Modal
           </Button>
           <Modal
             open={this.state.open}
             onDismiss={() => { this.setState({ open: false }) }}
             size="medium"
             label="Modal Dialog: Hello World"
             shouldCloseOnOverlayClick
             closeButtonLabel="Close"
             applicationElement={() => [document.getElementById('app'), document.getElementById('flash-messages')] }
           >
             <ModalHeader>
               <Heading>This Modal contains an Autocomplete</Heading>
             </ModalHeader>
             <ModalBody>
               <Text lineHeight="double">{fpo}</Text>
               <ModalAutoCompleteExample
                label="Choose a state" defaultOption="12"
                onChange={(e, o) => console.log(o.label)} />
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

   class ModalAutoCompleteExample extends React.Component {
    render () {
      const options = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District Of Columbia',
        'Federated States Of Micronesia', 'Florida', 'Georgia',
        'Guam', 'Hawaii', 'Idaho', 'Illinois'
      ]

      return (
        <Autocomplete {...this.props}
          formatSelectedOption={(tag) => (
            <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
          )}
        >
          {options.map((label, index) => (
            <option key={label} value={'' + index}>
              {label}
            </option>
          ))}
        </Autocomplete>
      )
    }
  }

  render(<Example />)
  ```
**/

@deprecated('3.0.0', {
  onRequestClose: 'onDismiss',
  isOpen: 'open',
  onReady: 'onOpen',
  onAfterOpen: 'onOpen',
  getDefaultFocusElement: 'defaultFocusElement',
  closeButtonVariant: true,
  padding: true
})
export default class Modal extends Component {
  static propTypes = {
    /**
     * An accessible label for the `<Modal />` content
     */
    label: PropTypes.string.isRequired,

    /**
     * An accessible label for the close button. The close button won't display without this label.
     */
    closeButtonLabel: PropTypes.string.isRequired,

    /**
     * The children to be rendered within the `<Modal />`
     */
    children: CustomPropTypes.Children.enforceOrder(
      [ModalHeader, ModalBody, ModalFooter],
      [ModalHeader, ModalBody],
      [ModalBody, ModalFooter],
      [ModalBody]
    ),

    /*
     * The size of the `<Modal />` content
     */
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),

    /**
     * Whether or not the `<Modal />` is open
     */
    open: PropTypes.bool,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * An element or a function returning an element to apply `aria-hidden` to
     */
    applicationElement: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
     * Whether focus should be returned to the trigger when the `<Modal/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,

    /**
     * Whether the `<Modal/>` should request close when the overlay is clicked
     */
    shouldCloseOnOverlayClick: PropTypes.bool,

    /**
     * Callback fired when `<Modal />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

    /**
     * Callback fired when `<Modal />` has been unmounted from the DOM
     */
    onClose: PropTypes.func,

    /**
     * Callback fired when the `<Modal />` is requesting to be closed
     */
    onDismiss: PropTypes.func,

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
     * An element or a function returning an element to use as the mount node
     * for the `<Modal />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    transition: Transition.propTypes.type,

    /**
     * Callback fired before the <Modal /> transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the <Modal /> begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the <Modal /> finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the <Modal /> transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the <Modal /> begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the <Modal /> finishes transitioning out
     */
    onExited: PropTypes.func
  }

  static defaultProps = {
    open: false,
    size: 'auto',
    transition: 'fade',
    onOpen: event => {},
    onClose: event => {},
    onDismiss: event => {},
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    mountNode: null,
    insertAt: 'bottom',
    contentRef: el => {},
    closeButtonRef: el => {},
    shouldCloseOnOverlayClick: true,
    shouldReturnFocus: true,
    applicationElement: null,
    defaultFocusElement: null,
    children: null
  }

  constructor (props) {
    super(props)

    this.state = {
      open: props.open,
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
        transitioning: this.props.transition !== null
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  handlePortalOpen = () => {
    this._timeouts.push(
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({
            open: true
          })
        }
      })
    )
  }

  handleTransitionExited = () => {
    this.setState({
      open: false,
      transitioning: false
    })
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  render () {
    const { children, contentRef, ...props } = this.props

    return (
      <Portal
        {...pickProps(this.props, Portal.propTypes)}
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, this.props.onOpen)}
      >
        <Transition
          {...pickProps(this.props, Transition.propTypes)}
          in={this.props.open}
          transitionOnMount
          unmountOnExit
          type={this.props.transition}
          onExited={createChainedFunction(this.handleTransitionExited, this.props.onExited)}
        >
          <Dialog
            {...pickProps(this.props, Dialog.propTypes)}
            defaultFocusElement={this.defaultFocusElement}
            contentElement={() => this._content}
            shouldCloseOnDocumentClick={false}
            shouldCloseOnEscape
            shouldContainFocus
            open={this.state.open}
            role="region"
          >
            <ModalContent
              {...omitProps(props, Modal.propTypes)}
              {...pickProps(props, ModalContent.propTypes)}
              contentRef={el => {
                this._content = el
                if (typeof contentRef === 'function') {
                  contentRef(el)
                }
              }}
            >
              <CloseButton
                buttonRef={el => {
                  this._closeButton = el
                  this.props.closeButtonRef(el)
                }}
                placement="end"
                offset="medium"
                onClick={this.props.onDismiss}
              >
                {this.props.closeButtonLabel}
              </CloseButton>
              {children}
            </ModalContent>
          </Dialog>
        </Transition>
      </Portal>
    )
  }
}

export { default as ModalHeader } from './ModalHeader'
export { default as ModalBody } from './ModalBody'
export { default as ModalFooter } from './ModalFooter'
