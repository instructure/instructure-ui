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

import { debounce } from '@instructure/debounce'
import { getBoundingClientRect } from '@instructure/ui-dom-utils'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  label: string
  contentRef?: (...args: any[]) => any
  onSizeChange?: (...args: any[]) => any
  role?: string
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
parent: DrawerLayout
id: DrawerLayout.Content
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class DrawerContent extends Component<Props> {
  static componentId = 'DrawerLayout.Content'

  static locatorAttribute = 'data-drawer-content'
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    contentRef: PropTypes.func,
    /**
     * Callback fired whenever the `<DrawerLayout.Content />` changes size
     */
    onSizeChange: PropTypes.func,
    role: PropTypes.string,

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    children: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    contentRef: (el: any) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'node' is declared but its value is never read.
    onSizeChange: (node: any) => {},
    role: 'region'
  }

  state = {
    shouldTransition: false
  }

  _content = null
  _resizeListener = null

  _debounced = null
  _timeouts = []

  componentDidMount() {
    const rect = getBoundingClientRect(this._content)
    const origSize = {
      width: rect.width
    }
    // set initial size
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefined'.
    this.props.onSizeChange({ width: rect.width, height: rect.height })
    // listen for changes to size
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Function' is not assignable to type 'null'.
    this._debounced = debounce(this.props.onSizeChange, 100, {
      leading: false,
      trailing: true
    })
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'ResizeObserver' is not assignable to type 'n... Remove this comment to see the full error message
    this._resizeListener = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const size = {
          width: entry.contentRect.width
        }
        if (size.width !== origSize.width) {
          // @ts-expect-error ts-migrate(2721) FIXME: Cannot invoke an object which is possibly 'null'.
          this._debounced(size)
        }
      }
    })

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this._resizeListener.observe(this._content)
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ shouldTransition: false })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ shouldTransition: true })
  }

  componentWillUnmount() {
    if (this._resizeListener) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._resizeListener.disconnect()
    }

    if (this._debounced) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._debounced.cancel()
    }

    this._timeouts.forEach((timeout) => {
      clearTimeout(timeout)
    })
  }

  handleContentRef = (node: any) => {
    if (typeof this.props.contentRef === 'function') {
      this._content = node
      this.props.contentRef(node)
    }
  }

  render() {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
      style, // eslint-disable-line react/prop-types
      label,
      role
    } = this.props

    return (
      <div
        {...omitProps(this.props, DrawerContent.propTypes, [
          'shouldTransition'
        ])}
        role={role}
        style={style}
        ref={this.handleContentRef}
        aria-label={label}
        css={this.props.styles.drawerContent}
      >
        {this.props.children}
      </div>
    )
  }
}

export default DrawerContent
export { DrawerContent }
