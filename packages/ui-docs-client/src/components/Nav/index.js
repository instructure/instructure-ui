import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'

import Text from '@instructure/ui-core/lib/components/Text'
import TextInput from '@instructure/ui-core/lib/components/TextInput'
import Link from '@instructure/ui-core/lib/components/Link'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import capitalizeFirstLetter from '@instructure/ui-utils/lib/capitalizeFirstLetter'

import NavToggle from '../NavToggle'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Nav extends Component {

  constructor (props) {
    super(props)

    this.state = {
      query: null,
      expandedSections: this.setExpandedSections(false, props.sections),
      userToggling: false
    }

    this._themeId = '__themes'
  }

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

  setExpandedSections = (expanded, sections) => {
    const expandedSections = {}
    Object.keys(sections).forEach((sectionId) => {
      expandedSections[sectionId] = expanded
    })
    expandedSections['__themes'] = expanded
    return expandedSections
  }

  handleSearchChange = (e) => {
    const value = e.target.value

    const expandedSections = this.setExpandedSections(!!value, this.state.expandedSections)
    this.setState({
      query: value ? new RegExp(value, 'i') : null,
      expandedSections,
      userToggling: false
    })
  }

  handleToggleSection = (sectionId, expanded) => {
    this.setState(({ expandedSections }) => {
      const newExpandedSections = {...this.state.expandedSections}
      newExpandedSections[sectionId] = expanded
      return {
        expandedSections: newExpandedSections,
        userToggling: true
      }
    })
  }

  matchQuery (str) {
    const { query } = this.state
    return (query && typeof query.test === 'function') ? query.test(str) : true
  }

  linkTheme (isSelected) {
    return {
      color: isSelected ? '#0084D1' : '#333',
      textDecoration: 'none'
    }
  }

  createNavToggle ({ id, title, children, variant }) {
    if (children.length === 0) {
      return
    }

    const { expandedSections } = this.state
    return (
      <div className={styles.navToggle} key={id}>
        <NavToggle
          variant={variant}
          summary={title}
          onToggle={(e, toggleExpanded) => { this.handleToggleSection(id, toggleExpanded) }}
          expanded={expandedSections[id]}
          iconPosition="end"
        >
          {children}
        </NavToggle>
      </div>
    )
  }

  markExpanded = (sectionId) => {
    const { expandedSections, userToggling } = this.state
    // If we set expanded to true for a section that contains a
    // selected doc on every render, the user cannot collapse a section
    // that contains a selected doc. We mark when a user toggles a
    // section and allow them to control the expanded status of the
    // sections until a new query where we will once again display all
    // of the results, or no query where we will once again only show
    // the expanded path
    if (userToggling) {
      return
    }
    expandedSections[sectionId] = true
  }

  matchingDocsInSection (sectionId, markExpanded) {
    const { sections, selected, docs } = this.props
    return sections[sectionId].docs
      .filter((docId) => {
        return (
          this.matchQuery(docId) ||
          this.matchQuery(docs[docId].title) ||
          this.matchQuery(sectionId)
          // TODO: check children for matches too
        )
      })
      .map((docId) => {
        if (typeof markExpanded === 'function' && docId === selected) {
          markExpanded(sectionId)
        }
        return docId
      })
  }

  matchingSectionsInSection (sectionId, markExpanded) {
    const { sections, selected } = this.props
    return sections[sectionId].sections
      .map((sectionId) => {
        if (typeof markExpanded === 'function' && sectionId === selected) {
          markExpanded(sectionId)
        }
        return sectionId
      })
  }

  renderDocLink (docId, level = 0) {
    const { docs, selected } = this.props
    const docSelected = (docId === selected)

    return (
      <div
        key={docId}
        className={classnames({
          [styles.link]: true,
          [styles[`level--${level}`]]: true,
          [styles.selectedLink]: docSelected
        })}
      >
        <Link theme={this.linkTheme(docSelected)} href={`#${docId}`}>
          {docs[docId].title}
        </Link>
      </div>
    )
  }

  renderSectionChildren (sectionId, markExpanded) {
    const children = {}

    this.matchingSectionsInSection(sectionId, markExpanded)
      .forEach((sectionId) => {
        const title = capitalizeFirstLetter(this.props.sections[sectionId].title)
        children[title] = { section: true, id: sectionId, order: '__' }
      })

    this.matchingDocsInSection(sectionId, markExpanded)
      .filter(docId => !this.props.docs[docId].parent) // filter out docs with parent defined
      .forEach(docId => { children[docId] = { id: docId, order: this.props.docs[docId].order } })

    return Object.keys(children)
      .sort((a, b) => {
        const idA = `${children[a].order}${a.toUpperCase()}`
        const idB = `${children[b].order}${b.toUpperCase()}`
        if (idA < idB) {
          return -1
        }
        if (idA > idB) {
          return 1
        }
        return 0
      })
      .map((id) => {
        if (children[id].section) {
          return this.renderSectionLink(children[id].id, () => { markExpanded(sectionId) }, 'category')
        } else {
          return this.renderDocLink(id, this.props.sections[sectionId].level)
        }
      })
  }

  renderSectionLink (sectionId, markParentExpanded, variant) {
    const { selected, docs } = this.props

    const markExpanded = (sectionId) => {
      this.markExpanded(sectionId)
      if (typeof markParentExpanded === 'function') {
        markParentExpanded()
      }
    }

    if (sectionId === selected) {
      markExpanded(sectionId)
    }

    if (sectionId === '__uncategorized') {
      return this.renderSectionChildren(sectionId, markExpanded)
    } else {
      return this.createNavToggle({
        id: sectionId,
        title: this.props.sections[sectionId].title,
        children: this.renderSectionChildren(sectionId, markExpanded),
        variant
      })
    }
  }

  sectionHasMatches (sectionId) {
    let matches = this.matchingDocsInSection(sectionId).length > 0
    const sections = this.matchingSectionsInSection(sectionId)
    if (sections.length > 0) {
      sections.forEach((childSectionId) => {
        matches = matches || this.sectionHasMatches(childSectionId)
      })
    }
    return matches
  }

  renderSections () {
    return Object.keys(this.props.sections)
      .sort()
      .filter(sectionId => this.props.sections[sectionId].level === 0)
      .filter(sectionId => this.sectionHasMatches(sectionId))
      .map(sectionId => this.renderSectionLink(sectionId))
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
              [styles.selectedLink]: isSelected,
              [styles['level--0']]: true
            })}
          >
            <Link theme={this.linkTheme(isSelected)} href={`#${themeKey}`}>
              {themeKey}
            </Link>
          </div>
        )
      })

    if (themeSelected) {
      this.markExpanded(this._themeId)
    }

    return this.createNavToggle({
      id: this._themeId,
      title: 'Themes',
      children: themeLinks
    })
  }

  render () {
    const sections = this.renderSections()
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
          {sections && sections.length > 0
            ? sections
            : <Text
              weight="light"
              size="medium"
              theme={{ primaryColor: styles.color }}
              color="primary"
            >
                No search results
              </Text>
          }
          {this.renderThemeSection()}
        </div>
      </div>
    )
  }
}
