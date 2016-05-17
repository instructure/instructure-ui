import React, { Component, PropTypes, Children } from 'react'

import Checkbox from '../Checkbox'
import { RadioInput } from '../RadioInputGroup'
import safeCloneElement from '../../util/safeCloneElement'

import styles from './MenuItem.css'

export default class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  getRoleForType (type) {
    if (type === Checkbox) {
      return 'menuitemcheckbox'
    } else if (type === RadioInput) {
      return 'menuitemradio'
    } else {
      return 'menuitem'
    }
  }

  focus () {
    if (this._item && this._item.focus) {
      this._item.focus()
    }
  }

  isFocused () {
    return this._item.isFocused()
  }

  render () {
    const {
      children,
      ...props
    } = this.props

    const child = Children.only(children)

    const menuItem = safeCloneElement(child, {
      ...props,
      ...child.props,
      ref: (c) => {
        this._item = c
      },
      variant: 'menuitem',
      role: this.getRoleForType(child.type),
      tabIndex: -1
    })

    return (
      <li className={styles.root}>
        {menuItem}
      </li>
    )
  }
}
