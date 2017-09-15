import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../../themeable'
import CustomPropTypes from '../../../util/CustomPropTypes'
import Container from '../../Container'
import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ProgressBar extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * A label is required for accessibility
    */
    label: PropTypes.string.isRequired,
    /**
    * Different-sized progress bars and circles
    */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
    /**
    * Maximum value (defaults to 100)
    */
    valueMax: PropTypes.number,
    /**
    * Receives the progress of the event
    */
    valueNow: PropTypes.number,
    /**
    * A function that returns the current value formatted for screen readers
    */
    formatValueText: PropTypes.func,
    /**
    * A function to format the displayed value. If null the value will not display.
    */
    formatDisplayedValue: PropTypes.func,
    /**
    * The bar changes to your theme's success color when complete
    */
    successColor: PropTypes.bool,
    /**
    * Choose either a progress bar or circle. The `-inverse` variants are for
    * when you need the Progress component to appear on inverse backgrounds
    */
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    formatValueText: (valueNow, valueMax) => `${valueNow} / ${valueMax}`,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    variant: 'default',
    showValue: false,
    successColor: true
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles[this.props.variant]]: true,
      [styles.done]: this.props.successColor &&
        (this.props.valueNow / this.props.valueMax >= 1)
    }

    const {
      formatDisplayedValue,
      formatValueText,
      valueNow,
      valueMax,
      label
    } = this.props

    const valueText = formatValueText(valueNow, valueMax)
    const value = (typeof formatDisplayedValue === 'function') && formatDisplayedValue(valueNow, valueMax)

    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <Container
        as="div"
        className={classnames(classes)}
        margin={this.props.margin}
      >
        <progress
          className={styles.bar}
          max={valueMax}
          value={valueNow}
          role="progressbar"
          aria-valuetext={valueText}
          aria-valuenow={valueNow}
          aria-valuemax={valueMax}
          aria-label={label}
        />
        { value && <span className={styles.value}>{value}</span> }
      </Container>
    )
    /* eslint-enable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
  }
}
