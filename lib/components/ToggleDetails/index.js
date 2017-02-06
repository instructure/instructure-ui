import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'
import themeable from '../../util/themeable'
import classnames from 'classnames'
import IconArrowOpenRightSolid from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import IconArrowOpenDownSolid from 'instructure-icons/lib/Solid/IconArrowOpenDownSolid'

import styles from './styles.css'
import theme from './theme'

/**
---
category: navigation
---
  The ToggleDetails component can be used to show/hide content in response to user action.

  By default, ToggleDetails content is hidden. To override, pass in the `isExpanded` prop.

  ```jsx_example
  <ToggleDetails
    summary={<Typography color="primary">Click to hide me!</Typography>}
    isExpanded
  >
    <Typography>
      <b>I am expanded!</b>&nbsp;{lorem.paragraph()}
    </Typography>
  </ToggleDetails>
  ```

  ### Icon size / summary text formatting
  Icon size can be adjusted using the `size` prop with small, medium, and large options

  The `summary` prop accepts any node, allowing you to format the summary text as
  you see fit. In these examples, we are formatting it with the
  [Typography](#Typography) component.

  ```jsx_example
  <div>
    <ToggleDetails
      size="small"
      summary={<Typography size="small">Small icon</Typography>}
    >
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>

    <br />

    <ToggleDetails summary={<Typography size="medium">Medium icon</Typography>}>
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>

    <br />

    <ToggleDetails
      size="large"
      summary={<Typography size="large">Large icon</Typography>}>
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>
  </div>
  ```

  ### Icon positioning and block display
  The `iconPosition` prop determines if the icon comes before or after the summary

  Using `isBlock` displays the toggle as a block level element

  ```jsx_example
  <ToggleDetails
    summary={
      <Typography
        size="medium"
        weight="bold"
      >
        Block display
      </Typography>
    }
    iconPosition="end"
    isExpanded
    isBlock
  >
    <Typography>
      {lorem.paragraph()}
    </Typography>
  </ToggleDetails>
  ```
**/
@themeable(theme, styles)
class ToggleDetails extends Component {
  static propTypes = {
    /**
    * The summary that displays and can be interacted with
    */
    summary: PropTypes.node.isRequired,
    /**
    * Whether the content is initially expanded or hidden
    */
    isExpanded: PropTypes.bool,
    /**
    * The icon to display next to the summary text when content is hidden
    */
    icon: PropTypes.func,
    /**
    * The icon to display when content is expanded
    */
    iconExpanded: PropTypes.func,
    /**
    * Icon position at the start or end of the summary text
    */
    iconPosition: PropTypes.oneOf(['start', 'end']),
    /**
    * Display the toggle summary and icon as a block element
    */
    isBlock: PropTypes.bool,
    /**
    * The toggleable content passed inside the ToggleDetails component
    */
    children: PropTypes.node.isRequired,
    /**
    * Choose a size for the expand/collapse icon
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    size: 'medium',
    isExpanded: false,
    icon: IconArrowOpenRightSolid,
    iconExpanded: IconArrowOpenDownSolid,
    iconPosition: 'start'
  }

  constructor (props) {
    super()
    this.state = {
      isExpanded: props.isExpanded,
      shouldAnimateContent: false
    }

    this._contentId = `ToggleDetails__${shortid.generate()}`
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isExpanded: nextProps.isExpanded,
      shouldAnimateContent: true
    })
  }

  handleClick = () => {
    this.toggleExpanded()
  }

  toggleExpanded () {
    this.setState({
      isExpanded: !this.state.isExpanded,
      shouldAnimateContent: true
    })
  }

  renderToggle () {
    const {
      summary,
      iconPosition
    } = this.props

    const classes = {
      [styles.toggle]: true,
      [styles.isBlock]: this.props.isBlock
    }
    return (
      <button
        aria-controls={this._contentId}
        aria-expanded={this.state.isExpanded}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        className={classnames(classes)}
      >
        <span className={styles.summary}>
          {iconPosition === 'start' && this.renderIcon()}
          <span>{summary}</span>
          {iconPosition === 'end' && this.renderIcon()}
        </span>
      </button>
    )
  }

  renderIcon () {
    const {
      size,
      iconPosition
    } = this.props
    const Icon = this.state.isExpanded ? this.props.iconExpanded : this.props.icon
    const classes = {
      [styles.icon]: true,
      [styles[size]]: size,
      [styles.iconStart]: iconPosition === 'start',
      [styles.iconEnd]: iconPosition === 'end'
    }
    return (
      <span className={classnames(classes)}>
        <Icon />
      </span>
    )
  }

  renderDetails () {
    const {
      size,
      iconPosition
    } = this.props
    const classes = {
      [styles.details]: true,
      [styles[size]]: size,
      [styles.hiddenDetails]: !this.state.isExpanded,
      [styles.expandedDetails]: this.state.isExpanded,
      [styles.indentDetails]: iconPosition === 'start'
    }
    return (
      <div id={this._contentId} className={classnames(classes)}>
        { this.renderContent() }
      </div>
    )
  }

  renderContent () {
    const classes = {
      [styles.content]: this.state.shouldAnimateContent
    }
    return this.state.isExpanded && (
      <div className={classnames(classes)}>{this.props.children}</div>
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true
    }

    return (
      <div className={classnames(classes)}>
        { this.renderToggle() }
        { this.renderDetails() }
      </div>
    )
  }
}

export default ToggleDetails
