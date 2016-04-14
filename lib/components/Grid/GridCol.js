import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import styles from './GridCol.css'
import themeVariables from './theme/GridCol'
import themeStyles from './theme/GridCol.css'

@themeable(themeVariables, themeStyles)
export default class GridCol extends Component {
  static propTypes = {
    children: PropTypes.node,
    gutter: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    startAt: PropTypes.oneOf(['phone', 'tablet', 'desktop', 'wide']),
    visualDebug: PropTypes.bool,

    phone: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    tablet: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    desktop: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    wide: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  };

  static defaultProps = {
    startAt: 'phone',
    gutter: 'none',
    visualDebug: false
  };

  handleStartAt () {
    return (
      'startAt' + (this.props.startAt).charAt(0).toUpperCase() + (this.props.startAt).slice(1)
    )
  }

  handleGutter () {
    return (
      'gutter' + (this.props.gutter).charAt(0).toUpperCase() + (this.props.gutter).slice(1)
    )
  }

  handlePhone () {
    return ('phone--' + this.props.phone)
  }

  handleTablet () {
    return ('tablet--' + this.props.tablet)
  }

  handleDesktop () {
    return ('desktop--' + this.props.desktop)
  }

  handleWide () {
    return ('wide--' + this.props.wide)
  }

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const {
      children,
      startAt,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */

    const classes = {
      [styles.root]: true,
      [styles[this.handleStartAt()]]: true,
      [styles[this.handleGutter()]]: true,
      [styles[this.handlePhone()]]: this.props.phone && startAt !== ('tablet' || 'desktop' || 'wide'),
      [styles[this.handleTablet()]]: this.props.tablet && startAt !== ('desktop' || 'wide'),
      [styles[this.handleDesktop()]]: this.props.desktop && startAt !== ('wide'),
      [styles[this.handleWide()]]: this.props.wide,
      [styles.visualDebug]: this.props.visualDebug
    }

    return (
      <div className={classnames(classes)}>
        {children}
      </div>
    )
  }
}
