import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { omitProps } from '../../util/passthroughProps'
import themeable from '../../themeable'

import styles from './styles.css'
import theme from './theme.js'

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
  <Grid startAt="tablet" vAlign="middle">
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
    * The headline for the Billboard. Is always styled as an h1 element
    */
    heading: PropTypes.string,
    /**
    * Choose the appropriately semantic tag for your heading
    */
    headingAs: PropTypes.oneOf(['h1', 'h2', 'h3']),
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
    disabled: PropTypes.bool
  }

  static defaultProps = {
    size: 'medium',
    headingAs: 'h1'
  }

  renderHeading () {
    return (
      <span className={styles.heading}>
        <Heading level="h1" as={this.props.headingAs} color="primary">
          {this.props.heading}
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
        {(hero)
          ? <span className={styles.hero}>{hero}</span>
          : null}
        {(heading) ? this.renderHeading() : null}
        {(message)
          ? <span className={styles.message}>{this.props.message}</span>
          : null}
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

  renderClickableEl () {
    const props = { ...omitProps(this.props, Billboard.propTypes) }

    if (this.props.href) {
      return (
        <a
          {...props}
          href={this.props.href}
          className={styles.button}
          onClick={this.handleClick}
          aria-disabled={this.props.disabled ? 'true' : null}
        >
          {this.renderContent()}
        </a>
      )
    }

    if (this.props.onClick) {
      return (
        <button
          {...props}
          type="button"
          className={styles.button}
          onClick={this.handleClick}
          aria-disabled={this.props.disabled ? 'true' : null}
        >
          {this.renderContent()}
        </button>
      )
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles.clickable]: this.props.href || this.props.onClick
    }

    return (
      <div className={classnames(classes)}>
        {(this.props.onClick || this.props.href)
          ? this.renderClickableEl() : this.renderContent()
        }
      </div>
    )
  }
}

export default Billboard
