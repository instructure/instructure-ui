import React, { PropTypes, Component, cloneElement, createElement } from 'react'
import classnames from 'classnames'
import shortid from 'shortid'

import CustomPropTypes from '../../util/custom-prop-types'
import Tab from './Tab'
import TabPanel from './TabPanel'

import styles from './TabList.css'

/**

  Accessible tabbed content component. You can use the TAB key to focus the component and
  arrow keys to navigate between panels of content. The default display is `simple` tabs:

  ```jsx_example
  <TabList selectedIndex={2} nextTabLabel="Skip to next tab">
    <TabList.TabPanel title="First Tab">
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
    <TabList.TabPanel title="Disabled Tab" disabled>
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
    <TabList.TabPanel title="Third Tab">
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
    <TabList.TabPanel title="Fourth Tab">
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
  </TabList>
  ```

  The TabList can also display `accordion` style. This can be useful to make a component responsive to
  the width of it's container (e.g. display as tabs when there is space, but then switch to accordion when
  the container is too small for all of the tabs to fit).

  ```jsx_example
  <TabList selectedIndex={2} style="accordion" nextTabLabel="Skip to next tab">
    <TabList.TabPanel title="First Tab">
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
    <TabList.TabPanel title="Disabled Tab" disabled>
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
    <TabList.TabPanel title="Third Tab">
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
    <TabList.TabPanel title="Fourth Tab">
      {faker.lorem.paragraphs()}
    </TabList.TabPanel>
  </TabList>
  ```
**/
export default class TabList extends Component {
  static propTypes = {
    /**
    * children of type Tabs.TabPanel
    */
    children: CustomPropTypes.validChildren([TabPanel]),
    /**
    * Navigation for screen readers to go to the next tab in the list
    */
    nextTabLabel: PropTypes.string.isRequired,
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
      this.setSelected(tabIndex)
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

    if (!this.isValidIndex(startIndex)) {
      throw new Error('Invalid tab index: ' + startIndex)
    }

    let index = startIndex

    if (step < 0) {
      step = step + count
    }

    do {
      index = (index + step) % count
    } while (this.getTab(index).props.disabled)

    return index
  }

  isValidIndex (index) {
    return (index >= 0 && index < this.getTabsCount())
  }

  getTab (index) {
    return this.refs['tabs-' + index]
  }

  getTabsCount () {
    return React.Children.count(this.props.children)
  }

  renderChildren () {
    const children = []

    React.Children.forEach(this.props.children, (child, index) => {
      const selected = (this.state.selectedIndex === index) && !child.props.disabled
      const focus = selected && this.state.focus

      const id = shortid.generate()
      const tabRef = 'tabs-' + index
      const tabId = 'tab-' + id

      const panelRef = 'panel-' + index
      const panelId = 'panel-' + id

      children.push(createElement(Tab, {
        ref: tabRef,
        key: tabRef,
        id: tabId,
        panelId,
        style: this.props.style,
        index,
        selected,
        focus,
        disabled: child.props.disabled,
        children: child.props.title,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown
      }))

      children.push(cloneElement(child, {
        ref: panelRef,
        id: panelId,
        tabId,
        key: panelRef,
        selected,
        style: this.props.style,
        nextTabLabel: this.props.nextTabLabel,
        onNextTabClick: () => {
          this.setSelected(this.getIndex(index, 1), true)
        }
      }))
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
