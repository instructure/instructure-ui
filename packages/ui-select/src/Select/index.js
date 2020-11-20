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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { createChainedFunction } from '@instructure/ui-utils'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import {
  matchComponentTypes,
  omitProps,
  getInteraction
} from '@instructure/ui-react-utils'
import {
  getBoundingClientRect,
  isActiveElement
} from '@instructure/ui-dom-utils'

import { PositionPropTypes } from '@instructure/ui-position'
import { View } from '@instructure/ui-view'
import { Selectable } from '@instructure/ui-selectable'
import { Popover } from '@instructure/ui-popover'
import { TextInput } from '@instructure/ui-text-input'
import { Options } from '@instructure/ui-options'
import {
  IconArrowOpenDownLine,
  IconArrowOpenUpLine
} from '@instructure/ui-icons'
import { uid } from '@instructure/uid'

import { Group } from './Group'
import { Option } from './Option'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
tags: autocomplete, typeahead, combobox, dropdown, search, form
---
**/
@testable()
@themeable(theme, styles)
class Select extends Component {
  static Option = Option
  static Group = Group
  static propTypes = {
    /**
     * The form field label.
     */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired,
    /**
     * The value to display in the text input.
     */
    inputValue: PropTypes.string,
    /**
     * Whether or not to show the options list.
     */
    isShowingOptions: PropTypes.bool,
    /**
     * The id of the text input. One is generated if not supplied.
     */
    id: PropTypes.string,
    /**
     * The size of the text input.
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Additional helpful text to provide to screen readers about the operation
     * of the component.
     */
    assistiveText: PropTypes.string,
    /**
     * Html placeholder text to display when the input has no value. This should
     * be hint text, not a label replacement.
     */
    placeholder: PropTypes.string,
    /**
     * Specifies if interaction with the input is enabled, disabled, or readonly.
     * When "disabled", the input changes visibly to indicate that it cannot
     * receive user interactions. When "readonly" the input still cannot receive
     * user interactions but it keeps the same styles as if it were enabled.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Whether or not the text input is required.
     */
    isRequired: PropTypes.bool,
    /**
     * Whether the input is rendered inline with other elements or if it
     * is rendered as a block level element.
     */
    isInline: PropTypes.bool,
    /**
     * The width of the text input.
     */
    width: PropTypes.string,
    /**
     * The width of the text input, in characters, if a width is not explicitly
     * provided via the `width` prop. Only applicable if `isInline={true}`.
     */
    htmlSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The max width the options list can be before option text wraps. If not
     * set, the list will only display as wide as the text input.
     */
    optionsMaxWidth: PropTypes.string,
    /**
     * The number of options that should be visible before having to scroll.
     */
    visibleOptionsCount: PropTypes.number,
    /**
     * Displays messages and validation for the input. It should be an object
     * with the following shape:
     * `{
     *   text: PropTypes.string,
     *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
     * }`
     */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
     * The placement of the options list.
     */
    placement: PositionPropTypes.placement,
    /**
     * The parent in which to constrain the placement.
     */
    constrain: PositionPropTypes.constrain,
    /**
     * An element or a function returning an element to use mount the options
     * list to in the DOM (defaults to `document.body`)
     */
    mountNode: PositionPropTypes.mountNode,
    /**
     * Callback fired when text input receives focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback fired when text input loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when text input value changes.
     */
    onInputChange: PropTypes.func,
    /**
     * Callback fired requesting that the options list be shown.
     */
    onRequestShowOptions: PropTypes.func,
    /**
     * Callback fired requesting that the options list be hidden.
     */
    onRequestHideOptions: PropTypes.func,
    /**
     * Callback fired requesting a particular option be highlighted.
     */
    onRequestHighlightOption: PropTypes.func,
    /**
     * Callback fired requesting a particular option be selected.
     */
    onRequestSelectOption: PropTypes.func,
    /**
     * A ref to the html `input` element.
     */
    inputRef: PropTypes.func,
    /**
     * A ref to the html `ul` element.
     */
    listRef: PropTypes.func,
    /**
     * Content to display before the text input. This will commonly be an icon or
     * tags to show multiple selections.
     */
    renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Content to display after the text input. This content will replace the
     * default arrow icons.
     */
    renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Children of type `<Select.Option />` or `<Select.Group />`.
     */
    children: ChildrenPropTypes.oneOf([Group, Option]),
    /**
     * Prevents the default behavior of wrapping the input and rendered content
     * when available space is exceeded.
     */
    shouldNotWrap: PropTypes.bool
  }

  static defaultProps = {
    inputValue: '',
    isShowingOptions: false,
    id: undefined,
    size: 'medium',
    assistiveText: undefined,
    placeholder: null,
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    isRequired: false,
    isInline: false,
    width: undefined,
    htmlSize: undefined,
    optionsMaxWidth: undefined,
    visibleOptionsCount: 8,
    messages: undefined,
    placement: 'bottom stretch',
    constrain: 'window',
    mountNode: undefined,
    onFocus: (event) => {},
    onBlur: (event) => {},
    onInputChange: undefined,
    onRequestShowOptions: (event) => {},
    onRequestHideOptions: (event) => {},
    onRequestHighlightOption: (event, data) => {},
    onRequestSelectOption: (event, data) => {},
    inputRef: (node) => {},
    listRef: (node) => {},
    renderBeforeInput: null,
    renderAfterInput: null,
    children: null,
    shouldNotWrap: false
  }

  state = {
    hasInputRef: false
  }

  _defaultId = uid('Select')
  _assistId = uid('Select-assistiveText')
  _input = null
  _inputContainer = null
  _list = null
  // temporarily stores actionable options
  _optionIds = []
  // best guess for first calculation of list height
  _optionHeight = 36

  focus() {
    this._input && this._input.focus()
  }

  get focused() {
    return this._input && isActiveElement(this._input)
  }

  get id() {
    return this.props.id || this._defaultId
  }

  get width() {
    return this._inputContainer && this._inputContainer.offsetWidth
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get highlightedOptionId() {
    let highlightedOptionId = null
    Children.toArray(this.props.children).forEach((child) => {
      if (matchComponentTypes(child, [Group])) {
        // group found
        Children.toArray(child.props.children).forEach((option) => {
          // check options in group
          if (option.props.isHighlighted) {
            highlightedOptionId = option.props.id
          }
        })
      } else {
        // ungrouped option found
        if (child.props.isHighlighted) {
          highlightedOptionId = child.props.id
        }
      }
    })

    return highlightedOptionId
  }

  get selectedOptionId() {
    let selectedOptionId = []
    Children.toArray(this.props.children).forEach((child) => {
      if (matchComponentTypes(child, [Group])) {
        // group found
        Children.toArray(child.props.children).forEach((option) => {
          // check options in group
          if (option.props.isSelected) {
            selectedOptionId.push(option.props.id)
          }
        })
      } else {
        // ungrouped option found
        if (child.props.isSelected) {
          selectedOptionId.push(child.props.id)
        }
      }
    })

    if (selectedOptionId.length === 1) return selectedOptionId[0]
    if (selectedOptionId.length === 0) return null
    return selectedOptionId
  }

  handleInputRef = (node) => {
    // ensures list is positioned with respect to input if list is open on mount
    if (!this.state.hasInputRef) {
      this.setState({ hasInputRef: true })
    }

    this._input = node
    this.props.inputRef(node)
  }

  handleListRef = (node) => {
    this._list = node
    this.props.listRef(node)
    // store option height to calulcate list maxHeight
    if (node) {
      this._optionHeight = node.querySelector('[role="option"]').offsetHeight
    }
  }

  handleInputContainerRef = (node) => {
    this._inputContainer = node
  }

  componentDidUpdate() {
    // scroll option into view if needed
    this.scrollToOption(this.highlightedOptionId)
  }

  scrollToOption(id) {
    if (this._listView) {
      const option = this._listView.querySelector(`[id="${id}"]`)
      if (!option) return

      const listItem = option.parentNode
      const parentTop = getBoundingClientRect(this._listView).top
      const elemTop = getBoundingClientRect(listItem).top
      const parentBottom = parentTop + this._listView.clientHeight
      const elemBottom = elemTop + listItem.clientHeight

      if (elemBottom > parentBottom) {
        this._listView.scrollTop += elemBottom - parentBottom
      } else if (elemTop < parentTop) {
        this._listView.scrollTop -= parentTop - elemTop
      }
    }
  }

  highlightOption(event, id) {
    const { onRequestHighlightOption } = this.props
    if (id) {
      onRequestHighlightOption(event, { id })
    }
  }

  getEventHandlers() {
    const {
      isShowingOptions,
      onRequestShowOptions,
      onRequestHideOptions,
      onRequestSelectOption
    } = this.props

    const highlightedOptionId = this.highlightedOptionId
    const selectedOptionId = this.selectedOptionId

    return this.interaction === 'enabled'
      ? {
          onRequestShowOptions: (event) => {
            onRequestShowOptions(event)
            if (selectedOptionId && !Array.isArray(selectedOptionId)) {
              // highlight selected option on show
              this.highlightOption(event, selectedOptionId)
            }
          },
          onRequestHideOptions: (event) => {
            onRequestHideOptions(event)
          },
          onRequestHighlightOption: (event, { id, direction }) => {
            if (!isShowingOptions) return
            // if id exists, use that
            let highlightId = this._optionIds.indexOf(id) > -1 ? id : null
            if (!highlightId) {
              if (!highlightedOptionId) {
                // nothing highlighted yet, highlight first option
                highlightId = this._optionIds[0]
              } else {
                // find next id based on direction
                const index = this._optionIds.indexOf(highlightedOptionId)
                highlightId =
                  index > -1 ? this._optionIds[index + direction] : null
              }
            }
            if (highlightId) {
              // only highlight if id exists as a valid option
              this.highlightOption(event, highlightId)
            }
          },
          onRequestHighlightFirstOption: (event) => {
            this.highlightOption(event, this._optionIds[0])
          },
          onRequestHighlightLastOption: (event) => {
            this.highlightOption(
              event,
              this._optionIds[this._optionIds.length - 1]
            )
          },
          onRequestSelectOption: (event, { id }) => {
            if (id && this._optionIds.indexOf(id) !== -1) {
              // only select if id exists as a valid option
              onRequestSelectOption(event, { id })
            }
          }
        }
      : {}
  }

  renderOption(option, data) {
    const { getOptionProps, getDisabledOptionProps } = data
    const {
      id,
      isDisabled,
      isHighlighted,
      isSelected,
      renderBeforeLabel,
      renderAfterLabel,
      children
    } = option.props

    let optionProps = {
      // passthrough props
      ...omitProps(option.props, {
        ...Option.propTypes,
        ...Options.Item.propTypes
      }),
      // props from selectable
      ...getOptionProps({ id }),
      // Options.Item props
      renderBeforeLabel,
      renderAfterLabel
    }
    // should option be treated as highlighted or selected
    if (isSelected) {
      optionProps.variant = 'selected'
    } else if (isHighlighted) {
      optionProps.variant = 'highlighted'
    }
    // should option be treated as disabled
    if (isDisabled) {
      optionProps.variant = 'disabled'
      optionProps = { ...optionProps, ...getDisabledOptionProps() }
    } else {
      // track as valid option if not disabled
      this._optionIds.push(id)
    }

    return <Options.Item {...optionProps}>{children}</Options.Item>
  }

  renderGroup(group, data) {
    const {
      getOptionProps,
      getDisabledOptionProps,
      isFirstChild,
      isLastChild,
      afterGroup
    } = data
    const { id, renderLabel, children, ...rest } = group.props
    const groupChildren = []
    // add a separator above
    if (!isFirstChild && !afterGroup) {
      groupChildren.push(<Options.Separator />)
    }
    // create a sublist as a group
    // a wrapping listitem will be created by Options
    groupChildren.push(
      <Options
        id={id}
        as="ul"
        role="group"
        renderLabel={renderLabel}
        {...omitProps(rest, {
          ...Options.propTypes,
          ...Group.propTypes
        })}
      >
        {Children.map(children, (child) => {
          return this.renderOption(child, {
            getOptionProps,
            getDisabledOptionProps
          })
        })}
      </Options>
    )
    // add a separator below
    if (!isLastChild) {
      groupChildren.push(<Options.Separator />)
    }

    return groupChildren
  }

  renderList(data) {
    const { getListProps, getOptionProps, getDisabledOptionProps } = data
    const {
      isShowingOptions,
      optionsMaxWidth,
      visibleOptionsCount,
      children
    } = this.props

    let lastWasGroup = false
    let viewProps = isShowingOptions
      ? {
          display: 'block',
          overflowY: 'auto',
          maxHeight: this._optionHeight * visibleOptionsCount,
          maxWidth: optionsMaxWidth || this.width,
          background: 'primary',
          elementRef: (node) => (this._listView = node)
        }
      : { maxHeight: 0 }

    return (
      <View {...viewProps}>
        <Options
          {...getListProps({ as: 'ul', elementRef: this.handleListRef })}
        >
          {isShowingOptions
            ? Children.map(children, (child, index) => {
                if (!child || !matchComponentTypes(child, [Group, Option])) {
                  return // ignore invalid children
                }
                if (matchComponentTypes(child, [Option])) {
                  lastWasGroup = false
                  return this.renderOption(child, {
                    getOptionProps,
                    getDisabledOptionProps
                  })
                }
                if (matchComponentTypes(child, [Group])) {
                  const afterGroup = lastWasGroup ? true : false
                  lastWasGroup = true
                  return this.renderGroup(child, {
                    getOptionProps,
                    getDisabledOptionProps,
                    // for rendering separators appropriately
                    isFirstChild: index === 0,
                    isLastChild: index === Children.count(children) - 1,
                    afterGroup
                  })
                }
              })
            : null}
        </Options>
      </View>
    )
  }

  renderIcon() {
    return (
      <span className={styles.icon}>
        {this.props.isShowingOptions ? (
          <IconArrowOpenUpLine inline={false} />
        ) : (
          <IconArrowOpenDownLine inline={false} />
        )}
      </span>
    )
  }

  renderInput(data) {
    const { getInputProps, getTriggerProps } = data
    const {
      renderLabel,
      inputValue,
      placeholder,
      isRequired,
      shouldNotWrap,
      size,
      isInline,
      width,
      htmlSize,
      messages,
      renderBeforeInput,
      renderAfterInput,
      onFocus,
      onBlur,
      onInputChange,
      onRequestHideOptions,
      ...rest
    } = this.props

    const { interaction } = this
    const passthroughProps = omitProps(rest, Select.propTypes)
    const { ref, ...triggerProps } = getTriggerProps({ ...passthroughProps })
    const isEditable = typeof onInputChange !== 'undefined'
    // props to ensure screen readers treat uneditable selects as accessible
    // popup buttons rather than comboboxes.
    const overrideProps = !isEditable
      ? {
          role: 'button',
          title: inputValue,
          'aria-autocomplete': null
        }
      : {}
    // backdoor to autocomplete attr to work around chrome autofill issues
    if (passthroughProps['autoComplete']) {
      overrideProps.autoComplete = passthroughProps['autoComplete']
    }

    return (
      <TextInput
        {...triggerProps}
        {...getInputProps({
          id: this.id,
          renderLabel,
          placeholder,
          size,
          width,
          htmlSize,
          messages,
          value: inputValue,
          inputRef: createChainedFunction(ref, this.handleInputRef),
          inputContainerRef: this.handleInputContainerRef,
          interaction:
            interaction === 'enabled' && !isEditable
              ? 'readonly' // prevent keyboard cursor
              : interaction,
          isRequired,
          shouldNotWrap,
          display: isInline ? 'inline-block' : 'block',
          renderBeforeInput,
          renderAfterInput: renderAfterInput || this.renderIcon(),
          onChange: onInputChange,
          onFocus,
          onBlur: createChainedFunction(onBlur, onRequestHideOptions),
          ...overrideProps
        })}
      />
    )
  }

  render() {
    const {
      size,
      constrain,
      placement,
      mountNode,
      assistiveText,
      isShowingOptions
    } = this.props
    // clear temporary option store
    this._optionIds = []

    const highlightedOptionId = this.highlightedOptionId
    const selectedOptionId = this.selectedOptionId
    const classes = classnames(styles.root, {
      [styles[size]]: size
    })

    return (
      <Selectable
        highlightedOptionId={highlightedOptionId}
        isShowingOptions={isShowingOptions}
        selectedOptionId={selectedOptionId ? selectedOptionId : null}
        {...this.getEventHandlers()}
      >
        {({
          getRootProps,
          getInputProps,
          getTriggerProps,
          getListProps,
          getOptionProps,
          getDisabledOptionProps,
          getDescriptionProps
        }) => (
          <span {...getRootProps({ className: classes })}>
            {this.renderInput({ getInputProps, getTriggerProps })}
            <span {...getDescriptionProps()} className={styles.assistiveText}>
              {assistiveText}
            </span>
            <Popover
              constrain={constrain}
              placement={placement}
              mountNode={mountNode}
              positionTarget={this._inputContainer}
              isShowingContent={isShowingOptions}
              shouldReturnFocus={false}
              withArrow={false}
            >
              {this.renderList({
                getListProps,
                getOptionProps,
                getDisabledOptionProps
              })}
            </Popover>
          </span>
        )}
      </Selectable>
    )
  }
}

export default Select
export { Select }
