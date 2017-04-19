import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScreenReaderContent from '../../ScreenReaderContent'
import themeable from '../../../themeable'
import classnames from 'classnames'

import styles from './styles.css'
import theme from './theme.js'

/**
  This is a helper component that is used by most of the custom form
  components. In most cases it shouldn't be used directly.

  ```jsx_example
  <FormFieldMessage variant="error">Invalid value</FormFieldMessage>
  ```
**/
@themeable(theme, styles)
export default class FormFieldMessage extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only']),
    children: PropTypes.node
  };

  static defaultProps = {
    variant: 'hint'
  };

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.variant]]: true
    }
    return (
      (this.props.variant !== 'screenreader-only')
        ? <span className={classnames(classes)}>{this.props.children}</span>
        : <ScreenReaderContent>{this.props.children}</ScreenReaderContent>
    )
  }
}
