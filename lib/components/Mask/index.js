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
    onDismiss: PropTypes.func
  }

  static defaultProps = {
    onDismiss: null
  }

  dismiss = event => {
    if (this.props.onDismiss) {
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

    let props = omitProps(this.props, Mask.propTypes)

    if (this.props.onDismiss) {
      props = {
        ...props,
        onClick: createChainedFunction(this.handleClick, this.props.onClick),
        onKeyUp: createChainedFunction(this.handleKeyUp, this.props.onKeyUp),
        tabIndex: -1
      }
    }

    return (
      <span {...props} className={styles.root}>
        {content}
      </span>
    )
  }
}

export default Mask
