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

/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React, { Component } from 'react'

import { withStyle, jsx } from '@instructure/emotion'
import { warn, error } from '@instructure/console'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { isValid, contrast as getContrast } from '@instructure/ui-color-utils'
import conversions from '@instructure/ui-color-utils'
import { TextInput } from '@instructure/ui-text-input'
import { Tooltip } from '@instructure/ui-tooltip'
import { Button, IconButton } from '@instructure/ui-buttons'
import { Popover } from '@instructure/ui-popover'
import {
  IconCheckDarkLine,
  IconWarningLine,
  IconTroubleLine,
  IconInfoLine
} from '@instructure/ui-icons'
import type { FormMessage } from '@instructure/ui-form-field'

import ColorIndicator from '../ColorIndicator'
import ColorMixer from '../ColorMixer'
import ColorContrast from '../ColorContrast'
import ColorPreset from '../ColorPreset'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  ColorPickerProps,
  ColorPickerState,
  ContrastStrength
} from './props'

const acceptedCharactersForHEX = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'A',
  'b',
  'B',
  'c',
  'C',
  'd',
  'D',
  'e',
  'E',
  'f',
  'F',
  null
]

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static readonly componentId = 'ColorPicker'

  static defaultProps = {
    disabled: false,
    withAlpha: false,
    width: '22.5rem',
    popoverMaxHeight: '100vh'
  }

  constructor(props: ColorPickerProps) {
    super(props)

    this.state = {
      hexCode: '',
      showHelperErrorMessages: false,
      openColorPicker: false,
      mixedColor: '',
      labelHeight: 0
    }
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  inputContainerRef: Element | null = null

  handleInputContainerRef = (el: Element | null) => {
    this.inputContainerRef = el
    this.setLabelHeight()
  }

  setLabelHeight = () => {
    if (this.inputContainerRef) {
      this.setState({
        labelHeight:
          this.inputContainerRef.getBoundingClientRect().y -
          (this.inputContainerRef.parentElement?.getBoundingClientRect().y || 0)
      })
    }
  }

  componentDidMount() {
    this.props.makeStyles?.({ ...this.state, isSimple: this.isSimple })
    this.checkSettings()

    this.props.value && this.setState({ hexCode: this.props.value?.slice(1) })
  }

  componentDidUpdate(prevProps: ColorPickerProps) {
    this.props.makeStyles?.({ ...this.state, isSimple: this.isSimple })

    if (prevProps.value !== this.props.value) {
      this.setState({
        showHelperErrorMessages: false,
        hexCode: this.props.value?.slice(1) || ''
      })
    }
    this.checkSettings()
  }

  checkSettings = () => {
    if (this.props.children && this.props.colorMixerSettings) {
      warn(
        false,
        'You should either use children, colorMixerSettings or neither, not both. In this case, the colorMixerSettings will be ignored.',
        ''
      )
    }

    if (this.props.value && typeof this.props.onChange !== 'function') {
      error(
        false,
        'You provided a `value` prop on ColorPicker, which will render a controlled component. Please provide an `onChange` handler.'
      )
    }
  }

  get renderMode() {
    if (this.props.children) {
      return 'customPopover'
    }
    if (this.props.colorMixerSettings) {
      return 'defaultPopover'
    }
    return 'simple'
  }

  get isSimple() {
    return this.renderMode === 'simple'
  }
  get isDefaultPopover() {
    return this.renderMode === 'defaultPopover'
  }
  get isCustomPopover() {
    return this.renderMode === 'customPopover'
  }

  get mixedColorWithStrippedAlpha() {
    const { mixedColor } = this.state
    return mixedColor.length === 8 && mixedColor.slice(-2) === 'FF'
      ? mixedColor.slice(0, -2)
      : mixedColor
  }

  getMinContrast(strength: ContrastStrength) {
    return { min: 3, mid: 4.5, max: 7 }[strength]
  }

  renderMessages() {
    const { hexCode, showHelperErrorMessages } = this.state

    const isValidHex = isValid(hexCode)
    const {
      checkContrast,
      renderMessages,
      renderInvalidColorMessage,
      renderIsRequiredMessage,
      isRequired
    } = this.props
    const contrast = isValidHex
      ? getContrast(
          this.props.checkContrast?.contrastAgainst || '#fff',
          hexCode,
          2
        )
      : undefined
    const contrastStrength = checkContrast?.contrastStrength
      ? checkContrast.contrastStrength
      : 'mid'

    const minContrast = this.getMinContrast(contrastStrength)
    let invalidColorMessages: FormMessage[] = []
    let isRequiredMessages: FormMessage[] = []
    let generalMessages: FormMessage[] = []
    let contrastMessages: FormMessage[] = []

    if (checkContrast && contrast) {
      const { renderContrastSuccessMessage, renderContrastErrorMessage } =
        checkContrast

      if (contrast < minContrast) {
        contrastMessages =
          typeof renderContrastErrorMessage === 'function'
            ? renderContrastErrorMessage(contrast, minContrast)
            : checkContrast.isStrict
            ? [{ type: 'error', text: '' }]
            : []
      } else if (typeof renderContrastSuccessMessage === 'function') {
        contrastMessages = renderContrastSuccessMessage(contrast, minContrast)
      }
    }
    if (
      showHelperErrorMessages &&
      hexCode !== '' &&
      !isValidHex &&
      typeof renderInvalidColorMessage === 'function'
    ) {
      invalidColorMessages = renderInvalidColorMessage(hexCode)
    }

    if (isRequired && showHelperErrorMessages && hexCode === '') {
      isRequiredMessages =
        typeof renderIsRequiredMessage === 'function'
          ? renderIsRequiredMessage()
          : [{ type: 'error', text: '' }]
    }
    if (typeof renderMessages === 'function') {
      generalMessages = renderMessages(
        hexCode,
        isValidHex,
        minContrast,
        contrast
      )
    }

    return [
      ...invalidColorMessages,
      ...isRequiredMessages,
      ...generalMessages,
      ...contrastMessages
    ]
  }

  renderBeforeInput() {
    const { styles } = this.props
    return (
      <div css={styles?.simpleColorContainer}>
        {this.isSimple && <ColorIndicator color={`#${this.state.hexCode}`} />}
        <div css={styles?.hashMarkContainer}>#</div>
      </div>
    )
  }

  renderAfterInput() {
    const { checkContrast, styles } = this.props
    const { hexCode } = this.state

    if (checkContrast && isValid(hexCode)) {
      const contrast = getContrast(
        checkContrast.contrastAgainst || '#fff',
        hexCode,
        2
      )
      const minContrast = this.getMinContrast(
        checkContrast.contrastStrength ? checkContrast.contrastStrength : 'mid'
      )

      if (minContrast >= contrast) {
        return (
          <div css={styles?.errorIcons}>
            {checkContrast.isStrict ? <IconTroubleLine /> : <IconWarningLine />}
          </div>
        )
      }
      return (
        <div css={styles?.successIcon}>
          <IconCheckDarkLine />
        </div>
      )
    }
    return null
  }

  handleOnChange(_event: React.ChangeEvent<HTMLInputElement>, value: string) {
    const { onChange } = this.props

    if (
      value.length > (this.props.withAlpha ? 8 : 6) ||
      value
        .split('')
        .find((char) => !acceptedCharactersForHEX.includes(char)) !== undefined
    ) {
      return
    }

    if (typeof onChange === 'function') {
      onChange(`#${value}`)
    } else {
      this.setState({
        showHelperErrorMessages: false,
        hexCode: value
      })
    }
  }

  handleOnPaste(event: React.ClipboardEvent<unknown>) {
    const pasted = event.clipboardData.getData('Text')
    let toPaste = pasted
    if (pasted[0] && pasted[0] === '#') {
      toPaste = pasted.slice(1)
    }

    if (
      (this.props.withAlpha && toPaste.length > 8) ||
      (!this.props.withAlpha && toPaste.length > 6)
    ) {
      return event.preventDefault()
    }

    const newHex = `${this.state.hexCode}${toPaste}`
    if (isValid(newHex)) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(`#${newHex}`)
      } else {
        this.setState({
          showHelperErrorMessages: false,
          hexCode: newHex
        })
      }
    }

    event.preventDefault()
  }

  handleOnBlur() {
    this.setState({ showHelperErrorMessages: true })
  }

  renderLabel() {
    const { label, tooltip, styles } = this.props

    return tooltip ? (
      <span>
        <span css={styles?.label}>{label}</span>
        <span>
          <Tooltip renderTip={tooltip}>
            <IconInfoLine tabIndex={-1} />
          </Tooltip>
        </span>
      </span>
    ) : (
      label
    )
  }

  renderPopover = () => (
    <Popover
      renderTrigger={
        <IconButton
          disabled={this.props.disabled}
          screenReaderLabel={this.props.popoverButtonScreenReaderLabel || ''}
        >
          <ColorIndicator color={`#${this.state.hexCode}`} />
        </IconButton>
      }
      isShowingContent={this.state.openColorPicker}
      onShowContent={() => {
        this.setState({ openColorPicker: true, mixedColor: this.state.hexCode })
      }}
      onHideContent={() => {
        this.setState({ openColorPicker: false })
      }}
      on="click"
      screenReaderLabel={this.props.popoverScreenReaderLabel}
      shouldContainFocus
      shouldReturnFocus
      shouldCloseOnDocumentClick
      offsetY="10rem"
    >
      <div css={this.props.styles?.popoverContentContainer}>
        {this.isDefaultPopover
          ? this.renderDefaultPopoverContent()
          : this.renderCustomPopoverContent()}
      </div>
    </Popover>
  )

  renderCustomPopoverContent = () => {
    const { children, onChange } = this.props

    return (
      <div>
        {typeof children === 'function' &&
          children(
            `#${this.mixedColorWithStrippedAlpha}`,
            (newColor: string) => {
              this.setState({
                mixedColor: conversions.colorToHex8(newColor).slice(1)
              })
            },
            () => {
              this.setState({
                openColorPicker: false,
                hexCode: this.mixedColorWithStrippedAlpha
              })
              onChange?.(`#${this.mixedColorWithStrippedAlpha}`)
            },
            () =>
              this.setState({
                openColorPicker: false,
                mixedColor: this.state.hexCode
              })
          )}
      </div>
    )
  }

  renderDefaultPopoverContent = () => (
    <>
      <div css={this.props.styles?.popoverContent}>
        {this.props?.colorMixerSettings?.colorMixer && (
          <ColorMixer
            value={`#${this.state.mixedColor}`}
            onChange={(newColor: string) =>
              this.setState({
                mixedColor: conversions.colorToHex8(newColor).slice(1)
              })
            }
            withAlpha={this.props.colorMixerSettings.colorMixer.withAlpha}
            rgbRedInputScreenReaderLabel={
              this.props.colorMixerSettings.colorMixer
                .rgbRedInputScreenReaderLabel
            }
            rgbGreenInputScreenReaderLabel={
              this.props.colorMixerSettings.colorMixer
                .rgbGreenInputScreenReaderLabel
            }
            rgbBlueInputScreenReaderLabel={
              this.props.colorMixerSettings.colorMixer
                .rgbBlueInputScreenReaderLabel
            }
            rgbAlphaInputScreenReaderLabel={
              this.props.colorMixerSettings.colorMixer
                .rgbAlphaInputScreenReaderLabel
            }
            colorSliderNavigationExplanationScreenReaderLabel={
              this.props.colorMixerSettings!.colorMixer
                .colorSliderNavigationExplanationScreenReaderLabel
            }
            alphaSliderNavigationExplanationScreenReaderLabel={
              this.props.colorMixerSettings!.colorMixer
                .alphaSliderNavigationExplanationScreenReaderLabel
            }
            colorPaletteNavigationExplanationScreenReaderLabel={
              this.props.colorMixerSettings!.colorMixer
                .colorPaletteNavigationExplanationScreenReaderLabel
            }
          />
        )}
        {this.props?.colorMixerSettings?.colorPreset && (
          <div css={this.props.styles?.popoverContentBlock}>
            <ColorPreset
              label={this.props.colorMixerSettings.colorPreset.label}
              colors={this.props.colorMixerSettings.colorPreset.colors}
              selected={
                this.mixedColorWithStrippedAlpha
                  ? `#${this.mixedColorWithStrippedAlpha}`
                  : undefined
              }
              onSelect={(color: string) =>
                this.setState({ mixedColor: color.slice(1) })
              }
            />
          </div>
        )}
        {this.props?.colorMixerSettings?.colorContrast && (
          <div css={this.props.styles?.popoverContentBlock}>
            <ColorContrast
              firstColor={
                this.props.colorMixerSettings.colorContrast.firstColor
              }
              secondColor={`#${this.mixedColorWithStrippedAlpha}`}
              label={this.props.colorMixerSettings.colorContrast.label}
              successLabel={
                this.props.colorMixerSettings.colorContrast.successLabel
              }
              failureLabel={
                this.props.colorMixerSettings.colorContrast.failureLabel
              }
              normalTextLabel={
                this.props.colorMixerSettings.colorContrast.normalTextLabel
              }
              largeTextLabel={
                this.props.colorMixerSettings.colorContrast.largeTextLabel
              }
              graphicsTextLabel={
                this.props.colorMixerSettings.colorContrast.graphicsTextLabel
              }
              firstColorLabel={
                this.props.colorMixerSettings.colorContrast.firstColorLabel
              }
              secondColorLabel={
                this.props.colorMixerSettings.colorContrast.secondColorLabel
              }
              onContrastChange={
                this.props.colorMixerSettings.colorContrast.onContrastChange
              }
            />
          </div>
        )}
      </div>
      <div css={this.props.styles?.popoverFooter}>
        <Button
          onClick={() =>
            this.setState({
              openColorPicker: false,
              mixedColor: this.state.hexCode
            })
          }
          color="secondary"
          margin="xx-small"
        >
          {this.props.colorMixerSettings?.popoverCloseButtonLabel}
        </Button>
        <Button
          onClick={() => {
            if (typeof this.props.onChange === 'function') {
              this.props.onChange(`#${this.mixedColorWithStrippedAlpha}`)
              this.setState({
                openColorPicker: false
              })
            } else {
              this.setState({
                openColorPicker: false,
                hexCode: `${this.mixedColorWithStrippedAlpha}`
              })
            }
          }}
          color="primary"
          margin="xx-small"
        >
          {this.props.colorMixerSettings?.popoverAddButtonLabel}
        </Button>
      </div>
    </>
  )

  render() {
    const { disabled, isRequired, placeholderText, width, id } = this.props

    return (
      <div
        {...omitProps(this.props, ColorPicker.allowedProps)}
        css={this.props.styles?.colorPicker}
        ref={this.handleRef}
      >
        <TextInput
          id={id}
          isRequired={isRequired}
          disabled={disabled}
          renderLabel={() => this.renderLabel()}
          display="inline-block"
          width={width}
          placeholder={placeholderText}
          themeOverride={{ padding: '' }}
          renderAfterInput={this.renderAfterInput()}
          renderBeforeInput={this.renderBeforeInput()}
          inputContainerRef={this.handleInputContainerRef}
          value={this.state.hexCode}
          onChange={(event, value) => this.handleOnChange(event, value)}
          onPaste={(event) => this.handleOnPaste(event)}
          onBlur={() => this.handleOnBlur()}
          messages={this.renderMessages()}
        />
        {!this.isSimple && (
          <div
            css={this.props.styles?.colorMixerButtonContainer}
            style={{ paddingTop: this.state.labelHeight }}
          >
            <div css={this.props.styles?.colorMixerButtonWrapper}>
              {this.renderPopover()}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export { ColorPicker }
export default ColorPicker
