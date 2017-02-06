import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'
import getElementType from '../../util/getElementType'
import CustomPropTypes from '../../util/CustomPropTypes'
import TooltipContent from './TooltipContent'
import ScreenReaderContent from '../ScreenReaderContent'
import { omitProps } from '../../util/passthroughProps'

/**
---
category: dialogs
---
  Tooltips are small contextual overlays that appear on hover or focus.

  ### What about 'focusable' elements?
  Content provided to the `tip` property should not contain any `focusable` elements. If you'd like to do
  that you should use the [Popover](#Popover) component and handle focus management yourself or
  consider using a [Modal](#Modal) or a [Tray](#Tray) as those will work better on smaller screens.

  ```jsx_example
  <div>
    <p>
      <Tooltip tip="Hello" placement="bottom" as={Link} href="example.html">
        Hover or focus me
      </Tooltip>
    </p>
    <p>
      <Tooltip tip="Hello" placement="right" as={Button}>
        Hover or focus me
      </Tooltip>
    </p>
    <p>
      <Tooltip variant="inverse" tip="Hello" placement="top">
        <TextInput isBlock={false} label="Enter some text">Hover or focus me</TextInput>
      </Tooltip>
    </p>
  </div>
  ```
**/
export default class Tooltip extends Component {
  static propTypes = {
    tip: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    /**
    * the element type to render as (assumes a single child if 'as' is undefined)
    */
    as: CustomPropTypes.elementType,
    variant: PropTypes.oneOf(['default', 'inverse']),
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  };

  static defaultProps = {
    variant: 'default',
    placement: 'top',
    size: 'small'
  };

  constructor (props) {
    super()

    this._tipId = 'Tooltip__' + shortid.generate()
  }

  renderTrigger () {
    if (this.props.as) {
      const Trigger = getElementType(Tooltip, this.props)
      const props = omitProps(this.props, Tooltip.propTypes)
      return (
        <Trigger
          {...props}
        >
          {this.props.children}
          <ScreenReaderContent>{this.props.tip}</ScreenReaderContent>
        </Trigger>
      )
    } else {
      return this.props.children
    }
  }

  render () {
    return (
      <Popover
        on={['hover', 'focus']}
        renderOffscreen
        placement={this.props.placement}
        variant={this.props.variant}>
        <PopoverTrigger aria-describedby={this._tipId}>
          {this.renderTrigger()}
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
