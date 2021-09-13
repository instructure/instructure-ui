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

import { Component, SyntheticEvent } from 'react'

import keycode from 'keycode'

import { isActiveElement } from '@instructure/ui-dom-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'
import type { SelectableProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
tags: autocomplete, typeahead, combobox, dropdown, search
---
@tsProps
**/
class Selectable extends Component<SelectableProps> {
  static allowedProps = allowedProps
  static propTypes = propTypes

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
      onRequestHideOptions?.(event)
    } else {
      if (!isActiveElement(this._trigger)) {
        this._trigger!.focus()
      }
      onRequestShowOptions?.(event)
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
          onRequestSelectOption?.(event, { id: highlightedOptionId })
        }
        break
      case 'down':
        event.preventDefault()
        if (isShowingOptions) {
          // if options showing, change highlight
          onRequestHighlightOption?.(event, { direction: 1 })
        } else {
          // otherwise, show options
          this.handleOpenClose(event)
        }
        break
      case 'up':
        event.preventDefault()
        if (isShowingOptions) {
          // if options showing, change highlight
          onRequestHighlightOption?.(event, { direction: -1 })
        } else {
          // otherwise, show options
          this.handleOpenClose(event)
        }
        break
      case 'home':
        if (isShowingOptions) {
          // if options showing, highlight first option
          event.preventDefault()
          onRequestHighlightFirstOption?.(event)
        }
        break
      case 'end':
        if (isShowingOptions) {
          // if options showing, highlight last option
          event.preventDefault()
          onRequestHighlightLastOption?.(event)
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
              onRequestSelectOption?.(event, { id })
            }, onClick),
            onMouseOver: createChainedFunction((event) => {
              onRequestHighlightOption?.(event, { id })
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
