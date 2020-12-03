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

import { themeable } from '@instructure/ui-themeable'
import { Table } from '@instructure/ui-table'

import { compileMarkdown } from '../compileMarkdown'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class Properties extends Component {
  static propTypes = {
    props: PropTypes.object.isRequired,
    layout: PropTypes.string
  }

  static defaultProps = {
    layout: 'small'
  }

  unquote(string) {
    return string.replace(/^'|'$/g, '')
  }

  renderRows() {
    const { props } = this.props

    return Object.keys(props)
      .filter((name) => {
        const description = props[name].description || ''
        return (
          description.indexOf('@private') < 0 &&
          description.indexOf('@deprecated') < 0
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
              <code>{this.renderType(prop.type)}</code>
            </Table.Cell>
            <Table.Cell>{this.renderDefault(prop)}</Table.Cell>
            <Table.Cell>{this.renderDescription(prop)}</Table.Cell>
          </Table.Row>
        )
      })
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
    if (prop.required) {
      return <span className={styles.required}>Required</span>
    } else if (prop.defaultValue) {
      return <code>{this.unquote(prop.defaultValue.value)}</code>
    } else {
      return ''
    }
  }

  renderDescription(prop) {
    const { description } = prop || {}
    return (
      <div>
        {description && compileMarkdown(description)}
        {this.renderEnum(prop)}
        {this.renderUnion(prop)}
      </div>
    )
  }

  renderEnum(prop) {
    const { type } = prop

    if (!type || type.name !== 'enum') {
      return
    }

    if (!Array.isArray(type.value)) {
      return <span>{type.value}</span>
    }

    const values = type.value.map(({ value }) => (
      <li className={styles.listItem} key={value}>
        <code>{this.unquote(value)}</code>
      </li>
    ))

    return (
      <span>
        <span className={styles.oneOf}>One of:</span>{' '}
        <ul className={styles.list}>{values}</ul>
      </span>
    )
  }

  renderUnion(prop) {
    const { type } = prop

    if (!type || type.name !== 'union') {
      return
    }
    if (!Array.isArray(type.value)) {
      return <span>{type.value}</span>
    }
    const values = type.value.map((value) => (
      <li className={styles.listItem} key={value.name}>
        <code>{this.renderType(value)}</code>
      </li>
    ))
    return (
      <span>
        <span className={styles.oneOf}>One of type:</span>{' '}
        <ul className={styles.list}>{values}</ul>
      </span>
    )
  }

  render() {
    const { layout } = this.props

    return (
      <div className={styles.root}>
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
