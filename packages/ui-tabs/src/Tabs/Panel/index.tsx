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

import { View } from '@instructure/ui-view'
import { passthroughProps } from '@instructure/ui-react-utils'
import { Transition } from '@instructure/ui-motion'

import { withStyle, jsx, ThemeablePropTypes } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  renderTitle: React.ReactNode | ((...args: any[]) => any)
  variant?: 'default' | 'secondary'
  isSelected?: boolean
  isDisabled?: boolean
  maxHeight?: string | number
  minHeight?: string | number
  id?: string
  labelledBy?: string
  padding?: any // TODO: ThemeablePropTypes.spacing
  textAlign?: 'start' | 'center' | 'end'
  elementRef?: (...args: any[]) => any
}

/**
---
parent: Tabs
id: Tabs.Panel
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Panel extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * The content that will be rendered in the corresponding <Tab /> and will label
     * this `<Tabs.Panel />` for screen readers
     */
    renderTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'secondary']),
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    labelledBy: PropTypes.string,
    padding: ThemeablePropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    elementRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    id: undefined,
    isDisabled: false,
    maxHeight: undefined,
    minHeight: undefined,
    textAlign: 'start',
    variant: 'default',
    labelledBy: null,
    isSelected: false,
    padding: 'small',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {}
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

  render() {
    const {
      labelledBy,
      variant,
      id,
      maxHeight,
      minHeight,
      padding,
      textAlign,
      children,
      elementRef,
      isDisabled,
      isSelected,
      styles,
      ...props
    } = this.props
    const isHidden = !isSelected || !!isDisabled

    return (
      <div
        {...passthroughProps(props)}
        css={styles.panel}
        role="tabpanel"
        id={id}
        aria-labelledby={labelledBy}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"true" | null' is not assignable to type 'bo... Remove this comment to see the full error message
        aria-hidden={isHidden ? 'true' : null}
        ref={elementRef}
      >
        <Transition
          type="fade"
          in={!isHidden}
          unmountOnExit
          transitionExit={false}
        >
          <View
            css={styles.content}
            maxHeight={maxHeight}
            minHeight={minHeight}
            as="div"
            padding={padding}
            textAlign={textAlign}
          >
            {children}
          </View>
        </Transition>
      </div>
    )
  }
}

export default Panel
export { Panel }
