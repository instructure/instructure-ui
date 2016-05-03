import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import capitalizeFirstLetter from '../../util/capitalizeFirstLetter'
import GridCol from './GridCol'

import styles from './GridRow.css'
import themeVariables from './theme/GridRow'
import themeStyles from './theme/GridRow.css'

@themeable(themeVariables, themeStyles)
export default class GridRow extends Component {
  static propTypes = {
    children: CustomPropTypes.validChildren([GridCol]),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
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

  colSpacingClass () {
    return (
      'colSpacing' + capitalizeFirstLetter(this.props.colSpacing)
    )
  }

  renderChildren () {
    const {
      children,
      ...props
    } = this.props

    return React.Children.map(children, (child) => {
      if (child && child.type === GridCol) {
        return (
          <GridCol
            {...props}
            {...child.props} /* child props should override parent */
          />
        )
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.hAlign]]: true,
      [styles[this.props.vAlign]]: true,
      [styles[this.rowSpacingClass()]]: true,
      [styles[this.colSpacingClass()]]: true,
      [styles[this.startAtClass()]]: true
    }

    return (
      <div className={classnames(classes)}>
        {this.renderChildren()}
      </div>
    )
  }
}
