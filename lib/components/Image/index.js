import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../themeable'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme.js'

/**
  An accessible image component

  ```jsx_example
  <Image src={placeholderImage(250, 250)} />
  ```

  ### inline and margin
  Use the `margin` prop to add space around `<Image/>`. Adding `inline={false}` makes
  the image a block-level element

  ```jsx_example
  <div>
    <Image margin="0 medium 0 0" alt="A placeholder image" src={placeholderImage(300, 200)} />
    <Image margin="0 0 0 medium" src={placeholderImage(200, 200)} />
    <Image inline={false} margin="medium 0 0" src={placeholderImage(400, 200)} />
  </div>
  ```

  ### Color overlay
  The `overlay` prop accepts parameters for `color`, `opacity`, and `blend`. (Keep
  in mind that Internet Explorer currently ignores CSS blend mode rules.)
  ```jsx_example
    <Container textAlign="center">
      <Image
        src={placeholderImage(200, 200)}
        overlay={{color: '#008ee2', opacity: 7}}
        alt="A placeholder image"
        margin="x-small"
      />
      <Image
        src={placeholderImage(200, 200)}
        overlay={{color: '#008ee2', opacity: 7, blend: 'multiply'}}
        alt="A placeholder image"
        margin="x-small"
      />
      <Image
        src={placeholderImage(200, 200)}
        overlay={{color: '#008ee2', opacity: 7, blend: 'screen'}}
        alt="A placeholder image"
        margin="x-small"
      />
    </Container>
  ```
  ### Grayscale and blur filters
  Please note: these should only be used for presentational effects: Filters
  are not supported in Internet Explorer.
  ```jsx_example
    <Container textAlign="center">
      <Image
        grayscale
        src={avatarImage}
        alt="A placeholder image"
        margin="x-small"
      />
      <Image
        blur
        src={avatarImage}
        alt="A placeholder image"
        margin="x-small"
      />
    </Container>
  ```
 **/
@themeable(theme, styles)
export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    inline: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * Valid values for `opacity` are `0` - `10`. Valid values for `blend` are
    * `normal` (default), `multiply`, `screen`, `overlay`, and `color-burn`.
    */
    overlay: PropTypes.shape({
      color: PropTypes.string.isRequired,
      opacity: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).isRequired,
      blend: PropTypes.oneOf(['normal', 'multiply', 'screen', 'overlay', 'color-burn'])
    }),
    grayscale: PropTypes.bool,
    blur: PropTypes.bool
  }

  static defaultProps = {
    alt: '',
    inline: true,
    grayscale: false,
    blur: false
  }

  renderFilter () {
    const blur = `blur(${this.theme.imageBlurAmount})`
    const grayscale = 'grayscale(1)'

    if (this.props.grayscale && this.props.blur) {
      return `${blur} ${grayscale}`
    } else if (this.props.grayscale) {
      return grayscale
    } else if (this.props.blur) {
      return blur
    } else {
      return null
    }
  }

  render () {
    const {
      margin,
      inline,
      overlay,
      grayscale,
      blur,
      ...props
    } = this.props

    const imgClasses = {
      [styles.image]: true,
      [styles.inline]: inline || !overlay,
      [styles['has-filter']]: blur || grayscale
    }

    const imgStyle = {
      filter: (blur || grayscale) ? this.renderFilter() : 'none'
    }

    if (overlay) {
      const overlayStyles = {
        backgroundColor: overlay.color,
        opacity: overlay.opacity * 0.1,
        mixBlendMode: (overlay.blend) ? overlay.blend : null
      }

      return (
        <Container
          as="span"
          margin={margin}
          display={(inline) ? 'inline' : 'block'}
        >
          <span className={styles.overlayLayout}>
            <img {...props} className={classnames(imgClasses)} style={imgStyle} />
            <span className={styles.overlay} style={overlayStyles} />
          </span>
        </Container>
      )
    } else {
      return (
        <Container
          {...props}
          as="img"
          margin={margin}
          className={classnames(imgClasses)}
          style={imgStyle}
        />
      )
    }
  }
}
