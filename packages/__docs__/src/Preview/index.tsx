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
    background: 'checkerboard'
  }

  constructor(props: PreviewProps) {
    super(props)

    this.state = {
      error: null,
      elToRender: null
    }
  }

  componentDidMount() {
    if (this.props.code) {
      this.executeCode(this.props.code)
    }
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: PreviewProps) {
    if (
      this.props.code !== prevProps.code ||
      this.props.rtl !== prevProps.rtl
    ) {
      this.executeCode(this.props.code)
    }
    this.props.makeStyles?.()
  }

  executeCode(code: string) {
    const render = (el: React.ReactElement) => {
      const { themeKey, themes } = this.props
      const theme = themes?.[themeKey!]?.resource || canvas
      const dir = (this.props.rtl ? DIRECTION.rtl : DIRECTION.ltr) as
        | 'rtl'
        | 'ltr'
      const elToRender: React.ReactElement = (
        <InstUISettingsProvider theme={theme}>
          <TextDirectionContext.Provider value={dir}>
            <div dir={dir}>{el}</div>
          </TextDirectionContext.Provider>
        </InstUISettingsProvider>
      )

      this.setState({ elToRender })
    }

    compileAndRenderExample({
      code,
      render,
      shouldCallRender: this.props.render,
      onError: this.handleError
    })
  }

  handleError = (err: Error) => {
    this.setState({
      error: err.toString()
    })
  }

  renderContent() {
    const { elToRender } = this.state

    // Add div around content so parent's `display: flex` doesn't mess up component styles
    const content = <div>{elToRender}</div>

    if (this.props.background === 'none') {
      return <div>{content}</div>
    } else {
      return content
    }
  }

  render() {
    const { styles } = this.props
    const { error } = this.state

    return (
      <div css={error ? [styles?.previewError] : [styles?.preview]}>
        {this.renderContent()}
        {error && <pre css={styles?.error}>{error}</pre>}
      </div>
    )
  }
}

export default Preview
export { Preview }
