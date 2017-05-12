import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'
import CustomPropTypes from '../../util/CustomPropTypes'

import IconLeft from 'instructure-icons/lib/Solid/IconArrowOpenLeftSolid'
import IconRight from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import Container from '../Container'
import Button from '../Button'

import PaginationButton from './PaginationButton'
import theme from './theme.js'
import styles from './styles.css'

/**
---
category: navigation
---
  Renders available pages of content, and reacts to selection of another page.
  Expects array of `PaginationButton` children. Focus and announcement of page change is
  the responsibility of your app.

  The `compact` variant truncates pages to show only the first, last, and
  pages surrounding the current one.

  Provide an `onClick` to `PaginationButton` to handle navigation.

  ```jsx_example
  class Example extends React.Component {
    constructor (props) {
      super(props)
      this.state = { currentPage: 0 }
    }

    setPage (page) {
      this.setState({ currentPage: page })
    }

    render () {
      const pages = Array.from(Array(9)).map((v, i) => <PaginationButton
        key={i}
        onClick={this.setPage.bind(this, i)}
        current={i === this.state.currentPage}>
          {i + 1}
      </PaginationButton>)

      return (
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
        >
          {pages}
        </Pagination>
      )
    }
  }

  <Example />
  ```

  If you instead provide an href to `PaginationButton` it will render as a link.

  ```jsx_example
  <Pagination variant="full" label="Jump to">
    <PaginationButton href="/pages/1" current>A-G</PaginationButton>
    <PaginationButton href="/pages/2">H-J</PaginationButton>
    <PaginationButton href="/pages/3">K-M</PaginationButton>
    <PaginationButton href="/pages/3">N-Q</PaginationButton>
    <PaginationButton href="/pages/3">R-Z</PaginationButton>
  </Pagination>
  ```
**/
@themeable(theme, styles)
export default class Pagination extends Component {
  static propTypes = {
    /**
    * children of type PaginationButton
    */
    children: CustomPropTypes.Children.oneOf([PaginationButton]),
    /**
    * Disables interaction with all pages
    */
    disabled: PropTypes.bool,
    /**
    * Visible label for component
    */
    label: PropTypes.string,
    /**
    * Accessible label for next button
    */
    labelNext: PropTypes.string,
    /**
    * Accessible label for previous button
    */
    labelPrev: PropTypes.string,
    variant: PropTypes.oneOf(['full', 'compact'])
  }

  static defaultProps = {
    disabled: false,
    variant: 'full'
  }

  hasCurrentPage () {
    return this._current >= 0
  }

  isCompact () {
    return this.props.variant === 'compact' && this.hasCurrentPage()
  }

  renderLabel () {
    if (this.props.label) {
      const display = this.isCompact() ? 'block' : 'inline'
      return (
        <Container padding="small" display={display}>{this.props.label}</Container>
      )
    }
  }

  renderPages () {
    const allPages = this._pages
    let pages = allPages

    if (this.isCompact()) {
      const firstIndex = 0
      const lastIndex = allPages.length - 1

      const sliceStart = Math.max(this._current - 1, firstIndex)
      const sliceEnd = Math.min(this._current + 4, lastIndex)
      pages = allPages.slice(sliceStart, sliceEnd)

      const firstPage = allPages[firstIndex]
      const lastPage = allPages[lastIndex]

      if (sliceStart - firstIndex > 1) pages.unshift(<span key="first" aria-hidden>...</span>)
      if (sliceStart - firstIndex > 0) pages.unshift(firstPage)
      if (lastIndex - sliceEnd + 1 > 1) pages.push(<span key="last" aria-hidden>...</span>)
      if (lastIndex - sliceEnd + 1 > 0) pages.push(lastPage)
    }

    return (
      <Container display="inline">
        {pages}
      </Container>
    )
  }

  renderArrowButton (Icon, title) {
    if (this.isCompact()) {
      const diff = Icon === IconLeft ? -1 : 1
      const relPage = this._pages[this._current + diff]
      const relProps = omitProps(relPage.props, PaginationButton.propTypes)
      return <Button
        variant="icon"
        {...relProps}
        title={title}
      >
        <Icon />
      </Button>
    }
  }

  render () {
    this._pages = React.Children.map(this.props.children,
      (page) => React.cloneElement(page, { disabled: this.props.disabled })
    )
    // Don't render for single or empty pages
    if (this._pages.length < 2) return null

    this._current = this._pages.findIndex((p) => p.props.current)
    const props = omitProps(this.props, Pagination.propTypes)

    return (
      <Container role="navigation" as="div" {...props} className={styles.root}>
        {this.renderLabel()}
        <Container display="inline" className={styles.pages}>
          {this._current > 0 && this.renderArrowButton(IconLeft, this.props.labelPrev)}
          {this.renderPages()}
          {this._current < this._pages.length - 1 && this.renderArrowButton(IconRight, this.props.labelNext)}
        </Container>
      </Container>
    )
  }
}

export { default as PaginationButton } from './PaginationButton'
