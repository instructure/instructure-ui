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
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { InlineSVG } from '@instructure/ui-svg-images'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { withStyle, jsx } from '@instructure/emotion'
import * as reactIcons from '@instructure/ui-icons'
import { Heading } from '../Heading'
import generateStyle from './styles'
import generateComponentTheme from './theme'

@withStyle(generateStyle, generateComponentTheme)
class Variant extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    glyph: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    onClick: PropTypes.func.isRequired,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  handleClick = (event) => {
    const { name, onClick, variant, glyph } = this.props
    onClick(event, name, variant, glyph)
  }

  render() {
    const { glyph, variant, name, styles } = this.props
    let icon
    if (glyph.src) {
      // SVG, looks like {variant:"Line", glyphName:"a11y", src:"<svg ..."}
      icon = <InlineSVG src={glyph.src} title={`${name} (${variant})`} />
    } else if (glyph.classes) {
      // font, looks like
      // {"variant": "Solid",
      //  "glyphName": "Arc",
      //  "cssFile": "InstructureIcons-Solid.css",
      //  "codepoint": "EA01",
      //  "className": "icon-Arc",
      //  "classes": ["icon-solid","icon-Arc"],
      //  "bidirectional": false,
      //  "deprecated": false}
      icon = (
        <span css={styles.iconFontWrapper}>
          <i className={`${glyph.classes.join(' ')}`} aria-hidden="true" />
          <ScreenReaderContent>{`${name} (${variant})`}</ScreenReaderContent>
        </span>
      )
    } else {
      // React components
      icon = React.createElement(reactIcons[glyph.name], {
        title: `${name} (${variant})`
      })
    }
    return (
      <button css={styles.button} onClick={this.handleClick}>
        {icon}
        <ScreenReaderContent>View Usage</ScreenReaderContent>
      </button>
    )
  }
}

@withStyle(generateStyle, generateComponentTheme)
class Glyph extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    variants: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    rtl: PropTypes.bool,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    rtl: false
  }

  renderGlyphInfo(glyph) {
    if (glyph.codepoint) {
      return `\\${glyph.codepoint}`
    }
  }

  render() {
    const { name, variants, styles } = this.props
    const firstVariant = variants[Object.keys(variants)[0]]
    const info = this.renderGlyphInfo(firstVariant)

    return (
      <div css={styles.glyph}>
        <div css={styles.variants} dir={this.props.rtl ? 'rtl' : null}>
          {Object.keys(variants).map((variant) => (
            <Variant
              {...this.props}
              key={`${name}-${variant}`}
              variant={variant}
              glyph={variants[variant]}
            />
          ))}
        </div>
        {info && <div css={styles.info}>{info}</div>}
        <Heading level="h4" as="h3">
          {firstVariant.glyphName.toLowerCase()}
        </Heading>
      </div>
    )
  }
}

export default Glyph
export { Glyph }
