import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ContextBox from '../../ContextBox'

import { getOptionId } from '../util'

import themeable from '../../../themeable'
import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class AutocompleteOptionsList extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * the selected value
    */
    selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      children: PropTypes.node
    })]),
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      children: PropTypes.node
    })),
    /**
     * id for options list element
     */
    optionsId: PropTypes.string,
    /**
    * a function that provides a reference to the internal options list element
    */
    menuRef: PropTypes.func,
    /**
    * width of menu in px
    */
    menuWidth: PropTypes.string,
    /**
     * The amount of options that are visible without scrolling
     */
    visibleOptionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Disables menu interaction and renders loadingOption in its place
     */
    loading: PropTypes.bool,
    loadingOption: PropTypes.node,
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
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Callback fired when the empty option is selected by click
     */
    onStaticClick: PropTypes.func,
    highlightedIndex: PropTypes.number
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    selectedOption: null,
    options: [],
    visibleOptionsCount: 8,
    loading: false,
    loadingOption: '---',
    emptyOption: '---',
    size: 'medium',
    highlightedIndex: 0,
    menuRef: (el) => {},
    onHighlightOption: (event) => {},
    onSelect: (event, selectedOption) => {},
    onStaticClick: (event) => {}
  }

  optionHeight = 5

  renderStaticOption (message) {
    const {
      size,
      onStaticClick
    } = this.props

    return (
      <li // eslint-disable-line
        tabIndex="-1"
        className={classnames(styles.option, {
          [styles[size]]: size
        })}
        onClick={onStaticClick}
      >
        {message}
      </li>
    )
  }

  renderOptions () {
    const {
      options,
      optionsId,
      loading,
      loadingOption,
      emptyOption,
      selectedOption,
      onHighlightOption,
      onSelect,
      size,
      highlightedIndex
    } = this.props

    if (loading) {
      return this.renderStaticOption(loadingOption)
    }

    if (options.length === 0) {
      return this.renderStaticOption(emptyOption)
    }

    return options.map((option, index) => {
      const { children, id } = option
      const selected = getOptionId(selectedOption) === id
      const handlers = {
        onMouseEnter: () => onHighlightOption(index),
        onClick: (event) => onSelect(event, option)
      }

      /* eslint-disable jsx-a11y/role-has-required-aria-props */
      return (
        <li
          {...handlers}
          tabIndex="-1"
          id={`${optionsId}_${id}`}
          key={id}
          className={classnames(styles.option, {
            [styles.selected]: selected,
            [styles[size]]: size,
            [styles.highlighted]: index === highlightedIndex
          })}
          role="option"
          aria-checked={selected ? 'true' : 'false'}
        >
          <span className={styles.label}>
            {children}
          </span>
        </li>
      )
      /* eslint-enable jsx-a11y/role-has-required-aria-props */
    })
  }

  render () {
    const {
      optionsId,
      menuRef,
      menuWidth,
      visibleOptionsCount,
      ...props
    } = this.props

    return (
      <ContextBox
        style={props.style} // must also pass the style prop for positioning
        className={styles.container}
        withArrow={false}
      >
        <ul
          className={styles.optionsList}
          id={optionsId}
          ref={(el) => {
            menuRef(el)
            if (el) {
              // store the height of the options
              this.optionHeight = el.querySelector('li').clientHeight
            }
          }}
          role="listbox"
          style={{
            width: menuWidth,
            maxHeight: `${visibleOptionsCount * this.optionHeight}px`
          }}
        >
          {this.renderOptions()}
        </ul>
      </ContextBox>
    )
  }
}

export default AutocompleteOptionsList
