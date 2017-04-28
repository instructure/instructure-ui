import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'

import CustomPropTypes from '../../util/CustomPropTypes'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme.js'

/**
  A `<ContextBox/>` is a container component that displays contextual information. It may or may not
  be displayed as on overlay using a [Popover](#Popover).

  `<ContextBox/>` defaults to no padding around its content. To add padding, use the `padding` prop.

  Use the `textAlign` prop to change the alignment of the text inside `<ContextBox />`. In use cases
  where `<ContextBox/>` is not absolutely positioned, use the `margin` prop to set margin around
  the component.

  ```jsx_example
  <div>
    <ContextBox padding="small" margin="0 large 0 0">
      <Heading level="h3">Hello World</Heading>
    </ContextBox>
    <ContextBox
      margin="0 large 0 0"
      padding="small"
      placement="top">
      <Heading level="h3">Hello World</Heading>
      <Typography size="small">Some informational text that is helpful</Typography>
    </ContextBox>
    <ContextBox
      margin="0 large 0 0"
      padding="small"
      textAlign="end"
      placement="left">
      <Heading level="h3">Hello World</Heading>
      <Typography size="small">This ContextBox is right-text-aligned</Typography>
    </ContextBox>
    <ContextBox
      placement="bottom"
      padding="medium"
      variant="inverse"
      size="small"
      margin="xLarge 0 0"
    >
      <Typography size="small">
        This ContextBox uses the inverse variant and medium padding. Its size prop is set to small,
        which causes long strings like this to wrap. It also has top margin to separate it from
        the ContextBoxes about it.
      </Typography>
    </ContextBox>
  </div>
  ```
 **/
@themeable(theme, styles)
export default class ContextBox extends Component {
  static propTypes = {
    children:  PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'inverse']),
    withArrow: PropTypes.bool,
    arrowOffsetLeft: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    arrowOffsetTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    placement: CustomPropTypes.placement,
    positionLeft: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    positionTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    /**
    * Valid values are `0`, `none`, `auto`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * Valid values are `0`, `none`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `padding="small xLarge large"`.
    */
    padding: CustomPropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * Component will expand to fit the width of its contents by default,
    * unless size is specified
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    variant: 'default',
    placement: 'middle right',
    withArrow: true,
    style: {}
  }

  render () {
    const {
      style, // eslint-disable-line react/prop-types
      className, // eslint-disable-line react/prop-types
      padding,
      margin,
      size,
      textAlign,
      variant,
      children,
      withArrow,
      positionLeft,
      positionTop,
      arrowOffsetTop,
      arrowOffsetLeft,
      placement
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles['with-arrow']]: withArrow,
      [className]: className,
      [styles['positioned--' + placement.replace(' ', '-')]]: true
    }

    const containerStyle = {
      position: (positionTop || positionLeft) ? 'absolute' : style.position,
      left: positionLeft || style.left,
      top: positionTop || style.top,
      ...style
    }

    const arrowStyle = {
      left: arrowOffsetLeft,
      top: arrowOffsetTop
    }

    return (
      <Container
        {...omitProps(this.props, ContextBox.propTypes)}
        style={containerStyle}
        className={classnames(classes)}
        as="span"
        display={null}
        margin={margin}
        size={size}
      >
        {withArrow && <span className={styles.arrow} style={arrowStyle} />}
        <Container
          className={styles.content}
          as="span"
          display={null}
          padding={padding}
          textAlign={textAlign}
        >
          {children}
        </Container>
      </Container>
    )
  }
}
