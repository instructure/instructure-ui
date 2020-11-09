/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// TODO: once the text prop is removed in v8.0.0 update children prop to isRequired
// NOTE: when the variant prop is removed in v8.0.0 change 'default' color to 'primary'
/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useStyle, jsx } from "@instructure/emotion"
import { View } from '@instructure/ui-view'
import { Tooltip } from '@instructure/ui-tooltip'
import { TruncateText } from '@instructure/ui-truncate-text'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps, useDeprecated } from '@instructure/ui-react-utils'
import { withTestable } from '@instructure/ui-testable'

import generateStyle from "./styles"

/**
---
category: components
---
**/
const Pill = (props) => {
  useDeprecated({ componentName: Pill.name, version: '8.0.0', oldProps: {
    text: 'children',
    variant: 'color'
  }, props })
  const [truncated, setTruncated] = useState(false)
  const style = useStyle(Pill.name, generateStyle, props)

  const renderPill = (focused, getTriggerProps) => {
    const {
      margin,
      children,
      variant,
      color,
      as,
      elementRef,
      text,
      ...restProps
    } = props

    const filteredProps = passthroughProps(restProps)
    const containerProps = typeof getTriggerProps === 'function' ? getTriggerProps(filteredProps) : filteredProps

    return (
      <View
        {...containerProps}
        as={as}
        elementRef={elementRef}
        margin={margin}
        padding="0"
        maxWidth={style.viewMaxWidth}
        background="transparent"
        borderRadius="pill"
        borderWidth="0"
        display="inline-block"
        position="relative"
        withFocusOutline={focused}
        focusColor="info"
      >
        <span css={style.root}>
          <span css={style.text}>
            <TruncateText onUpdate={(truncated) => setTruncated(truncated)}>
              {children || text}
            </TruncateText>
          </span>
        </span>
      </View>
    )
  }

  return (
    truncated ?
       (
        <Tooltip renderTip={props.children || props.text}>
          {({ focused, getTriggerProps }) => renderPill(focused, getTriggerProps)}
        </Tooltip>
      ) : renderPill()
  )
}

Pill.propTypes = {
  as: PropTypes.elementType, // eslint-disable-line react/require-default-props
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'success', 'danger', 'info', 'warning', 'alert']),
  elementRef: PropTypes.func,
  /**
  * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
  * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
  * familiar CSS-like shorthand. For example: `margin="small auto large"`.
  */
  margin: ThemeablePropTypes.spacing,
  /* eslint-disable react/require-default-props */
  /**
  * __Deprecated - use 'children'__
  */
  text: PropTypes.node,
  /**
  * __Deprecated - use 'color'__
  */
  variant: PropTypes.oneOf(['default', 'success', 'danger', 'primary', 'warning', 'message']),
  /* eslint-enable react/require-default-props */
}

Pill.defaultProps = {
  children: undefined,
  margin: undefined,
  elementRef: undefined,
  color: 'primary'
}

const Pill__Testable = withTestable(Pill)

export default Pill__Testable
export { Pill__Testable as Pill }
