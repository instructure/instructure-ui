import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

/**
---
category: utilities
---
  A component that *tries* to hide itself from screen readers, absolutely
  expecting that you're providing a more accessible version of the resource
  using something like a ScreenReaderContent component.

  Be warned that this does not totally prevent all screen readers from
  seeing this content in all modes. For example, VoiceOver in OS X will
  still see this element when running in the "Say-All" mode and read it
  along with the accessible version you're providing.

  Use of this component is discouraged unless there's no alternative
  (e.g. for data vizualizations)

  ```jsx_example
    <PresentationContent>
      <Typography>
        Presentational content here
      </Typography>
    </PresentationContent>
  ```
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
