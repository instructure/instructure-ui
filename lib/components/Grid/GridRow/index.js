import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../../util/CustomPropTypes'
import classnames from 'classnames'
import safeCloneElement from '../../../util/safeCloneElement'
import capitalizeFirstLetter from '../../../util/capitalizeFirstLetter'
import styleable from '../../../util/styleable'
import matchComponentTypes from '../../../util/matchComponentTypes'

import GridCol from '../GridCol'

import styles from './styles.css'

@styleable(styles)
export default class GridRow extends Component {
  static propTypes = {
    children: CustomPropTypes.validChildren([GridCol]),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'spaceAround', 'spaceBetween']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['phone', 'tablet', 'desktop', 'wide']),
    visualDebug: PropTypes.bool
  };

  startAtClass () {
    return (
      'startAt' + capitalizeFirstLetter(this.props.startAt)
    )
  }

  rowSpacingClass () {
    return (
      'rowSpacing' + capitalizeFirstLetter(this.props.rowSpacing)
    )
  }

  renderChildren () {
    const {
      children,
      ...props
    } = this.props

    return React.Children.map(children, (child) => {
      if (matchComponentTypes(child, [GridCol])) {
        return safeCloneElement(child, {
          ...props,
          ...child.props /* child props should override parent */
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles['hAlign--' + this.props.hAlign]]: true,
      [styles['vAlign--' + this.props.vAlign]]: true,
      [styles[this.rowSpacingClass()]]: true,
      [styles[this.startAtClass()]]: true
    }

    return (
      <div className={classnames(classes)}>
        {this.renderChildren()}
      </div>
    )
  }
}
