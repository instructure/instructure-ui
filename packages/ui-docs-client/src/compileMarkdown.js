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

import React, { createElement } from 'react'
import marked from 'marked'
import grayMatter from 'gray-matter'

import { View } from '@instructure/ui-view'
import { Table } from '@instructure/ui-table'
import { Img } from '@instructure/ui-img'
import { Text } from '@instructure/ui-text'
import { CodeEditor } from '@instructure/ui-code-editor'
import { ApplyTheme } from '@instructure/ui-themeable'

import { Playground } from './Playground'
import { Preview } from './Preview'
import { compileAndRenderExample } from './compileAndRenderExample'
import { Heading } from './Heading'
import { Link } from './Link'

import { trimIndent } from './trimIndent'

/* eslint-disable react/prop-types, react/display-name */
const elements = {
  h1: ({ id, children }) => (
    <Heading id={id} level="h1" margin="0 0 large">
      {children}
    </Heading>
  ),
  h2: ({ id, children }) => (
    <Heading id={id} level="h1" as="h2" margin="x-large 0 large 0">
      {children}
    </Heading>
  ),
  h3: ({ id, children }) => (
    <Heading id={id} level="h2" as="h3" margin="large 0 medium 0">
      {children}
    </Heading>
  ),
  h4: ({ id, children }) => (
    <Heading id={id} level="h3" as="h4" margin="large 0 medium 0">
      {children}
    </Heading>
  ),
  h5: ({ id, children }) => (
    <Heading id={id} level="h4" as="h5" margin="large 0 small 0" size>
      {children}
    </Heading>
  ),
  img: ({ src, alt }) => <Img src={src} alt={alt} />,
  a: ({ href, title, target, name, children }) => {
    if (href) {
      return (
        <Link href={href} title={title} target={target}>
          {children}
        </Link>
      )
    } else {
      return <a name={name}>{children}</a> // eslint-disable-line jsx-a11y/anchor-is-valid
    }
  }
}
/* eslint-enable react/prop-types, react/display-name */

const { renderer, tracker } = createRenderer()

function compileMarkdown(content, context, options = {}) {
  tracker.tree = []
  tracker.elements = {}
  tracker.toc = []
  tracker.nextElementId = 0
  tracker.context = context
  tracker.currentId = []

  marked(
    trimIndent(content),
    Object.assign({ renderer: renderer, smartypants: true }, options)
  )

  return tracker.tree
}

function createRenderer() {
  const tracker = {
    tree: null,
    elements: null,
    toc: null,
    nextElementId: null,
    context: {},
    currentId: []
  }
  const renderer = new marked.Renderer()

  function getTocPosition(toc, level) {
    let currentLevel = toc.children
    while (
      currentLevel.length &&
      currentLevel[currentLevel.length - 1].level !== level
    ) {
      currentLevel = currentLevel[currentLevel.length - 1].children
    }
    return currentLevel
  }

  function parseChildren(textContent) {
    const contentArray = textContent.split(/(\{\{.*?\}\})/)
    return contentArray.map((subStr, index) => {
      let child = subStr

      if (typeof child === 'string' && child.trim() === '') {
        return null
      }

      const elementIdMatch = subStr.match(/\{\{(.*)\}\}/)
      if (elementIdMatch) {
        tracker.tree.splice(
          tracker.tree.indexOf(tracker.elements[elementIdMatch[1]]),
          1
        )
        child = tracker.elements[elementIdMatch[1]]
      } else {
        child = createElement('span', {
          key: `${textContent}${index}`,
          dangerouslySetInnerHTML: {
            __html: child
          }
        })
      }

      return child
    })
  }

  function addElement(tag, props = {}, content) {
    const elementId = tracker.nextElementId++
    let children = null

    if (Array.isArray(content)) {
      children = content.map((text) => {
        return parseChildren(text)
      })
    } else if (content) {
      children = parseChildren(content)
    }

    const elementProps = {
      ...props,
      key: elementId,
      id: (props || {}).id || `${elementId}`
    }

    tracker.elements[elementId] = createElement(
      (elements && elements[tag]) || tag,
      elementProps,
      children
    )

    tracker.tree.push(tracker.elements[elementId])

    return `{{${elementId}}}`
  }

  function getComponent(type, data) {
    const { matter, language, title, readOnly } = data

    const componentType = type.toLowerCase()

    if (componentType === 'playground') {
      return (
        <Playground
          background={matter.data.background}
          render={matter.data.render}
          title={title}
          code={matter.content}
          language={language.split('_')[0]}
          readOnly={readOnly}
        />
      )
    } else if (componentType === 'codeeditor') {
      return (
        <CodeEditor
          label={title}
          value={matter.content}
          language={language}
          readOnly
        />
      )
    } else if (componentType === 'preview') {
      return (
        <Preview
          code={matter.content}
          language={language}
          background={data.background || 'checkerboard'}
          frameless={data.frameless}
        />
      )
    }
  }

  function formatId(rawId) {
    let id = rawId

    const modifications = [
      { regex: /\s/g, replacement: '-' }, // Convert any whitespace to hyphens
      { regex: /\//g, replacement: '-' } // We use this to parse the url so replace it with a hyphen
    ]

    modifications.forEach(({ regex, replacement }) => {
      id = id.replace(regex, replacement)
    })

    return id.toLowerCase()
  }

  renderer.code = function (code, language) {
    const elementId = tracker.nextElementId++

    function CodeComponent() {
      let el = null
      if (typeof language === 'string') {
        const matter = grayMatter(trimIndent(code))
        const readOnly = matter.data ? matter.data.readOnly : true
        const title =
          tracker.context.title || matter.data.title || 'Code example'
        const theme = (matter.data || {}).theme
        const data = { matter, readOnly, title, language }

        if (language.indexOf('_guidelines') >= 0 || matter.data.guidelines) {
          el = getComponent('Preview', {
            ...data,
            background: 'light',
            frameless: true
          })
        } else if (language.indexOf('_example') >= 0 || matter.data.example) {
          el = (
            <View display="block" margin="medium none">
              {getComponent('Playground', data)}
            </View>
          )
        } else if (language.indexOf('_embed') >= 0 || matter.data.embed) {
          compileAndRenderExample({
            code: matter.content,
            render: (_el) => {
              el = theme ? (
                <ApplyTheme theme={ApplyTheme.generateTheme(theme)}>
                  {_el}
                </ApplyTheme>
              ) : (
                _el
              )
            },
            shouldCallRender: matter.data.render,
            onError: (err) => {
              el = <Text color="danger">{err.toString()}</Text>
            }
          })
        } else {
          el = getComponent('CodeEditor', data)
        }
      } else {
        el = <code>{code}</code>
      }

      return { element: el, type: el.type.displayName }
    }

    const Element = () => CodeComponent().element
    tracker.elements[elementId] = createElement(Element, {
      key: elementId,
      elementType: CodeComponent().type
    })

    tracker.tree.push(tracker.elements[elementId])

    return `{{${elementId}}}`
  }

  renderer.html = function (html) {
    const elementId = tracker.nextElementId++

    tracker.tree.push(
      createElement('div', {
        key: elementId,
        dangerouslySetInnerHTML: {
          __html: html
        }
      })
    )
  }

  renderer.paragraph = function (text) {
    return addElement('p', null, text)
  }

  renderer.blockquote = function (text) {
    return addElement('blockquote', null, text)
  }

  renderer.link = function (href, title, text) {
    return addElement('a', { href, title }, text)
  }

  renderer.a = function (name, text) {
    return addElement('a', { name }, text)
  }

  renderer.br = function () {
    return addElement('br')
  }

  renderer.hr = function () {
    return addElement('hr')
  }

  renderer.strong = function (text) {
    return addElement('strong', null, text)
  }

  renderer.del = function (text) {
    return addElement('del', null, text)
  }

  renderer.em = function (text) {
    return addElement('em', null, text)
  }

  renderer.heading = function (text, level) {
    tracker.currentId = tracker.currentId.filter((entry) => entry.level < level)
    tracker.currentId.push({ text: formatId(text), level })

    const id = tracker.currentId.map((entry) => entry.text).join('-')
    const lastToc = tracker.toc[tracker.toc.length - 1]

    if (!lastToc || lastToc.level > level) {
      tracker.toc.push({
        id: id,
        title: text,
        level: level,
        children: []
      })
    } else {
      const tocPosition = getTocPosition(lastToc, level)

      tocPosition.push({
        id: id,
        title: text,
        level: level,
        children: []
      })
    }

    return addElement(
      `h${level}`,
      {
        id
      },
      text
    )
  }

  renderer.list = function (body, ordered) {
    return addElement(ordered ? 'ol' : 'ul', null, body)
  }

  renderer.listitem = function (text) {
    return addElement('li', null, text)
  }

  renderer.table = function (header, body) {
    // TODO: Figure out how we can add captions for a11y
    //
    // `marked`, the lib we're using to parse the markdown does not allow
    // specification of a caption for the table. Look into an alternate
    // lib for parsing or see if it's supported in a later version. In
    // the meantime, adding an empty string as a caption to avoid throwing
    // a docs error.
    return addElement(Table, { caption: '' }, [
      addElement(Table.Head, null, header),
      addElement(Table.Body, null, body)
    ])
  }

  renderer.thead = function (content) {
    return addElement(Table.Head, null, content)
  }

  renderer.tbody = function (content) {
    return addElement(Table.Body, null, content)
  }

  renderer.tablerow = function (content) {
    return addElement(Table.Row, null, content)
  }

  renderer.tablecell = function (content, flag) {
    const tag = flag.header ? Table.ColHeader : Table.Cell

    return addElement(tag, null, content)
  }

  renderer.codespan = function (text) {
    return addElement('code', null, text)
  }

  renderer.image = function (href, title, text) {
    return addElement('img', { src: href, alt: text })
  }

  return {
    renderer,
    tracker
  }
}

export default compileMarkdown
export { compileMarkdown }
