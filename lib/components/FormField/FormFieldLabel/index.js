import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../../themeable'
import { omitProps } from '../../../util/passthroughProps'
import getElementType from '../../../util/getElementType'
import CustomPropTypes from '../../../util/CustomPropTypes'
import hasVisibleChildren from '../../../util/hasVisibleChildren'
import classnames from 'classnames'

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
    as: CustomPropTypes.elementType,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    as: 'span'
  };

  render () {
    const ElementType = getElementType(FormFieldLabel, this.props)

    const classes = {
      [styles.root]: true,
      [styles['has-content']]: hasVisibleChildren(this.props.children)
    }

    return (
      <ElementType
        {...omitProps(this.props, FormFieldLabel.propTypes)}
        className={classnames(classes)}
      >
        {this.props.children}
      </ElementType>
    )
  }
}
