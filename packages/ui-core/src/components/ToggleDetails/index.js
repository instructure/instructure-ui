import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import classnames from 'classnames'

import IconArrowOpenRightSolid from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import IconArrowOpenDownSolid from 'instructure-icons/lib/Solid/IconArrowOpenDownSolid'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'

import Button from '../Button'

import styles from './styles.css'
import theme from './theme'

const toggleExpanded = ({ expanded }) => ({ expanded: !expanded })

/**
---
category: components/navigation
---
  The ToggleDetails component can be used to show/hide content in response to user action.

  By default, ToggleDetails content is hidden. To override, pass in the `defaultExpanded` prop.

  ```jsx_example
  <ToggleDetails
    summary="Click to hide me!"
    defaultExpanded
  >
    <Text weight="bold">I am expanded!</Text> {lorem.paragraph()}
  </ToggleDetails>
  ```

  ToggleDetails can be controlled

  ```jsx_example
  ---
  render: false
  ---

  class Example extends React.Component {
    state = {
      expanded: true
    };

    handleChange = (event, expanded) => this.setState({ expanded });

    handleToggle = () => this.setState({ expanded: !this.state.expanded });

    render () {
      return (
        <div>
          <Button onClick={this.handleToggle}>
            This button {this.state.expanded ? 'collapses' : 'expands'}
          </Button>
          <br />
          <br />
          <ToggleDetails
            summary="Click to hide me!"
            expanded={this.state.expanded}
            onToggle={this.handleChange}
          >
            <Text weight="bold">I am controlled and expanded!</Text> {lorem.paragraph()}
          </ToggleDetails>
        </div>
        )
    }
  }

  render(<Example />)
  ```

  Setting ToggleDetails to `filled` will make the toggle use the `fluidWidth` Button component.

  ```jsx_example
  <ToggleDetails
    variant="filled"
    summary="Click to expand me!"
  >
    {lorem.paragraph()}
  </ToggleDetails>
  ```
  ### Icon size / summary text formatting
  Icon size can be adjusted using the `size` prop with small, medium, and large options

  The `summary` prop accepts any node, allowing you to format the summary text as
  you see fit. In these examples, we are formatting it with the
  [Text](#Text) component.

  ```jsx_example
  <div>
    <ToggleDetails
      size="small"
      summary="Small icon"
    >
      {lorem.paragraph()}
    </ToggleDetails>

    <br />

    <ToggleDetails summary="Medium icon">
      {lorem.paragraph()}
    </ToggleDetails>

    <br />

    <ToggleDetails
      size="large"
      summary="Large icon"
    >
      {lorem.paragraph()}
    </ToggleDetails>
  </div>
  ```

  ### Icon positioning and block display
  The `iconPosition` prop determines if the icon comes before or after the summary

  When the `fluidWidth` prop is set, the toggle fills the width of its
  container.

  ```jsx_example
  <ToggleDetails
    summary="Block display"
    iconPosition="end"
    defaultExpanded
    fluidWidth
  >
    <Text>
      {lorem.paragraph()}
    </Text>
  </ToggleDetails>
  ```
**/
@themeable(theme, styles)
class ToggleDetails extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['default', 'filled']),
    /**
    * The summary that displays and can be interacted with
    */
    summary: PropTypes.node.isRequired,
    /**
    * Whether the content is expanded or hidden
    */
    expanded: CustomPropTypes.controllable(
      PropTypes.bool,
      'onToggle',
      'defaultExpanded'
    ),
    /**
    * Whether the content is initially expanded or hidden (uncontrolled)
    */
    defaultExpanded: PropTypes.bool,
    onToggle: PropTypes.func,
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
    * should the summary fill the width of its container
    */
    fluidWidth: PropTypes.bool,
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
    variant: 'default',
    size: 'medium',
    fluidWidth: false,
    icon: IconArrowOpenRightSolid,
    iconExpanded: IconArrowOpenDownSolid,
    iconPosition: 'start',
    expanded: null,
    defaultExpanded: false,
    onToggle: function (event, expanded) {}
  }

  constructor (props) {
    super()

    this.state = {
      expanded: this.isControlled(props) ? props.expanded : !!props.defaultExpanded
    }

    this._contentId = `ToggleDetails__${shortid.generate()}`
  }

  shouldAnimateContent = false

  get expanded () {
    if (this.isControlled()) {
      return !!this.props.expanded
    }
    return !!this.state.expanded
  }

  isControlled (props = this.props) {
    return typeof props.expanded === 'boolean'
  }

  componentDidMount () {
    this.shouldAnimateContent = true
  }

  componentWillReceiveProps (nextProps) {
    // if the component passes from controlled to uncontrolled, save the state
    if (
      this.isControlled()
      && !this.isControlled(nextProps)
      && this.props.expanded !== this.state.expanded
    ) {
      this.setState(toggleExpanded)
    }
  }

  handleToggle = (event) => {
    if (!this.isControlled()) {
      this.setState(toggleExpanded)
    }

    this.props.onToggle(event, !this.expanded)
  }

  renderSummary () {
    const {
      summary,
      iconPosition
    } = this.props

    return (
      <span className={styles.summary}>
        {iconPosition === 'start' && this.renderIcon()}
        {summary}
        {iconPosition === 'end' && this.renderIcon()}
      </span>
    )
  }

  renderToggle () {
    const {
      variant
    } = this.props

    const props = {
      'aria-controls': this._contentId,
      'aria-expanded': this.expanded,
      onClick: this.handleToggle
    }

    if (variant === 'filled') {
      return (
        <Button
          {...props}
          fluidWidth
        >
          {this.renderSummary()}
        </Button>
      )
    } else {
      return (
        <button
          {...props}
          type="button"
          className={classnames(styles.toggle, styles[variant], {
            [styles.fluidWidth]: this.props.fluidWidth
          })}
        >
          {this.renderSummary()}
        </button>
      )
    }
  }

  renderIcon () {
    const { iconPosition } = this.props
    const Icon = this.expanded ? this.props.iconExpanded : this.props.icon

    return (
      <span className={classnames(styles.icon, {
        [styles.iconStart]: iconPosition === 'start',
        [styles.iconEnd]: iconPosition === 'end'
      })}
      >
        <Icon />
      </span>
    )
  }

  renderDetails () {
    const { size, iconPosition, fluidWidth } = this.props

    return (
      <div
        id={this._contentId}
        className={classnames(styles.details, {
          [styles[size]]: size,
          [styles.hiddenDetails]: !this.expanded,
          [styles.expandedDetails]: this.expanded,
          [styles.indentDetails]: iconPosition === 'start' && !fluidWidth
        })}
      >
        {this.renderContent()}
      </div>
    )
  }

  renderContent () {
    return this.expanded && (
      <div className={classnames({ [styles.content]: this.shouldAnimateContent })}>
        {this.props.children}
      </div>
    )
  }

  render () {
    return (
      <div className={classnames(styles.root, styles[this.props.size])}>
        {this.renderToggle()}
        {this.renderDetails()}
      </div>
    )
  }
}

export default ToggleDetails
