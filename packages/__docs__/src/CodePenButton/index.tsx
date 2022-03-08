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
    // 2 choices:
    // 1: Add every import manually to every example
    // 2: Just add render() if needed to every example and do the following:
    //const code = this.props.code
    // write something that parses this code, e.g. via regexpes and inserts the imports
    // for example it looks for "<[Capital letter]" like <Avatar
    // lets say that it found Avatar and Alert, then it constructs a string like
    // const result = "import {Avatar, Alert} from '@instructure/ui'"
    // Search in "code" for the exact string "mirrorHorizontalPlacement", if found
    // code = "import { mirrorHorizontalPlacement } from '@instructure/ui-position'" + code
    // add @instructure/ui-position to the package.json dependencies
    //code = result + code
    // For step 1 handle the following:
    // Add React, ReactDOM imports
    // Add component and icon imports
    // Add imports for mirrorHorizontalPlacement, DateTime, moment, debounce
    // And later we'll deal with the image imports and the preview bug
    const importReact = `
    import React from "react"
    import ReactDOM from "react-dom"
    import moment from 'moment'
    import {avatarSquare, avatarPortrait, lorem} from "./samplemedia"
    import {placeholderImage} from "./samplemedia"
    import iconExample from "!svg-inline-loader!./heart_lg.svg"
    `
    const pattern = /<[A-Z]\w+|Icon\w+/gm
    const neededClasses = this.props.code
      .match(pattern)
      ?.map((className) => className.replace(/</gm, '').trim())
    if (this.props.code.includes('Calendar')) {
      neededClasses?.push('Calendar')
    }
    const uniqueClass = [...new Set(neededClasses)]
    const { render } = this.props
    const externalElements = this.props.code
      .match(/class.\w+|function.\w+|const.\w+/gm)
      ?.map((className) =>
        className.replace(/class|function|const/gm, '').trim()
      )
    const asd = uniqueClass?.filter(
      (className) => !externalElements?.includes(className)
    )
    const importClasses = `import {${asd.join(', ')}} from "@instructure/ui"\n`
    const code = render ? `render(${this.props.code})` : this.props.code
    const renderStatement = `const render = (el) => { ReactDOM.render(el, document.getElementById('app')) }\n`
    const data = {
      title: this.props.title,
      js: importReact + importClasses + renderStatement + code,
      private: true,
      editors: '001',
      html: '<div id="app"></div><div id="flash-messages"></div><div id="nav"></div>',
      css_prefix: 'autoprefixer',
      js_pre_processor: 'babel',
      ...this.props.options
    }
    //    const JSONData = JSON.stringify(data)
    //      .replace(/"/g, '&quot;')
    //      .replace(/'/g, '&apos;')
    //    const html = '<div id="root"></div>'
    const dependencies = JSON.stringify({
      dependencies: {
        '@instructure/debounce': '^8',
        '@instructure/ui': '^8',
        '@instructure/ui-icons': '^8',
        'lorem-ipsum': '^1.0.0',
        react: '17.0.2',
        'react-dom': '17.0.2',
        'react-scripts': '4.0.0',
        moment: '^2.23.0',
        'svg-inline-loader': '0.8.2'
      }
    }).replace(/'/g, '&apos;')
    const IconSVG = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='{{w}}' height='{{h}}' viewBox='0 0 {{w}} {{h}}'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><rect x='0' y='0' fill='#F8F8F8' width='100%' height='100%'/><text x='10' y='20' fill='#ccc' style="font: 14px sans-serif;">FPO: {{w}} x {{h}}</text><use xlink:href='#a' width='20%' x='40%'/></svg>
    `
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
        },
        'samplemedia.js': {
          content: `import loremgen from "lorem-ipsum"
          const IconSVG = \`${IconSVG}\`
          export const avatarSquare = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarSquare.jpg"
          export const avatarPortrait = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarPortrait.jpg"
          export const lorem ={
            sentence() {
              return loremgen({
                count: 1,
                units: 'sentences'
              })
            },
            paragraph() {
              return loremgen({
                count: 1,
                units: 'paragraphs'
              })
            },
            paragraphs(count) {
              return loremgen({
                count: count || Math.floor(Math.random() * 10),
                units: 'paragraphs'
              })
            }
          }
          export function placeholderImage(width = 512, height = 512) {
            // We need to base64 encode this because otherwise FF will add extra escape chars
            const dataUri = btoa(
              IconSVG.replace(/{{w}}/g, width).replace(/{{h}}/g, height).trim()
            )
            return \`data:image/svg+xml;base64,\${dataUri}\`
          }
          `,
          isBinary: false
        },
        'placeholder-image.js': {
          content:
            'https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/placeholder-image.js',
          isBinary: true
        },
        'placeholder.svg': {
          content:
            'https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/placeholder.svg',
          isBinary: true
        },
        'heart_lg.svg': {
          content:
            'https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/heart_lg.svg',
          isBinary: true
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
