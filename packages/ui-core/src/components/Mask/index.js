import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import classnames from 'classnames'
import noScroll from 'no-scroll'

import themeable from '@instructure/ui-themeable'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import ensureSingleChild from '@instructure/ui-utils/lib/react/ensureSingleChild'
import contains from '@instructure/ui-utils/lib/dom/contains'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: utilities
---

  A Mask component covers its closest positioned parent (either absolute or relative).

  You can use the [Overlay](#Overlay) component to make a mask that covers
  the viewport (with transitions).

  ```jsx_example
  <Container
    padding="large"
    margin="medium"
    textAlign="center"
    as="div"
    style={{ position: 'relative' }}
  >
    <Heading>Some content that is masked</Heading>
    <Mask />
  </Container>
  ```

  The Mask component can be configured to cover the full screen if it is rendered inside a [Portal](#Portal).


  ```js_example

   class Example extends React.Component {
     constructor (props) {
       super(props)

       this.state = {
         open: false
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
             {this.state.open ? 'Close' : 'Open'} the Mask
           </Button>
           <Portal
             open={this.state.open}
           >
              <Mask
                fullScreen
                onDismiss={() => { this.setState({ open: false }) }}
              >
                <Heading>Click me to close</Heading>
              </Mask>
            </Portal>
         </div>
       )
     }
   }

   <Example />
   ```
**/
@themeable(theme, styles)
class Mask extends Component {
  static propTypes = {
    onDismiss: PropTypes.func,
    placement: PropTypes.oneOf(['top', 'center', 'bottom']),
    fullScreen: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    onKeyUp: PropTypes.func
  }

  static defaultProps = {
    children: undefined,
    onClick: undefined,
    onKeyUp: undefined,
    onDismiss: undefined,
    placement: 'center',
    fullScreen: false
  }

  componentDidMount () {
    if (this.props.fullScreen) {
      noScroll.on()
    }
  }

  componentWillUnmount () {
    if (this.props.fullScreen) {
      noScroll.off()
    }
  }

  dismiss = event => {
    if (typeof this.props.onDismiss === 'function') {
      event.preventDefault()
      this.props.onDismiss(event)
    }
  }

  handleKeyUp = event => {
    if (event.keyCode === keycode.codes.esc) {
      this.dismiss(event)
    }
  }

  handleClick = event => {
    if (!contains(this._content, event.target)) {
      this.dismiss(event)
    }
  }

  render () {
    const content = ensureSingleChild(this.props.children, {
      ref: el => {
        this._content = el
      }
    })

    const classes = classnames({
      [styles.root]: true,
      [styles[this.props.placement]]: true,
      [styles.fullScreen]: this.props.fullScreen
    })

    let props = omitProps(this.props, Mask.propTypes)

    if (typeof this.props.onDismiss === 'function' ||
      typeof this.props.onClick === 'function' ||
      typeof this.props.onKeyUp === 'function') {
      props = {
        ...props,
        onClick: createChainedFunction(this.handleClick, this.props.onClick),
        onKeyUp: createChainedFunction(this.handleKeyUp, this.props.onKeyUp),
        tabIndex: -1
      }
    }

    return (
      <span {...props} className={classes}>
        {content}
      </span>
    )
  }
}

export default Mask
