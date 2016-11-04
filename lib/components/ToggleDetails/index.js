import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'
import themeable from '../../util/themeable'
import classnames from 'classnames'
import IconArrowRightSolid from 'instructure-icons/lib/Solid/IconArrowRightSolid'

import styles from './styles.css'
import theme from './theme'

/**
  The ToggleDetails component can be used to show/hide content in response to user action.

  By default, ToggleDetails content is hidden. To override, pass in the `isExpanded` prop.

  ```jsx_example
  <ToggleDetails summary={<Typography>Click to hide me!</Typography>} isExpanded>
    <Typography>
      <b>I am expanded!</b>&nbsp;{lorem.paragraph()}
    </Typography>
  </ToggleDetails>
  ```

  ### Icon size / summary text formatting
  Choose from a small-, medium- or large-size icon (default is medium).

  The `summary` prop accepts any node, allowing you to format the summary text as
  you see fit. In these examples, we are formatting it with the
  [Typography](#Typography) component.

  ```jsx_example
  <div>
    <ToggleDetails
      size="small"
      summary={<Typography size="small">Small arrow icon</Typography>}>
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>

    <br />

    <ToggleDetails summary={<Typography size="medium">Medium arrow icon</Typography>}>
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>

    <br />

    <ToggleDetails
      size="large"
      summary={<Typography size="large">Large arrow icon</Typography>}>
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>
  </div>

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
    isExpanded: false
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

  renderContent () {
    const classes = {
      [styles.content]: this.state.shouldAnimateContent
    }
    return this.state.isExpanded && (
      <div className={classnames(classes)}>{this.props.children}</div>
    )
  }

  render () {
    const { summary } = this.props
    const classes = {
      [styles.root]: true,
      [styles.expanded]: this.state.isExpanded,
      [styles[this.props.size]]: true
    }

    return (
      <div className={classnames(classes)}>
        <button
          aria-controls={this._contentId}
          aria-expanded={this.state.isExpanded}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          className={styles.toggle}
        >
          <span className={styles.summary}>
            <IconArrowRightSolid className={styles.icon} />
            <span className={styles.label}>
              {summary}
            </span>
          </span>
        </button>
        <div id={this._contentId} className={styles.details}>
          { this.renderContent() }
        </div>
      </div>
    )
  }
}

export default ToggleDetails
