import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'

import TextInput from '@instructure/ui-core/lib/components/TextInput'
import Link from '@instructure/ui-core/lib/components/Link'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import capitalizeFirstLetter from '@instructure/ui-utils/lib/capitalizeFirstLetter'

import NavToggle from '../NavToggle'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Nav extends Component {
  static propTypes = {
    docs: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    sections: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    themes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    selected: PropTypes.string
  }

  static defaultProps = {
    docs: [],
    themes: [],
    selected: undefined
  }

  state = {
    query: null
  }

  handleSearchChange = (e) => {
    const value = e.target.value
    this.setState({ query: value ? new RegExp(value, 'i') : null })
  }

  matchQuery (str) {
    const { query } = this.state
    return (query && typeof query.test === 'function') ? query.test(str) : true
  }

  linkTheme (isSelected) {
    return {
      color: isSelected ? '#008ee2' : '#333',
      textDecoration: 'none'
    }
  }

  createNavToggle ({ id, title, children, expanded, variant }) {
    if (children.length === 0) {
      return
    }

    return (
      <div className={styles.navToggle} key={id}>
        <NavToggle
          variant={variant}
          summary={title}
          defaultExpanded={expanded || this.state.query !== null}
          iconPosition="end"
        >
          {children}
        </NavToggle>
      </div>
    )
  }

  matchingDocsInSection (sectionId, sectionSelected) {
    const { sections, selected, docs } = this.props
    return sections[sectionId].docs
      .filter((docId) => {
        return (
          this.matchQuery(docId) ||
          this.matchQuery(docs[docId].title)
          // TODO: check children for matches too
        )
      })
      .map((docId) => {
        sectionSelected = sectionSelected || (docId === selected) // eslint-disable-line no-param-reassign
        return docId
      })
  }

  matchingSectionsInSection (sectionId, sectionSelected) {
    const { sections, selected } = this.props
    return sections[sectionId].sections
      .filter((childSectionId) => {
        return this.matchQuery(childSectionId) || this.matchingSectionsInSection(childSectionId, sectionSelected) > 0
      })
      .map((sectionId) => {
        sectionSelected = sectionSelected || (sectionId === selected) // eslint-disable-line no-param-reassign
        return sectionId
      })
  }

  renderDocLink (docId) {
    const { docs, selected } = this.props
    const docSelected = (docId === selected)

    return (
      <div
        key={docId}
        className={classnames({
          [styles.link]: true,
          [styles.selectedLink]: docSelected
        })}
      >
        <Link theme={this.linkTheme(docSelected)} href={`#${docId}`}>
          {docs[docId].title}
        </Link>
      </div>
    )
  }

  renderSectionChildren (sectionId, selected) {
    const children = {}

    this.matchingSectionsInSection(sectionId, selected)
      .forEach((sectionId) => {
        children[capitalizeFirstLetter(this.props.sections[sectionId].title)] = { section: true, id: sectionId }
      })

    this.matchingDocsInSection(sectionId, selected)
      .filter(docId => !this.props.docs[docId].parent) // filter out docs with parent defined
      .forEach(docId => { children[docId] = { id: docId } })

    return Object.keys(children)
      .sort()
      .map((id) => {
        if (children[id].section) {
          return this.renderSectionLink(children[id].id, selected, 'category')
        } else {
          return this.renderDocLink(id)
        }
      })
  }

  renderSectionLink (sectionId, sectionSelected, variant) {
    const { selected, docs } = this.props
    const childSectionSelected = (sectionId === selected)

    sectionSelected = sectionSelected || childSectionSelected // eslint-disable-line no-param-reassign

    if (sectionId === '__uncategorized') {
      return this.renderSectionChildren(sectionId, sectionSelected)
    } else {
      return this.createNavToggle({
        id: sectionId,
        title: this.props.sections[sectionId].title,
        children: this.renderSectionChildren(sectionId, sectionSelected),
        expanded: sectionSelected,
        variant
      })
    }
  }

  sectionHasMatches (sectionId) {
    return this.matchingDocsInSection(sectionId).length > 0 || this.matchingSectionsInSection(sectionId).length > 0
  }

  renderSections () {
    return Object.keys(this.props.sections)
      .sort()
      .filter(sectionId => this.props.sections[sectionId].level === 0)
      .filter(sectionId => this.sectionHasMatches(sectionId))
      .map((sectionId) => this.renderSectionLink(sectionId, false))
  }

  renderThemeSection () {
    let themeSelected = false

    const themeLinks = Object.keys(this.props.themes)
      .sort()
      .filter(themeKey => this.matchQuery(themeKey) || this.matchQuery('Themes'))
      .map((themeKey) => {
        const { selected } = this.props
        const isSelected = (themeKey === selected)

        themeSelected = themeSelected || isSelected

        return (
          <div
            key={themeKey}
            className={classnames({
              [styles.link]: true,
              [styles.selectedLink]: isSelected
            })}
          >
            <Link theme={this.linkTheme(isSelected)} href={`#${themeKey}`}>
              {themeKey}
            </Link>
          </div>
        )
      })

    return this.createNavToggle({
      id: '__themes',
      title: 'Themes',
      children: themeLinks,
      expanded: themeSelected
    })
  }

  render () {
    return (
      <div className={styles.root}>
        <div role="search" className={styles.search}>
          <TextInput
            placeholder="Find..."
            onChange={this.handleSearchChange}
            label={<ScreenReaderContent>Search Documentation</ScreenReaderContent>}
          />
        </div>
        <div role="navigation" className={styles.sections}>
          {this.renderSections()}
          {this.renderThemeSection()}
        </div>
      </div>
    )
  }
}
