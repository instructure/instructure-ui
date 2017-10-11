import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import Button from '../../Button'

/**
---
parent: Pagination
---
**/
export default class PaginationButton extends Component {
  static propTypes = {
    /**
    * Content to render as page selection
    */
    children: PropTypes.node.isRequired,
    /**
    * Whether the page is currently displayed
    */
    current: PropTypes.bool
  }

  static defaultProps = {
    current: false
  }

  render () {
    const variant = this.props.current ? 'primary' : 'link'
    const exclude = this.props.current ? ['onClick', 'href'] : []
    const props = omitProps(this.props, PaginationButton.propTypes, exclude)
    return (
      <Button
        variant={variant}
        {...props}
      >
        {this.props.children}
      </Button>
    )
  }
}
