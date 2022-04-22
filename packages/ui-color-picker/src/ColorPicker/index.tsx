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
import { Component } from 'react'

import { TextInput } from '@instructure/ui-text-input'
import { Tooltip } from '@instructure/ui-tooltip'
import { IconButton, Button } from '@instructure/ui-buttons'
import {
  colorTohex8,
  hexToRgb
} from '@instructure/ui-color-utils/src/conversions'
import { isValid } from '@instructure/ui-color-utils/src/isValid'
import { getContrast2Dec as getContrast } from '@instructure/ui-color-utils/src/contrast'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { Popover } from '@instructure/ui-popover'
import ColorMixer from '../ColorMixer'
import ColorContrast from '../ColorContrast'
import {
  IconCheckDarkLine,
  IconWarningLine,
  IconTroubleLine,
  IconInfoLine
} from '@instructure/ui-icons'
import {
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
      hexCode: '#',
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
    simpleView: true,
    width: '360px'
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
    this.props.makeStyles?.(this.state)
  }

  componentDidUpdate(prevProps: ColorPickerProps) {
    this.props.makeStyles?.(this.state)

    if (this.props.value && prevProps.value !== this.props.value) {
      const hexCode = this.props.value
      this.setState({
        showHelperErrorMessages: false,
        hexCode
      })
    }
  }

  renderCircle() {
    return <div css={this.props.styles?.colorCircle} />
  }

  getminContrast(strength: ContrastStrength) {
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
    const contrast =
      this.props?.checkContrast?.contrastAgainst && isValidHex
        ? getContrast(this.props.checkContrast.contrastAgainst, hexCode)
        : undefined
    const contrastStrength = checkContrast?.contrastStrength
      ? checkContrast.contrastStrength
      : 'mid'

    const minContrast = this.getminContrast(contrastStrength)
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
      hexCode !== '#' &&
      !isValidHex &&
      typeof renderInvalidColorMessage === 'function'
    ) {
      invalidColorMessages = renderInvalidColorMessage(hexCode)
    }

    if (isRequired && showHelperErrorMessages && hexCode === '#') {
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
    const { simpleView, styles } = this.props
    return (
      <div css={styles?.simpleColorContainer}>
        {simpleView && this.renderCircle()}
        <div css={styles?.hashMarkContainer}>#</div>
      </div>
    )
  }
  renderAfterInput() {
    const { checkContrast, styles } = this.props
    const { hexCode } = this.state

    if (checkContrast && isValid(hexCode)) {
      const contrast = getContrast(checkContrast.contrastAgainst!, hexCode)
      const minContrast = this.getminContrast(
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
      value.length > 8 ||
      //TODO remove any
      !acceptedCharactersForHEX.includes((event.nativeEvent as any).data)
    ) {
      return
    }
    if (typeof onChange === 'function') {
      onChange(`#${value}`)
    } else {
      this.setState({
        showHelperErrorMessages: false,
        hexCode: `#${value}`,
        mixedColor: `#${value}`
      })
    }
  }

  //TODO remove any
  handleOnPaste(event: any) {
    const pasted = event.clipboardData.getData('Text')
    const newHex = `${this.state.hexCode}${pasted}`
    if (isValid(newHex.slice(1))) {
      this.setState({
        hexCode: newHex.slice(1)
      })
      return event.preventDefault()
    }

    if (isValid(newHex)) {
      this.setState({
        hexCode: newHex
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
        <span css={styles?.tooltip}>
          <Tooltip offsetY="10px" renderTip={tooltip}>
            <IconInfoLine />
          </Tooltip>
        </span>
      </div>
    ) : (
      label
    )
  }

  renderAddNewPresetButton = () => (
    <Popover
      renderTrigger={
        <IconButton screenReaderLabel="Choose color">
          {this.renderCircle()}
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
      screenReaderLabel="Popover Dialog Example"
      shouldContainFocus
      shouldReturnFocus
      shouldCloseOnDocumentClick
      offsetY="16px"
      mountNode={() => document.getElementById('main')}
    >
      <div style={{ padding: '20px' }}>
        <ColorMixer
          value={hexToRgb(`#${this.state.mixedColor}`)}
          onChange={(newColor: string) =>
            this.setState({ mixedColor: colorTohex8(newColor).slice(1) })
          }
        />
        <div
          style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#C7CDD1' /*Tiara */,
            margin: '20px 0 20px 0'
          }}
        />
        <ColorContrast
          firstColor="#FFFFFF"
          secondColor={`#${this.state.mixedColor}`}
          label="Color Contrast Ratio"
          successLabel="PASS"
          failureLabel="FAIL"
          normalTextLabel="Normal text"
          largeTextLabel="Large text"
          graphicsTextLabel="Graphics text"
          firstColorLabel="Background"
          secondColorLabel="Foreground"
        />
      </div>
      <div
        style={{
          backgroundColor: '#F5F5F5' /*Porcelain */,
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: '14px'
        }}
      >
        <Button
          onClick={() => {
            this.setState({
              openColorPicker: false,
              hexCode: `#${this.state.mixedColor}`
            })
          }}
          color="primary"
          margin="xx-small"
        >
          Add
        </Button>
        <Button
          onClick={() => this.setState({ openColorPicker: false })}
          color="secondary"
          margin="xx-small"
        >
          Close
        </Button>
      </div>
    </Popover>
  )
  render() {
    const { isRequired, disabled, width, placeholderText } = this.props

    return (
      <div style={{ display: 'flex' }}>
        <TextInput
          elementRef={this.handleRef}
          isRequired={isRequired}
          disabled={disabled}
          renderLabel={() => this.renderLabel()}
          display="inline-block"
          width={width}
          placeholder={placeholderText}
          themeOverride={{ padding: '0 0.75rem 0 0' }}
          renderAfterInput={this.renderAfterInput()}
          renderBeforeInput={this.renderBeforeInput()}
          value={this.state.hexCode.slice(1)}
          onChange={(event, value) => this.handleOnChange(event, value)}
          onPaste={(event) => this.handleOnPaste(event)}
          onBlur={() => this.handleOnBlur()}
          messages={this.renderMessages()}
        />
        {!this.props.simpleView && (
          <div style={{ alignSelf: 'flex-end', marginLeft: '8px' }}>
            {this.renderAddNewPresetButton()}
          </div>
        )}
      </div>
    )
  }
}

export { ColorPicker }
export default ColorPicker
