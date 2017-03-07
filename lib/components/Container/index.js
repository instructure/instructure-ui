import React, { Component, PropTypes } from 'react'
import themeable from '../../themeable'
import classnames from 'classnames'
import CustomPropTypes from '../../util/CustomPropTypes'
import getElementType from '../../util/getElementType'

import styles from './styles.css'
import theme from './theme.js'

/**
  Use Container as a wrapper to separate content and/or to set the
  text alignment for a section of content.

  Note the `visualDebug` prop you can set to see the Container's boundaries.

  ```jsx_example
  <Container
    visualDebug
    size="small"
    textAlign="center"
    margin="large auto"
    padding="small">
    <Typography as="div">{lorem.sentence()}</Typography>
  </Container>
  ```
  ### The `as` prop
  Change the `as` prop to set what element Container should render as.
  In the example below a `<section>` wraps a `<header>` and a paragraph of content.
  The outermost `<section>` Container provides padding for all the content, while
  the header and paragraph are separated by bottom margin from the `<header>` Container.

  ```jsx_example
  <Container
    as="section"
    visualDebug
    padding="small"
  >
    <Container
      as="header"
      visualDebug
      margin="0 0 medium">

      <Grid startAt="tablet" vAlign="middle" colSpacing="none">
        <GridRow>
          <GridCol>
            <Heading>My container is a &lt;header&gt;</Heading>
          </GridCol>
          <GridCol width="auto">
            <Button variant="primary">Some action</Button>
          </GridCol>
        </GridRow>
      </Grid>

    </Container>
    <Typography as="p">{lorem.paragraph()}</Typography>
  </Container>
  ```
  ### Inline Containers

  Container defaults to displaying as a block-level element. This can be
  overridden by setting `isBlock` to `false`, allowing Container to display
  inline-block with other inline elements.
  ```jsx_example
  <Container textAlign="center" padding="xSmall" visualDebug>
    <Container
      isBlock={false}
      visualDebug
      size="small"
      textAlign="right"
      margin="large auto"
      padding="0 small 0 0">
      <Typography as="div">{lorem.sentence()}</Typography>
    </Container>
    <Button variant="success">Some action</Button>
  </Container>
  ```
**/
@themeable(theme, styles)
class Container extends Component {
  static propTypes = {
    as: CustomPropTypes.elementType,
    children: PropTypes.node,
    textAlign: PropTypes.oneOf(['left', 'center', 'right']),
    /**
    * Controls the maximum width of the Container
    */
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large']),
    /**
    * Set the margin using familiar CSS shorthand
    */
    margin: CustomPropTypes.spacing,
    /**
    * Set the padding using familiar CSS shorthand
    */
    padding: CustomPropTypes.spacing,
    /**
    * By default the Container is a block-level element
    */
    isBlock: PropTypes.bool,
    /**
    * Activate a dotted line around the Container to make building your
    * layout easier
    */
    visualDebug: PropTypes.bool
  }

  static defaultProps = {
    textAlign: 'left',
    isBlock: true,
    size: 'auto',
    visualDebug: false,
    padding: 'none',
    margin: 'none'
  }

  renderSpacingStyles (spacingFromProps, spacingFromTheme) {
    const spacing = spacingFromProps.split(' ')
    const spacingStyle = []
    for (let i = 0; i < spacing.length; i++) {
      spacingStyle.push(spacingFromTheme[spacing[i]])
    }
    return spacingStyle.join(' ')
  }

  render () {
    const {
      children,
      textAlign,
      isBlock,
      visualDebug,
      size,
      as
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles.isBlock]: isBlock,
      [styles.visualDebug]: visualDebug,
      [styles.isInline]: !isBlock,
      [styles['textAlign--' + textAlign]]: true,
      [styles[size]]: true
    }
    const marginsFromTheme = {
      auto: 'auto',
      0: '0',
      none: '0',
      xxxSmall: this.theme.marginxxxSmall,
      xxSmall: this.theme.marginxxSmall,
      xSmall: this.theme.marginxSmall,
      small: this.theme.marginSmall,
      medium: this.theme.marginMedium,
      large: this.theme.marginLarge,
      xLarge: this.theme.marginxLarge,
      xxLarge: this.theme.marginxxLarge
    }
    const paddingFromTheme = {
      0: '0',
      none: '0',
      xxxSmall: this.theme.paddingxxxSmall,
      xxSmall: this.theme.paddingxxSmall,
      xSmall: this.theme.paddingxSmall,
      small: this.theme.paddingSmall,
      medium: this.theme.paddingMedium,
      large: this.theme.paddingLarge,
      xLarge: this.theme.paddingxLarge,
      xxLarge: this.theme.paddingxxLarge
    }
    const style = {
      margin: this.renderSpacingStyles(this.props.margin, marginsFromTheme),
      padding: this.renderSpacingStyles(this.props.padding, paddingFromTheme)
    }
    const ElementType = getElementType(Container, this.props, () => {
      if (as) {
        return as
      } else {
        return 'span'
      }
    })
    return (
      <ElementType className={classnames(classes)} style={style}>
        {children}
      </ElementType>
    )
  }
}

export default Container
