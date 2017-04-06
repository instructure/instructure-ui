import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme.js'

import capitalizeFirstLetter from '../../../util/capitalizeFirstLetter'

// TODO: get numcols from theme config
const COL_WIDTHS = ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

@themeable(theme, styles)
export default class GridCol extends Component {
  static propTypes = {
    children: PropTypes.node,
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    textAlign: PropTypes.oneOf(['left', 'right', 'center', 'inherit']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['phone', 'tablet', 'desktop', 'wide', null]),
    visualDebug: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.oneOf(COL_WIDTHS),
      PropTypes.shape({
        phone: PropTypes.oneOf(COL_WIDTHS),
        tablet: PropTypes.oneOf(COL_WIDTHS),
        desktop: PropTypes.oneOf(COL_WIDTHS),
        wide: PropTypes.oneOf(COL_WIDTHS)
      })
    ]),
    offset: PropTypes.oneOfType([
      PropTypes.oneOf(COL_WIDTHS),
      PropTypes.shape({
        phone: PropTypes.oneOf(COL_WIDTHS),
        tablet: PropTypes.oneOf(COL_WIDTHS),
        desktop: PropTypes.oneOf(COL_WIDTHS),
        wide: PropTypes.oneOf(COL_WIDTHS)
      })
    ]),
    isLastRow: PropTypes.bool,
    isLastCol: PropTypes.bool
  };

  static defaultProps = {
    textAlign: 'inherit'
  };

  startAtClass () {
    return !!this.props.startAt && (
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
    return `${breakpoint}--${width}`
  }

  breakpointOffsetClass (breakpoint) {
    const offset = (this.props.offset && this.props.offset[breakpoint]) || this.props.offset
    return `${breakpoint}-offset--${offset}`
  }

  enabledBreakpoints () {
    const breakpoints = ['phone', 'tablet', 'desktop', 'wide', null]
    return breakpoints.slice(breakpoints.indexOf(this.props.startAt))
  }

  breakpointIsEnabled (breakpoint) {
    return (this.enabledBreakpoints().indexOf(breakpoint) >= 0)
  }

  breakpointIsEnabledForWidth (breakpoint) {
    return !!this.props.width && this.breakpointIsEnabled(breakpoint)
  }

  breakpointIsEnabledForOffset (breakpoint) {
    return !!this.props.offset && this.breakpointIsEnabled(breakpoint)
  }

  render () {
    const {
      children,
      visualDebug
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[this.startAtClass()]]: !!this.props.startAt,
      [styles['vAlign--' + this.props.vAlign]]: true,
      [styles['textAlign--' + this.props.textAlign]]: true,
      [styles[this.colSpacingClass()]]: true,
      [styles[this.rowSpacingClass()]]: true,

      [styles.lastRow]: this.props.isLastRow,
      [styles.lastCol]: this.props.isLastCol,

      [styles[this.breakpointClass('phone')]]: this.breakpointIsEnabledForWidth('phone'),
      [styles[this.breakpointClass('tablet')]]: this.breakpointIsEnabledForWidth('tablet'),
      [styles[this.breakpointClass('desktop')]]: this.breakpointIsEnabledForWidth('desktop'),
      [styles[this.breakpointClass('wide')]]: this.breakpointIsEnabledForWidth('wide'),

      [styles[this.breakpointOffsetClass('phone')]]: this.breakpointIsEnabledForOffset('phone'),
      [styles[this.breakpointOffsetClass('tablet')]]: this.breakpointIsEnabledForOffset('tablet'),
      [styles[this.breakpointOffsetClass('desktop')]]: this.breakpointIsEnabledForOffset('desktop'),
      [styles[this.breakpointOffsetClass('wide')]]: this.breakpointIsEnabledForOffset('wide'),

      [styles.visualDebug]: visualDebug
    }

    return (
      <span className={classnames(classes)}>
        {children}
      </span>
    )
  }
}
