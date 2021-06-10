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

import { Heading } from '@instructure/ui-heading'
import { View } from '@instructure/ui-view'
import {
  omitProps,
  callRenderProp,
  getElementType
} from '@instructure/ui-react-utils'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  ThemeablePropValues
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  hero?: React.ReactElement | ((...args: any[]) => any)
  size?: 'small' | 'medium' | 'large'
  as?: React.ReactElement
  elementRef?: (...args: any[]) => any
  heading?: string
  headingAs?: 'h1' | 'h2' | 'h3' | 'span'
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4'
  message?: React.ReactNode | ((...args: any[]) => any)
  onClick?: (...args: any[]) => any
  href?: string
  disabled?: boolean
  readOnly?: boolean
  margin?: keyof typeof ThemeablePropValues.SPACING
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Billboard extends Component<Props> {
  static componentId = 'Billboard'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Provide an <Img> component or Instructure Icon for the hero image
     */
    hero: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * If you're using an icon, this prop will size it. Also sets the font-size
     * of the headline and message.
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * the element type to render as
     */
    as: PropTypes.elementType,
    /**
     * provides a reference to the underlying html root element
     */
    elementRef: PropTypes.func,
    /**
     * The headline for the Billboard. Is styled as an h1 element by default
     */
    heading: PropTypes.string,
    /**
     * Choose the appropriately semantic tag for the heading
     */
    headingAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'span']),
    /**
     * Choose the font-size for the heading (see the Heading component)
     */
    headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
    /**
     * Instructions or information for the Billboard. Note: you should not pass
     * interactive content to this prop if you are also providing an `href` or
     * `onClick`. That would cause the Billboard to render as a button or link
     * and would result in nested interactive content.
     */
    message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * If you add an onClick prop, the Billboard renders as a clickable button
     */
    onClick: PropTypes.func,
    /**
     * If `href` is provided, Billboard will render as a link
     */
    href: PropTypes.string,
    /**
     * Whether or not to disable the billboard
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    margin: undefined,
    disabled: false,
    readOnly: false,
    href: undefined,
    message: undefined,
    onClick: undefined,
    heading: undefined,
    hero: undefined,
    size: 'medium',
    headingAs: 'span',
    headingLevel: 'h1',
    as: 'span',
    elementRef: () => {}
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  renderHeading() {
    const { headingLevel, headingAs, heading, styles } = this.props

    return (
      <span css={styles.heading}>
        <Heading
          level={headingLevel}
          // @ts-expect-error ts-migrate(2769) FIXME:
          as={headingAs}
          color="primary"
        >
          {heading}
        </Heading>
      </span>
    )
  }

  get heroIsFunction() {
    return typeof this.props.hero === 'function'
  }

  get SVGIconSize() {
    const size = this.props.size

    // serve up appropriate SVGIcon size for each Billboard size
    if (size === 'small') {
      return 'medium'
    } else if (size === 'large') {
      return 'x-large'
    } else {
      return 'large'
    }
  }

  renderHero() {
    if (this.heroIsFunction) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return this.props.hero(this.SVGIconSize)
    } else {
      return this.props.hero
    }
  }

  renderContent() {
    const { heading, message, hero, styles } = this.props

    return (
      <span css={styles.content}>
        {hero && <span css={styles.hero}>{this.renderHero()}</span>}
        {heading && this.renderHeading()}
        {message && <span css={styles.message}>{callRenderProp(message)}</span>}
      </span>
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleClick = (e) => {
    const { readOnly, onClick } = this.props

    if (readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render() {
    const { href, disabled, readOnly, margin, styles, elementRef } = this.props

    const Element = getElementType(Billboard, this.props)

    return (
      <View
        as="div"
        // @ts-expect-error ts-migrate(2322) FIXME:
        margin={margin}
      >
        <View
          {...omitProps(this.props, {
            ...Billboard.propTypes,
            ...View.propTypes
          })}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; type: string | null; as... Remove this comment to see the full error message
          type={Element === 'button' ? 'button' : null}
          as={Element}
          elementRef={elementRef}
          css={styles.billboard}
          href={href}
          onClick={this.handleClick}
          disabled={disabled}
          aria-disabled={disabled || readOnly ? 'true' : null}
        >
          {this.renderContent()}
        </View>
      </View>
    )
  }
}

export default Billboard
export { Billboard }
