import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CustomPropTypes from '../../util/CustomPropTypes'
import keycode from 'keycode'
import classnames from 'classnames'
import { omitProps } from '../../util/passthroughProps'
import createChainedFunction from '../../util/createChainedFunction'
import themeable from '../../util/themeable'
import shortid from 'shortid'

import { FormFieldMessages } from '../FormField'

import CheckboxFacade from './CheckboxFacade'
import ToggleFacade from './ToggleFacade'

import styles from './styles.css'
import theme from './theme.js'

/**
  By default, the Checkbox component is a custom styled HTML checkbox. To default the checkbox to checked,
  set the `defaultChecked` prop.

  ```jsx_example
    <Checkbox label={lorem.sentence()} value="medium" defaultChecked />
  ```

  The default Checkbox in its disabled state:

  ```jsx_example
    <div>
      <Checkbox label={lorem.sentence()} value="medium" disabled defaultChecked />
      <Checkbox label={lorem.sentence()} value="medium" disabled />
    </div>
  ```

  Setting the `variant` prop to `toggle` turns the checkbox into a toggle switch.
  Setting the `size` prop changes the size of the toggle switch. The default size
  is `medium`.

  ```jsx_example
  <div>
    <Checkbox label="Small size" value="small" variant="toggle" size="small" defaultChecked />
    <Checkbox label="Medium size" value="medium" variant="toggle" />
    <Checkbox label="Large size" value="large" variant="toggle" size="large" defaultChecked />
  </div>
  ```

  You might want to hide the label text when using the toggle switch variant. Do that by wrapping
  the text in the [ScreenReaderContent](#ScreenReaderContent) component.

  ```jsx_example
  <Checkbox
    label={<ScreenReaderContent>Screenreader-accessible label</ScreenReaderContent>}
    value="accessible" variant="toggle" />
  ```

**/

@themeable(theme, styles)
class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    /* whether to set the input to checked or not on initial render */
    defaultChecked: PropTypes.bool,
    /**
    * whether the input is checked or not (must be accompanied by an `onChange` prop)
    */
    checked: CustomPropTypes.controllable(PropTypes.bool, 'onChange', 'defaultChecked'),
    /**
    * when used with the `checked` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['simple', 'toggle']),
    isBlock: PropTypes.bool
  }

  static defaultProps = {
    size: 'medium',
    variant: 'simple',
    disabled: false,
    isBlock: true
  }

  constructor (props) {
    super(props)

    this.state = {
      focused: false,
      hovered: false
    }

    if (props.checked === undefined) {
      this.state.checked = !!props.defaultChecked
    }

    this._defaultId = 'Checkbox__' + shortid.generate()
  }

  handleChange = (e) => {
    const { onChange, disabled, checked } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (checked === undefined) {
      this.setState({ checked: !this.state.checked })
    }

    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  handleKeyDown = (e) => {
    if (this.props.variant === 'toggle' &&
      (e.keyCode === keycode.codes.enter || e.keyCode === keycode.codes.return)) {
      this._input.click()
      e.preventDefault()
    }
  }

  handleFocus = (e) => {
    this.setState({
      focused: true
    })
  }

  handleBlur = (e) => {
    this.setState({
      focused: false
    })
  }

  handleMouseOver = (e) => {
    this.setState({
      hovered: true
    })
  }

  handleMouseOut = (e) => {
    this.setState({
      hovered: false
    })
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get checked () {
    return (this.props.checked === undefined) ? this.state.checked : this.props.checked
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._input))
  }

  focus () {
    ReactDOM.findDOMNode(this._input).focus()
  }

  renderFacade () {
    const {
      size,
      disabled,
      variant,
      label
    } = this.props

    const {
      hovered,
      focused
    } = this.state

    if (variant === 'toggle') {
      return (
        <ToggleFacade
          disabled={disabled}
          size={size}
          hovered={hovered}
          focused={focused}
          checked={this.checked}
        >
          {label}
        </ToggleFacade>
      )
    } else {
      return (
        <CheckboxFacade
          size={size}
          hovered={hovered}
          focused={focused}
          checked={this.checked}
        >
          {label}
        </CheckboxFacade>
      )
    }
  }

  render () {
    const {
      isBlock,
      label,
      disabled,
      messages,
      value,
      onKeyDown,
      onFocus,
      onBlur,
      onMouseOver,
      onMouseOut
    } = this.props

    const props = omitProps(this.props, Checkbox.propTypes)

    const classes = {
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles['is-block']]: isBlock
    }

    /* eslint-disable jsx-a11y/mouse-events-have-key-events */

    return (
      <label
        className={classnames(classes)}
        htmlFor={this.id}
        onMouseOver={createChainedFunction(onMouseOver, this.handleMouseOver)}
        onMouseOut={createChainedFunction(onMouseOut, this.handleMouseOut)}
      >
        <input
          {...props}
          id={this.id}
          value={value}
          type="checkbox"
          ref={(c) => { this._input = c }}
          aria-disabled={disabled ? 'true' : null}
          className={styles.input}
          onChange={this.handleChange}
          onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
          onFocus={createChainedFunction(onFocus, this.handleFocus)}
          onBlur={createChainedFunction(onBlur, this.handleBlur)}
          checked={this.checked}
        />
        { this.renderFacade() }
        <FormFieldMessages messages={messages} />
      </label>
    )

     /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }
}

export default Checkbox
export { default as CheckboxFacade } from './CheckboxFacade'
export { default as ToggleFacade } from './ToggleFacade'
