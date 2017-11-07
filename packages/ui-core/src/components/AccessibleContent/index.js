import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'

import PresentationContent from '../PresentationContent'
import ScreenReaderContent from '../ScreenReaderContent'
/**
---
category: components/utilities
---
*/
class AccessibleContent extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    alt: PropTypes.string,
    children: PropTypes.node,
    /**
    * the element type to render the screen reader content as
    */
    as: CustomPropTypes.elementType
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'span'
  }

  render () {
    const props = { ...omitProps(this.props, AccessibleContent.propTypes) }
    const ElementType = getElementType(AccessibleContent, this.props)

    return (
      <ElementType {...props}>
        <ScreenReaderContent>{this.props.alt}</ScreenReaderContent>
        <PresentationContent>
          {this.props.children}
        </PresentationContent>
      </ElementType>
    )
  }
}

export default AccessibleContent
