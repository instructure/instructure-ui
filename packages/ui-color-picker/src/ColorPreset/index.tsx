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
import { Tooltip } from '@instructure/ui-tooltip'
import { Popover } from '@instructure/ui-popover'
import { Text } from '@instructure/ui-text'
import { IconAddLine, IconCheckDarkSolid } from '@instructure/ui-icons'
import {
  colorTohex8,
  hexToRgb
} from '@instructure/ui-color-utils/src/conversions'

import { ColorPresetProps, ColorPresetState } from './props'
import generateStyle from './styles'
import type { RGBAType } from '../ColorMixer/props'
import ColorMixer from '../ColorMixer'
import ColorContrast from '../ColorContrast'
/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle)
class ColorPreset extends Component<ColorPresetProps, ColorPresetState> {
  constructor(props: ColorPresetProps) {
    super(props)
    this.state = {
      openEditor: false,
      openAddNew: false,
      newColor: { r: 51, g: 99, b: 42, a: 100 }
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  calcBlendedColor = (c1: RGBAType, c2: RGBAType) => {
    const alpha = 1 - (1 - c2.a) * (1 - c1.a)

    return `rgb(
      ${(c2.r * c2.a) / alpha + (c1.r * c1.a * (1 - c2.a)) / alpha},
      ${(c2.g * c2.a) / alpha + (c1.g * c1.a * (1 - c2.a)) / alpha},
      ${(c2.b * c2.a) / alpha + (c1.b * c1.a * (1 - c2.a)) / alpha})`
  }

  hextoRGB = (hex: string) => {
    const r = parseInt(`${hex[1]}${hex[2]}`, 16)
    const g = parseInt(`${hex[3]}${hex[4]}`, 16)
    const b = parseInt(`${hex[5]}${hex[6]}`, 16)
    const a = hex.length > 6 ? parseInt(`${hex[7]}${hex[8]}`, 16) : ''
    return { r, g, b, a }
  }

  rgbToHex = ({ r, g, b, a }: RGBAType) => {
    const componentToHex = (c: number) => {
      const hex = c.toString(16)
      return hex.length == 1 ? '0' + hex : hex
    }
    const alpha = componentToHex(Math.round(a * 2.55))
    return (
      '#' +
      componentToHex(r) +
      componentToHex(g) +
      componentToHex(b) +
      (alpha === 'ff' ? '' : alpha)
    )
  }

  onMenuItemSelected =
    (color: string) =>
    (_e: React.MouseEvent<Element, MouseEvent>, action: any) => {
      if (action === 'select') {
        this.props.onSelect(color)
      }
      if (action === 'remove') {
        this.props.onPresetChange!(
          this.props.colors.filter((clr) => clr !== color)
        )
      }
    }

  renderAddNewPresetButton = () => (
    <Popover
      renderTrigger={
        <div css={this.props?.styles?.addNewPresetButton}>
          <IconButton screenReaderLabel="Add User">
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
      <div style={{ padding: '20px' }}>
        <ColorMixer
          value={colorTohex8(this.state.newColor)}
          onChange={(newColor: string) =>
            this.setState({ newColor: hexToRgb(newColor) })
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
          secondColor={colorTohex8(this.state.newColor)}
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
            this.props.onPresetChange!([
              colorTohex8(this.state.newColor),
              ...this.props.colors
            ])
            this.setState({ openAddNew: false })
          }}
          color="primary"
          margin="xx-small"
        >
          Add
        </Button>
        <Button
          onClick={() => this.setState({ openAddNew: false })}
          color="secondary"
          margin="xx-small"
        >
          Close
        </Button>
      </div>
    </Popover>
  )
  renderColorIndicator = (color: string, selectOnClick?: boolean) => (
    <Tooltip renderTip={color}>
      <button
        css={this.props?.styles?.presetRect}
        style={{
          borderColor: this.calcBlendedColor(
            { r: 56, g: 74, b: 88, a: 0.6 },
            { ...hexToRgb(color), a: 0.4 }
          ),
          boxShadow: `inset 0 0 0 50px ${color}`
        }}
        {...(selectOnClick
          ? { onClick: () => this.props.onSelect(color) }
          : {})}
      >
        {this.props.selected === color && (
          <div css={this.props?.styles?.selectedIndicator}>
            <IconCheckDarkSolid
              themeOverride={{ sizeXSmall: '0.8rem' }}
              size="x-small"
            />
          </div>
        )}
      </button>
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
    return (
      <div css={this.props?.styles?.colorPreset}>
        {this.props.label && (
          <div style={{ width: '100%', margin: '6px' }}>
            <Text weight="bold">{this.props.label}</Text>
          </div>
        )}
        {typeof this.props.onPresetChange === 'function' &&
          this.renderAddNewPresetButton()}
        {this.props.colors.map((color, index) =>
          typeof this.props.onPresetChange === 'function' ? (
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
