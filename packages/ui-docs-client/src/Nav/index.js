/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { themeable } from '@instructure/ui-themeable'
import { Button } from '@instructure/ui-buttons'
import { Text } from '@instructure/ui-elements'
import { TextInput } from '@instructure/ui-text-input'
import { ScreenReaderContent } from '@instructure/ui-a11y'
import { IconSearchLine } from '@instructure/ui-icons'
import { capitalizeFirstLetter } from '@instructure/ui-utils'

import { NavToggle } from '../NavToggle'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class Nav extends Component {

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
    docs: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired,
    themes: PropTypes.object,
    icons: PropTypes.object,
    selected: PropTypes.string
  }

  static defaultProps = {
    docs: [],
    themes: [],
    icons: {},
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
      queryStr: value,
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

  buttonTheme (isSelected) {
    return {
      linkColor: isSelected ? this.theme.linkColorSelected : this.theme.linkColor
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
          iconPosition="start"
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
        <Button href={`#${docId}`} variant="link" theme={this.buttonTheme(docSelected)}>
          {docs[docId].title}
        </Button>
      </div>
    )
  }

  renderSectionChildren (sectionId, markExpanded) {
    const children = {}
    const { docs, sections } = this.props

    this.matchingSectionsInSection(sectionId, markExpanded)
      .forEach((sectionId) => {
        const title = capitalizeFirstLetter(sections[sectionId].title)
        children[title] = { section: true, id: sectionId, order: '__' }
      })

    this.matchingDocsInSection(sectionId, markExpanded)
      .forEach(docId => { children[docId] = { id: docId, order: docs[docId].order } })

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
          return this.renderDocLink(id, sections[sectionId].level)
        }
      })
  }

  renderSectionLink (sectionId, markParentExpanded, variant) {
    const { selected } = this.props

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

  renderThemes () {
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
            <Button theme={this.buttonTheme(isSelected)} href={`#${themeKey}`} variant="link">
              {themeKey}
            </Button>
          </div>
        )
      })

    if (themeSelected) {
      this.markExpanded(this._themeId)
    }

    const link = this.createNavToggle({
      id: this._themeId,
      title: 'Themes',
      children: themeLinks
    })

    return link ? [link] : []
  }

  renderIcons () {
    const { icons } = this.props

    const formats = Object.keys(icons.formats)
      .filter((key) => this.matchQuery(icons.formats[key].format) || this.matchQuery('iconography'))

    return (formats.length > 0) ? [
      <div className={styles.navToggle} key={'iconography'}>
        <NavToggle
          summary={'Iconography'}
          href="#iconography"
        />
      </div>
    ] : []
  }

  render () {
    const sections = this.renderSections()
    const themes = this.renderThemes()
    const icons = this.renderIcons()
    const matches = [ ...sections, ...themes, ...icons ]

    return (
      <div className={styles.root}>
        <div role="search" className={styles.search}>
          <TextInput
            placeholder="Find..."
            onChange={this.handleSearchChange}
            renderLabel={<ScreenReaderContent>Search Documentation</ScreenReaderContent>}
            type="search"
            renderAfterInput={<IconSearchLine inline={false} />}
          />
        </div>
        <div role="navigation" className={styles.sections}>
          { matches.length > 0
            ? matches
            : <Text
              weight="light"
              size="medium"
              theme={{ primaryColor: styles.color }}
              color="primary"
            >
                No matches for <b>{this.state.queryStr}</b>
            </Text>
          }
        </div>
      </div>
    )
  }
}

export default Nav
export { Nav }
