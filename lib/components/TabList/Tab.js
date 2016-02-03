import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'

import styles from './Tab.css'

export default class Tab extends Component {
  static propTypes = {
    style: PropTypes.oneOf(['simple', 'accordion']),
    id: PropTypes.string,
    index: PropTypes.number,
    panelId: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    focus: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    style: 'simple',
    id: null,
    index: 0,
    panelId: null,
    disabled: false,
    selected: false,
    focus: false,
    onClick: function () {},
    onKeyDown: function () {}
  };

  handleClick = (e) => {
    if (this.disabled) {
      return
    }

    this.props.onClick(this.props.index, e)
  };

  handleKeyDown = (e) => {
    if (this.disabled) {
      return
    }

    this.props.onKeyDown(this.props.index, e)
  };

  syncNodeAttributes (node, props) {
    if (props.selected) {
      node.setAttribute('tabindex', 0)
      if (props.focus) {
        node.focus()
      }
    } else if (!props.disabled) {
      node.setAttribute('tabindex', -1)
    } else {
      node.removeAttribute('tabindex')
    }
  }

  componentDidMount () {
    this.syncNodeAttributes(findDOMNode(this), this.props)
  }

  componentDidUpdate () {
    this.syncNodeAttributes(findDOMNode(this), this.props)
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true
    }
    return (
      <div className={classnames(classes)}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          role="tab"
          id={this.props.id}
          aria-selected={!!this.props.selected}
          aria-disabled={!!this.props.disabled}
          aria-controls={this.props.panelId}>
        {this.props.children}
      </div>
    )
  }
}

