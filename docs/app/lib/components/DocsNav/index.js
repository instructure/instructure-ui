import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

import styles from './styles.css'

import TextInput from 'instructure-ui/lib/components/TextInput'
import Link from 'instructure-ui/lib/components/Link'
import ScreenReaderContent from 'instructure-ui/lib/components/ScreenReaderContent'
import ToggleDetails from 'instructure-ui/lib/components/ToggleDetails'
import Typography from 'instructure-ui/lib/components/Typography'
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'

export default class DocsNav extends Component {
  static propTypes = {
    components: PropTypes.array,
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

  renderSection (toggleText, sectionLinks, expanded) {
    return (
      <ApplyTheme theme={{
        [ToggleDetails.theme]: {iconColor: '#008ee2'},
        [Typography.theme]: {primaryColor: '#008ee2'}
      }}>
        <div className={styles.toggle}>
          <ToggleDetails
            summary={
              <Typography
                transform="uppercase"
                weight="light"
                color="primary"
              >
                {toggleText}
              </Typography>
            }
            isExpanded={expanded || !!this.state.query}
            iconPosition="end"
            isBlock
          >
            <div className={styles.section}>
              {sectionLinks}
            </div>
          </ToggleDetails>
        </div>
      </ApplyTheme>
    )
  }

  render () {
    let componentSelected = false
    let documentSelected = false
    let themeSelected = false

    const components = this.props.components
      .filter((component) => new RegExp(this.state.query, 'i').test(component.name))
      .map((component) => {
        const isSelected = component.name === this.props.selected
        componentSelected = componentSelected || isSelected
        const classes = {
          [styles.link]: true,
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
        <div role="navigation">
          { themes.length > 0 && this.renderSection('Themes', themes, themeSelected) }
          { components.length > 0 && this.renderSection('Components', components, componentSelected) }
          { documents.length > 0 && this.renderSection('Documentation', documents, documentSelected) }
        </div>
      </div>
    )
  }
}
