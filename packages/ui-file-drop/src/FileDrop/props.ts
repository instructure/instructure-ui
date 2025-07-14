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



import { FormPropTypes } from '@instructure/ui-form-field'

import type { FormMessage } from '@instructure/ui-form-field'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  FileDropTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'
type RenderLabelProps = {
  isDragAccepted: boolean
  isDragRejected: boolean
  interaction: FileDropOwnProps['interaction']
}
type FileDropOwnProps = {
  /**
   * The id of the input (to link it to its label for a11y)
   */
  id?: string
  /**
   * The content of FileDrop; can be a component or React node.
   * Components receive `isDragAccepted` and `isDragRejected` as props.
   */
  renderLabel: Renderable<RenderLabelProps>
  /**
   * The mime media type/s or file extension/s allowed to be dropped inside
   */
  accept?: string | string[]
  /**
   * object with shape: `{
   * text: PropTypes.node,
   * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   *   }`
   */
  messages?: FormMessage[]
  /**
   * Called when clicking on drop area to select files to upload
   */
  onClick?: (e: React.MouseEvent) => void
  /**
   * Called when dropping files or when file dialog window exits successfully
   */
  onDrop?: (
    accepted: ArrayLike<DataTransferItem | File>,
    rejected: ArrayLike<DataTransferItem | File>,
    e: React.DragEvent
  ) => void
  /**
   * Called when dropping allowed files
   */
  onDropAccepted?: (
    accepted: ArrayLike<DataTransferItem | File>,
    e: React.DragEvent | React.ChangeEvent
  ) => void
  /**
   * Called when dropping rejected files
   */
  onDropRejected?: (
    rejected: ArrayLike<DataTransferItem | File>,
    e: React.DragEvent | React.ChangeEvent
  ) => void
  /**
   * Called when dragging files
   * and passing through FileDrop's content for the first time
   */
  onDragEnter?: (e: React.DragEvent) => void
  /**
   * Called when dragging files and passing through FileDrop's content
   */
  onDragOver?: (e: React.DragEvent) => void
  /**
   * Called when dragging files and leaving FileDrop's content
   */
  onDragLeave?: (e: React.DragEvent) => void
  /**
   * Flag to use window.URL.createObjectURL for each dropped file and pass it through file.preview
   */
  shouldEnablePreview?: boolean
  /**
   * Flag to allow multiple files to drop at once
   */
  shouldAllowMultiple?: boolean
  /**
   * Flag to allow upload of the same file more than once
   */
  shouldAllowRepeats?: boolean
  /**
   * the maximum file size allowed
   */
  maxSize?: number
  /**
   * the minimum file size allowed
   */
  minSize?: number
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'
  /**
   * Set the CSS `display` property on FileInput's outermost element
   */
  display?: 'block' | 'inline-block'
  /**
   * Set the CSS `height` property on FileInput's outermost element
   */
  height?: string | number
  /**
   * Set the CSS `width` property on FileInput's outermost element
   */
  width?: string | number
  /**
   * Set the CSS `maxWidth` property on FileInput's outermost element
   */
  maxWidth?: string | number
  /**
   * Set the CSS `minWidth` property on FileInput's outermost element
   */
  minWidth?: string | number
  /**
   * Valid values are 0, none, auto, xxx-small, xx-small, x-small, small,
   * medium, large, x-large, xx-large. Apply these values via familiar
   * CSS-like shorthand. For example: margin="small auto large".
   */
  margin?: Spacing
  /**
   * A function that provides a reference to the actual input element
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void
}

type FileDropState = {
  isDragAccepted: boolean
  isDragRejected: boolean
  isFocused: boolean
  isFileBrowserDisplayed: boolean
}

type FileDropStyleProps = {
  functionallyDisabled: boolean
  visuallyDisabled: boolean
  dragRejected: boolean
  dragAccepted: boolean
}

type PropKeys = keyof FileDropOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FileDropProps = FileDropOwnProps &
  WithStyleProps<FileDropTheme, FileDropStyle> &
  OtherHTMLAttributes<FileDropOwnProps> &
  WithDeterministicIdProps

type FileDropStyle = ComponentStyle<
  'fileDropLabel' | 'fileDropInput' | 'fileDropLabelContent' | 'fileDropLayout'
>
const allowedProps: AllowedPropKeys = [
  'id',
  'renderLabel',
  'accept',
  'messages',
  'onClick',
  'onDrop',
  'onDropAccepted',
  'onDropRejected',
  'onDragEnter',
  'onDragOver',
  'onDragLeave',
  'shouldEnablePreview',
  'shouldAllowMultiple',
  'shouldAllowRepeats',
  'maxSize',
  'minSize',
  'interaction',
  'display',
  'height',
  'width',
  'maxWidth',
  'minWidth',
  'margin',
  'inputRef'
]

export type { FileDropProps, FileDropState, FileDropStyleProps, FileDropStyle }
export { allowedProps }
