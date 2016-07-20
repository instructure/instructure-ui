import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styleable from '../../../util/styleable'

import styles from './styles.css'

import capitalizeFirstLetter from '../../../util/capitalizeFirstLetter'

const COL_WIDTHS = ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

@styleable(styles)
export default class GridCol extends Component {
  static propTypes = {
    children: PropTypes.node,
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['phone', 'tablet', 'desktop', 'wide']),
    visualDebug: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.oneOf(COL_WIDTHS),
      PropTypes.shape({
        phone: PropTypes.oneOf(COL_WIDTHS),
        tablet: PropTypes.oneOf(COL_WIDTHS),
        desktop: PropTypes.oneOf(COL_WIDTHS),
        wide: PropTypes.oneOf(COL_WIDTHS)
      })
    ])
  }

  startAtClass () {
    return (
      'startAt' + capitalizeFirstLetter(this.props.startAt)
    )
  }

  colSpacingClass () {
    return (
      'colSpacing' + capitalizeFirstLetter(this.props.colSpacing)
    )
  }

  rowSpacingClass () {
    return (
      'rowSpacing' + capitalizeFirstLetter(this.props.rowSpacing)
    )
  }

  breakpointClass (breakpoint) {
    const width = (this.props.width && this.props.width[breakpoint]) || this.props.width
    return (breakpoint + '--' + width)
  }

  enabledBreakpoints () {
    const breakpoints = ['phone', 'tablet', 'desktop', 'wide']
    return breakpoints.slice(breakpoints.indexOf(this.props.startAt))
  }

  breakpointIsEnabled (breakpoint) {
    return (this.props.width && this.enabledBreakpoints().indexOf(breakpoint) >= 0)
  }

  render () {
    const {
      children,
      visualDebug
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[this.startAtClass()]]: true,
      [styles['vAlign--' + this.props.vAlign]]: true,
      [styles[this.colSpacingClass()]]: true,
      [styles[this.rowSpacingClass()]]: true,
      [styles[this.breakpointClass('phone')]]: this.breakpointIsEnabled('phone'),
      [styles[this.breakpointClass('tablet')]]: this.breakpointIsEnabled('tablet'),
      [styles[this.breakpointClass('desktop')]]: this.breakpointIsEnabled('desktop'),
      [styles[this.breakpointClass('wide')]]: this.breakpointIsEnabled('wide'),
      [styles.visualDebug]: visualDebug
    }

    return (
      <div className={classnames(classes)}>
        {children}
      </div>
    )
  }
}
