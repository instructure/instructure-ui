import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
    onChange: PropTypes.func,
    variant: PropTypes.oneOf(['simple', 'toggle', 'menuitem']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    context: PropTypes.oneOf(['success', 'danger'])
  };

  static defaultProps = {
    onClick: function (event) {},
    onChange: function (event) {},
    variant: 'simple',
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

  handleChange = (e) => {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    this.props.onChange(e)
  };

  focus () {
    ReactDOM.findDOMNode(this.refs.input).focus()
  }

  isFocused () {
    return (document.activeElement === ReactDOM.findDOMNode(this.refs.input))
  }

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const {
      onClick,
      disabled,
      label,
      className,
      variant,
      size,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */

    const classes = {
      [styles.root]: true,
      [styles.input]: true,
      [styles[variant]]: true,
      [styles[size]]: this.props.variant === 'toggle',
      [styles[this.props.context]]:  this.props.context && this.props.checked
    }

    return (
      <div className={classnames(classes)}>
        <label className={styles.label}>
          <input ref="input"
            type="radio"
            className={styles.input}
            aria-disabled={disabled ? 'true' : null}
            onChange={this.handleChange}
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
