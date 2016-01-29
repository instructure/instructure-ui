import React, { PropTypes, Component } from 'react'
import { Tabs as ReactTabs } from 'react-tabs'
import styles from './Tabs.css'

/**
  A Tabs component based on [react-tabs](https://github.com/rackt/react-tabs) but with custom styling.

  ```jsx_example
  <Tabs>
    <Tabs.TabList>
      <Tabs.Tab>First Tab</Tabs.Tab>
      <Tabs.Tab>Second Tab</Tabs.Tab>
      <Tabs.Tab>Third Tab</Tabs.Tab>
    </Tabs.TabList>
    <Tabs.TabPanel>
      Content for first tab.
    </Tabs.TabPanel>
    <Tabs.TabPanel>
      Content for second tab.
    </Tabs.TabPanel>
    <Tabs.TabPanel>
      Content for third tab.
    </Tabs.TabPanel>
  </Tabs>
  ```
**/
export default class Tabs extends Component {
  static propTypes = {
    selectedIndex: PropTypes.number,
    /**
    * call this function when a tab is selected
    */
    onSelect: PropTypes.func,
    /**
    * set to true if the selected tab should have focus
    */
    hasFocus: PropTypes.bool,
    children: PropTypes.node
  };

  render () {
    return (
      <ReactTabs className={styles.root}
          selectedIndex={this.props.selectedIndex}
          onSelect={this.props.onSelect}
          focus={this.props.hasFocus}>
        {this.props.children}
      </ReactTabs>
    )
  }
}
