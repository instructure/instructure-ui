import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import themeable from '../../themeable'

import createChainedFunction from '../../util/createChainedFunction'
import ensureSingleChild from '../../util/ensureSingleChild'
import contains from '../../util/dom/contains'
import { omitProps } from '../../util/passthroughProps'

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
**/
@themeable(theme, styles)
class Mask extends Component {
  static propTypes = {
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func
  }

  static defaultProps = {
    dismissible: false,
    onDismiss: () => {}
  }

  handleKeyUp = (event) => {
    if (this.props.dismissible &&
      event.keyCode === keycode.codes.esc) {
      event.preventDefault()
      this.props.onDismiss(event)
    }
  }

  handleClick = (event) => {
    if (this.props.dismissible &&
      !contains(this._content, event.target)) {
      this.props.onDismiss(event)
    }
  }

  render () {
    const content = ensureSingleChild(
      this.props.children,
      { ref: (el) => { this._content = el } }
    )

    let props = omitProps(this.props, Mask.propTypes)

    if (this.props.dismissible) {
      props = {
        ...props,
        onClick: createChainedFunction(this.handleClick, this.props.onClick),
        onKeyUp: createChainedFunction(this.handleKeyUp, this.props.onKeyUp),
        tabIndex: -1
      }
    }

    return (
      <span
        {...props}
        className={styles.root}
      >
        {content}
      </span>
    )
  }
}

export default Mask
