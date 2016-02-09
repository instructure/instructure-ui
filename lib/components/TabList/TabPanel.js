import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import styles from './TabPanel.css'

export default class TabPanel extends Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    style: PropTypes.oneOf(['simple', 'accordion']),
    id: PropTypes.string,
    labelledBy: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    id: null,
    style: 'simple',
    labelledBy: null,
    selected: false,
    onNextTabClick: function () {}
  };

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true
    }
    const isHidden = !this.props.selected || this.props.disabled
    const content = !isHidden && this.props.children

    return (
      <div className={classnames(classes)}
          role="tabpanel"
          id={this.props.id}
          aria-labelledby={this.props.labelledBy}
          aria-hidden={isHidden ? 'true' : null}>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    )
  }
}
