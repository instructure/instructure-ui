import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import capitalizeFirstLetter from '@instructure/ui-utils/lib/capitalizeFirstLetter'
import themeable from '@instructure/ui-themeable'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import GridCol from '../GridCol'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class GridRow extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: CustomPropTypes.Children.oneOf([GridCol]),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-around', 'space-between']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null]),
    visualDebug: PropTypes.bool,
    isLastRow: PropTypes.bool
  };
  /* eslint-enable react/require-default-props */

  startAtClass () {
    return !!this.props.startAt &&
      (
        `startAt${capitalizeFirstLetter(this.props.startAt)}`
      )
  }

  rowSpacingClass () {
    return (
      `rowSpacing${capitalizeFirstLetter(this.props.rowSpacing)}`
    )
  }

  colSpacingClass () {
    return (
      `colSpacing${capitalizeFirstLetter(this.props.colSpacing)}`
    )
  }

  renderChildren () {
    const {
      children,
      ...props
    } = this.props

    return Children.map(children, (child, index) => {
      if (matchComponentTypes(child, [GridCol])) {
        return safeCloneElement(child, {
          ...pickProps(this.props, GridRow.propTypes),
          ...child.props, /* child props should override parent */
          isLastRow: props.isLastRow,
          isLastCol: ((index + 1) === Children.count(children))
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles.lastRow]: this.props.isLastRow,
      [styles[`hAlign--${this.props.hAlign}`]]: true,
      [styles[`vAlign--${this.props.vAlign}`]]: true,
      [styles[this.rowSpacingClass()]]: true,
      [styles[this.colSpacingClass()]]: this.props.colSpacing !== 'none',
      [styles[this.startAtClass()]]: !!this.props.startAt
    }

    const props = omitProps(this.props, GridRow.propTypes)

    return (
      <span
        {...props}
        className={classnames(classes)}
      >
        {this.renderChildren()}
      </span>
    )
  }
}
