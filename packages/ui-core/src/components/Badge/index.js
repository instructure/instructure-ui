import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'
import themeable from '@instructure/ui-themeable'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
  ### Making badges accessible
  Badge counts are automatically fed to screenreaders through the `aria-describedby`
  attribute. Often, though, a number alone doesn't give a screenreader user enough context.
  The examples below use the `formatOutput` prop to make the badge more screenreader-friendly.

  Note the use of the `pulse` prop to make the Badge slowly pulse twice on mount,

  ```jsx_example
    <div>
      <Badge
        count={99}
        margin="0 medium 0 0"
        formatOutput={function (formattedCount) {
          return (
            <AccessibleContent alt={`You have ${formattedCount} new edits to review`}>
              {formattedCount}
            </AccessibleContent>
          )
        }}
      >
        <Button variant="icon">
          <PlaceholderIcon title="Edits" />
        </Button>
      </Badge>
      <Badge
        type="notification"
        formatOutput={function () {
          return <ScreenReaderContent>You have new edits to review</ScreenReaderContent>
        }}
      >
        <Button variant="icon">
          <PlaceholderIcon title="Edits" />
        </Button>
      </Badge>
    </div>
  ```
  ### countUntil
  Use the `countUntil` prop to set a limit for the count. Format the overflow
  text using `formatOverflowText` (default is "+").

  ```jsx_example
  <div>
    <Badge count={100} countUntil={100} margin="0 medium 0 0">
      <Button>Inbox</Button>
    </Badge>
    <Badge
      count={100}
      countUntil={100}
      formatOverflowText={function (count, countUntil) {
        return 'Over ' + (countUntil - 1)
      }}
    >
      <Button>
        Assignments
      </Button>
    </Badge>
  </div>
  ```

  ### Standalone badges and color variants
  Setting the `standalone` prop to `true` renders Badge as a standalone
  element that is not positioned relative to a child and displays inline-block.

  ```jsx_example
  <div>
    <Badge standalone count={6} />
    &nbsp;&nbsp;
    <Badge standalone variant="success" count={12} />
    &nbsp;&nbsp;
    <Badge standalone variant="danger" count={18} countUntil={10} />
    &nbsp;&nbsp;
    <Badge standalone type="notification" />
    &nbsp;&nbsp;
    <Badge standalone type="notification" variant="success" />
    &nbsp;&nbsp;
    <Badge standalone type="notification" variant="danger" />
  </div>
  ```

  ### placement
  Default is `top end`. Note that standalone badges can't be placed.

  ```jsx_example
  <div>
    <Container as="div" margin="0 0 medium">
      <Badge count={21} margin="0 large 0 0" placement="top start">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge count={21} margin="0 large 0 0">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge count={21} margin="0 large 0 0" placement="bottom start">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge count={21} margin="0 large 0 0" placement="bottom end">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge count={21} margin="0 large 0 0" placement="start center">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge count={21} placement="end center">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
    </Container>
    <Container as="div">
      <Badge type="notification" margin="0 large 0 0" placement="top start">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge type="notification" margin="0 large 0 0">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge type="notification" margin="0 large 0 0" placement="bottom start">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge type="notification" margin="0 large 0 0" placement="bottom end">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge type="notification" margin="0 large 0 0" placement="start center">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
      <Badge type="notification" placement="end center">
        <Button variant="icon"><PlaceholderIcon title="Edit page" /></Button>
      </Badge>
    </Container>
  </div>
  ```
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
    this._defaultId = `Badge__${shortid.generate()}`
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
