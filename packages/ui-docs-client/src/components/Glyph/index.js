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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@instructure/ui-core/lib/components/Button'
import Heading from '@instructure/ui-core/lib/components/Heading'
import InlineSVG from '@instructure/ui-svg-images/lib/components/InlineSVG'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

class Variant extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    glyph: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    onClick: PropTypes.func.isRequired
  }

  handleClick = (event) => {
    const { name, onClick, variant, glyph } = this.props
    onClick(event, name, variant, glyph)
  }

  render () {
    const { glyph, variant, name } = this.props
    let icon

    if (glyph.src) {
      icon = <InlineSVG src={glyph.src} width="2rem" height="2rem" title={`${name} (${variant})`} />
    } else if (typeof glyph === 'function') {
      const Icon = glyph
      icon = <Icon title={`${name} (${variant})`} />
    } else if (glyph.classes) {
      icon = (
        <span>
          <i className={`${glyph.classes.join(' ')}`} aria-hidden="true" />
          <ScreenReaderContent>{`${name} (${variant})`}</ScreenReaderContent>
        </span>
      )
    }

    return (
      <div className={styles.variant}>
        <Button
          variant="icon"
          size="large"
          onClick={this.handleClick}
        >
          {icon}
          <ScreenReaderContent>View Usage</ScreenReaderContent>
        </Button>
      </div>
    )
  }
}

@themeable(theme, styles)
export default class Glyph extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    variants: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  renderGlyphInfo (glyph) {
    if (glyph.codepoint) {
      return `\\${glyph.codepoint}`
    } else if (glyph.displayName) {
      return `<${glyph.displayName}/>`
    }
  }

  render () {
    const { name, variants } = this.props
    const firstVariant = variants[Object.keys(variants)[0]]

    return (
      <div className={styles.root}>
        <div className={styles.variants}>
          {
            Object.keys(variants)
              .map(variant => (
                <Variant {...this.props} key={`${name}-${variant}`} variant={variant} glyph={variants[variant]} />
              ))
          }
        </div>
        <div className={styles.info}>
          { this.renderGlyphInfo(firstVariant) || name }
        </div>
        <Heading level="h3">
          { firstVariant.glyphName }
        </Heading>
      </div>
    )
  }
}
