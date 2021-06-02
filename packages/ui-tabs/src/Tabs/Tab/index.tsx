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

import { passthroughProps, callRenderProp } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  variant?: 'default' | 'secondary'
  id: string
  index: number
  controls: string
  isDisabled?: boolean
  isSelected?: boolean
  onClick?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
}

/**
---
parent: Tabs
id: Tabs.Tab
---
**/
@withStyle(generateStyle, generateComponentTheme, [
  'variant',
  'isSelected',
  'isDisabled'
])
class Tab extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    variant: PropTypes.oneOf(['default', 'secondary']),
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    controls: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    children: null,
    variant: 'default',
    isDisabled: false,
    isSelected: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onClick: (event, { index, id }) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onKeyDown: (event, { index, id }) => {}
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleClick = (event) => {
    const { onClick, index, id, isDisabled } = this.props

    if (isDisabled) {
      return
    }

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onClick(event, { index, id })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyDown = (event) => {
    const { onKeyDown, index, id, isDisabled } = this.props

    if (isDisabled) {
      return
    }

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onKeyDown(event, { index, id })
  }

  render() {
    const {
      id,
      variant,
      isSelected,
      isDisabled,
      controls,
      children,
      styles,
      ...props
    } = this.props

    return (
      <View
        {...passthroughProps(props)}
        as="div"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; as: string; role: string; i... Remove this comment to see the full error message
        role="tab"
        id={id}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        css={styles.tab}
        aria-selected={isSelected ? 'true' : null}
        aria-disabled={isDisabled ? 'true' : null}
        aria-controls={controls}
        tabIndex={isSelected && !isDisabled ? '0' : null}
      >
        {callRenderProp(children)}
      </View>
    )
  }
}

export default Tab
export { Tab }
