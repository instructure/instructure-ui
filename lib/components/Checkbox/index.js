import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import themeable from '../../util/themeable'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'

import IconCheck from './IconCheck'
import IconX from './IconX'

import styles from './Checkbox.css'
import themeVariables from './theme/Checkbox'
import themeStyles from './theme/Checkbox.css'

/**
  By default, the Checkbox component is a custom styled HTML checkbox. To default the checkbox to checked,
  set the `defaultChecked` prop.

  ```jsx_example
  <div>
    <Checkbox
      label={lorem.sentence()}
      value="foo" defaultChecked />
    <Checkbox
      label={lorem.sentence()}
      value="bar" />
  </div>
  ```
  Setting the `style` prop to `toggle` turns the checkbox into a toggle switch.
  Setting the `size` prop changes the size of the toggle switch. The default size
  is `medium`.

  ```jsx_example
  <div>
    <Checkbox label="Small size" value="small" style="toggle" size="small" defaultChecked />
    <br />
    <Checkbox label="Medium size" value="medium" style="toggle" />
    <br />
    <Checkbox label="Large size" value="large" style="toggle" size="large" defaultChecked />
  </div>
  ```

  You will probably want to hide the label text when using the toggle switch style. Do that by wrapping
  the text in the [ScreenReaderContent](#ScreenReaderContent) component.

  ```jsx_example
  <Checkbox
    label={<ScreenReaderContent>Screenreader-accessible label</ScreenReaderContent>}
    value="accessible" style="toggle" />
  ```

**/
@themeable(themeVariables, themeStyles)
export default class Checkbox extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    /* whether to set the input to checked or not on initial render */
    defaultChecked: PropTypes.bool,
    /**
    * whether the input is checked or not (must be accompanied by an `onClick` prop)
    */
    checked: CustomPropTypes.controllable(PropTypes.bool, 'onClick', 'defaultChecked'),
    /**
    * when used with the `checked` prop, the component will not control its own state
    */
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    style: PropTypes.oneOf(['simple', 'toggle'])
  };

  static defaultProps = {
    size: 'medium',
    style: 'simple',
    disabled: false
  };

  constructor (props) {
    super()

    if (props.checked === undefined) {
      this.state = {
        checked: props.defaultChecked
      }
    }
  }

  handleClick = (e) => {
    const { onClick, disabled, checked } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (checked === undefined) {
      this.setState({ checked: !this.state.checked })
    }

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleKeyDown = (e) => {
    if (this.props.style === 'toggle' && e.keyCode === 13) {
      this.refs.input.click()
      e.preventDefault()
    }
  };

  get checked () {
    return (this.props.checked === undefined) ? this.state.checked : this.props.checked
  }

  renderOnIcon () {
    if (this.checked) {
      return <IconCheck className={styles.onIcon} />
    } else {
      return null
    }
  }

  renderOffIcon () {
    if (!this.checked && this.props.style === 'toggle') {
      return <IconX className={styles.offIcon} />
    } else {
      return null
    }
  }

  renderLabel () {
    return <div className={styles.text}>{this.props.label}</div>
  }

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const { onClick, label, size, disabled, style, ...props } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */

    const classes = {
      [styles.root]: true,
      [styles[style]]: true,
      [styles[size]]: this.props.style === 'toggle'
    }

    return (
      <div className={classnames(classes)}>
        <label className={styles.label}>
          <input
            type="checkbox"
            ref="input"
            aria-disabled={disabled ? 'true' : null}
            className={styles.input}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            {...props} />
          {(this.props.style === 'toggle') && this.renderLabel()}
          <div className={styles.layout}>
            <div className={styles.facade} aria-hidden="true">
              <ReactCSSTransitionGroup
                transitionName={{enter: styles['enter']}}
                component="div"
                transitionLeave={false}
                transitionEnterTimeout={0}>
                  {this.renderOnIcon()}
                  {this.renderOffIcon()}
              </ReactCSSTransitionGroup>
            </div>
            {(this.props.style === 'simple') && this.renderLabel()}
          </div>
        </label>
      </div>
    )
  }
}
