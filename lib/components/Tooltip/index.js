import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'

import Link from '../Link'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'

import TooltipContent from './TooltipContent'

/**
  Tooltips are small contextual overlays that appear on hover or focus.

  ```jsx_example
  <Tooltip tip="Hello" placement="right">
    Hover or focus me
  </Tooltip>
  ```
**/
export default class Tooltip extends Component {
  static propTypes = {
    tip: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'inverse']),
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    variant: 'inverse',
    placement: 'top',
    size: 'small'
  }

  constructor (props) {
    super()

    this._tipId = 'Tooltip__' + shortid.generate()
  }

  onClick (e) {
    e.preventDefault()
  }

  render () {
    return (
      <Popover
        on={['hover', 'focus']}
        renderOffscreen
        placement={this.props.placement}
        variant={this.props.variant}>
        <PopoverTrigger>
          <Link href={`#${this._tipId}`} onClick={this.onClick} aria-describedby={this._tipId}>
            {this.props.children}
          </Link>
        </PopoverTrigger>
        <PopoverContent>
          <TooltipContent id={this._tipId}>
            {this.props.tip}
          </TooltipContent>
        </PopoverContent>
      </Popover>
    )
  }
}
