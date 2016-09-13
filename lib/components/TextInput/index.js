import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import shortid from 'shortid'
import themeable from '../../util/themeable'

import { pickProps, omitProps } from '../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

import FormField from '../FormField'

/**
  A standard text input field

  ```jsx_example
  <TextInput label="Name" />
  ```

  A text input field with errors

  ```jsx_example
  <TextInput messages={[{ text: 'Invalid name', type: 'error' }]} label="Name" />
  ```

  A text input field with a screenreader only label

  ```jsx_example
  <TextInput label={
    <ScreenReaderContent>Age</ScreenReaderContent>
    } placeholder="hello world"/>
  ```

  An inline text input field with a fixed width

  ```jsx_example
  <p style={{display: 'flex', alignItems: 'center'}}>
    <TextInput label={<ScreenReaderContent>Label</ScreenReaderContent>} isBlock={false} width="2em" />&nbsp;
    <Typography>foo</Typography>
  </p>
  ```

  A password input field

  ```jsx_example
  <TextInput label="Password" type="password" />
  ```

  A text input field next to a [Button](#Button). Note: Form layout components
  are coming soon. Please ignore the inline styles in the example.

  ```jsx_example
  <Grid vAlign="bottom">
    <GridRow>
      <GridCol>
        <TextInput label="Default-size input and button" />
      </GridCol>
      <GridCol>
        <Button>Click me</Button>
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol>
        <TextInput size="small" label="Small-size input and button" />
      </GridCol>
      <GridCol>
        <Button size="small">Click me</Button>
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol>
        <TextInput size="large" label="Large-size input and button" />
      </GridCol>
      <GridCol>
        <Button size="large">Click me</Button>
      </GridCol>
    </GridRow>
  </Grid>
  ```
**/
@themeable(theme, styles)
class TextInput extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    width: PropTypes.string,
    isBlock: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * a function that provides a reference to the actual input element
    */
    inputRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.string),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    isBlock: true,
    type: 'text',
    size: 'medium',
    messages: [],
    disabled: false,
    inputRef: function (input) {}
  }

  constructor (props) {
    super()

    this._defaultId = 'TextInput_' + shortid.generate()
  }

  focus () {
    this._input.focus()
  }

  get invalid () {
    return this.props.messages && this.props.messages.find((message) => { return message.type === 'error' })
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._input))
  }

  get value () {
    return ReactDOM.findDOMNode(this._input).value
  }

  render () {
    const {
      type,
      size,
      placeholder,
      value,
      defaultValue,
      disabled,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      required,
      width,
      inputRef
    } = this.props

    const props = omitProps(this.props, TextInput.propTypes)

    const classes = {
      [styles.input]: true,
      [styles[size]]: size
    }

    const style = width ? { width } : null

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
      >
        <input
          {...props}
          value={value}
          style={style}
          defaultValue={defaultValue}
          placeholder={placeholder}
          ref={(input, ...args) => {
            this._input = input
            inputRef.apply(this, [input].concat(args))
          }}
          type={type}
          id={this.id}
          required={required}
          aria-required={required}
          aria-invalid={this.invalid ? 'true' : null}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : null}
          className={classnames(classes)}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </FormField>
    )
  }
}

export default TextInput
