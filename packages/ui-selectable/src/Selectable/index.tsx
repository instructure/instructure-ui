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

import { Component, ReactNode, SyntheticEvent } from 'react'
import PropTypes from 'prop-types'

import keycode from 'keycode'

import { isActiveElement } from '@instructure/ui-dom-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'

type Props = {
  /**
   * The id of the trigger element. Set automatically if not provided
   */
  id?: string | null
  /**
   * The id of the option in the list that should be considered highlighted
   */
  highlightedOptionId?: string | null
  /**
   * The id of the option(s) in the list that should be considered selected
   */
  selectedOptionId?: string | string[] | null
  /**
   * Whether or not the options should be visible
   */
  isShowingOptions?: boolean
  /**
   * Callback fired when the options want to become visible
   */
  onRequestShowOptions: (event: Event) => void
  /**
   * Callback fired when the options no longer want to be visible
   */
  onRequestHideOptions: (event: Event) => void
  /**
   * Callback fired when option is hovered or highlighted via keyboard.
   * Either the `id` or the `direction` parameter is supplied
   */
  onRequestHighlightOption: (
    event: Event,
    data: { id?: string; direction?: 1 | -1 }
  ) => void
  /**
   * Callback fired when first option should be highlighted
   */
  onRequestHighlightFirstOption: (event: Event) => void
  /**
   * Callback fired when last option should be highlighted
   */
  onRequestHighlightLastOption: (event: Event) => void
  /**
   * Callback fired when option clicked or selected via keyboard
   */
  onRequestSelectOption: (event: Event, data: { id?: string }) => void
  /**
   * A function with prop getters
   */
  render?: (propGetters: SelectableRender) => ReactNode
  /**
   * A function with prop getters
   */
  children: (propGetters: SelectableRender) => ReactNode
}

type MouseEventFunction = (event: MouseEvent) => void

export type SelectableRender = {
  /**
   * Prop getter for root element
   */
  getRootProps: (methods?: {
    onMouseDown?: MouseEventFunction
    onClick?: MouseEventFunction
    [restProps: string]: any
  }) => Record<string, any>
  /**
   * Prop getter for label element
   */
  getLabelProps: (props?: Record<string, any>) => Record<string, any>
  /**
   * Prop getter for trigger element
   */
  getTriggerProps: (methods?: {
    ref?: (...args: any) => void
    onKeyDown?: (event: KeyboardEvent) => void
    onKeyUp?: (event: KeyboardEvent) => void
    [restProps: string]: any
  }) => Record<string, any>
  /**
   * Prop getter for input element
   */
  getInputProps: (methods?: {
    readOnly?: boolean
    [restProps: string]: any
  }) => Record<string, any>
  /**
   * Prop getter for list element
   */
  getListProps: (methods?: {
    onMouseDown?: MouseEventFunction
    onClick?: MouseEventFunction
    [restProps: string]: any
  }) => Record<string, any>
  /**
   * Prop getter for option elements
   */
  getOptionProps: (methods?: {
    id?: string // TODO this is not optional
    onMouseOver?: MouseEventFunction
    onClick?: MouseEventFunction
    [restProps: string]: any
  }) => Record<string, any>
  /**
   * Prop getter for disabled option elements
   */
  getDisabledOptionProps: (props?: Record<string, any>) => Record<string, any>
  /**
   * Prop getter for screenreader description element
   */
  getDescriptionProps: (props?: Record<string, any>) => Record<string, any>
}

/**
---
category: components
tags: autocomplete, typeahead, combobox, dropdown, search
---
**/
class Selectable extends Component<Props> {
  static propTypes = {
    id: PropTypes.string,
    highlightedOptionId: PropTypes.string,
    selectedOptionId: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    isShowingOptions: PropTypes.bool,
    onRequestShowOptions: PropTypes.func,
    onRequestHideOptions: PropTypes.func,
    onRequestHighlightOption: PropTypes.func,
    onRequestHighlightFirstOption: PropTypes.func,
    onRequestHighlightLastOption: PropTypes.func,
    onRequestSelectOption: PropTypes.func,
    children: PropTypes.func,
    render: PropTypes.func
  }

  static defaultProps = {
    id: null,
    highlightedOptionId: null,
    selectedOptionId: null,
    isShowingOptions: false,
    onRequestShowOptions: (_event: Event) => {},
    onRequestHideOptions: (_event: Event) => {},
    onRequestHighlightOption: (
      _event: Event,
      _data: { id?: string; direction?: 1 | -1 }
    ) => {},
    onRequestHighlightFirstOption: (_event: Event) => {},
    onRequestHighlightLastOption: (_event: Event) => {},
    onRequestSelectOption: (
      _event: Event,
      _data: Record<string, unknown>
    ) => {},
    children: null,
    render: undefined
  }

  _id = this.props.id || uid('Selectable')
  _listId = `${this._id}-list`
  _descriptionId = `${this._id}-description`
  private _trigger?: HTMLElement

  isSelectedOption = (id: string) => {
    const { selectedOptionId } = this.props

    if (Array.isArray(selectedOptionId)) {
      return selectedOptionId.indexOf(id) > -1
    }
    return selectedOptionId === id
  }

  handleOpenClose = (event: KeyboardEvent) => {
    const {
      isShowingOptions,
      onRequestShowOptions,
      onRequestHideOptions
    } = this.props

    event.preventDefault()

    if (isShowingOptions) {
      onRequestHideOptions(event)
    } else {
      if (!isActiveElement(this._trigger)) {
        this._trigger!.focus()
      }
      onRequestShowOptions(event)
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
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
          onRequestSelectOption(event, { id: highlightedOptionId })
        }
        break
      case 'down':
        event.preventDefault()
        if (isShowingOptions) {
          // if options showing, change highlight
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
          onRequestHighlightFirstOption(event)
        }
        break
      case 'end':
        if (isShowingOptions) {
          // if options showing, highlight last option
          event.preventDefault()
          onRequestHighlightLastOption(event)
        }
        break
    }
  }

  handleKeyUp = (event: KeyboardEvent) => {
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
        getRootProps: ({ onMouseDown, onClick, ...rest } = {}) => {
          return {
            onClick: createChainedFunction(this.handleOpenClose, onClick),
            onMouseDown: createChainedFunction((event: Event) => {
              if (event.target !== this._trigger) {
                event.preventDefault() // prevent trigger from losing focus
              }
            }, onMouseDown),
            ...rest
          }
        },

        getLabelProps: (props) => {
          return {
            htmlFor: this._id,
            ...props
          }
        },

        getTriggerProps: ({ ref, onKeyDown, onKeyUp, ...rest } = {}) => {
          return {
            id: this._id,
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

        getInputProps: ({ readOnly, ...rest } = {}) => {
          return {
            role: 'combobox',
            'aria-autocomplete': readOnly ? 'none' : 'both',
            autoComplete: 'off',
            readOnly,
            ...rest
          }
        },

        getListProps: ({ onMouseDown, onClick, ...rest } = {}) => {
          return {
            id: this._listId,
            role: 'listbox',
            onMouseDown: createChainedFunction((event: Event) => {
              event.preventDefault() // prevent trigger from losing focus
            }, onMouseDown),
            onClick: createChainedFunction((event: SyntheticEvent) => {
              // prevent synthetic event from firing on the document
              // this event could inadvertently close a parent dialog
              event.stopPropagation()
              event.nativeEvent.stopImmediatePropagation()
            }, onClick),
            ...rest
          }
        },

        getOptionProps: ({ id, onMouseOver, onClick, ...rest } = {}) => {
          error(
            Boolean(id),
            `[Selectable] Must provide id for each option via \`getOptionProps\`.`
          )
          return {
            id,
            role: 'option',
            'aria-selected': this.isSelectedOption(id!) ? 'true' : 'false',
            onClick: createChainedFunction((event) => {
              onRequestSelectOption(event, { id })
            }, onClick),
            onMouseOver: createChainedFunction((event) => {
              onRequestHighlightOption(event, { id })
            }, onMouseOver),
            ...rest
          }
        },

        getDisabledOptionProps: (props) => {
          return {
            'aria-disabled': 'true',
            ...props
          }
        },

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
