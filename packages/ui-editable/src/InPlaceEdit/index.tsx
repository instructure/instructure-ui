/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { Flex } from '@instructure/ui-flex'
import { IconButton } from '@instructure/ui-buttons'
import { IconEditLine } from '@instructure/ui-icons'
import { logWarn as warn } from '@instructure/console'
import { createChainedFunction } from '@instructure/ui-utils'
import { withStyle, jsx } from '@instructure/emotion'
import { View } from '@instructure/ui-view'

import { Editable } from '../Editable'
import generateStyle from './styles'

type Props = {
  renderViewer: (...args: any[]) => any
  renderEditor: (...args: any[]) => any
  renderEditButton: (...args: any[]) => any
  mode: 'view' | 'edit'
  onChangeMode: (...args: any[]) => any
  value?: any
  onChange?: (...args: any[]) => any
  readOnly?: boolean
  showFocusRing?: boolean
  editButtonPlacement?: 'start' | 'end'
  inline?: boolean
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
category: components
---
**/
@withStyle(generateStyle, null)
class InPlaceEdit extends Component<Props> {
  static componentId = 'InPlaceEdit'
  static propTypes = {
    /**
     * Function to render the view mode component.
     * It is the consumer's responsibility to provide the
     * current value or children.
     *
     * @returns {element} the viewer DOM sub-tree.
     */
    renderViewer: PropTypes.func.isRequired,
    /**
     * Function to render the edit mode component
     * It is the consumer's responsibility to provide the
     * current value, and to attach the appropriate onChange
     * event handler needed to capture the updated value. This
     * new value must then be forwarded to the view mode component.
     *
     * @returns {element} the editor DOM sub-tree.
     */
    renderEditor: PropTypes.func.isRequired,
    /**
     * Function to render the edit button.
     *
     * @param {Object} { isVisible, onClick, onFocus, onBlur, buttonRef }
     * @returns {element} the edit button DOM sub-tree
     *
     * If you choose to use the default edit button, add `label` to the
     * incoming `props` parameter and call `InPlaceEdit.renderDefaultEditButton(props)`
     *
     * If you choose to render a custom button, attach the on* event handlers
     * and set `buttonRef` as a `ref` type property on the `button` element.
     *
     * `isVisible` is a hint as to whether the button is _typically_ shown,
     * but you're free to ignore it for your use-case.
     */
    renderEditButton: PropTypes.func.isRequired,
    /**
     * If `'view'`: the view component is rendered,
     * if `'edit'`: the edit component is rendered
     */
    mode: PropTypes.oneOf(['view', 'edit']).isRequired,
    /**
     * Called when the component's mode changes
     * @param {string} newMode
     */
    onChangeMode: PropTypes.func.isRequired,
    /**
     * The current value.
     * The value is managed by the consuming app, but we need to tell InPlaceEdit
     * it's changed or it won't re-render
     */
    value: PropTypes.any,
    /**
     * Called when Editable switches from edit to view mode and the value has changed.
     * @param {any} value
     */
    onChange: PropTypes.func,
    /**
     * The mode is fixed as 'view'
     */
    readOnly: PropTypes.bool,
    /**
     * Show a focus outline when the input is focused
     */
    showFocusRing: PropTypes.bool,
    /**
     * Put the edit button before or after the view
     */
    editButtonPlacement: PropTypes.oneOf(['start', 'end']),
    /**
     * Render outermost element inline v. block
     */
    inline: PropTypes.bool,

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    readOnly: false,
    showFocusRing: true,
    inline: true,
    value: undefined,
    editButtonPlacement: 'end',
    onChange: undefined
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    warn(
      props.readOnly ? props.mode === 'view' : true,
      '[InPlaceEdit] When readOnly is true, mode is forced to "view"'
    )
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleEditButtonRef = (el) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_editButtonRef' does not exist on type '... Remove this comment to see the full error message
    this._editButtonRef = el
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'mode' implicitly has an 'any' typ... Remove this comment to see the full error message
  renderEditor({ mode, onBlur, editorRef, readOnly }) {
    const { showFocusRing, renderEditor } = this.props
    const isEditMode = !readOnly && mode === 'edit'

    return isEditMode ? (
      <View
        as="span"
        display="block"
        withFocusOutline={showFocusRing}
        position="relative"
        // @ts-expect-error ts-migrate(2322) FIXME:
        css={this.props.styles.inPlaceEdit}
        borderRadius="medium"
      >
        {renderEditor({ onBlur, editorRef })}
      </View>
    ) : null
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'readOnly' implicitly has an 'any'... Remove this comment to see the full error message
  renderViewer({ readOnly, mode }) {
    return readOnly || mode === 'view' ? this.props.renderViewer() : null
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'buttonRef' implicitly has an 'any... Remove this comment to see the full error message
  renderEditButton({ buttonRef, ...rest }) {
    return this.props.renderEditButton({
      elementRef: createChainedFunction(this.handleEditButtonRef, buttonRef),
      ...rest
    })
  }

  // Render a default edit button, an icon button with the edit icon
  // the margin makes room for the focus ring
  static renderDefaultEditButton = ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'isVisible' implicitly has an 'any... Remove this comment to see the full error message
    isVisible,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'readOnly' implicitly has an 'any'... Remove this comment to see the full error message
    readOnly,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
    label,
    ...buttonProps
  }) => {
    if (readOnly) {
      return null
    }
    return (
      <IconButton
        size="small"
        screenReaderLabel={label}
        withBackground={false}
        withBorder={false}
        {...buttonProps}
      >
        {isVisible ? IconEditLine : null}
      </IconButton>
    )
  }

  renderAll = ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getContainerProps' implicitly has... Remove this comment to see the full error message
    getContainerProps,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getViewerProps' implicitly has an... Remove this comment to see the full error message
    getViewerProps,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getEditorProps' implicitly has an... Remove this comment to see the full error message
    getEditorProps,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getEditButtonProps' implicitly ha... Remove this comment to see the full error message
    getEditButtonProps
  }) => {
    const flexDir =
      this.props.editButtonPlacement === 'start' ? 'row-reverse' : 'row'
    const justifyItems = flexDir === 'row-reverse' ? 'end' : 'start'
    const buttonMargin =
      this.props.editButtonPlacement === 'start'
        ? '0 xx-small 0 0'
        : '0 0 0 xx-small'
    return (
      <Flex
        display={this.props.inline ? 'inline-flex' : 'flex'}
        direction={flexDir}
        justifyItems={justifyItems}
        {...getContainerProps()}
      >
        <Flex.Item shouldGrow shouldShrink>
          {this.renderEditor(getEditorProps())}
          {this.renderViewer(getViewerProps())}
        </Flex.Item>
        <Flex.Item margin={buttonMargin}>
          {this.renderEditButton(getEditButtonProps())}
        </Flex.Item>
      </Flex>
    )
  }

  render() {
    const { mode, value, onChange, onChangeMode, readOnly } = this.props

    return (
      <Editable
        mode={mode}
        onChangeMode={onChangeMode}
        render={this.renderAll}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    )
  }
}

export default InPlaceEdit
export { InPlaceEdit }
