import React, { Component, PropTypes } from 'react'
import Transition from '../../Transition'
import classnames from 'classnames'
import themeable from '../../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class TabPanel extends Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['simple', 'accordion', 'minimal']),
    maxHeight: PropTypes.string,
    id: PropTypes.string,
    labelledBy: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    id: null,
    variant: 'simple',
    labelledBy: null,
    selected: false,
    onNextTabClick: function () {}
  };

  getTransitionType () {
    if (this.props.variant === 'accordion') {
      return 'slide-down'
    } else {
      return 'fade'
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.variant]]: true
    }
    const isHidden = !this.props.selected || this.props.disabled

    const style = this.props.maxHeight ? {
      maxHeight: this.props.maxHeight,
      overflow: 'auto'
    } : null

    return (
      <div className={classnames(classes)}
        role="tabpanel"
        id={this.props.id}
        aria-labelledby={this.props.labelledBy}
        aria-hidden={isHidden ? 'true' : null}>
        <Transition
          type={this.props.variant === 'accordion' ? 'slide-down' : 'fade'}
          in={!isHidden}
          unmountOnExit>
          <div className={styles.content} style={style}>
            {this.props.children}
          </div>
        </Transition>
      </div>
    )
  }
}
