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
import { getParameters } from 'codesandbox/lib/api/define'

import { Tooltip } from '@instructure/ui-tooltip'
import { SVGIcon } from '@instructure/ui-svg-images'

import { IconButton } from '@instructure/ui-buttons'
import { propTypes, allowedProps } from './props'
import type { CodePenButtonProps } from './props'
class CodePenButton extends Component<CodePenButtonProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    options: {},
    render: true
  }

  render() {
    const { render } = this.props
    const code = render ? `render(${this.props.code})` : this.props.code

    const data = {
      title: this.props.title,
      js: `const render = (el) => { ReactDOM.render(el, document.getElementById('app')) }\n\n${code}`,
      private: true,
      editors: '001',
      html: '<div id="app"></div><div id="flash-messages"></div><div id="nav"></div>',
      css_prefix: 'autoprefixer',
      js_pre_processor: 'babel',
      ...this.props.options
    }
    const JSONData = JSON.stringify(data)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
    const html = '<div id="root"></div>'
    const dependencies = JSON.stringify({
      dependencies: {
        '@instructure/debounce': '^8',
        '@instructure/ui': '^8',
        '@instructure/ui-icons': '^8',
        'lorem-ipsum': '2.0.4',
        react: '17.0.2',
        'react-dom': '17.0.2',
        'react-scripts': '4.0.0'
      }
    }).replace(/'/g, '&apos;')
    const parameters = getParameters({
      files: {
        'package.json': {
          content: dependencies,
          isBinary: true
        },
        'index.js': {
          content: data.js,
          isBinary: false
        },
        'index.html': {
          content: data.html,
          isBinary: false
        }
      }
    })
    return (
      <form
        action="https://codesandbox.io/api/v1/sandboxes/define"
        method="POST"
        target="_blank"
      >
        <input type="hidden" name="parameters" value={parameters} />
        <Tooltip renderTip="Edit in Codepen" placement="bottom">
          <IconButton
            type="submit"
            size="small"
            screenReaderLabel={`Edit ${this.props.title} in Codepen`}
            withBorder={false}
            withBackground={false}
            renderIcon={
              <SVGIcon viewBox="0 0 1792 1792" title="Codepen">
                <path
                  d="M216 1169l603 402v-359l-334-223zm-62-144l193-129-193-129v258zm819 546l603-402-269-180-334
                  223v359zm-77-493l272-182-272-182-272 182zm-411-275l334-223v-359l-603 402zm960 93l193
                  129v-258zm-138-93l269-180-603-402v359zm485-180v546q0 41-34 64l-819 546q-21 13-43
                  13t-43-13l-819-546q-34-23-34-64v-546q0-41 34-64l819-546q21-13 43-13t43 13l819 546q34 23 34 64z"
                />
              </SVGIcon>
            }
          />
        </Tooltip>
      </form>
    )
  }
}

export default CodePenButton
export { CodePenButton }
