import React, { PropTypes, Component, cloneElement, createElement } from 'react'
import classnames from 'classnames'
import shortid from 'shortid'

import CustomPropTypes from '../../util/CustomPropTypes'
import Tab from './Tab'
import TabPanel from './TabPanel'

import styles from './TabList.css'

/**

  Accessible tabbed content component. You can use the TAB key to focus the component and
  arrow keys to navigate between panels of content. The default display is `simple` tabs:

  ```jsx_example
  <TabList selectedIndex={2}>
    <TabPanel title="First Tab">
      {faker.lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      {faker.lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Third Tab">
      {faker.lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Fourth Tab">
      {faker.lorem.paragraphs()}
    </TabPanel>
  </TabList>
  ```

  The TabList can also display `accordion` style. This can be useful to make a component responsive to
  the width of its container (e.g., display as tabs when there is space, but then switch to accordion when
  the container is too small for all of the tabs to fit).

  ```jsx_example
  <TabList selectedIndex={2} style="accordion">
    <TabPanel title="First Tab">
      {faker.lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      {faker.lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Third Tab">
      {faker.lorem.paragraphs()}
    </TabPanel>
    <TabPanel title="Fourth Tab">
      {faker.lorem.paragraphs()}
    </TabPanel>
  </TabList>
  ```
**/
export default class TabList extends Component {
  static propTypes = {
    /**
    * children of type TabList.TabPanel
    */
    children: CustomPropTypes.validChildren([TabPanel]),
    style: PropTypes.oneOf(['simple', 'accordion']),
    /**
    * the index (zero based) of the panel that should be selected
    */
    selectedIndex: PropTypes.number,
    /**
    * call this function when the selected tab changes
    */
    onChange: PropTypes.func,
    /**
    * the selected tab should be focused
    */
    focus: PropTypes.bool
  };

  static defaultProps = {
    style: 'simple',
    selectedIndex: 0,
    onChange: function (currentIndex, lastIndex) {},
    focus: false
  };

  constructor (props) {
    super()

    this.state = {
      selectedIndex: props.selectedIndex,
      focus: props.focus
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      selectedIndex: nextProps.selectedIndex
    })
  }

  handleClick = (tabIndex, e) => {
    const tab = this.getTab(tabIndex)

    if (!tab.props.disabled) {
      this.setSelected(tabIndex, true)
    }
  };

  handleEnter = (tabIndex, e) => {
    if (e.keyCode !== 13) {
      return
    }

    const tab = this.getTab(tabIndex)

    if (!tab.props.disabled) {
      this.setSelected(tabIndex, true)
    }
  };

  handleKeyDown = (tabIndex, e) => {
    let index = this.state.selectedIndex
    let preventDefault = false

    if (e.keyCode === 37 || e.keyCode === 38) {
      // Select next tab to the left
      index = this.getIndex(index, -1)
      preventDefault = true
    } else if (e.keyCode === 39 || e.keyCode === 40) {
      // Select next tab to the right
      index = this.getIndex(index, 1)
      preventDefault = true
    }

    if (preventDefault) {
      e.preventDefault()
    }

    this.setSelected(index, true)
  };

  setSelected (index, focus) {
    // Don't do anything if nothing has changed
    if (index === this.state.selectedIndex) return

    // Check index boundary
    if (!this.isValidIndex(index)) {
      throw new Error('Invalid tab index: ' + index)
    }

    // Keep reference to last index for event handler
    const last = this.state.selectedIndex

    // Update selected index
    this.setState({ selectedIndex: index, focus: focus === true })

    // Call change event handler
    this.props.onChange(index, last)
  }

  getIndex (startIndex, step) {
    const count = this.getTabsCount()
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
    return (index >= 0 && index < this.getTabsCount())
  }

  getTab (index) {
    return this.refs['tab-' + index]
  }

  getTabsCount () {
    return React.Children.count(this.props.children)
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
    return cloneElement(panel, {
      ref: 'panel-' + index,
      id: 'panel-' + id,
      labelledBy: 'tab-' + id,
      key: 'panel-' + index,
      selected,
      style: this.props.style
    })
  }

  renderChildren () {
    const children = []
    const count = this.getTabsCount()
    const ids = React.Children.map(this.props.children, shortid.generate)
    const tabs = React.Children.toArray(this.props.children)

    React.Children.forEach(this.props.children, (child, index) => {
      const selected = !child.props.disabled && (this.state.selectedIndex === index)
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
    })

    return children
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true
    }
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
    //
    // See https://github.com/rackt/react-tabs/pull/7
    if (this.state.focus) {
      setTimeout(() => {
        this.state.focus = false
      }, 0)
    }

    return (
      <div className={classnames(classes)} role="tablist">
        {this.renderChildren()}
      </div>
    )
  }
}
