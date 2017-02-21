import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

/**
  A `<ContextBox/>` is a container component that displays contextual information. It may or may not
  be displayed as on overlay using a [Popover](#Popover).

  ```jsx_example
  <div>
    <ContextBox><Heading>Hello World</Heading></ContextBox>&nbsp;
    <ContextBox placement="right"><Heading>Hello World</Heading></ContextBox>&nbsp;
    <ContextBox placement="bottom"><Heading>Hello World</Heading></ContextBox>&nbsp;
    <ContextBox placement="left"><Heading>Hello World</Heading></ContextBox>
  </div>
  ```

  ```jsx_example
  <div>
    <ContextBox variant="inverse"><Heading>Hello World</Heading></ContextBox>&nbsp;
    <ContextBox placement="right" variant="inverse"><Heading>Hello World</Heading></ContextBox>&nbsp;
    <ContextBox placement="bottom" variant="inverse"><Heading>Hello World</Heading></ContextBox>&nbsp;
    <ContextBox placement="left" variant="inverse"><Heading>Hello World</Heading></ContextBox>
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
    placement:  PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    positionLeft: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    positionTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ])
  };

  static defaultProps = {
    variant: 'default',
    placement: 'top',
    withArrow: true,
    style: {}
  };

  render () {
    const {
      style, // eslint-disable-line react/prop-types
      placement,
      variant,
      children,
      withArrow,
      positionLeft,
      positionTop,
      arrowOffsetTop,
      arrowOffsetLeft,
      ...props
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles['with-arrow']]: withArrow,
      [styles['positioned--' + placement]]: true
    }

    const containerStyle = {
      ...style,
      position: (positionTop || positionLeft) ? 'absolute' : style.position,
      left: positionLeft || style.left,
      top: positionTop || style.top
    }

    const arrowStyle = {
      left: arrowOffsetLeft,
      top: arrowOffsetTop
    }

    return (
      <span {...props} className={classnames(classes)} style={containerStyle}>
        {withArrow && <span className={styles.arrow} style={arrowStyle} />}
        <span className={styles.content}>
          {children}
        </span>
      </span>
    )
  }
}
