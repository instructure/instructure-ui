import React, { Component, PropTypes } from 'react'
import styles from './RadioInput.css'

export default class RadioInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    onChange: function (event) {}
  };

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const { children, label, className, ...props } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */
    return (
      <div className={styles.root}>
        <label className={styles.label}>
          <span className={styles.input}>
            <input type="radio" {...props} />
            <span className={styles.facade}></span>
          </span>
          {label}
        </label>
        {children}
      </div>
    )
  }
}
