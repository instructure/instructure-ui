import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import styles from './TabPanel.css'

export default class TabPanel extends Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    nextTabLabel: PropTypes.string.isRequired,
    onNextTabClick: PropTypes.func,
    style: PropTypes.oneOf(['simple', 'accordion']),
    id: PropTypes.string,
    tabId: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    id: null,
    style: 'simple',
    tabId: null,
    selected: false,
    onNextTabClick: function () {}
  };

  renderNextTabButton () {
    return (
      <button className={styles.nextTab} onClick={this.props.onNextTabClick}>
        {this.props.nextTabLabel}
      </button>
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true
    }
    const content = this.props.selected && !this.props.disabled && this.props.children
    const nextTabButton = this.props.nextTabLabel && this.renderNextTabButton()

    return (
      <div className={classnames(classes)}
          role="tabpanel"
          id={this.props.id}
          aria-labelledby={this.props.tabId}
          aria-hidden={!this.props.selected || !!this.props.disabled}>
        {nextTabButton}
        <div className={styles.content}>
          {content}
        </div>
      </div>
    )
  }
}
