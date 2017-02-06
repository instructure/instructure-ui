import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import CustomPropTypes from '../../util/CustomPropTypes'
import getElementType from '../../util/getElementType'
import { omitProps } from '../../util/passthroughProps'

import styles from './styles.css'

/**
---
category: utilities
---
  The ScreenReaderContent component renders content that is accessible to
  screen readers, but is not visible.

  ```jsx_example
  <ScreenReaderContent>
    This content is not visible.
  </ScreenReaderContent>
  ```
**/
@themeable(null, styles)
class ScreenReaderContent extends Component {
  static propTypes = {
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    /**
    * content meant for screen readers only
    */
    children: PropTypes.node
  }

  static defaultProps = {
    as: 'span'
  }

  render () {
    const props = {
      ...omitProps(this.props, ScreenReaderContent.propTypes),
      className: styles.root
    }

    const ElementType = getElementType(ScreenReaderContent, this.props)

    return <ElementType {...props}>{this.props.children}</ElementType>
  }
}

export default ScreenReaderContent
