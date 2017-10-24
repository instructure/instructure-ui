import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@themeable(theme, styles)
class Tag extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    dismissible: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * If you add an onClick prop, Tag renders as a clickable button
    */
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium',
    dismissible: false
  }

  get focused () {
    return isActiveElement(this._container)
  }

  focus = () => {
    this._container && this._container.focus()
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

  handleRef = (node) => {
    this._container = node
  }

  render () {
    const {
      className,
      dismissible,
      disabled,
      size,
      text,
      title,
      onClick,
      margin
    } = this.props

    const props = omitProps(this.props, Tag.propTypes, ['padding'])

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles.dismissible]: dismissible,
      [styles.button]: onClick
    }

    return (
      <Container
        {...props}
        ref={this.handleRef}
        className={classNames(className, classes)}
        as={(onClick) ? 'button' : 'span'}
        margin={margin}
        type={(onClick) ? 'button' : null}
        onClick={(onClick) ? this.handleClick : null}
        aria-disabled={(onClick && disabled) ? 'true' : null}
        display={null}
        title={title || (typeof text === 'string') ? text : null}
      >
        <span className={styles.text}>
          {text}
        </span>
        {(onClick && dismissible)
          ? <IconXSolid className={styles.icon} /> : null
        }
      </Container>
    )
  }
}

export default Tag
