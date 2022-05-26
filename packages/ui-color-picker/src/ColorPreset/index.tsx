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

import { withStyle, jsx } from '@instructure/emotion'
import { Menu } from '@instructure/ui-menu'
import { IconButton, Button } from '@instructure/ui-buttons'
import { View } from '@instructure/ui-view'
import { Tooltip } from '@instructure/ui-tooltip'
import { Popover } from '@instructure/ui-popover'
import { Text } from '@instructure/ui-text'
import { IconAddLine, IconCheckDarkSolid } from '@instructure/ui-icons'
import {
  colorTohex8,
  hexToRgb
} from '@instructure/ui-color-utils/src/conversions'
import { isValid } from '@instructure/ui-color-utils/src/isValid'
import { colorIndicatorBorderColor } from '../ColorIndicator/theme'

import type { ColorPresetProps, ColorPresetState } from './props'
import { propTypes, allowedProps } from './props'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { RGBAType } from '../ColorMixer/props'
import ColorMixer from '../ColorMixer'
import ColorContrast from '../ColorContrast'
/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class ColorPreset extends Component<ColorPresetProps, ColorPresetState> {
  static propTypes = propTypes
  static allowedProps = allowedProps

  constructor(props: ColorPresetProps) {
    super(props)
    this.state = {
      openEditor: false,
      openAddNew: false,
      newColor: { r: 51, g: 99, b: 42, a: 1 }
    }
  }
  static defaultProps = {
    disabled: false
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
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  calcBlendedColor = (c1: RGBAType, c2: RGBAType) => {
    // as decided by design
    const c2Alpha = c2.a * 0.4
    const c1Alpha = 1 - c2Alpha
    const alpha = 1 - c1Alpha * (1 - c1Alpha)

    return `rgba(
      ${(c2.r * c2Alpha) / alpha + (c1.r * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.g * c2Alpha) / alpha + (c1.g * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.b * c2Alpha) / alpha + (c1.b * c1Alpha * (1 - c2Alpha)) / alpha},
      ${c2.a}
      )`
  }

  onMenuItemSelected =
    (color: string) =>
    (
      _e: React.MouseEvent<Element, MouseEvent>,
      action: string | number | (string | number | undefined)[] | undefined
    ) => {
      if (action === 'select') {
        this.props.onSelect(color)
      }
      if (action === 'remove') {
        this.props?.colorMixerSettings?.onPresetChange(
          this.props.colors.filter((clr) => clr !== color)
        )
      }
    }

  renderAddNewPresetButton = () => (
    <Popover
      renderTrigger={
        <div css={this.props?.styles?.addNewPresetButton}>
          <IconButton
            disabled={this.props.disabled}
            screenReaderLabel="Add User"
          >
            <IconAddLine />
          </IconButton>
        </div>
      }
      isShowingContent={this.state.openAddNew}
      onShowContent={() => {
        this.setState({ openAddNew: true })
      }}
      onHideContent={() => {
        this.setState({ openAddNew: false })
      }}
      on="click"
      screenReaderLabel="Popover Dialog Example"
      shouldContainFocus
      shouldReturnFocus
      shouldCloseOnDocumentClick
      offsetY="16px"
      mountNode={() => document.getElementById('main')}
    >
      <div css={this.props.styles?.popoverContent}>
        <ColorMixer
          value={colorTohex8(this.state.newColor)}
          onChange={(newColor: string) =>
            this.setState({ newColor: hexToRgb(newColor) })
          }
          withAlpha={this.props?.colorMixerSettings?.colorMixer?.withAlpha}
        />
        {this.props?.colorMixerSettings?.colorContrast && (
          <div css={this.props.styles?.popoverContentBlock}>
            <ColorContrast
              firstColor={
                this.props.colorMixerSettings.colorContrast.firstColor
              }
              secondColor={colorTohex8(this.state.newColor)}
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
          onClick={() => {
            this.props?.colorMixerSettings?.onPresetChange([
              colorTohex8(this.state.newColor),
              ...this.props.colors
            ])
            this.setState({ openAddNew: false })
          }}
          color="primary"
          margin="0 xx-small 0 xx-small"
        >
          Add
        </Button>
        <Button
          onClick={() => this.setState({ openAddNew: false })}
          color="secondary"
          margin="0 xx-small 0 xx-small"
        >
          Close
        </Button>
      </div>
    </Popover>
  )
  renderColorIndicator = (color: string, selectOnClick?: boolean) => (
    <Tooltip renderTip={<div>{color}</div>}>
      <View
        disabled={this.props.disabled}
        position="relative"
        width="2.375rem"
        height="2.375rem"
        background="transparent"
        margin="xx-small"
        display="inline-block"
        borderRadius="medium"
        borderWidth="0"
        padding="0"
        as="button"
        {...(selectOnClick
          ? { onClick: () => this.props.onSelect(color) }
          : {})}
      >
        <div
          css={this.props?.styles?.presetRect}
          style={{
            borderColor: this.calcBlendedColor(
              hexToRgb(colorIndicatorBorderColor),
              hexToRgb(isValid(color) ? color : '#fff')
            ),
            boxShadow: `inset 0 0 0 50px ${color}`
          }}
        >
          {this.props.selected === color && (
            <div css={this.props?.styles?.selectedIndicator}>
              <IconCheckDarkSolid
                themeOverride={{ sizeXSmall: '0.8rem' }}
                size="x-small"
              />
            </div>
          )}
        </div>
      </View>
    </Tooltip>
  )
  renderSettingsMenu = (color: string, index: number) => (
    <Menu
      key={`color-preset-color-${index}`}
      placement="bottom"
      trigger={this.renderColorIndicator(color)}
      mountNode={() => document.getElementById('main')}
      onSelect={this.onMenuItemSelected(color)}
    >
      <Menu.Group label={color} />
      <Menu.Item value="select">Select</Menu.Item>
      <Menu.Item value="remove">Remove</Menu.Item>
    </Menu>
  )
  render() {
    const { styles, label, colorMixerSettings, colors, elementRef } = this.props
    return (
      <div ref={elementRef} css={styles?.colorPreset}>
        {label && (
          <div css={styles?.label}>
            <Text weight="bold">{label}</Text>
          </div>
        )}
        {typeof colorMixerSettings?.onPresetChange === 'function' &&
          this.renderAddNewPresetButton()}
        {colors.map((color, index) =>
          typeof colorMixerSettings?.onPresetChange === 'function' ? (
            this.renderSettingsMenu(color, index)
          ) : (
            <div key={`color-preset-color-${index}`}>
              {this.renderColorIndicator(color, true)}
            </div>
          )
        )}
      </div>
    )
  }
}

export { ColorPreset }
export default ColorPreset
