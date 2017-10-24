import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

/**
---
category: components/utilities
---
**/
class PresentationContent extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node,
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'span'
  }

  render () {
    const props = {
      ...omitProps(this.props, PresentationContent.propTypes),
      'aria-hidden': 'true',
      role: 'presentation'
    }

    const ElementType = getElementType(PresentationContent, this.props)

    return <ElementType {...props}>{this.props.children}</ElementType>
  }
}

export default PresentationContent
