import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'
import themeable from '../../util/themeable'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'
import TooltipContent from './TooltipContent'

import styles from './styles.css'
import theme from './theme.js'

/**
  Tooltips are small contextual overlays that appear on hover or focus.

  ```jsx_example
  <Tooltip tip="Hello" placement="right">
    Hover or focus me
  </Tooltip>
  ```
**/
@themeable(theme, styles)
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
          <a
            className={styles.trigger}
            href={`#${this._tipId}`}
            onClick={this.onClick}
            aria-describedby={this._tipId}
          >
            {this.props.children}
          </a>
        </PopoverTrigger>
        <PopoverContent>
          <TooltipContent id={this._tipId} size={this.props.size}>
            {this.props.tip}
          </TooltipContent>
        </PopoverContent>
      </Popover>
    )
  }
}
