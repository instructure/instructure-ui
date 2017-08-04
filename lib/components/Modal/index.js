import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalContent from './ModalContent'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

import CustomPropTypes from '../../util/CustomPropTypes'
import { omitProps, pickProps } from '../../util/passthroughProps'

import Overlay from '../Overlay'
import CloseButton from '../CloseButton'

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
             transition="fade"
             size={this.state.size}
             label="Modal Dialog: Hello World"
             shouldCloseOnDocumentClick
             closeButtonLabel="Close"
             applicationElement={() => [document.getElementById('app'), document.getElementById('flash-messages')] }
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
export default class Modal extends Component {
  static propTypes = {
    ...Overlay.propTypes,
    ...ModalContent.propTypes,

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
     * The size of the `<Modal />`
     */
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),

    /**
     *
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,

    closeButtonLabel: PropTypes.string.isRequired,
    closeButtonRef: PropTypes.func
  }

  static defaultProps = {
    open: false,
    size: 'auto',
    transition: 'fade',
    contentRef: function (el) {},
    closeButtonRef: function (el) {},
    shouldCloseOnDocumentClick: true,
    shouldContainFocus: true,
    shouldReturnFocus: true,
    shouldCloseOnEscape: true,
    children: null
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  render () {
    const { children, contentRef, ...props } = this.props

    return (
      <Overlay defaultFocusElement={this.defaultFocusElement} {...pickProps(props, Overlay.propTypes)}>
        <ModalContent
          {...omitProps(props, Modal.propTypes)}
          {...pickProps(props, ModalContent.propTypes)}
          ref={el => {
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
      </Overlay>
    )
  }
}

export { default as ModalHeader } from './ModalHeader'
export { default as ModalBody } from './ModalBody'
export { default as ModalFooter } from './ModalFooter'
