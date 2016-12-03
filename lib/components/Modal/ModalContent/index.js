import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../../util/themeable'
import dismissable from '../../../util/dismissable'

import styles from './styles.css'
import theme from './theme.js'

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

      this._applicationContainer = document.getElementById('app')
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
@dismissable(styles.closeButton)
@themeable(theme, styles)
export default class ModalContent extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),
    children: PropTypes.node
  }

  render () {
    return (
      <div
        role="region"
        aria-label={this.props.label}
        className={classnames({
          [styles.root]: true,
          [styles[this.props.size]]: true
        })}
      >
        {this.props.children}
      </div>
    )
  }
}
