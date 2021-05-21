/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Component } from 'react'
import PropTypes from 'prop-types'

import keycode from 'keycode'

import { isActiveElement } from '@instructure/ui-dom-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'

type Props = {
  id?: string
  highlightedOptionId?: string
  selectedOptionId?: string | any[]
  isShowingOptions?: boolean
  onRequestShowOptions?: (...args: any[]) => any
  onRequestHideOptions?: (...args: any[]) => any
  onRequestHighlightOption?: (...args: any[]) => any
  onRequestHighlightFirstOption?: (...args: any[]) => any
  onRequestHighlightLastOption?: (...args: any[]) => any
  onRequestSelectOption?: (...args: any[]) => any
  render?: (...args: any[]) => any
}

/**
---
category: components
tags: autocomplete, typeahead, combobox, dropdown, search
---
**/
class Selectable extends Component<Props> {
  static propTypes = {
    /**
     * The id of the trigger element. Set automatically if not provided
     */
    id: PropTypes.string,
    /**
     * The id of the option in the list that should be considered highlighted
     */
    highlightedOptionId: PropTypes.string,
    /**
     * The id of the option(s) in the list that should be considered selected
     */
    selectedOptionId: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    /**
     * Whether or not the options should be visible
     */
    isShowingOptions: PropTypes.bool,
    /**
     * Callback fired when the options want to become visible
     */
    onRequestShowOptions: PropTypes.func,
    /**
     * Callback fired when the options no longer want to be visible
     */
    onRequestHideOptions: PropTypes.func,
    /**
     * Callback fired when option is hovered or highlighted via keyboard
     */
    onRequestHighlightOption: PropTypes.func,
    /**
     * Callback fired when first option should be highlighted
     */
    onRequestHighlightFirstOption: PropTypes.func,
    /**
     * Callback fired when last option should be highlighted
     */
    onRequestHighlightLastOption: PropTypes.func,
    /**
     * Callback fired when option clicked or selected via keyboard
     */
    onRequestSelectOption: PropTypes.func,
    /**
     * @param {Object} renderProps
     * @param {Function} renderProps.getRootProps - Prop getter for root element
     * @param {Function} renderProps.getLabelProps - Prop getter for label element
     * @param {Function} renderProps.getTriggerProps - Prop getter for trigger element
     * @param {Function} renderProps.getInputProps - Prop getter for input element
     * @param {Function} renderProps.getListProps - Prop getter for list element
     * @param {Function} renderProps.getOptionProps - Prop getter for option elements
     * @param {Function} renderProps.getDisabledOptionProps - Prop getter for disabled option elements
     * @param {Function} renderProps.getDescriptionProps - Prop getter for screenreader description element
     */
    children: PropTypes.func,
    /**
     * Identical to children
     */
    render: PropTypes.func
  }

  static defaultProps = {
    id: null,
    highlightedOptionId: null,
    selectedOptionId: null,
    isShowingOptions: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestShowOptions: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestHideOptions: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestHighlightOption: (event, data) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestHighlightFirstOption: (event, data) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestHighlightLastOption: (event, data) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestSelectOption: (event, data) => {},
    children: null,
    render: undefined
  }

  _id = this.props.id || uid('Selectable')
  _listId = `${this._id}-list`
  _descriptionId = `${this._id}-description`

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
  isSelectedOption = (id) => {
    const { selectedOptionId } = this.props

    if (Array.isArray(selectedOptionId)) {
      return selectedOptionId.indexOf(id) > -1
    }
    return selectedOptionId === id
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleOpenClose = (event) => {
    const { isShowingOptions, onRequestShowOptions, onRequestHideOptions } =
      this.props

    event.preventDefault()

    if (isShowingOptions) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onRequestHideOptions(event)
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_trigger' does not exist on type 'Select... Remove this comment to see the full error message
      if (!isActiveElement(this._trigger)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_trigger' does not exist on type 'Select... Remove this comment to see the full error message
        this._trigger.focus()
      }
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onRequestShowOptions(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyDown = (event) => {
    const {
      isShowingOptions,
      highlightedOptionId,
      onRequestHighlightOption,
      onRequestHighlightFirstOption,
      onRequestHighlightLastOption,
      onRequestSelectOption
    } = this.props

    const key = keycode.names[event.keyCode]

    switch (key) {
      case 'space':
        if (!isShowingOptions) {
          // if options hidden, show them
          this.handleOpenClose(event)
        }
        break
      case 'enter':
        if (highlightedOptionId) {
          // select highlighted option
          event.preventDefault()
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onRequestSelectOption(event, { id: highlightedOptionId })
        }
        break
      case 'down':
        event.preventDefault()
        if (isShowingOptions) {
          // if options showing, change highlight
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onRequestHighlightOption(event, { direction: 1 })
        } else {
          // otherwise, show options
          this.handleOpenClose(event)
        }
        break
      case 'up':
        event.preventDefault()
        if (isShowingOptions) {
          // if options showing, change highlight
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onRequestHighlightOption(event, { direction: -1 })
        } else {
          // otherwise, show options
          this.handleOpenClose(event)
        }
        break
      case 'home':
        if (isShowingOptions) {
          // if options showing, highlight first option
          event.preventDefault()
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onRequestHighlightFirstOption(event)
        }
        break
      case 'end':
        if (isShowingOptions) {
          // if options showing, highlight last option
          event.preventDefault()
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onRequestHighlightLastOption(event)
        }
        break
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyUp = (event) => {
    const { isShowingOptions } = this.props
    const key = keycode.names[event.keyCode]

    if (key === 'esc') {
      if (isShowingOptions) {
        // if options showing, hide them
        this.handleOpenClose(event)
      }
    }
  }

  render() {
    const {
      isShowingOptions,
      highlightedOptionId,
      onRequestHighlightOption,
      onRequestSelectOption,
      children,
      render = children
    } = this.props

    if (typeof render === 'function') {
      return render({
        // @ts-expect-error ts-migrate(2525) FIXME: Initializer provides no value for this binding ele... Remove this comment to see the full error message
        getRootProps: ({ onMouseDown, onClick, ...rest } = {}) => {
          return {
            onClick: createChainedFunction(this.handleOpenClose, onClick),
            onMouseDown: createChainedFunction((event) => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property '_trigger' does not exist on type 'Select... Remove this comment to see the full error message
              if (event.target !== this._trigger) {
                event.preventDefault() // prevent trigger from losing focus
              }
            }, onMouseDown),
            ...rest
          }
        },

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        getLabelProps: (props) => {
          return {
            htmlFor: this._id,
            ...props
          }
        },

        // @ts-expect-error ts-migrate(2525) FIXME: Initializer provides no value for this binding ele... Remove this comment to see the full error message
        getTriggerProps: ({ ref, onKeyDown, onKeyUp, ...rest } = {}) => {
          return {
            id: this._id,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
            ref: createChainedFunction(ref, (el) => (this._trigger = el)),
            'aria-haspopup': 'listbox',
            'aria-expanded': isShowingOptions,
            'aria-owns': isShowingOptions ? this._listId : null,
            'aria-controls': isShowingOptions ? this._listId : null,
            'aria-describedby': this._descriptionId,
            'aria-activedescendant': isShowingOptions
              ? highlightedOptionId
              : null,
            onKeyDown: createChainedFunction(this.handleKeyDown, onKeyDown),
            onKeyUp: createChainedFunction(this.handleKeyUp, onKeyUp),
            ...rest
          }
        },

        // @ts-expect-error ts-migrate(2525) FIXME: Initializer provides no value for this binding ele... Remove this comment to see the full error message
        getInputProps: ({ readOnly, ...rest } = {}) => {
          return {
            role: 'combobox',
            'aria-autocomplete': readOnly ? 'none' : 'both',
            autoComplete: 'off',
            readOnly,
            ...rest
          }
        },

        // @ts-expect-error ts-migrate(2525) FIXME: Initializer provides no value for this binding ele... Remove this comment to see the full error message
        getListProps: ({ onMouseDown, onClick, ...rest } = {}) => {
          return {
            id: this._listId,
            role: 'listbox',
            onMouseDown: createChainedFunction((event) => {
              event.preventDefault() // prevent trigger from losing focus
            }, onMouseDown),
            onClick: createChainedFunction((event) => {
              // prevent synthetic event from firing on the document
              // this event could inadvertently close a parent dialog
              event.stopPropagation()
              event.nativeEvent.stopImmediatePropagation()
            }, onClick),
            ...rest
          }
        },

        // @ts-expect-error ts-migrate(2525) FIXME: Initializer provides no value for this binding ele... Remove this comment to see the full error message
        getOptionProps: ({ id, onMouseOver, onClick, ...rest } = {}) => {
          // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
          error(
            id,
            `[Selectable] Must provide id for each option via \`getOptionProps\`.`
          )
          return {
            id,
            role: 'option',
            'aria-selected': this.isSelectedOption(id) ? 'true' : 'false',
            onClick: createChainedFunction((event) => {
              // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              onRequestSelectOption(event, { id })
            }, onClick),
            onMouseOver: createChainedFunction((event) => {
              // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              onRequestHighlightOption(event, { id })
            }, onMouseOver),
            ...rest
          }
        },

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        getDisabledOptionProps: (props) => {
          return {
            'aria-disabled': 'true',
            ...props
          }
        },

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        getDescriptionProps: (props) => {
          return {
            id: this._descriptionId,
            ...props
          }
        }
      })
    } else {
      return null
    }
  }
}

export default Selectable
export { Selectable }
