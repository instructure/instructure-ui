import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'
import ScreenReaderContent from '../ScreenReaderContent'
import getElementType from '../../util/getElementType'
import CustomPropTypes from '../../util/CustomPropTypes'
import TooltipContent from './TooltipContent'
import { omitProps } from '../../util/passthroughProps'
import ensureSingleChild from '../../util/ensureSingleChild'

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
      <Tooltip tip="Hello. I'm a tool tip" as={Link} href="example.html">
        Hover or focus me
      </Tooltip>
    </p>
    <p>
      <Tooltip tip="Hello" placement="end" as={Button}>
        Hover or focus me
      </Tooltip>
    </p>
    <p>
      <Tooltip variant="inverse" tip="Hello" placement="bottom">
        <TextInput
          inline
          label="Enter some text"
        >
          Hover or focus me
        </TextInput>
      </Tooltip>
    </p>
  </div>
  ```
**/
export default class Tooltip extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    tip: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    /**
    * the element type to render as (assumes a single child if 'as' is undefined)
    */
    as: CustomPropTypes.elementType,
    /**
     * The action that causes the Content to display (`click`, `hover`, `focus`)
     */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    variant: PropTypes.oneOf(['default', 'inverse']),
    placement: CustomPropTypes.placement,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    variant: 'default',
    placement: 'top',
    size: 'small'
  }

  constructor (props) {
    super()

    this._id = `Tooltip__${shortid.generate()}`
  }

  renderTrigger () {
    if (this.props.as) {
      const Trigger = getElementType(Tooltip, this.props)
      const props = omitProps(this.props, Tooltip.propTypes)
      return (
        <Trigger {...props}>
          {this.props.children}
          <ScreenReaderContent>
            {this.props.tip}
          </ScreenReaderContent>
        </Trigger>
      )
    } else {
      return ensureSingleChild(this.props.children)
    }
  }

  render () {
    const trigger = this.renderTrigger()
    return (
      <Popover on={this.props.on} shouldRenderOffscreen placement={this.props.placement} variant={this.props.variant}>
        <PopoverTrigger aria-describedby={this._id} aria-controls={this._id}>
          {trigger}
        </PopoverTrigger>
        <PopoverContent>
          <TooltipContent id={this._id} size={this.props.size}>
            {this.props.tip}
          </TooltipContent>
        </PopoverContent>
      </Popover>
    )
  }
}
