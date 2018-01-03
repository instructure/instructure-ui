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

// eslint-disable-next-line react/no-multi-comp
@themeable(theme, styles)
export default class Glyph extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    variants: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
    const { name, variants, onClick } = this.props
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
