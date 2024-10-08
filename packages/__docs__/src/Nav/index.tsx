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

import { IconSearchLine } from '@instructure/ui-icons'
import { Link } from '@instructure/ui-link'
import { TextInput } from '@instructure/ui-text-input'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { View } from '@instructure/ui-view'

import { capitalizeFirstLetter } from '@instructure/ui-utils'

import { NavToggle } from '../NavToggle'
import type { NavProps, NavState } from './props'

class Nav extends Component<NavProps, NavState> {
  _themeId: string
  searchTimeout: ReturnType<typeof setTimeout> | null
  constructor(props: NavProps) {
    super(props)

    this.state = {
      query: null,
      expandedSections: this.setExpandedSections(false, props.sections),
      userToggling: false
    }

    this._themeId = '__themes'

    this.searchTimeout = null
  }

  static defaultProps = {
    docs: [],
    themes: [],
    selected: undefined
  }

  setExpandedSections = (
    expanded: boolean,
    sections: NavProps['sections']
  ): NavProps['sections'] => {
    const expandedSections: NavProps['sections'] = {}
    Object.keys(sections).forEach((sectionId) => {
      expandedSections[sectionId] = expanded
    })
    expandedSections['__themes'] = expanded
    return expandedSections
  }

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const expandedSections = this.setExpandedSections(
      !!value,
      this.state.expandedSections
    )

    clearTimeout(this.searchTimeout!)
    this.searchTimeout = setTimeout(() => {
      this.setState({
        query: value ? new RegExp(value, 'i') : null,
        queryStr: value,
        expandedSections,
        userToggling: false
      })
    }, 500)
  }

  handleToggleSection = (sectionId: string, expanded: boolean) => {
    this.setState(() => {
      const newExpandedSections = { ...this.state.expandedSections }
      newExpandedSections[sectionId] = expanded
      return {
        expandedSections: newExpandedSections,
        userToggling: true
      }
    })
  }

  matchQuery(str: string): boolean {
    const { query } = this.state
    return query && typeof query.test === 'function' ? query.test(str) : true
  }

  createNavToggle({
    id,
    title,
    children,
    variant
  }: {
    id: string
    title: string
    children: React.ReactNode[]
    variant?: 'section' | 'category'
  }): React.ReactNode {
    if (children.length === 0) {
      return
    }

    const { expandedSections } = this.state
    return (
      <View key={id} display="block">
        <NavToggle
          variant={variant}
          summary={title}
          onToggle={(_e, toggleExpanded) => {
            this.handleToggleSection(id, toggleExpanded)
          }}
          expanded={expandedSections[id]}
          iconPosition="end"
        >
          {children}
        </NavToggle>
      </View>
    )
  }

  markExpanded = (sectionId: string) => {
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

  matchingDocsInSection(
    sectionId: string,
    markExpanded?: (sectionId: string) => void
  ) {
    const { sections, selected, docs } = this.props

    return sections[sectionId].docs
      .filter((docId: string) => {
        // WIP packages shouldn't be listed
        if (docs[docId]?.isWIP) {
          return false
        }

        return (
          this.matchQuery(docId) ||
          this.matchQuery(docs[docId].title) ||
          this.matchQuery(sectionId) ||
          (docs[docId].tags && this.matchQuery(docs[docId].tags.toLowerCase()))
          // TODO: check children for matches too
        )
      })
      .map((docId: string) => {
        if (typeof markExpanded === 'function' && docId === selected) {
          markExpanded(sectionId)
        }
        return docId
      })
  }

  matchingSectionsInSection(
    sectionId: string,
    markExpanded?: (sectionId: string) => void
  ) {
    const { sections, selected } = this.props
    return sections[sectionId].sections.map((sectionId: string) => {
      if (typeof markExpanded === 'function' && sectionId === selected) {
        markExpanded(sectionId)
      }
      return sectionId
    })
  }

  renderDocLink(docId: string) {
    const { docs, selected } = this.props
    const docSelected = docId === selected

    return (
      <View
        display="block"
        key={docId}
        margin="xx-small none xx-small"
        padding="none none none x-small"
        position="relative"
      >
        {docSelected && (
          <View
            aria-hidden="true"
            display="block"
            position="absolute"
            insetInlineStart="0"
            insetBlockStart="0"
            insetBlockEnd="0"
            width="0.25rem"
            background="brand"
          />
        )}
        <Link display="block" href={`#${docId}`} isWithinText={false}>
          {docs[docId].title}
        </Link>
      </View>
    )
  }

  renderSectionChildren(
    sectionId: string,
    markExpanded: (sectionId: string) => void
  ): React.ReactNode[] {
    const children: Record<
      string,
      { id: string; section?: boolean; order?: string }
    > = {}
    const { docs, sections } = this.props

    this.matchingSectionsInSection(sectionId, markExpanded).forEach(
      (sectionId: string) => {
        const title = capitalizeFirstLetter(sections[sectionId].title)
        children[title!] = { section: true, id: sectionId, order: '__' }
      }
    )

    this.matchingDocsInSection(sectionId, markExpanded).forEach(
      (docId: string) => {
        children[docId] = { id: docId, order: docs[docId].order }
      }
    )

    return Object.keys(children)
      .sort((a, b) => {
        const orderA = children[a].order ? children[a].order : ''
        const orderB = children[b].order ? children[b].order : ''
        const idA = `${orderA}${a.toUpperCase()}`
        const idB = `${orderB}${b.toUpperCase()}`
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
          return this.renderSectionLink(
            children[id].id,
            () => {
              markExpanded(sectionId)
            },
            'category'
          )
        } else {
          return this.renderDocLink(id)
        }
      })
  }

  renderSectionLink(
    sectionId: string,
    markParentExpanded?: () => void,
    variant?: 'category' | 'section'
  ): React.ReactNode {
    const { selected } = this.props

    const markExpanded = (sectionId: string) => {
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
    } else if (sectionId.includes('WIP')) {
      // We don't want to list the WIP components etc.
      return null
    } else {
      return this.createNavToggle({
        id: sectionId,
        title: this.props.sections[sectionId].title,
        children: this.renderSectionChildren(sectionId, markExpanded),
        variant
      })
    }
  }

  sectionHasMatches(sectionId: string) {
    let matches = this.matchingDocsInSection(sectionId).length > 0
    const sections = this.matchingSectionsInSection(sectionId)

    if (sections.length > 0) {
      sections.forEach((childSectionId: string) => {
        matches = matches || this.sectionHasMatches(childSectionId)
      })
    }
    return matches
  }

  renderSections() {
    // TODO figure out a better way for this
    const mainLevelSectionsInOrder = [
      'Getting Started',
      'Guides',
      'Patterns',
      'components',
      'packages',
      'utilities',
      'Testing',
      'Contributor Guides'
    ]
    const sectionsInOrder = [
      ...mainLevelSectionsInOrder.filter((section) =>
        Object.keys(this.props.sections).includes(section)
      ),
      ...Object.keys(this.props.sections).filter(
        (section) => !mainLevelSectionsInOrder.includes(section)
      )
    ]

    return sectionsInOrder
      .filter((sectionId) => {
        return (
          this.props.sections[sectionId].level === 0 &&
          this.sectionHasMatches(sectionId)
        )
      })
      .map((sectionId) => this.renderSectionLink(sectionId))
  }

  renderThemes() {
    let themeSelected = false

    const themeLinks = Object.keys(this.props.themes!)
      .sort()
      .filter(
        (themeKey) => this.matchQuery(themeKey) || this.matchQuery('Themes')
      )
      .map((themeKey) => {
        const { selected } = this.props
        const isSelected = themeKey === selected

        themeSelected = themeSelected || isSelected

        return (
          <View
            display="block"
            key={themeKey}
            margin="xx-small none xx-small"
            padding="none none none x-small"
            borderWidth={isSelected ? 'none none none large' : 'none'}
            borderColor="brand"
          >
            <Link display="block" isWithinText={false} href={`#${themeKey}`}>
              {themeKey}
            </Link>
          </View>
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

  render() {
    const sections = this.renderSections()
    const themes = this.renderThemes()
    const icons = <NavToggle key={'icons'} summary={'Icons'} href="#icons" />
    const matches = [...sections, ...themes, icons]
    const hasMatches = matches.length > 0
    const errorMessage = [
      { text: `No matches for '${this.state.queryStr}'`, type: 'hint' as const }
    ]

    return (
      <View display="block" padding="none medium">
        <View role="search" display="block">
          <TextInput
            placeholder="Find..."
            onChange={this.handleSearchChange}
            renderLabel={
              <ScreenReaderContent>Search Documentation</ScreenReaderContent>
            }
            type="search"
            renderBeforeInput={<IconSearchLine inline={false} />}
            messages={
              hasMatches || this.state.queryStr == null
                ? undefined
                : errorMessage
            }
            shouldNotWrap
          />
        </View>
        <View margin="medium none none" display="block">
          {hasMatches && matches}
        </View>
      </View>
    )
  }
}

export default Nav
export { Nav }
