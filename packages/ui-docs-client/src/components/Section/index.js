import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Heading from '@instructure/ui-core/lib/components/Heading'

export default class Section extends Component {
  static propTypes = {
    id: PropTypes.string,
    heading: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    id: undefined,
    heading: undefined,
    children: null
  }

  render () {
    const heading = this.props.heading && (
      <Heading
        level="h2"
        id={this.props.id}
      >
        {this.props.heading}
      </Heading>
    )
    return (
      <div>
        {heading}
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
