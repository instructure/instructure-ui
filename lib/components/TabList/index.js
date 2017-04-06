import React, { PropTypes, Component, createElement } from 'react'
import classnames from 'classnames'
import shortid from 'shortid'
import themeable from '../../themeable'
import keycode from 'keycode'
import invariant from 'invariant'

import CustomPropTypes from '../../util/CustomPropTypes'
import matchComponentTypes from '../../util/matchComponentTypes'
import safeCloneElement from '../../util/safeCloneElement'

import Container from '../Container'
import Tab from './Tab'
import TabPanel from './TabPanel'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: navigation
---
  Accessible tabbed content component. You can use the TAB key to focus the component and
  arrow keys to navigate between panels of content. The default variant is `simple` tabs.

  ### Simple tabs

  ```jsx_example
  <TabList defaultSelectedIndex={2}>
    <TabPanel title="First Tab">
      <Typography>Hello World</Typography>
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
    <TabPanel title="Third Tab">
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
    <TabPanel title="Fourth Tab" maxHeight="10rem">
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
  </TabList>
  ```

  ### Minimal tabs

  To style `<TabList/>` as shown below, set the `variant` to `minimal`.

  To restrict the width of the `<TabList/>`, use the `size` prop. Add space around
  the entire component using the `margin` prop. Adjust the padding around the
  panel content via `panelPadding` (default is `small`). Finally, switch the
  text alignment of the panel content with `panelTextAlign`.

  ```jsx_example
  <TabList
    variant="minimal"
    size="medium"
    margin="large auto"
    panelPadding="large"
    panelTextAlign="center"
  >
    <TabPanel title="Tab A">
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
    <TabPanel title="Tab C">
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
    <TabPanel title="Tab D">
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
  </TabList>
  ```

  The TabList also has an `accordion` variant. This can be useful to make a component responsive to
  the width of its container (e.g., display as tabs when there is space, but then switch to accordion when
  the container is too small for all of the tabs to fit).

  ```jsx_example
  <TabList defaultSelectedIndex={2} variant="accordion">
    <TabPanel title="Tab One">
      <Typography>Hello World</Typography>
    </TabPanel>
    <TabPanel title="Disabled Tab" disabled>
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
    <TabPanel title="Tab Three">
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
    <TabPanel title="Tab Four">
      <Typography>{lorem.paragraphs()}</Typography>
    </TabPanel>
  </TabList>
  ```
**/

@themeable(theme, styles)
export default class TabList extends Component {
  static propTypes = {
    /**
    * children of type `TabPanel`
    */
    children: CustomPropTypes.Children.oneOf([TabPanel]),
    variant: PropTypes.oneOf(['simple', 'accordion', 'minimal']),
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
    focus: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * Valid values are `0`, `none`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `padding="small xLarge large"`.
    */
    panelPadding: CustomPropTypes.spacing,
    panelTextAlign: PropTypes.oneOf(['left', 'center', 'right'])
  }

  static defaultProps = {
    variant: 'simple',
    focus: false,
    defaultSelectedIndex: 0,
    panelPadding: 'small'
  }

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
  }

  handleEnter = (tabIndex, e) => {
    if (e.keyCode !== keycode.codes.enter && e.keyCode !== keycode.codes.return) {
      return
    }

    const tab = this.getTab(tabIndex)

    if (!tab.props.disabled) {
      this.setSelected(tabIndex)
    }
  }

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
  }

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
      return matchComponentTypes(child, [TabPanel]) && child
    })
  }

  setSelected (index) {
    // Don't do anything if nothing has changed
    if (index === this.selectedIndex) return

    // Check index boundary
    invariant(this.isValidIndex(index), 'Invalid tab index: ' + index)

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

    invariant(this.isValidIndex(startIndex), 'Invalid tab index: ' + startIndex)

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
      variant: 'screenreader-only',
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
      variant: this.props.variant,
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
    return safeCloneElement(panel, {
      ref: 'panel-' + index,
      id: 'panel-' + id,
      labelledBy: 'tab-' + id,
      selected,
      key: 'panel-' + index,
      variant: this.props.variant,
      panelPadding: this.props.panelPadding,
      textAlign: this.props.panelTextAlign
    })
  }

  renderChildren () {
    const children = []
    const ids = this.tabIds
    const tabs = this.tabs
    const count = tabs.length

    React.Children.forEach(this.props.children, (child, index) => {
      if (matchComponentTypes(child, [TabPanel])) {
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
      className: classnames({
        [styles[this.props.variant]]: true
      })
    }

    return (
      <Container
        {...classes}
        size={this.props.size}
        margin={this.props.margin}
        role="tablist"
      >
        {this.renderChildren()}
      </Container>
    )
  }
}

export { default as Tab } from './Tab'
export { default as TabPanel } from './TabPanel'
