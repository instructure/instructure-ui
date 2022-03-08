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

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import colorContrastCalculator from './colorContrastCalculator'
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
      hexCode: '',
      isValidHex: false,
      contrast: undefined,
      showHelperErrorMessages: false
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
    const prevContrastAgainst =
      typeof prevProps.checkContrast === 'object' &&
      prevProps.checkContrast.contrastAgainst
        ? prevProps.checkContrast.contrastAgainst
        : null
    const contrastAgainst =
      typeof this.props.checkContrast === 'object' &&
      this.props.checkContrast.contrastAgainst
        ? this.props.checkContrast.contrastAgainst
        : null

    if (
      contrastAgainst &&
      ((prevContrastAgainst && contrastAgainst !== prevContrastAgainst) ||
        !prevContrastAgainst)
    ) {
      this.setState({
        contrast: colorContrastCalculator(contrastAgainst, this.state.hexCode)
      })
    } else if (prevContrastAgainst && !contrastAgainst) {
      this.setState({
        contrast: colorContrastCalculator('#ffffff', this.state.hexCode)
      })
    }

    if (this.props.value && prevProps.value !== this.props.value) {
      const hexCode = this.props.value.slice(1)
      const isValidHex = this.isValidHex(hexCode)
      this.setState({
        showHelperErrorMessages: false,
        hexCode,
        isValidHex,
        contrast: isValidHex
          ? colorContrastCalculator('#FFFFFF', hexCode)
          : undefined
      })
    }
  }

  renderCircle() {
    return <div css={this.props.styles?.colorCircle} />
  }

  isValidHex(hex: string) {
    const reg = /^([0-9a-f]{3}){1,2}$/i
    return reg.test(hex)
  }

  getminContrast(strength: ContrastStrength) {
    return { min: 3, mid: 4.5, max: 7 }[strength]
  }

  contrastErrorMessage(contrast: number, minContrast: number) {
    return [
      {
        type: 'error',
        text: `Insufficient contrast ratio: ${contrast}:1.`
      },
      {
        type: 'error',
        text: `Contrast ratio has to be at least ${minContrast}:1.`
      },
      {
        type: 'error',
        text: `Please use a darker color.`
      }
    ]
  }

  renderMessages() {
    const { hexCode, isValidHex, contrast, showHelperErrorMessages } =
      this.state
    const {
      checkContrast,
      renderMessages,
      renderInvalidColorMessage,
      renderIsRequiredMessage,
      isRequired
    } = this.props

    const contrastStrength = checkContrast?.contrastStrength
      ? checkContrast.contrastStrength
      : 'mid'

    const minContrast = this.getminContrast(contrastStrength)
    let invalidColorMessages: MessageType = []
    let isRequiredMessages: MessageType = []
    let generalMessaqges: MessageType = []
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
      generalMessaqges = renderMessages(
        hexCode,
        isValidHex,
        minContrast,
        contrast
      )
    }
    return [
      ...invalidColorMessages,
      ...isRequiredMessages,
      ...generalMessaqges,
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
    const { isValidHex, contrast } = this.state
    if (checkContrast && isValidHex && contrast) {
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
      value.length > 6 ||
      //TODO remove any
      !acceptedCharactersForHEX.includes((event.nativeEvent as any).data)
    ) {
      return
    }
    const isValidHex = this.isValidHex(value)
    if (typeof onChange === 'function') {
      onChange(`#${value}`)
    } else {
      this.setState({
        showHelperErrorMessages: false,
        hexCode: value,
        isValidHex,
        contrast: isValidHex
          ? colorContrastCalculator('#FFFFFF', value)
          : undefined
      })
    }
  }

  //TODO remove any
  handleOnPaste(event: any) {
    const pasted = event.clipboardData.getData('Text')
    const newHex = `${this.state.hexCode}${pasted}`
    if (this.isValidHex(newHex)) {
      this.setState({
        hexCode: newHex,
        isValidHex: true,
        contrast: colorContrastCalculator('#FFFFFF', newHex)
      })
      return event.preventDefault()
    }
    if (this.isValidHex(newHex.slice(1))) {
      this.setState({
        hexCode: newHex.slice(1),
        isValidHex: true,
        contrast: colorContrastCalculator('#FFFFFF', newHex)
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
  render() {
    const { isRequired, disabled, width } = this.props

    return (
      <TextInput
        elementRef={this.handleRef}
        isRequired={isRequired}
        disabled={disabled}
        renderLabel={() => this.renderLabel()}
        display="inline-block"
        width={width}
        placeholder="Enter HEX"
        themeOverride={{ padding: '0 0.75rem 0 0' }}
        renderAfterInput={this.renderAfterInput()}
        renderBeforeInput={this.renderBeforeInput()}
        value={this.state.hexCode}
        onChange={(event, value) => this.handleOnChange(event, value)}
        onPaste={(event) => this.handleOnPaste(event)}
        onBlur={() => this.handleOnBlur()}
        messages={this.renderMessages()}
      />
    )
  }
}

export { ColorPicker }
export default ColorPicker
