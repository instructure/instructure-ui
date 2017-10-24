import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'
import debounce from '@instructure/ui-utils/lib/debounce'
import addEventListener from '@instructure/ui-utils/lib/dom/addEventListener'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

import FormField from '../FormField'

/**
---
category: components/forms
---
**/
@themeable(theme, styles)
class TextArea extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    /**
    * the textarea will expand vertically to fit the height of the content
    */
    autoGrow: PropTypes.bool,
    /**
    * is the textarea resizable (in supported browsers)
    */
    resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
    /**
    * a fixed width for the textarea
    */
    width: PropTypes.string,
    /**
    * a initial height for the textarea (if autoGrow is true it will grow vertically)
    */
    height: PropTypes.string,
    /**
    * when autoGrow is true, the textarea will never grow beyond this value (in pixels)
    */
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * a function that provides a reference to the actual textarea element
    */
    textareaRef: PropTypes.func,
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
    onChange: PropTypes.func
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium',
    autoGrow: true,
    resize: 'none',
    inline: false,
    messages: [],
    disabled: false,
    textareaRef: function (textarea) {},
    layout: 'stacked'
  };

  constructor () {
    super()

    this._defaultId = `TextArea__${shortid.generate()}`
  }

  componentDidMount () {
    this.autoGrow()
  }

  componentWillReceiveProps (nextProps) {
    this.autoGrow()
  }

  componentWillUnmount () {
    if (this._listener) {
      this._listener.remove()
    }

    if (this._request) {
      this._request.cancel()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

  autoGrow () {
    if (this.props.autoGrow) {
      if (!this._debounced) {
        this._debounced = debounce(this.grow, 200, {leading: false, trailing: true})
      }

      if (!this._listener) {
        this._listener = addEventListener(window, 'resize', this._debounced)
      }

      this._request = requestAnimationFrame(this._debounced)
    }
  }

  grow = () => {
    if (!this._textarea) {
      return
    }

    const scrollHeight = this._textarea.scrollHeight
    let initialHeight = this.props.height
    let minHeight = scrollHeight
    let maxHeight = this.props.maxHeight

    if (initialHeight && scrollHeight < (initialHeight = parseInt(initialHeight))) {
      minHeight = initialHeight
    } else if (maxHeight && scrollHeight > (maxHeight = parseInt(maxHeight))) {
      minHeight = maxHeight
    }

    this._textarea.style.minHeight = `${minHeight}px`
  }

  focus () {
    this._textarea.focus()
  }

  handleChange = (event) => {
    const { onChange, value, disabled } = this.props

    if (disabled) {
      event.preventDefault()
      return
    }

    if (value === undefined) { // if uncontrolled
      this.autoGrow()
    }

    if (typeof onChange === 'function') {
      onChange(event)
    }
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return isActiveElement(this._textarea)
  }

  get value () {
    return this._textarea.value
  }

  render () {
    const {
      placeholder,
      value,
      defaultValue,
      disabled,
      required,
      width,
      height,
      textareaRef,
      resize,
      size
    } = this.props

    const props = omitProps(this.props, TextArea.propTypes)

    const classes = {
      [styles.textarea]: true,
      [styles[size]]: true
    }

    const style = {
      width,
      resize,
      height
    }

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        vAlign="top"
        id={this.id}
        ref={(el) => { this._node = el }}
      >
        <textarea
          {...props}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          ref={(textarea, ...args) => {
            this._textarea = textarea
            textareaRef.apply(this, [textarea].concat(args))
          }}
          style={style}
          id={this.id}
          required={required}
          aria-required={required}
          aria-invalid={this.invalid ? 'true' : null}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : null}
          className={classnames(classes)}
          onChange={this.handleChange}
        />
      </FormField>
    )
  }
}

export default TextArea
