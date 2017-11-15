import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'

import ContextBox from '@instructure/ui-core/lib/components/ContextBox'
import Spinner from '@instructure/ui-core/lib/components/Spinner'

import getOptionId from '../utils/getOptionId'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Select
---
**/
@themeable(theme, styles)
class SelectOptionsList extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * the selected value
    */
    selectedOption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node,
        disabled: PropTypes.bool,
        icon: PropTypes.func,
        groupLabel: PropTypes.bool
      })
    ]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node,
        disabled: PropTypes.bool,
        icon: PropTypes.func,
        groupLabel: PropTypes.bool
      })
    ),
    /**
     * id for options list element
     */
    optionsId: PropTypes.string,
    /**
    * a function that provides a reference to the internal options list element
    */
    menuRef: PropTypes.func,
    /**
     * The amount of options that are visible without scrolling
     */
    visibleOptionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Give the Spinner a title to be read by screenreaders. Disables menu
     * interaction and renders a Spinner in its place.
     */
    loadingText: PropTypes.string,
    /**
     * The menu content to render when no options are present or are filtered away
     */
    emptyOption: PropTypes.node,
    /**
     * Callback fired when an option gets highlighted
     */
    onHighlightOption: PropTypes.func,
    /**
     * Callback fired on the option selection
     */
    onSelect: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Options dropdown can be wider than input if maxWidth is provided
     */
    maxWidth: PropTypes.string,
    /**
     * Callback fired when the empty option is selected by click
     */
    onStaticClick: PropTypes.func,
    onBlur: PropTypes.func,
    highlightedIndex: PropTypes.number,
    expanded: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    selectedOption: null,
    options: [],
    visibleOptionsCount: 8,
    loadingText: null,
    emptyOption: '---',
    size: 'medium',
    highlightedIndex: 0,
    expanded: false,
    menuRef: el => {},
    onHighlightOption: event => {},
    onSelect: (event, selectedOption) => {},
    onStaticClick: event => {}
  }

  optionHeight = 5

  renderStaticOption (message) {
    const { size, onStaticClick } = this.props

    return (
      <li // eslint-disable-line
        tabIndex="-1"
        className={classnames(styles.option, {
          [styles[size]]: size
        })}
        onClick={onStaticClick}
      >
        <span className={styles.label}>
          {message}
        </span>
      </li>
    )
  }

  renderIcon (icon) {
    if (typeof icon !== 'undefined' && icon !== null) {
      const Icon = icon
      return (
        <span className={styles.icon}>
          <Icon />
        </span>
      )
    }
  }

  handleClick = (event, option) => {
    if (option.disabled || option.groupLabel) {
      event.preventDefault()
      return
    }
    this.props.onSelect(event, option)
  }

  renderOptions () {
    const {
      options,
      optionsId,
      loadingText,
      emptyOption,
      selectedOption,
      onHighlightOption,
      onSelect,
      size,
      highlightedIndex
    } = this.props

    if (loadingText) {
      return this.renderStaticOption(<Spinner size="x-small" title={loadingText} />)
    }

    if (options.length === 0) {
      return this.renderStaticOption(emptyOption)
    }

    return options.map((option, index) => {
      const { children, id, disabled, icon, groupLabel, groupItem } = option
      const selected = getOptionId(selectedOption) === id
      const handlers = {
        onMouseEnter: () => onHighlightOption(index),
        onClick: event => this.handleClick(event, option)
      }
      /* eslint-disable jsx-a11y/role-has-required-aria-props */
      return (
        <li
          {...handlers}
          role="option"
          key={id}
          id={`${optionsId}_${id}`}
          className={classnames(styles.option, {
            [styles.selected]: selected,
            [styles[size]]: size,
            [styles.highlighted]: index === highlightedIndex,
            [styles.disabled]: disabled || groupLabel,
            [styles.groupLabel]: groupLabel,
            [styles.groupItem]: groupItem
          })}
          tabIndex="-1"
          aria-selected={index === highlightedIndex ? 'true' : 'false'}
          disabled={disabled || groupLabel}
          aria-disabled={disabled || groupLabel ? 'true' : null}
        >
          <span className={styles.label}>
            {icon && this.renderIcon(icon)}
            {children}
          </span>
        </li>
      )
      /* eslint-enable jsx-a11y/role-has-required-aria-props */
    })
  }

  render () {
    const { optionsId, menuRef, visibleOptionsCount, maxWidth, ...props } = this.props
    const contextStyles = Object.assign({
      maxWidth: maxWidth || '0'
    }, props.style)

    return (
      <ContextBox
        style={contextStyles} // must also pass the style prop for positioning
        className={styles.container}
        withArrow={false}
      >
        <ul
          className={styles.optionsList}
          id={optionsId}
          onKeyDown={this.props.onKeyDown}
          onKeyUp={this.props.onKeyUp}
          onBlur={this.props.onBlur}
          tabIndex="-1"
          ref={el => {
            menuRef(el)
            if (el) {
              // store the height of the options
              this.optionHeight = el.querySelector('li').clientHeight
            }
          }}
          role="listbox"
          style={{
            maxHeight: `${visibleOptionsCount * this.optionHeight}px`,
            display: this.props.expanded ? 'block' : 'none'
          }}
        >
          {this.renderOptions()}
        </ul>
      </ContextBox>
    )
  }
}

export default SelectOptionsList
