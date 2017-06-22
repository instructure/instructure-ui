import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { omitProps } from '../../util/passthroughProps'
import themeable from '../../themeable'
import getElementType from '../../util/getElementType'
import CustomPropTypes from '../../util/CustomPropTypes'

import styles from './styles.css'
import theme from './theme'

import Container from '../Container'
import Heading from '../Heading'

/**

  Use Billboard for empty states, 404 pages, redirects, etc.
  ```jsx_example
  <Billboard
    size="medium"
    heading="Well, this is awkward."
    message="Think there should be something here?"
    hero={<Image src={placeholderImage(900, 500)} />} />
  ```
  If Billboard has an `href` prop set, it will render as a link;
  if an `onClick` prop is set, the component will render as a button.
  Use the `message` prop for your link or button text/call to action.
  Use the `size` prop to adjust the size of the icon and text.

  ```jsx_example
  <Grid startAt="medium" vAlign="middle">
    <GridRow>
      <GridCol>

        <Billboard
          disabled
          message="I am a disabled button"
          size="small"
          onClick={function () {
            alert("This Billboard was clicked!")
          }}
          hero={<IconPlus />} />

      </GridCol>
      <GridCol>

        <Billboard
          message="Click this link"
          href="http://instructure.com"
          hero={<PlaceholderIcon />} />

      </GridCol>
      <GridCol>

        <Billboard
          message="Create a new Module"
          size="large"
          onClick={function () {
            alert("This Billboard was clicked!")
          }}
          hero={<IconPlus />} />

      </GridCol>
    </GridRow>
  </Grid>
  ```
**/
@themeable(theme, styles)
class Billboard extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * Provide an <Image> component or Instructure Icon for the hero image
    */
    hero: PropTypes.element,
    /**
    * If you're using an icon, this prop will size it. Also sets the font-size
    * of the headline and message.
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    /**
    * The headline for the Billboard. Is styled as an h1 element by default
    */
    heading: PropTypes.string,
    /**
    * Choose the appropriately semantic tag for the heading
    */
    headingAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'span']),
    /**
    * Choose the font-size for the heading (see the Heading component)
    */
    headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
    /**
    * Instructions or information for the Billboard
    */
    message: PropTypes.string,
    /**
    * If you add an onClick prop, the Billboard renders as a clickable button
    */
    onClick: PropTypes.func,
    /**
    * If `href` is provided, Billboard will render as a link
    */
    href: PropTypes.string,
    disabled: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium',
    headingAs: 'span',
    headingLevel: 'h1',
    as: 'span'
  }

  renderHeading () {
    const {
      headingLevel,
      headingAs,
      heading
    } = this.props

    return (
      <span className={styles.heading}>
        <Heading
          level={headingLevel}
          as={headingAs}
          color="primary"
        >
          {heading}
        </Heading>
      </span>
    )
  }

  renderContent () {
    const {
      heading,
      message,
      hero
    } = this.props

    return (
      <span className={styles.content}>
        {hero && <span className={styles.hero}>{hero}</span>}
        {heading && this.renderHeading()}
        {message && <span className={styles.message}>{message}</span>}
      </span>
    )
  }

  handleClick = (e) => {
    const {
      disabled,
      onClick
    } = this.props

    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render () {
    const {
      href,
      disabled,
      onClick,
      size,
      margin
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles.clickable]: href || onClick
    }
    const Element = getElementType(Billboard, this.props)

    return (
      <Container
        {...omitProps(this.props, Billboard.propTypes)}
        type={(Element === 'button') ? 'button' : null}
        as={Element}
        className={classnames(classes)}
        margin={margin}
        href={href}
        onClick={this.handleClick}
        aria-disabled={((onClick || href) && disabled) ? 'true' : null}
      >
        {this.renderContent()}
      </Container>
    )
  }
}

export default Billboard
