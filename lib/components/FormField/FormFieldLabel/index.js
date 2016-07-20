import React, { Component, PropTypes } from 'react'
import themeable from '../../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

/**
  This is a helper component that is used by most of the custom form
  components. In most cases it shouldn't be used directly.

  ```jsx_example
  <FormFieldLabel>Hello</FormFieldLabel>
  ```
**/
@themeable(theme, styles)
export default class FormFieldLabel extends Component {
  static propTypes = {
    tag: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    tag: 'span'
  }

  render () {
    const {
      tag,
      ...props
    } = this.props

    props.className = styles.root

    return React.createElement(tag, props)
  }
}
