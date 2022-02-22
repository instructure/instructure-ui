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

import { Table } from '@instructure/ui-table'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'

import { compileMarkdown } from '../compileMarkdown'

import type { PropertiesProps } from './props'
import type { Prop } from '../Document/props'

@withStyle(generateStyle, null)
class Properties extends Component<PropertiesProps> {
  static defaultProps = {
    layout: 'small',
    hasTsProps: false
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  isTsProp(prop: Prop) {
    return this.props.hasTsProps && prop.tsType
  }

  unquote(string: string) {
    return string.replace(/^'|'$/g, '')
  }

  isTsGeneralFunction(string: string) {
    return string.includes('(...args: any[]) => any')
  }

  renderRows() {
    const { props } = this.props
    const propsToIgnore = ['styles', 'makeStyles', 'dir']

    return Object.keys(props)
      .filter((name) => {
        const description = props[name].description || ''

        // we need to manually pass through the dir prop of InstUISettingsProvider
        if (name === 'dir' && props.theme && props.instanceCounterMap) {
          return true
        }

        return (
          description.indexOf('@private') < 0 &&
          description.indexOf('@deprecated') < 0 &&
          !propsToIgnore.includes(name)
        )
      })
      .map((name, idx) => {
        const prop = props[name]

        return (
          <Table.Row key={idx}>
            <Table.Cell>
              <code>{name}</code>
            </Table.Cell>
            <Table.Cell>
              <code>
                {this.isTsProp(prop)
                  ? this.renderTSType(prop.tsType)
                  : // the fallback is needed for the components
                    // that have no @tsProps flag jet (not fully typed yet)
                    this.renderType(prop.type)}
              </code>
            </Table.Cell>
            <Table.Cell>{this.renderDefault(prop)}</Table.Cell>
            <Table.Cell>{this.renderDescription(prop)}</Table.Cell>
          </Table.Row>
        )
      })
  }

  renderTSType = (tsType: Prop['tsType']) => {
    const { name, elements, type, raw } = tsType
    let isEnum = true
    /*
    possible types:
      - signature
      - union
      - custom
      - boolean
      - array
      - ReactReactNode
    */
    // TODO: currently custom imported types are just showing the name of the can somehow link to these custom types
    switch (name) {
      case 'union':
        ;(elements || []).forEach((element) => {
          if (element.name !== 'literal') {
            isEnum = false
          }
        })
        return isEnum ? 'enum' : 'union'
      case 'signature':
        switch (type) {
          case 'function':
            return 'func'
          case 'object':
            return 'object'
          default:
            return raw
        }
      case 'boolean':
        return 'bool'
      case 'Array':
        return 'array'
      case 'ReactReactNode':
        return 'ReactNode'
      default:
        return name
    }
  }

  renderType(type: Prop['type']) {
    const { name } = type || {}
    switch (name) {
      case 'arrayOf':
        return `${type?.value?.name}[]`
      case 'instanceOf':
        return type.value
      default:
        return name
    }
  }

  renderDefault(prop: Prop) {
    const { styles } = this.props

    if (prop.required) {
      return <span css={styles?.required}>Required</span>
    } else if (prop.defaultValue) {
      let defaultValue: string | React.ReactNode = this.unquote(
        prop.defaultValue.value
      )
      if (defaultValue === '() => {}') {
        defaultValue = <span css={styles?.noWrap}>{defaultValue}</span>
      }
      return <code>{defaultValue}</code>
    } else {
      return ''
    }
  }

  renderDescription(prop: Prop) {
    const { description } = prop || {}
    const isTsProp = this.isTsProp(prop)

    return (
      <div>
        {description && compileMarkdown(description)}
        {/* This would be duplicate information in case we have proper TS types */}
        {!isTsProp ? this.renderEnum(prop) : null}
        {isTsProp ? this.renderTsUnion(prop) : this.renderUnion(prop)}
        {isTsProp && this.renderTsSignature(prop)}
        {isTsProp && this.renderTsArrayType(prop)}
      </div>
    )
  }

  renderEnum(prop: Prop) {
    const { styles } = this.props
    const { type } = prop

    if (!type || type.name !== 'enum') {
      return
    }

    if (!Array.isArray(type.value)) {
      return <span>{type.value}</span>
    }

    const values = type.value.map(
      ({ value }: { value: string }, idx: number) => (
        <li css={styles?.listItem} key={idx}>
          <code>{this.unquote(value)}</code>
        </li>
      )
    )

    return (
      <span>
        <span css={styles?.oneOf}>One of:</span>{' '}
        <ul css={styles?.list}>{values}</ul>
      </span>
    )
  }

  renderUnion(prop: Prop) {
    const { styles } = this.props
    const { type } = prop

    if (!type || type.name !== 'union') {
      return
    }
    if (!Array.isArray(type.value)) {
      return <span>{type.value}</span>
    }

    const values = type.value.map((value, idx) => (
      <li css={styles?.listItem} key={idx}>
        <code>{this.renderType(value)}</code>
      </li>
    ))
    return (
      <span>
        <span css={styles?.oneOf}>One of type:</span>{' '}
        <ul css={styles?.list}>{values}</ul>
      </span>
    )
  }

  renderTsUnion(prop: Prop) {
    const { styles } = this.props
    const { tsType } = prop

    if (!tsType || tsType.name !== 'union') {
      return
    }

    if (!Array.isArray(tsType.elements)) {
      return <span>{tsType.elements}</span>
    }

    // react-docgen doesn't recognise functions if they are in parentheses,
    // so we have to parse the raw data

    const elements = tsType?.raw
      ?.split('|')
      ?.filter((item: string) => item !== '')

    const values = elements?.map((rawValue: string, idx: number) => {
      let value = rawValue.trim()
      if (this.isTsGeneralFunction(value)) {
        value = 'function'
      }
      return (
        <li css={styles?.listItem} key={idx}>
          <code>{value ? this.unquote(value) : value}</code>
        </li>
      )
    })

    return (
      <span>
        <span css={styles?.oneOf}>One of:</span>{' '}
        <ul css={styles?.list}>{values}</ul>
      </span>
    )
  }

  renderTsSignature(prop: Prop) {
    const { styles } = this.props
    const { tsType } = prop

    if (!tsType || tsType.name !== 'signature') {
      return
    }

    const signature = tsType?.raw
      ?.split('\n')
      .map((value: string, idx: number) => (
        <li css={styles?.listSignatureItem} key={idx}>
          <code>{value}</code>
        </li>
      ))

    return (
      <span>
        <span css={styles?.oneOf}>Type of:</span>{' '}
        <ul css={styles?.list}>{signature}</ul>
      </span>
    )
  }

  renderTsArrayType(prop: Prop) {
    const { styles } = this.props
    const { tsType } = prop

    if (!tsType || tsType.name !== 'Array') {
      return
    }

    return (
      <span>
        <span css={styles?.oneOf}>Array of:</span>{' '}
        <ul css={styles?.list}>{tsType.raw}</ul>
      </span>
    )
  }

  render() {
    const { styles } = this.props
    const { layout } = this.props

    return (
      <div css={styles?.properties}>
        <Table
          caption="Component Properties"
          layout={layout === 'small' ? 'stacked' : 'auto'}
        >
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="Prop">Prop</Table.ColHeader>
              <Table.ColHeader id="Type">Type</Table.ColHeader>
              <Table.ColHeader id="Default">Default</Table.ColHeader>
              <Table.ColHeader id="Description">Description</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
      </div>
    )
  }
}

export default Properties
export { Properties }
