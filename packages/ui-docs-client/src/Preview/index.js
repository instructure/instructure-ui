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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import { transform } from '@babel/standalone'

import { ApplyTextDirection } from '@instructure/ui-i18n'
import { themeable, ApplyTheme } from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

let _createElement

@themeable(theme, styles)
class Preview extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    render: PropTypes.bool,
    language: PropTypes.string.isRequired,
    fullscreen: PropTypes.bool,
    frameless: PropTypes.bool,
    inverse: PropTypes.bool,
    rtl: PropTypes.bool,
    background: PropTypes.oneOf(['checkerboard', 'checkerboard-inverse', 'inverse', 'light', 'none'])
  }

  static defaultProps = {
    render: true,
    fullscreen: false,
    frameless: false,
    inverse: false,
    rtl: false,
    background: 'checkerboard'
  }

  static contextTypes = {
    themes: PropTypes.object,
    themeKey: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      error: null
    }
  }

  componentDidMount () {
    if (this.props.code) {
      this.executeCode(this.props.code)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.code !== prevProps.code || this.props.rtl !== prevProps.rtl) {
      this.executeCode(this.props.code)
    }
  }

  componentWillUnmount () {
    if (this._mountNode) {
      ReactDOM.unmountComponentAtNode(this._mountNode)
    }

    if (_createElement) {
      React.createElement = _createElement
    }
  }

  compileCode (code) {
    return transform(code, {
      presets: [
        'es2015',
        ['stage-1', { decoratorsLegacy: true }],
        'react'
      ],
      plugins: ['proposal-object-rest-spread']
    }).code
  }

  executeCode (code) {
    const mountNode = this._mountNode

    ReactDOM.unmountComponentAtNode(mountNode)

    this.setState({ error: null })

    if (!code) {
      return
    }

    const render = (el) => {
      const { themeKey, themes } = this.context

      let elToRender = (
        <ApplyTextDirection
          dir={this.props.rtl ? ApplyTextDirection.DIRECTION.rtl : ApplyTextDirection.DIRECTION.ltr}
          as="div"
        >
          {el}
        </ApplyTextDirection>
      )

      if (themeKey && themes[themeKey]) {
        elToRender = (
          <ApplyTheme
            themeKey={themeKey}
            theme={theme}
            immutable={themes[themeKey].resource.immutable}
          >
            {elToRender}
          </ApplyTheme>
        )
      }

      ReactDOM.render(elToRender, mountNode)
    }

    try {
      const compiledCode = this.compileCode(code)
      const el = eval(compiledCode) // eslint-disable-line no-eval

      if (this.props.render !== false) {
        render(el)
      }
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError (err) {
    ReactDOM.unmountComponentAtNode(this._mountNode)
    this.setState({
      error: err.toString()
    })
  }

  renderContent () {
    // Add div around content so parent's `display: flex` doesn't mess up component styles
    const content = <div ref={(el) => { this._mountNode = el }} />

    if (this.props.background === 'none') {
      return <div>{content}</div>
    } else {
      return content
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles.error]: this.state.error,
      [styles.fullscreen]: this.props.fullscreen,
      [styles.frameless]: this.props.frameless,
      [styles[`background--${this.props.background}`]]: true
    }

    return (
      <div className={classnames(classes)}>
        {this.renderContent()}
        {this.state.error && <pre className={styles.error}>{this.state.error}</pre>}
      </div>
    )
  }
}

export default Preview
export { Preview }
