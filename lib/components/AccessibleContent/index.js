import React, { Component, PropTypes } from 'react'

import PresentationContent from '../PresentationContent'
import ScreenReaderContent from '../ScreenReaderContent'

/**
  An AccessibleContent component

  Note the caveats on hiding content from screenreaders.
  (see [PresentationContent](#PresentationContent))

  ```jsx_example
  <AccessibleContent alt="Alternative text for a screenreader only">
    <Typography>
      Normal presentation content goes here. (hidden from screen readers)
    </Typography>
  </AccessibleContent>
  ```
**/
class AccessibleContent extends Component {
  static propTypes = {
    alt: PropTypes.string,
    children: PropTypes.node,
    /**
    * tagName is the element type used, defaults to <span>
    */
    tagName: PropTypes.string
  }

  static defaultProps = {
    tagName: 'span'
  }

  render () {
    const Tag = this.props.tagName
    return (
      <Tag>
        <ScreenReaderContent>{this.props.alt}</ScreenReaderContent>
        <PresentationContent tagName={this.props.tagName}>
          {this.props.children}
        </PresentationContent>
      </Tag>
    )
  }
}

export default AccessibleContent
