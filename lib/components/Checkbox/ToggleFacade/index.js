import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import themeable from '../../../util/themeable'
import classnames from 'classnames'

import IconCheckSolid from 'instructure-icons/lib/Solid/IconCheckSolid'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class ToggleFacade extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    focused: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    checked: false,
    focused: false,
    size: 'medium'
  }

  renderIcon () {
    if (this.props.checked) {
      return <IconCheckSolid />
    } else {
      return <IconXSolid />
    }
  }

  render () {
    const {
      size,
      checked,
      focused
    } = this.props

    const classes = {
      [styles.facade]: true,
      [styles.checked]: checked,
      [styles.focused]: focused,
      [styles[size]]: true
    }

    return (
      <span className={styles.root}>
        <span className={classnames(classes)} aria-hidden="true">
          <ReactCSSTransitionGroup
            className={styles.icon}
            transitionName={{enter: styles['enter']}}
            component="span"
            transitionLeave={false}
            transitionEnterTimeout={0}>
              {this.renderIcon()}
          </ReactCSSTransitionGroup>
        </span>
        <span className={styles.label}>
          {this.props.children}
        </span>
      </span>
    )
  }
}
