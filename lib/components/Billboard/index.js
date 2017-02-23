import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
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
  If the Billboard has on `onClick` prop set, it will render as a button.
  Use the `message` prop for your button text/call to action. Use the `size`
  prop to adjust the size of the icon and text.

  ```jsx_example
  <Grid startAt="tablet" vAlign="middle">
    <GridRow>
      <GridCol>

        <Billboard
          message="Create a new Module"
          size="small"
          onClick={function () {
            alert("This Billboard was clicked!")
          }}
          hero={<IconPlus />} />

      </GridCol>
      <GridCol>

        <Billboard
          message="Edit this Module"
          onClick={function () {
            alert("This Billboard was clicked!")
          }}
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
    onClick: PropTypes.func
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

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles.clickable]: this.props.onClick
    }

    return (
      <div className={classnames(classes)}>
        {(this.props.onClick)
          ? <button
            type="button"
            className={styles.button}
            onClick={this.props.onClick}
          >
            {this.renderContent()}
          </button>
          : this.renderContent()
        }
      </div>
    )
  }
}

export default Billboard
