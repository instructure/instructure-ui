import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

import TextInput from 'instructure-ui/lib/components/TextInput'
import Link from 'instructure-ui/lib/components/Link'
import ScreenReaderContent from 'instructure-ui/lib/components/ScreenReaderContent'
import NavToggle from '../NavToggle'

export default class DocsNav extends Component {
  static propTypes = {
    components: PropTypes.object,
    documents: PropTypes.array,
    themes: PropTypes.object,
    selected: PropTypes.string
  }

  static defaultProps = {
    components: [],
    documents: [],
    themes: []
  }

  constructor (props) {
    super()
    this.state = {
      query: ''
    }
  }

  handleSearchChange = (e) => this.setState({query: e.target.value})

  linkTheme (isSelected) {
    return {
      color: isSelected ? '#008ee2' : '#333',
      textDecoration: 'none'
    }
  }

  createNavToggle (toggleText, children, expanded, variant = 'section') {
    if (children.length === 0) {
      return
    }

    return (
      <div className={styles.navToggle} key={toggleText}>
        <NavToggle
          variant={variant}
          summary={toggleText}
          expanded={expanded || !!this.state.query}
          iconPosition="end"
        >
          {children}
        </NavToggle>
      </div>
    )
  }

  createComponentLinks = (components, isCategoryLink = false) => {
    return components.map((component) => {
      const isSelected = component.name === this.props.selected
      const classes = {
        [styles.link]: true,
        [styles.categoryLink]: isCategoryLink,
        [styles.selectedLink]: isSelected
      }
      return (
        <div key={component.name} className={classnames(classes)}>
          <Link theme={this.linkTheme(isSelected)} href={`#${component.name}`}>
            {component.name}
          </Link>
        </div>
      )
    })
  }

  render () {
    let componentSelected = false
    let documentSelected = false
    let themeSelected = false

    const categories = []
    let elements = null
    const categorizedComponents = this.props.components

    Object.keys(categorizedComponents).sort().forEach((category) => {
      const filteredComponents = categorizedComponents[category]
        .filter((component) => new RegExp(this.state.query, 'i').test(component.name))

      if (filteredComponents.length > 0) {
        const isSelected = filteredComponents.map((component) => component.name)
          .indexOf(this.props.selected) > -1
        componentSelected = componentSelected || isSelected
        const componentLinks = this.createComponentLinks(filteredComponents, true)

        if (category !== 'Elements') {
          categories.push(this.createNavToggle(category, componentLinks, isSelected, 'category'))
        } else {
          elements = this.createComponentLinks(filteredComponents)
        }
      }
    })

    let components = []
    if (elements || (categories.length > 0)) {
      components = [elements, ...categories]
    }

    const documents = this.props.documents
      .filter((doc) => doc.name !== 'index')
      .filter((doc) => new RegExp(this.state.query, 'i').test(doc.title))
      .map((doc) => {
        const isSelected = doc.name === this.props.selected
        documentSelected = documentSelected || isSelected
        const classes = {
          [styles.link]: true,
          [styles.selectedLink]: isSelected
        }
        return (
          <div key={doc.name} className={classnames(classes)}>
            <Link theme={this.linkTheme(isSelected)} href={`#${doc.name}`}>
              {doc.title}
            </Link>
          </div>
        )
      })

    const themes = Object.keys(this.props.themes)
      .filter((themeKey) => new RegExp(this.state.query, 'i').test(themeKey))
      .map((themeKey) => {
        const isSelected = themeKey === this.props.selected
        themeSelected = themeSelected || isSelected
        const classes = {
          [styles.link]: true,
          [styles.selectedLink]: isSelected
        }
        return (
          <div key={themeKey} className={classnames(classes)}>
            <Link theme={this.linkTheme(isSelected)} href={`#${themeKey}`}>
              {themeKey}
            </Link>
          </div>
        )
      })

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
          { this.createNavToggle('Themes', themes, themeSelected) }
          { this.createNavToggle('Components', components, componentSelected) }
          { this.createNavToggle('Documentation', documents, documentSelected) }
        </div>
      </div>
    )
  }
}
