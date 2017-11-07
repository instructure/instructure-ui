import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import uid from '@instructure/ui-utils/lib/uid'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@themeable(theme, styles)
class Badge extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    count: PropTypes.number,
    /**
     * The number at which the count gets truncated by
     * formatOverflowText. For example, a countUntil of 100
     * would stop the count at 99.
    */
    countUntil: PropTypes.number,
    children: PropTypes.element,
    /**
     * Render Badge as a counter (`count`) or as a smaller dot (`notification`) with
     * no count number displayed.
    */
    type: PropTypes.oneOf(['count', 'notification']),
    /**
     * Render Badge as an inline html element that is not positioned relative
     * to a child.
    */
    standalone: PropTypes.bool,
    /**
     * Make the Badge slowly pulse twice to get the user's attention.
    */
    pulse: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'success', 'danger']),
    /**
    * Supported values are `top start`, `top end`, `end center`, `bottom end`,
    * `bottom start`, and `start center`
    */
    placement: CustomPropTypes.placement,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    formatOverflowText: PropTypes.func,
    formatOutput: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    standalone: false,
    type: 'count',
    variant: 'primary',
    pulse: false,
    placement: 'top end',
    formatOverflowText: (count, countUntil) => `${countUntil - 1} +`
  }

  constructor (props) {
    super(props)
    this._defaultId = `Badge__${uid()}`
  }

  countOverflow () {
    const {count, countUntil} = this.props

    if ((countUntil > 1) && (count >= countUntil)) {
      return true
    } else {
      return false
    }
  }

  renderOutput () {
    const {count, countUntil, formatOverflowText, formatOutput, type} = this.props

    // If the badge count is >= than the countUntil limit, format the badge text
    // via the formatOverflowText function prop
    const formattedCount = (type === 'count' && this.countOverflow())
      ? formatOverflowText(count, countUntil) : count

    if (typeof formatOutput === 'function') {
      return formatOutput(formattedCount)
    } else {
      return (type === 'count') ? formattedCount : null
    }
  }

  renderBadge () {
    const {
      count,
      margin,
      pulse,
      placement,
      standalone,
      type,
      variant
    } = this.props

    const classes = {
      [styles.badge]: true,
      [styles[type]]: type,
      [styles[variant]]: variant,
      [styles['positioned--top']]: placement.indexOf('top') > -1,
      [styles['positioned--bottom']]: placement.indexOf('bottom') > -1,
      [styles['positioned--start']]: placement.indexOf('start') > -1,
      [styles['positioned--end']]: placement.indexOf('end') > -1,
      [styles['positioned--center']]: placement.indexOf('center') > -1,
      [styles.standalone]: standalone,
      [styles.pulse]: pulse
    }

    return (
      <Container
        margin={(standalone) ? margin : 'none'}
        className={classnames(classes)}
        title={(type === 'count' && this.countOverflow()) ? count : null}
        id={(!standalone) ? this._defaultId : null}
      >
        {this.renderOutput()}
      </Container>
    )
  }

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      return safeCloneElement(child, {
        'aria-describedby': this._defaultId
      })
    })
  }

  render () {
    const {
      margin,
      standalone
    } = this.props

    if (standalone) {
      return this.renderBadge()
    } else {
      return (
        <Container
          as="span"
          margin={margin}
          className={styles.wrapper}
        >
          {this.renderChildren()}
          {this.renderBadge()}
        </Container>
      )
    }
  }
}

export default Badge
