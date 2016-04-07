import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import styles from './TabPanel.css'

import themeVariables from './theme/TabPanel'
import themeStyles from './theme/TabPanel.css'

@themeable(themeVariables, themeStyles)
export default class TabPanel extends Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    style: PropTypes.oneOf(['simple', 'accordion', 'minimal']),
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

  renderContent () {
    return (
      <div key={this.props.id} className={styles.content}>
        {this.props.children}
      </div>
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true
    }
    const isHidden = !this.props.selected || this.props.disabled
    const content = !isHidden && this.renderContent()

    return (
      <div className={classnames(classes)}
        role="tabpanel"
        id={this.props.id}
        aria-labelledby={this.props.labelledBy}
        aria-hidden={isHidden ? 'true' : null}>
        <ReactCSSTransitionGroup
          transitionName={{
            enter: styles['content--enter']
          }}
          component="div"
          transitionLeave={false}
          transitionEnterTimeout={0}>
          {content}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
