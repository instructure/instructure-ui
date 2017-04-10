import React, { PropTypes, Children, Component } from 'react'
import themeable from '../../../themeable'
import { omitProps } from '../../../util/passthroughProps'
import CustomPropTypes from '../../../util/CustomPropTypes'
import createChainedFunction from '../../../util/createChainedFunction'
import safeCloneElement from '../../../util/safeCloneElement'
import matchComponentTypes from '../../../util/matchComponentTypes'
import hasVisibleContent from '../../../util/hasVisibleContent'

import shortid from 'shortid'

import MenuItem from '../MenuItem'
import MenuItemSeparator from '../MenuItemSeparator'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
class MenuItemGroup extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    allowMultiple: PropTypes.bool,
    /**
    * children of type `MenuItem`, `MenuItemSeparator`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemSeparator]),
    /**
    * an array of the values (or indeces by default) for the selected items
    */
    selected: CustomPropTypes.controllable(PropTypes.array, 'onSelect', 'defaultSelected'),
    /**
    * an array of the values (or indeces by default) for the selected items on initial render
    */
    defaultSelected: PropTypes.array,
    /**
    * call this function when a menu item is selected
    */
    onSelect: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
    * the id of the element that the menu items will act upon
    */
    controls: PropTypes.string,
    /**
    * returns a reference to the `MenuItem`
    */
    itemRef: PropTypes.func,
    disabled: PropTypes.bool,
    /**
    * should the group appear in the tab order (the first item will have a tabIndex of 0)
    */
    isTabbable: PropTypes.bool
  }

  static defaultProps = {
    isTabbable: false,
    allowMultiple: false,
    defaultSelected: [],
    itemRef: function (item) {},
    onSelect: function (e, selected) {}
  }

  constructor (props) {
    super()

    if (props.selected === undefined) {
      this.state = {
        selected: this.selectedFromChildren(props.children, props.allowMultiple) || props.defaultSelected
      }
    }

    this._labelId = 'MenuItemGroup__' + shortid.generate()
  }

  handleSelect = (e, value, selected) => {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    const newSelected = this.props.allowMultiple ? this.selected : []
    const location = newSelected.indexOf(value)

    if (selected && location < 0) {
      newSelected.push(value)
    } else if (!selected && location !== -1) {
      newSelected.splice(location, 1)
    }

    if (this.props.selected === undefined) {
      this.setState({ selected: newSelected })
    }

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(e, newSelected)
    }
  }

  selectedFromChildren (children, allowMultiple) {
    const selected = []

    const items = Children.toArray(children).filter((child) => {
      return (matchComponentTypes(child, [MenuItem]))
    })

    items.forEach((item, index) => {
      if ((selected.length === 0 || allowMultiple) &&
        (item.props.selected || item.props.defaultSelected)) {
        selected.push(item.props.value || index)
      }
    })

    return selected.length > 0 ? selected : null
  }

  get selected () {
    if (this.props.selected === undefined && this.state.selected === undefined) {
      return []
    } else {
      return (this.props.selected === undefined) ? [...this.state.selected] : [...this.props.selected]
    }
  }

  renderLabel () {
    const { label } = this.props

    return hasVisibleContent(label) ? (
      <span className={styles.label}>{label}</span>
    ) : label
  }

  renderChildren () {
    const {
      children,
      disabled,
      controls,
      allowMultiple,
      isTabbable
    } = this.props

    let index = -1

    return Children.map(children, (child) => {
      if (matchComponentTypes(child, [MenuItem])) {
        ++index
        const value = child.props.value || index
        return safeCloneElement(child, {
          tabIndex: (isTabbable && index === 0) ? 0 : -1,
          controls,
          ...child.props,
          value,
          type: allowMultiple ? 'checkbox' : 'radio',
          ref: this.props.itemRef,
          disabled: (disabled || child.props.disabled),
          selected: this.selected.indexOf(value) > -1,
          onSelect: createChainedFunction(child.props.onSelect, this.handleSelect)
        })
      } else {
        return child
      }
    })
  }

  render () {
    const props = omitProps(this.props, MenuItemGroup.propTypes)
    return (
      <span
        {...props}
        className={styles.root}
        role="presentation"
      >
        <span id={this._labelId}>{this.renderLabel()}</span>
        <span
          role="group"
          aria-disabled={this.props.disabled ? 'true' : null}
          aria-labelledby={this._labelId}
        >
          {this.renderChildren()}
        </span>
      </span>
    )
  }
}

export default MenuItemGroup
