// forked from on https://raw.githubusercontent.com/JedWatson/react-codemirror/master/src/Codemirror.js
import CodeMirror from 'codemirror'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import nanoid from 'nanoid'

import themeable from '@instructure/ui-themeable'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class CodeMirrorEditor extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['javascript', 'jsx']),
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    onFocusChange: PropTypes.func,
    options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    path: PropTypes.string,
    value: PropTypes.string,
    variant: PropTypes.oneOf(['playground', 'standalone'])
  }

  static defaultProps = {
    mode: 'javascript',
    readOnly: false,
    onChange: function () {},
    onFocusChange: function () {},
    options: undefined,
    path: undefined,
    value: undefined,
    variant: 'standalone'
  }

  constructor (props) {
    super()
    this.state = {
      isFocused: false
    }
    this._id = `CodeEditor__${nanoid(7)}`
  }

  componentDidMount () {
    const textareaNode = this._textareaNode
    this.codeMirror = CodeMirror.fromTextArea(textareaNode, this.props.options)
    this.codeMirror.on('change', this.handleValueChanged)
    this.codeMirror.on('focus', this.handleFocusChanged.bind(this, true))
    this.codeMirror.on('blur', this.handleFocusChanged.bind(this, false))
    this._currentCodemirrorValue = this.props.value
    this.codeMirror.setValue(this.props.value)
  }

  componentWillUnmount () {
    // TODO: is there a lighter-weight way to remove the cm instance?
    if (this.codeMirror) {
      this.codeMirror.toTextArea()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
      this.codeMirror.setValue(nextProps.value)
    }
    if (typeof nextProps.options === 'object') {
      for (const optionName in nextProps.options) { // eslint-disable-line no-restricted-syntax
        // eslint-disable-next-line no-prototype-builtins
        if (nextProps.options.hasOwnProperty(optionName)) {
          this.codeMirror.setOption(optionName, nextProps.options[optionName])
        }
      }
    }
  }

  getCodeMirror () {
    return this.codeMirror
  }

  focus () {
    if (this.codeMirror) {
      this.codeMirror.focus()
    }
  }

  handleFocusChanged (focused) {
    this.setState({
      isFocused: focused
    })
    this.props.onFocusChange && this.props.onFocusChange(focused)
  }

  handleValueChanged = (doc, change) => {
    const newValue = doc.getValue()
    this._currentCodemirrorValue = newValue
    this.props.onChange && this.props.onChange(newValue)
  };

  render () {
    const classes = {
      [styles.root]:           true,
      [styles[this.props.variant]]: true,
      [styles['is-focused']]:  this.state.isFocused
    }

    return (
      <div className={classnames(classes)}>
        <label htmlFor={this._id}>
          <ScreenReaderContent>{this.props.label}</ScreenReaderContent>
          <textarea
            id={this._id}
            ref={(c) => { this._textareaNode = c }}
            name={this.props.path}
            defaultValue={''}
            autoComplete="off"
          />
        </label>
      </div>
    )
  }
}
