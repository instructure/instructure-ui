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
import React, { Component } from 'react'
import { DIRECTION, TextDirectionContext } from '@instructure/ui-i18n'
import { withStyle, jsx, InstUISettingsProvider } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import { compileAndRenderExample } from '../compileAndRenderExample'
import { propTypes, allowedProps } from './props'
import type { PreviewProps, PreviewState } from './props'
import canvas from '@instructure/ui-themes'

@withStyle(generateStyle, generateComponentTheme)
class Preview extends Component<PreviewProps, PreviewState> {
  static propTypes = propTypes
  static allowedProps = allowedProps

  static defaultProps = {
    render: true,
    fullscreen: false,
    frameless: false,
    inverse: false,
    rtl: false,
    background: 'checkerboard',
    language: 'jsx'
  }

  // TODO investigate why any is needed here
  static getDerivedStateFromProps(props: any, state: PreviewState) {
    if (props.error) {
      return {
        ...state,
        error: props.error
      }
    }
    return null
  }

  constructor(props: PreviewProps) {
    super(props)

    this.state = {
      error: null,
      elToRender: null
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  executeCode(code: string) {
    const { themeKey, themes } = this.props
    const theme = themes?.[themeKey!]?.resource || canvas
    const dir = (this.props.rtl ? DIRECTION.rtl : DIRECTION.ltr) as
      | 'rtl'
      | 'ltr'

    const compiledCode = compileAndRenderExample(code)

    return (
      <InstUISettingsProvider theme={theme}>
        <TextDirectionContext.Provider value={dir}>
          {typeof compiledCode === 'string' ? null : (
            <div dir={dir}>{compiledCode}</div>
          )}
        </TextDirectionContext.Provider>
      </InstUISettingsProvider>
    )
  }

  handleError = (err: Error) => {
    this.setState({
      error: err.toString()
    })
  }

  renderContent() {
    const { code, themeKey, themes, styles } = this.props
    const theme = themes?.[themeKey!]?.resource || canvas
    const dir = (this.props.rtl ? DIRECTION.rtl : DIRECTION.ltr) as
      | 'rtl'
      | 'ltr'
    const compiledCode = compileAndRenderExample(code)
    const hasError = typeof compiledCode === 'string'

    return (
      <div css={hasError ? [styles?.previewError] : [styles?.preview]}>
        {hasError ? (
          <pre css={styles?.error}>{compiledCode}</pre>
        ) : (
          <InstUISettingsProvider theme={theme}>
            <TextDirectionContext.Provider value={dir}>
              {typeof compiledCode === 'string' ? null : (
                <div dir={dir}>{compiledCode}</div>
              )}
            </TextDirectionContext.Provider>
          </InstUISettingsProvider>
        )}
      </div>
    )
  }

  render() {
    return this.renderContent()
  }
}

class PreviewErrorBoundary extends Component<
  React.PropsWithChildren,
  { error: string | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error.toString() }
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child) && this.state.error) {
        return React.cloneElement(child, {
          ...child.props,
          // have to set this to empty string to prevent infinte render cycle
          code: '',
          error: this.state.error
        })
      }
      return child
    })

    return children
  }
}

export default Preview
export { Preview, PreviewErrorBoundary }
