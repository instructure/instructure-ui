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

import React, { ReactElement, ReactNode } from 'react'
import Markdown from 'marked-react'
import grayMatter from 'gray-matter'
import { v4 as uuid } from 'uuid'

import { InstUISettingsProvider } from '@instructure/emotion'
import { canvas } from '@instructure/ui-themes'

import { View } from '@instructure/ui-view'
import { Table } from '@instructure/ui-table'
import { Img } from '@instructure/ui-img'
import { SourceCodeEditor } from '@instructure/ui-source-code-editor'

import { Playground } from './Playground'
import { compileAndRenderExample } from './compileAndRenderExample'
import { Heading } from './Heading'
import { Link } from './Link'
import { trimIndent } from './trimIndent'

const headingVariants: Record<
  string,
  (key: string, children: ReactNode) => ReactElement
> = {
  h1: (key, children) => {
    return (
      <Heading
        id={(children as [string])?.[0]}
        key={key}
        level="h1"
        margin="0 0 large"
      >
        {children}
      </Heading>
    )
  },
  h2: (key, children) => (
    <Heading
      id={(children as [string])?.[0]}
      key={key}
      level="h1"
      as="h2"
      margin="x-large 0 large 0"
    >
      {children}
    </Heading>
  ),
  h3: (key, children) => (
    <Heading
      id={(children as [string])?.[0]}
      key={key}
      level="h2"
      as="h3"
      margin="large 0 medium 0"
    >
      {children}
    </Heading>
  ),
  h4: (key, children) => (
    <Heading
      id={(children as [string])?.[0]}
      key={key}
      level="h3"
      as="h4"
      margin="large 0 medium 0"
    >
      {children}
    </Heading>
  ),
  h5: (key, children) => (
    <Heading
      id={(children as [string])?.[0]}
      key={key}
      level="h4"
      as="h5"
      margin="large 0 small 0"
    >
      {children}
    </Heading>
  )
}

const getComponent = (componentType: string, data: Record<string, any>) => {
  const { code, title, readOnly = undefined } = data
  if (componentType === 'Playground') {
    return <Playground title={title} code={code} readOnly={readOnly} />
  }

  if (componentType === 'SourceCodeEditor') {
    return <SourceCodeEditor label={title} defaultValue={code} readOnly />
  }
  return undefined
}

/**
 * this needed here, because the ts-doc parser can't handle frontmatter inside the codeblock, so we can't
 * figure type out. All comment-based codeblocks need to postfix the language with '-code', '-embed' or '-example'
 */
const inferTypeAndLanguage = ({
  type,
  language
}: {
  type?: string
  language?: string
}) => {
  if (!type && language) {
    if (language.includes('-code')) {
      return { language: language.slice(0, -5), type: 'code' }
    }
    if (language.includes('-embed')) {
      return { language: language.slice(0, -6), type: 'embed' }
    }
    if (language.includes('-example')) {
      return { language: language.slice(0, -8), type: 'example' }
    }
  }
  return { language, type }
}

const renderer = (title?: string) => ({
  table: (table: ReactElement[]) => {
    const headCells = table?.[0]?.props?.children?.props?.children?.map(
      (el: ReactElement) => el?.props?.children?.[0]
    )
    const body = table?.[1]?.props?.children

    return (
      <Table key={uuid()} caption="Tabs for codePreview">
        <Table.Head>
          <Table.Row>
            {headCells?.map((headCell: string) => (
              <Table.ColHeader key={uuid()} id={headCell}>
                {headCell}
              </Table.ColHeader>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {body.map((tr: ReactElement) => (
            <Table.Row key={uuid()}>
              {tr?.props?.children?.map((td: ReactElement) => (
                <Table.Cell key={uuid()}>{td?.props?.children?.[0]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  },
  image: (href: string, title: string) => (
    <Img key={uuid()} src={href} alt={title} />
  ),
  list: (list: ReactElement[], ordered: boolean) => {
    if (list[0].props.children[0][0].type === 'code') {
      const code1 = list?.[0]?.props?.children?.[0]?.[0]?.props?.children
      const code2 = list?.[1]?.props?.children?.[0]?.[0]?.props?.children
      const matter = [
        grayMatter(trimIndent(code1)),
        grayMatter(trimIndent(code2))
      ]

      const data = {
        code: [matter[0].content, matter[1].content],
        language: 'js',
        title
      }
      return (
        <View key={uuid()} display="block" margin="medium none">
          {getComponent('Playground', data)}
        </View>
      )
    }
    return ordered ? <ol key={uuid()}>{list}</ol> : <ul key={uuid()}>{list}</ul>
  },
  code: (code: string, rawLanguage: string) => {
    if (rawLanguage) {
      const matter = grayMatter(trimIndent(code))
      const { type, language } = inferTypeAndLanguage({
        type: matter.data.type,
        language: rawLanguage
      })

      const data = {
        code: matter.content,
        language,
        title
      }

      if (type === 'code') {
        return (
          <View key={uuid()} display="block" margin="medium none">
            {getComponent('SourceCodeEditor', data)}
          </View>
        )
      }
      if (type === 'embed') {
        return (
          <InstUISettingsProvider key={uuid()} theme={canvas}>
            {compileAndRenderExample(matter.content)}
          </InstUISettingsProvider>
        )
      }
      if (type === 'example') {
        return (
          <View key={uuid()} display="block" margin="medium none">
            {getComponent('Playground', data)}
          </View>
        )
      }
    }
    return <code key={uuid()}>{code}</code>
  },
  heading: (text: string, level: number) =>
    headingVariants[`h${level}`]?.(uuid(), text),
  link: (href: string, text: string) => (
    <Link key={uuid()} href={href}>
      {text}
    </Link>
  )
})

function compileMarkdown(content: string, title?: string) {
  return <Markdown renderer={renderer(title)}>{content}</Markdown>
}

export default compileMarkdown
export { compileMarkdown }
