import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import { deprecated } from 'react-prop-types'

import styles from './ContextBox.css'
import themeVariables from './theme/ContextBox'
import themeStyles from './theme/ContextBox.css'

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
@themeable(themeVariables, themeStyles)
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
    ]),
    /**
     * @deprecated
     */
    positioned: deprecated(PropTypes.oneOf(['above', 'below', 'left', 'right']), 'Use `placement`.')
  };

  static defaultProps = {
    variant: 'default',
    placement: 'top',
    withArrow: true
  };

  render () {
    const {
      positioned,
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
      [styles['positioned--' + (positioned || placement)]]: true
    }

    const containerStyle = {
      position: (positionTop || positionLeft) ? 'absolute' : null,
      left: positionLeft,
      top: positionTop
    }

    const arrowStyle = {
      left: arrowOffsetLeft,
      top: arrowOffsetTop
    }

    return (
      <div {...props} className={classnames(classes)} style={containerStyle}>
        {withArrow && <div className={styles.arrow} style={arrowStyle} />}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    )
  }
}
