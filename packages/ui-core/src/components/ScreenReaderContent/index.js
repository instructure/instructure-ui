import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'

/**
---
category: components/utilities
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
  /* eslint-disable react/require-default-props */
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
  /* eslint-enable react/require-default-props */

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
