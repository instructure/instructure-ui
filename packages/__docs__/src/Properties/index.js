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

import { Table } from '@instructure/ui-table'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'

import { compileMarkdown } from '../compileMarkdown'

@withStyle(generateStyle, null)
class Properties extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    props: PropTypes.object.isRequired,
    layout: PropTypes.string,
    hasTsProps: PropTypes.bool
  }

  static defaultProps = {
    layout: 'small',
    hasTsProps: false
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  isTsProp(prop) {
    return this.props.hasTsProps && prop.tsType
  }

  unquote(string) {
    return string.replace(/^'|'$/g, '')
  }

  isTsGeneralFunction(string) {
    return string.includes('(...args: any[]) => any')
  }

  renderRows() {
    const { props } = this.props
    const propsToIgnore = ['styles', 'makeStyles', 'dir']

    return Object.keys(props)
      .filter((name) => {
        const description = props[name].description || ''

        return (
          description.indexOf('@private') < 0 &&
          description.indexOf('@deprecated') < 0 &&
          !propsToIgnore.includes(name)
        )
      })
      .map((name) => {
        const prop = props[name]

        return (
          <Table.Row key={name}>
            <Table.Cell>
              <code>{name}</code>
            </Table.Cell>
            <Table.Cell>
              <code>
                {this.isTsProp(prop)
                  ? this.renderTSType(prop.tsType)
                  : this.renderType(prop.type)}
              </code>
            </Table.Cell>
            <Table.Cell>{this.renderDefault(prop)}</Table.Cell>
            <Table.Cell>{this.renderDescription(prop)}</Table.Cell>
          </Table.Row>
        )
      })
  }

  renderTSType = (tsType) => {
    let { name, elements, type, raw } = tsType
    let isEnum = true
    /*
    possible types:
      - signature
      - union
      - custom
      - boolean
      - array
    */
    // TODO: currently custom imported types are just showing the name of the can somehow link to these custom types
    switch (name) {
      case 'union':
        elements.forEach((element) => {
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
      default:
        return name
    }
  }

  renderType(type) {
    const { name } = type || {}

    switch (name) {
      case 'arrayOf':
        return `${type.value.name}[]`
      case 'instanceOf':
        return type.value
      default:
        return name
    }
  }

  renderDefault(prop) {
    const { styles } = this.props

    if (prop.required) {
      return <span css={styles.required}>Required</span>
    } else if (prop.defaultValue) {
      let defaultValue = this.unquote(prop.defaultValue.value)
      if (defaultValue === '() => {}') {
        defaultValue = <span css={styles.noWrap}>{defaultValue}</span>
      }
      return <code>{defaultValue}</code>
    } else {
      return ''
    }
  }

  renderDescription(prop) {
    const { description, tsType } = prop || {}

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

  renderEnum(prop) {
    const { styles } = this.props
    const { type } = prop

    if (!type || type.name !== 'enum') {
      return
    }

    if (!Array.isArray(type.value)) {
      return <span>{type.value}</span>
    }

    const values = type.value.map(({ value }) => (
      <li css={styles.listItem} key={value}>
        <code>{this.unquote(value)}</code>
      </li>
    ))

    return (
      <span>
        <span css={styles.oneOf}>One of:</span>{' '}
        <ul css={styles.list}>{values}</ul>
      </span>
    )
  }

  renderUnion(prop) {
    const { styles } = this.props
    const { type } = prop

    if (!type || type.name !== 'union') {
      return
    }
    if (!Array.isArray(type.value)) {
      return <span>{type.value}</span>
    }
    const values = type.value.map((value) => (
      <li css={styles.listItem} key={value.name}>
        <code>{this.renderType(value)}</code>
      </li>
    ))
    return (
      <span>
        <span css={styles.oneOf}>One of type:</span>{' '}
        <ul css={styles.list}>{values}</ul>
      </span>
    )
  }

  renderTsUnion(prop) {
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
    const elements = tsType.raw.split('|')

    const values = elements.map((rawValue) => {
      let value = rawValue.trim()
      if (this.isTsGeneralFunction(value)) {
        value = 'function'
      }
      return (
        <li css={styles.listItem} key={value}>
          <code>{value ? this.unquote(value) : value}</code>
        </li>
      )
    })

    return (
      <span>
        <span css={styles.oneOf}>One of:</span>{' '}
        <ul css={styles.list}>{values}</ul>
      </span>
    )
  }

  renderTsSignature(prop) {
    const { styles } = this.props
    const { tsType } = prop

    if (!tsType || tsType.name !== 'signature') {
      return
    }

    return (
      <span>
        <span css={styles.oneOf}>Type of:</span>{' '}
        <ul css={styles.list}>{tsType.raw}</ul>
      </span>
    )
  }

  renderTsArrayType(prop) {
    const { styles } = this.props
    const { tsType } = prop

    if (!tsType || tsType.name !== 'Array') {
      return
    }

    return (
      <span>
        <span css={styles.oneOf}>Array of:</span>{' '}
        <ul css={styles.list}>{tsType.raw}</ul>
      </span>
    )
  }

  render() {
    const { styles } = this.props
    const { layout } = this.props

    return (
      <div css={styles.properties}>
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
