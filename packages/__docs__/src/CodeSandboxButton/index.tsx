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
import type { CodeSandboxButtonProps } from './props'

class CodeSandboxButton extends Component<CodeSandboxButtonProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    options: {},
    render: true
  }
  render() {
    //TODO: we should not import everything everytime
    //somehow conditionally import needed modules
    const importStatements = `import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import moment from 'moment'
import {avatarSquare, avatarPortrait, lorem} from "./samplemedia"
import {placeholderImage} from "./samplemedia"
import iconExample from "!svg-inline-loader!./heart_lg.svg"
import 'moment/min/locales'
`
    const reactComponentPattern = /<[A-Z]\w+|Icon\w+/gm
    const neededClasses = this.props.code
      .match(reactComponentPattern)
      ?.map((className) => className.replace(/</gm, '').trim())

    if (this.props.code.includes('Calendar')) {
      neededClasses?.push('Calendar')
    }

    const uniqueClasses = [...new Set(neededClasses)]

    const externalElements = this.props.code
      .match(/class.\w+|function.\w+|const.\w+/gm)
      ?.map((className) =>
        className.replace(/class|function|const/gm, '').trim()
      )
    const allNeededClasses = uniqueClasses?.filter(
      (className) => !externalElements?.includes(className)
    )
    const importClasses = `import {${allNeededClasses.join(
      ', '
    )}} from "@instructure/ui"\n\n`

    const codeLines = this.props.code.split('\n')
    const shouldRender = !codeLines[codeLines.length - 1].includes('render(<')
    const codeBlock = shouldRender
      ? `render(${this.props.code})`
      : this.props.code
    const renderStatement = `const render = (el) => { ReactDOM.render(el, document.getElementById('app')) }\n`
    const codeSandboxData = {
      title: this.props.title,
      js: importStatements + importClasses + renderStatement + codeBlock,
      private: true,
      editors: '001',
      html: `<div id="app"></div>
<div id="flash-messages"></div>
<div id="nav"></div>`,
      css_prefix: 'autoprefixer',
      js_pre_processor: 'babel',
      ...this.props.options
    }

    const dependencies = JSON.stringify(
      {
        dependencies: {
          '@instructure/debounce': '^8',
          '@instructure/ui': '^8',
          '@instructure/ui-icons': '^8',
          'lorem-ipsum': '^2.0.8',
          react: '18.2.0',
          'react-dom': '18.2.0',
          'react-scripts': '5.0.1',
          moment: '^2.23.0',
          'svg-inline-loader': '0.8.2'
        }
      },
      null,
      2
    ).replace(/'/g, '&apos;')

    const IconSVG = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='{{w}}' height='{{h}}' viewBox='0 0 {{w}} {{h}}'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><rect x='0' y='0' fill='#F8F8F8' width='100%' height='100%'/><text x='10' y='20' fill='#ccc' style="font: 14px sans-serif;">FPO: {{w}} x {{h}}</text><use xlink:href='#a' width='20%' x='40%'/></svg>`
    const parameters = getParameters({
      files: {
        'package.json': {
          content: dependencies,
          isBinary: true
        },
        'index.js': {
          content: codeSandboxData.js,
          isBinary: false
        },
        'index.html': {
          content: codeSandboxData.html,
          isBinary: false
        },
        'samplemedia.js': {
          content: `
import { LoremIpsum } from 'lorem-ipsum'
const IconSVG = \`${IconSVG}\`
export const avatarSquare = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarSquare.jpg"
export const avatarPortrait = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarPortrait.jpg"

const loremInstance = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})
export const lorem ={
  sentence: () => loremInstance.generateWords(),
  paragraph: () => loremInstance.generateSentences(5),
  paragraphs: (count) =>
  loremInstance.generateSentences(count || Math.floor(Math.random() * 10))
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
        <Tooltip renderTip="Edit in CodeSandbox" placement="bottom">
          <IconButton
            type="submit"
            size="small"
            screenReaderLabel={`Edit ${this.props.title} in CodeSandbox`}
            withBorder={false}
            withBackground={false}
            renderIcon={
              <SVGIcon viewBox="0 0 256 296" title="CodeSandbox">
                <path d="M115.498 261.088v-106.61L23.814 101.73v60.773L65.81 186.85v45.7l49.688 28.54Zm23.814.627l50.605-29.151V185.78l42.269-24.495v-60.011l-92.874 53.621v106.82Zm80.66-180.887l-48.817-28.289l-42.863 24.872l-43.188-24.897l-49.252 28.667l91.914 52.882l92.206-53.235ZM0 222.212V74.495L127.987 0L256 74.182v147.797l-128.016 73.744L0 222.212Z" />
              </SVGIcon>
            }
          />
        </Tooltip>
      </form>
    )
  }
}

export default CodeSandboxButton
export { CodeSandboxButton }
