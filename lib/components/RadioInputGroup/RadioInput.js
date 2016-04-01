import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import styles from './RadioInput.css'
import themeVariables from './theme/RadioInput'
import themeStyles from './theme/RadioInput.css'

@themeable(themeVariables, themeStyles)
export default class RadioInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.node.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    context: PropTypes.oneOf(['success', 'danger'])
  };

  static defaultProps = {
    onClick: function (event) {},
    style: 'simple',
    size: 'medium',
    disabled: false
  };

  handleClick = (e) => {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    this.props.onClick(e)
  };

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const {
      onClick,
      disabled,
      label,
      className,
      style,
      size,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */

    const classes = {
      [styles.root]: true,
      [styles.input]: true,
      [styles[style]]: true,
      [styles[size]]: this.props.style === 'toggle',
      [styles[this.props.context]]:  this.props.context && this.props.checked
    }

    return (
      <div className={classnames(classes)}>
        <label className={styles.label}>
          <input type="radio"
            className={styles.input}
            aria-disabled={disabled ? 'true' : null}
            onClick={this.handleClick}
            {...props} />
          <div className={styles.layout}>
            <span className={styles.facade}></span>
            <span className={styles.text}>{label}</span>
          </div>
        </label>
      </div>
    )
  }
}
