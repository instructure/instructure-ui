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

import { passthroughProps } from '@instructure/ui-react-utils'
import { TextInput } from '@instructure/ui-text-input'
import { Tooltip } from '@instructure/ui-tooltip'
import { Button, IconButton } from '@instructure/ui-buttons'
import {
  colorToHex8,
  isValid,
  contrast as getContrast
} from '@instructure/ui-color-utils'
import ColorIndicator from '../ColorIndicator'

import { withStyle, jsx } from '@instructure/emotion'
import { warn } from '@instructure/console'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { Popover } from '@instructure/ui-popover'
import ColorMixer from '../ColorMixer'
import ColorContrast from '../ColorContrast'
import ColorPreset from '../ColorPreset'
import {
  IconCheckDarkLine,
  IconWarningLine,
  IconTroubleLine,
  IconInfoLine
} from '@instructure/ui-icons'
import type {
  ColorPickerProps,
  ColorPickerState,
  ContrastStrength,
  MessageType
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
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  constructor(props: ColorPickerProps) {
    super(props)

    this.state = {
      hexCode: '',
      showHelperErrorMessages: false,
      openColorPicker: false,
      mixedColor: ''
    }
  }

  static defaultProps = {
    elementRef: () => null,
    disabled: false,
    label: 'Color',
    checkContrast: false,
    width: '22.5rem',
    withAlpha: false
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.({ ...this.state, isSimple: this.isSimple })
    this.checkSettings()
  }

  componentDidUpdate(prevProps: ColorPickerProps) {
    this.props.makeStyles?.({ ...this.state, isSimple: this.isSimple })

    if (
      prevProps.value !== this.props.value &&
      this.props.value !== this.state.hexCode
    ) {
      this.setState({
        showHelperErrorMessages: false,
        hexCode: this.props.value || ''
      })
    }
    this.checkSettings()
  }

  checkSettings = () => {
    if (this.props.children && this.props.colorMixerSettings) {
      warn(
        false,
        'You should either use children, colorMixerSettings or neither, not both. In this case, the colorMixerSettings will be ignored',
        ''
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
    let invalidColorMessages: MessageType = []
    let isRequiredMessages: MessageType = []
    let generalMessages: MessageType = []
    let contrastMessages: MessageType = []

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
          : [{ type: 'error', text: '*' }]
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

  handleOnChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
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
      onChange(`${value}`)
    }
    this.setState({
      showHelperErrorMessages: false,
      hexCode: value,
      mixedColor: `${value}`
    })
  }

  //TODO remove any
  handleOnPaste(event: any) {
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
        this.props.onChange(`${newHex}`)
      }
      this.setState({
        hexCode: newHex,
        mixedColor: `${newHex}`
      })
      return event.preventDefault()
    }

    event.preventDefault()
  }

  handleOnBlur() {
    this.setState({ showHelperErrorMessages: true })
  }

  renderLabel() {
    const { label, tooltip, styles } = this.props

    return tooltip ? (
      <div>
        <span css={styles?.label}>{label}</span>
        <span>
          <Tooltip renderTip={tooltip}>
            <IconInfoLine tabIndex={0} />
          </Tooltip>
        </span>
      </div>
    ) : (
      label
    )
  }

  stripAlphaIfNeeded = (hex: string) =>
    hex.length === 8 && hex.slice(-2) === 'FF' ? hex.slice(0, -2) : hex

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
        this.setState({ openColorPicker: true })
      }}
      onHideContent={() => {
        this.setState({ openColorPicker: false })
      }}
      on="click"
      screenReaderLabel={this.props.popoverScreenReaderLabel || ''}
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

  renderCustomPopoverContent = () => (
    <div css={this.props.styles?.popoverContent}>
      {typeof this.props?.children === 'function' &&
        this.props?.children(
          this.stripAlphaIfNeeded(this.state.mixedColor),
          (color: string) => {
            this.setState({ mixedColor: color })
          },
          () => {
            this.setState({
              openColorPicker: false,
              hexCode: `${this.stripAlphaIfNeeded(this.state.mixedColor)}`
            })
            this.props?.onChange?.(
              this.stripAlphaIfNeeded(this.state.mixedColor.slice(1))
            )
          },
          () =>
            this.setState({
              openColorPicker: false,
              mixedColor: this.state.hexCode
            })
        )}
    </div>
  )
  renderDefaultPopoverContent = () => (
    <>
      <div css={this.props.styles?.popoverContent}>
        {this.props?.colorMixerSettings?.colorMixer && (
          <ColorMixer
            value={`#${this.state.mixedColor}`}
            onChange={(newColor: string) =>
              this.setState({ mixedColor: colorToHex8(newColor).slice(1) })
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
          />
        )}
        {this.props?.colorMixerSettings?.colorPreset && (
          <div css={this.props.styles?.popoverContentBlock}>
            <ColorPreset
              label={this.props.colorMixerSettings.colorPreset.label}
              colors={this.props.colorMixerSettings.colorPreset.colors}
              selected={this.state.mixedColor}
              addNewPresetButtonScreenReaderLabel={
                this.props.colorMixerSettings.colorPreset
                  .addNewPresetButtonScreenReaderLabel
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
              secondColor={`#${this.stripAlphaIfNeeded(this.state.mixedColor)}`}
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
              this.props.onChange(
                `${this.stripAlphaIfNeeded(this.state.mixedColor)}`
              )
            }
            this.setState({
              openColorPicker: false,
              hexCode: `${this.stripAlphaIfNeeded(this.state.mixedColor)}`
            })
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
    const {
      checkContrast,
      colorMixerSettings,
      disabled,
      elementRef,
      isRequired,
      label,
      onChange,
      placeholderText,
      popoverButtonScreenReaderLabel,
      renderInvalidColorMessage,
      renderIsRequiredMessage,
      renderMessages,
      tooltip,
      value,
      width,
      withAlpha,
      ...props
    } = this.props
    return (
      <div
        {...passthroughProps(props)}
        css={this.props.styles?.colorPicker}
        ref={this.handleRef}
      >
        <TextInput
          isRequired={isRequired}
          disabled={disabled}
          renderLabel={() => this.renderLabel()}
          display="inline-block"
          width={width}
          placeholder={placeholderText}
          themeOverride={{ padding: '' }}
          renderAfterInput={this.renderAfterInput()}
          renderBeforeInput={this.renderBeforeInput()}
          value={this.state.hexCode}
          onChange={(event, value) => this.handleOnChange(event, value)}
          onPaste={(event) => this.handleOnPaste(event)}
          onBlur={() => this.handleOnBlur()}
          messages={this.renderMessages()}
        />
        {!this.isSimple && (
          <div css={this.props.styles?.colorMixerButtonContainer}>
            {this.renderPopover()}
          </div>
        )}
      </div>
    )
  }
}

export { ColorPicker }
export default ColorPicker
