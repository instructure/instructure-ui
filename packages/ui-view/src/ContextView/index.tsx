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
/** @jsx jsx */

import { Component } from 'react'
import PropTypes from 'prop-types'
import {
  jsx,
  withStyle,
  ThemeablePropTypes,
  ThemeablePropValues
} from '@instructure/emotion'
import { PositionPropTypes, mirrorPlacement } from '@instructure/ui-position'
import { omitProps } from '@instructure/ui-react-utils'

import { View } from '../View'
import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  as?: React.ReactElement
  elementRef?: (...args: any[]) => any
  height?: string | number
  width?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  textAlign?: 'start' | 'center' | 'end'
  background?: 'default' | 'inverse'
  debug?: boolean
  makeStyles?: (...args: any[]) => any
  styles?: any
  margin: keyof typeof ThemeablePropValues.SPACING
  padding: keyof typeof ThemeablePropValues.SPACING
  shadow: keyof typeof ThemeablePropValues.SHADOW_TYPES
  stacking: keyof typeof ThemeablePropValues.STACKING_TYPES
  placement: unknown //TODO: fix this
}

/**
---
category: components
---
**/

@withStyle(generateStyle, generateComponentTheme)
class ContextView extends Component<Props> {
  static componentId = 'ContextView'

  static propTypes = {
    /**
     * The element to render as the component root
     */
    as: PropTypes.elementType,

    /**
     * provides a reference to the underlying html root element
     */
    elementRef: PropTypes.func,

    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
     */
    padding: ThemeablePropTypes.spacing,

    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The children to render inside the `<ContextView />`
     */
    children: PropTypes.node,

    /**
     * Designates the text alignment within the `<ContextView />`
     */
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),

    /**
     * Controls the shadow depth for the `<ContextView />`
     */
    shadow: ThemeablePropTypes.shadow,

    /**
     * Controls the z-index depth for the `<ContextView />`
     */
    stacking: ThemeablePropTypes.stacking,

    /**
     * Designates the background style of the `<ContextView />`
     */
    background: PropTypes.oneOf(['default', 'inverse']),

    /**
     * Specifies how the arrow for `<ContextView />` will be rendered.
     * Ex. `placement="top"` will render with an arrow pointing down.
     */
    placement: PositionPropTypes.placement,

    /**
     * Activate an outline around the component to make building your
     * layout easier
     */
    debug: PropTypes.bool,

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    as: 'span',
    elementRef: () => {},
    debug: false,
    width: 'auto',
    height: 'auto',
    children: null,
    textAlign: 'start',
    background: 'default',
    shadow: 'resting',
    placement: 'center end',
    margin: undefined,
    padding: undefined,
    stacking: undefined,
    maxWidth: undefined,
    minWidth: undefined,
    maxHeight: undefined,
    minHeight: undefined
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }
  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }
  get mirroredPlacement() {
    return mirrorPlacement(this.props.placement, '-')
  }

  render() {
    const {
      as,
      background,
      children,
      debug,
      elementRef,
      height,
      width,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      margin,
      padding,
      shadow,
      stacking,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
      style, // eslint-disable-line react/prop-types
      textAlign,
      styles
    } = this.props

    return (
      <View
        {...omitProps(this.props, ContextView.propTypes)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; style: any; css: any; b... Remove this comment to see the full error message
        style={style}
        css={styles.contextView}
        borderWidth="none"
        display="inline-block"
        as={as}
        withVisualDebug={debug}
        elementRef={elementRef}
        margin={margin}
        stacking={stacking}
      >
        <View
          // @ts-expect-error ts-migrate(2322) FIXME:
          css={styles.contextView__content}
          display="block"
          borderRadius="medium"
          borderWidth="small"
          borderColor={background === 'default' ? 'primary' : 'transparent'}
          background={background === 'default' ? 'primary' : 'primary-inverse'}
          withVisualDebug={debug}
          height={height}
          width={width}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
          padding={padding}
          shadow={shadow}
          textAlign={textAlign}
        >
          <span css={styles.contextView__arrow} />
          {children}
        </View>
      </View>
    )
  }
}

export default ContextView
export { ContextView }
