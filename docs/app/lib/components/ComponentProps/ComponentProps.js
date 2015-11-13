import React, { Component, PropTypes } from 'react'
import marked from 'marked'

import styles from './ComponentProps.css'

export default class ComponentProps extends Component {
  static propTypes = {
    props: PropTypes.object.isRequired
  }

  unquote (string) {
    return string.replace(/^'|'$/g, '')
  }

  renderRows () {
    const rows = []
    const { props } = this.props

    for (const name in props) {
      const prop = props[name]
      rows.push(
        <tr key={name} className={styles.tableRow}>
          <td className={styles.cell}>
            <code>{name}</code>
          </td>
          <td className={styles.cell}>
            <code>{this.renderType(prop.type)}</code>
          </td>
          <td className={styles.cell}>
            {this.renderDefault(prop)}
          </td>
          <td className={styles.cell + ' ' + styles.cellDesc}>
            {this.renderDescription(prop)}
          </td>
        </tr>
      )
    }
    return rows
  }

  renderType (type) {
    const { name } = type

    switch (name) {
      case 'arrayOf':
        return `${type.value.name}[]`
      case 'instanceOf':
        return type.value
    }
    return name
  }

  renderDefault (prop) {
    if (prop.required) {
      return <span className={styles.required}>Required</span>
    } else if (prop.defaultValue) {
      return (
        <code>{this.unquote(prop.defaultValue.value)}</code>
      )
    } else {
      return ''
    }
  }

  renderDescription (prop) {
    const { description } = prop

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: marked(description)}} />
        {this.renderEnum(prop)}
        {this.renderUnion(prop)}
      </div>
    )
  }

  renderEnum (prop) {
    if (prop.type.name !== 'enum') {
      return
    }
    if (!Array.isArray(prop.type.value)) {
      return <span>{prop.type.value}</span>
    }
    const values = prop.type.value.map(({ value }) => (
      <li className={styles.listItem} key={value}>
        <code>{this.unquote(value)}</code>
      </li>
    ))
    return (
      <span><span className={styles.oneOf}>One of:</span> <ul className={styles.list}>{values}</ul></span>
    )
  }

  renderUnion (prop) {
    if (prop.type.name !== 'union') {
      return
    }
    if (!Array.isArray(prop.type.value)) {
      return <span>{prop.type.value}</span>
    }
    const values = prop.type.value.map((value) => (
      <li className={styles.listItem} key={value.name}>
        <code>{this.renderType(value)}</code>
      </li>
    ))
    return (
      <span><span className={styles.oneOf}>One of type:</span> <ul className={styles.list}>{values}</ul></span>
    )
  }

  render () {
    return (
      <div className={styles.root}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th className={styles.cellHeading} scope="col">Prop</th>
              <th className={styles.cellHeading} scope="col">Type</th>
              <th className={styles.cellHeading} scope="col">Default</th>
              <th className={styles.cellHeading + ' ' + styles.cellDesc} scope="col">Description</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}
