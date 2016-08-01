import React, { PropTypes, Component, cloneElement, createElement } from 'react'
import classnames from 'classnames'
import shortid from 'shortid'
import themeable from '../../util/themeable'
import keycode from 'keycode'

import CustomPropTypes from '../../util/CustomPropTypes'
import Tab from './Tab'
import TabPanel from './TabPanel'

import styles from './TabList.css'
import themeVariables from './theme/TabList'
import themeStyles from './theme/TabList.css'

/**

  Accessible tabbed content component. You can use the TAB key to focus the component and
  arrow keys to navigate between panels of content. The default display is `simple` tabs:

  ```jsx_example
  <TabList defaultSelectedIndex={2}>
    <TabPanel title="First Tab">
      Hello World
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      {lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Third Tab">
      {lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Fourth Tab">
      {lorem.paragraphs()}
    </TabPanel>
  </TabList>
  ```

  Minimal style tabs

  ```jsx_example
  <TabList style="minimal">
    <TabPanel title="First Tab">
      {lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      {lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Third Tab">
      {lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Fourth Tab">
      {lorem.paragraphs()}
    </TabPanel>
  </TabList>
  ```

  The TabList can also display `accordion` style. This can be useful to make a component responsive to
  the width of its container (e.g., display as tabs when there is space, but then switch to accordion when
  the container is too small for all of the tabs to fit).

  ```jsx_example
  <TabList defaultSelectedIndex={2} style="accordion">
    <TabPanel title="First Tab">
      Hello World
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      {lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Third Tab">
      {lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Fourth Tab">
      {lorem.paragraphs()}
    </TabPanel>
  </TabList>
  ```
**/

@themeable(themeVariables, themeStyles)
export default class TabList extends Component {
  static propTypes = {
    /**
    * children of type `TabPanel`
    */
    children: CustomPropTypes.validChildren([TabPanel]),
    style: PropTypes.oneOf(['simple', 'accordion', 'minimal']),
    /**
    * the index (zero based) of the panel that should be selected on initial render
    */
    defaultSelectedIndex: PropTypes.number,
    /**
    * the index (zero based) of the panel that should be selected (should be accompanied by `onChange`)
    */
    selectedIndex: CustomPropTypes.controllable(PropTypes.number, 'onChange', 'defaultSelectedIndex'),
    /**
    * Call this function when the selected tab changes. When used with `selectedIndex`,
    * the component will not control its own state.
    */
    onChange: PropTypes.func,
    /**
    * the selected tab should be focused
    */
    focus: PropTypes.bool
  };

  static defaultProps = {
    style: 'simple',
    focus: false,
    defaultSelectedIndex: 0
  };

  constructor (props) {
    super()

    this.state = {
      focus: props.focus
    }

    if (props.selectedIndex === undefined) {
      this.state.selectedIndex = props.defaultSelectedIndex
    }
  }

  componentWillReceiveProps (nextProps) {
    const { focus, selectedIndex } = this.props
    const { focus: nextFocus, selectedIndex: nextSelectedIndex } = nextProps

    if (nextFocus !== focus || nextSelectedIndex !== selectedIndex) {
      this.setState({ focus: nextFocus })
    }
  }

  handleClick = (tabIndex, e) => {
    const tab = this.getTab(tabIndex)

    if (!tab.props.disabled) {
      this.setSelected(tabIndex)
    }
  };

  handleEnter = (tabIndex, e) => {
    if (e.keyCode !== keycode.codes.enter && e.keyCode !== keycode.codes.return) {
      return
    }

    const tab = this.getTab(tabIndex)

    if (!tab.props.disabled) {
      this.setSelected(tabIndex)
    }
  };

  handleKeyDown = (tabIndex, e) => {
    let index = this.selectedIndex
    let preventDefault = false

    if (e.keyCode === keycode.codes.up || e.keyCode === keycode.codes.left) {
      // Select next tab to the left
      index = this.getIndex(index, -1)
      preventDefault = true
    } else if (e.keyCode === keycode.codes.down || e.keyCode === keycode.codes.right) {
      // Select next tab to the right
      index = this.getIndex(index, 1)
      preventDefault = true
    }

    if (preventDefault) {
      e.preventDefault()
    }

    this.setSelected(index)
  };

  get selectedIndex () {
    return (this.props.selectedIndex === undefined) ? this.state.selectedIndex : this.props.selectedIndex
  }

  get tabIds () {
    // cache tab ids for better performance and to prevent errors with animations
    const ids = this._tabIds || []
    let diff = ids.length - this.tabs.length

    while (diff++ < 0) {
      ids.push(shortid.generate())
    }

    this._tabIds = ids

    return ids
  }

  get tabs () {
    return React.Children.toArray(this.props.children).map((child) => {
      return child.type === TabPanel && child
    })
  }

  setSelected (index) {
    // Don't do anything if nothing has changed
    if (index === this.selectedIndex) return

    // Check index boundary
    if (!this.isValidIndex(index)) {
      throw new Error('Invalid tab index: ' + index)
    }

    // Keep reference to last index for event handler
    const last = this.selectedIndex

    // Update selected index
    if (this.props.selectedIndex === undefined) {
      this.setState({ selectedIndex: index, focus: true })
    }

    // Call change event handler
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(index, last)
    }
  }

  getIndex (startIndex, step) {
    const count = this.tabs.length
    const change = (step < 0) ? step + count : step

    if (!this.isValidIndex(startIndex)) {
      throw new Error('Invalid tab index: ' + startIndex)
    }

    let index = startIndex
    do {
      index = (index + change) % count
    } while (this.getTab(index).props.disabled)

    return index
  }

  isValidIndex (index) {
    return (index >= 0 && index < this.tabs.length)
  }

  getTab (index) {
    return this.refs['tab-' + index]
  }

  createScreenReaderTab (index, id, props) {
    return createElement(Tab, {
      style: 'screenreader-only',
      ref: 'sr-tab-' + index,
      key: 'sr-tab-' + index,
      id: 'sr-tab-' + id,
      controls: 'panel-' + id,
      index,
      selected: false,
      disabled: props.disabled,
      children: props.title,
      onKeyDown: this.handleEnter,
      onClick: this.handleClick
    })
  }

  createTab (index, id, selected, props) {
    const focus = selected && this.state.focus

    return createElement(Tab, {
      style: this.props.style,
      ref: 'tab-' + index,
      key: 'tab-' + id,
      id: 'tab-' + id,
      controls: 'panel-' + id,
      index,
      selected,
      focus,
      role: selected ? 'tab' : 'presentation', // only the selected tab should be visible to screen readers
      disabled: props.disabled,
      children: props.title,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown
    })
  }

  clonePanel (index, id, selected, panel) {
    // allow user to specify their own key if necessary
    const key = panel.key == null ? 'panel-' + index : panel.key

    return cloneElement(panel, {
      ref: 'panel-' + index,
      id: 'panel-' + id,
      labelledBy: 'tab-' + id,
      selected,
      key,
      style: this.props.style
    })
  }

  renderChildren () {
    const children = []
    const ids = this.tabIds
    const tabs = this.tabs
    const count = tabs.length

    React.Children.forEach(this.props.children, (child, index) => {
      if (child.type === TabPanel) {
        const selected = !child.props.disabled && (this.selectedIndex === index)
        const id = ids[index]

        // render screen reader only tabs before the selected tab
        if (selected) {
          for (let i = 0; i < index; i++) {
            children.push(this.createScreenReaderTab(i, ids[i], tabs[i].props))
          }
        }

        children.push(this.createTab(index, id, selected, child.props))

        // render screen reader only tabs after the selected tab
        if (selected) {
          for (let i = index + 1; i < count; i++) {
            children.push(this.createScreenReaderTab(i, ids[i], tabs[i].props))
          }
        }

        children.push(this.clonePanel(index, id, selected, child))
      } else {
        children.push(child)
      }
    })

    if (this.state.focus) {
      // This fixes an issue with focus management.
      //
      // Ultimately, when focus is true, and an input has focus,
      // and any change on that input causes a state change/re-render,
      // focus gets sent back to the active tab, and input loses focus.
      //
      // Since the focus state only needs to be remembered
      // for the current render, we can reset it once the
      // render has happened.
      //
      // Don't use setState, because we don't want to re-render.
      this.state.focus = false
    }

    return children
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true
    }

    return (
      <div className={classnames(classes)} role="tablist">
        {this.renderChildren()}
      </div>
    )
  }
}

export { default as Tab } from './Tab'
export { default as TabPanel } from './TabPanel'
