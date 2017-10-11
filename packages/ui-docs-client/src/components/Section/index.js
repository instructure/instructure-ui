import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Heading from '@instructure/ui-core/lib/components/Heading'

export default class Section extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    id: PropTypes.string.isRequired,
    heading: PropTypes.string,
    children: PropTypes.node
  };
  /* eslint-enable react/require-default-props */

  render () {
    const heading = this.props.heading && (
      <Heading level="h2">{this.props.heading}</Heading>
    )
    return (
      <div id={this.props.id}>
        {heading}
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
