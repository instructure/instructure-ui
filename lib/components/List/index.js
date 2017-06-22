import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'
import CustomPropTypes from '../../util/CustomPropTypes'
import safeCloneElement from '../../util/safeCloneElement'

import Container from '../Container'
import ListItem from './ListItem'

import styles from './styles.css'
import theme from './theme'

/**
  By default, `<List>` creates an unordered list of its children. Change the `as` prop to
  create an ordered list instead.

  `<List>` accepts only `<ListItem>` as a child.
  ```jsx_example
  <div>
    <List margin="0 0 small">
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
    <List as="ol">
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  </div>
  ```
  ### `unstyled`
  The `unstyled` variant renders an unstyled list with minimal styling -- useful for presenting lists of
  links, etc.

  ```jsx_example
  <List variant="unstyled">
    <ListItem><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></ListItem>
    <ListItem><Link href="https://www.getbridge.com">Bridge by Instructure</Link></ListItem>
    <ListItem><Link href="https://www.arcmedia.com">Arc by Instructure</Link></ListItem>
  </List>
  ```
  ### `pipe`
  The `pipe` variant renders a horizontal list of items separated by a pipe border.

  Note that the `pipe` variant will not be affected by the `size` prop.

  ```jsx_example
  <List variant="pipe">
    <ListItem>{lorem.sentence()}</ListItem>
    <ListItem>10pts</ListItem>
    <ListItem><b>Due:</b> Jan 17, 2018</ListItem>
    <ListItem><Link href="#">Submitted</Link></ListItem>
  </List>
  ```
**/
@themeable(theme, styles)
export default class List extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * Only accepts <ListItem> as a child
    */
    children: CustomPropTypes.Children.oneOf([ListItem]),
    as: PropTypes.oneOf(['ul', 'ol']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['default', 'unstyled', 'pipe'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'ul',
    margin: 'none',
    variant: 'default',
    size: 'medium'
  }

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      return safeCloneElement(child, {
        variant: this.props.variant,
        size: this.props.size,
        as: this.props.as
      })
    })
  }

  render () {
    const props = omitProps(this.props, List.propTypes)

    const {
      as,
      margin,
      variant
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: variant,
      [styles.unordered]: as === 'ul',
      [styles.ordered]: as === 'ol'
    }

    return (
      <Container
        {...props}
        className={classnames(classes)}
        as={as}
        margin={margin}
      >
        {this.renderChildren()}
      </Container>
    )
  }
}

export { default as ListItem } from './ListItem'
