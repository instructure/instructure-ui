import React, { Component, PropTypes } from 'react'
import Transition from '../Transition'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import styles from './TabPanel.css'

import themeVariables from './theme/TabPanel'
import themeStyles from './theme/TabPanel.css'

@themeable(themeVariables, themeStyles)
export default class TabPanel extends Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
    style: PropTypes.oneOf(['simple', 'accordion', 'minimal']),
    id: PropTypes.string,
    labelledBy: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    id: null,
    style: 'simple',
    labelledBy: null,
    selected: false,
    onNextTabClick: function () {}
  };

  getTransitionType () {
    if (this.props.style === 'accordion') {
      return 'slide-down'
    } else {
      return 'fade'
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true
    }
    const isHidden = !this.props.selected || this.props.disabled

    return (
      <div className={classnames(classes)}
        role="tabpanel"
        id={this.props.id}
        aria-labelledby={this.props.labelledBy}
        aria-hidden={isHidden ? 'true' : null}>
        <Transition
          type={this.props.style === 'accordion' ? 'slide-down' : 'fade'}
          in={!isHidden}
          transitionExit={false}
          unmountOnExit>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </Transition>
      </div>
    )
  }
}
