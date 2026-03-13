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

import { Component } from 'react'

import { Table } from '@instructure/ui-table'
import { withStyleForDocs as withStyle } from '../withStyleForDocs'

import generateStyle from './styles'
import { compileMarkdown } from '../compileMarkdown'

import type { PropertiesProps } from './props'
import type {
  ElementsType,
  ObjectSignatureType,
  PropDescriptor,
  SimpleType,
  TSFunctionSignatureType,
  TypeDescriptor
} from 'react-docgen'
import { Heading } from '@instructure/ui-heading'
import { View } from '@instructure/ui-view'

@withStyle(generateStyle, null)
class Properties extends Component<PropertiesProps> {
  static defaultProps = {
    layout: 'small'
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  unquote(string: string) {
    return string.replace(/^'|'$/g, '')
  }

  isTsGeneralFunction(string: string) {
    return string.includes('(...args: any[]) => any')
  }

  getPropsToRender() {
    const { props } = this.props
    const propsToIgnore = ['styles', 'makeStyles', 'dir']
    return Object.keys(props).filter((name) => {
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
  }

  renderRows(hasDefaultOrRequired: boolean) {
    return this.getPropsToRender()
      .sort((a, b) => a.localeCompare(b))
      .map((name, idx) => {
        const prop = this.props.props[name]
        return (
          <Table.Row key={idx}>
            <Table.Cell>
              <code>{name}</code>
            </Table.Cell>
            <Table.Cell>
              {prop.tsType && <code>{this.renderTSType(prop.tsType)}</code>}
            </Table.Cell>
            {hasDefaultOrRequired && (
              <Table.Cell>{this.renderDefault(prop)}</Table.Cell>
            )}
            <Table.Cell>{this.renderDescription(prop)}</Table.Cell>
          </Table.Row>
        )
      })
  }

  renderTSType = (tsType: TypeDescriptor<TSFunctionSignatureType>) => {
    const elements: TypeDescriptor<TSFunctionSignatureType>[] = (
      tsType as ElementsType<TSFunctionSignatureType>
    ).elements
    const type = (
      tsType as
        | ObjectSignatureType<TSFunctionSignatureType>
        | TSFunctionSignatureType
    ).type
    const raw = (tsType as SimpleType).raw
    let isEnum = true
    /*
    possible types:
      - signature
      - union
      - custom
      - boolean
      - array
      - ReactReactNode
      - ReactComponentElement
    */
    // TODO: currently custom imported types are just showing the name
    //  of the type. somehow link to these custom types
    switch (tsType.name) {
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
      case 'ReactComponentElement':
        return 'ComponentElement'
      default:
        return tsType.name
    }
  }

  renderDefault(prop: PropDescriptor) {
    const { styles } = this.props

    if (prop.required) {
      return <span css={styles?.required}>Required</span>
    } else if (prop.defaultValue) {
      let defaultValue: string | React.ReactNode = prop.defaultValue
        .value as string
      if (defaultValue === '() => {}') {
        defaultValue = <span css={styles?.noWrap}>{defaultValue}</span>
      }
      return <code>{defaultValue}</code>
    } else {
      return ''
    }
  }

  renderDescription(prop: PropDescriptor) {
    const { description } = prop || {}

    return (
      <div>
        {description && compileMarkdown(description)}
        {this.renderTsUnion(prop)}
        {this.renderTsSignature(prop)}
        {this.renderTsArrayType(prop)}
      </div>
    )
  }

  renderTsUnion(prop: PropDescriptor) {
    const { styles } = this.props
    const { tsType } = prop

    if (!tsType || tsType.name !== 'union') {
      return
    }
    const tsElems = tsType as ElementsType<TSFunctionSignatureType>
    if (!Array.isArray(tsElems.elements)) {
      return <span>{tsElems.elements}</span>
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

  renderTsSignature(prop: PropDescriptor) {
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

  renderTsArrayType(prop: PropDescriptor) {
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
    if (this.getPropsToRender().length == 0) {
      return null // e.g. Menu.Separator has no props
    }
    const { styles, layout } = this.props
    let hasDefaultOrRequired = false
    for (const i in this.props.props) {
      if (this.props.props[i].required || this.props.props[i].defaultValue) {
        hasDefaultOrRequired = true
        break
      }
    }
    return (
      <View margin="x-large 0" display="block">
        <Heading level="h2" as="h3" margin="0 0 small 0">
          Properties
        </Heading>
        <div css={styles?.properties}>
          <Table
            caption="Component Properties"
            layout={layout === 'small' ? 'stacked' : 'auto'}
          >
            <Table.Head>
              <Table.Row>
                <Table.ColHeader id="Prop">Prop</Table.ColHeader>
                <Table.ColHeader id="Type">Type</Table.ColHeader>
                {hasDefaultOrRequired && (
                  <Table.ColHeader id="Default">Default</Table.ColHeader>
                )}
                <Table.ColHeader id="Description">Description</Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>{this.renderRows(hasDefaultOrRequired)}</Table.Body>
          </Table>
        </div>
      </View>
    )
  }
}

export default Properties
export { Properties }
