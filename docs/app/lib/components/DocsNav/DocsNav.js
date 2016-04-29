import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

import styles from './DocsNav.css'

import { TextInput, Link, ScreenReaderContent } from 'instructure-ui'

export default class DocsNav extends Component {
  static propTypes = {
    components: PropTypes.array,
    documents: PropTypes.array,
    selected: PropTypes.string
  };

  static defaultProps = {
    components: [],
    documents: []
  };

  constructor (props) {
    super()
    this.state = {
      query: ''
    }
  }

  handleSearchChange = (e) => this.setState({query: e.target.value});

  render () {
    const components = this.props.components
      .filter((component) => new RegExp(this.state.query, 'i').test(component.name))
      .map((component) => {
        const isSelected = component.name === this.props.selected
        const classes = {
          [styles.link]: true,
          [styles.selectedLink]: isSelected
        }
        return (
          <div key={component.name} className={classnames(classes)}>
            <Link theme={{textColor: isSelected ? '#239EBD' : '#333'}} href={`#${component.name}`}>
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
        const classes = {
          [styles.link]: true,
          [styles.selectedLink]: isSelected
        }
        return (
          <div key={doc.name} className={classnames(classes)}>
            <Link theme={{textColor: isSelected ? '#239EBD' : '#333'}} href={`#${doc.name}`}>
              {doc.title}
            </Link>
          </div>
        )
      })

    return (
      <div className={styles.root}>
        <div role="search">
          <TextInput
            placeholder="Find..."
            onChange={this.handleSearchChange}
            label={<ScreenReaderContent>Search Documentation</ScreenReaderContent>}
          />
        </div>
        <div role="navigation">
          <div className={styles.header}>
            Components
          </div>
          <div className={styles.section}>
            {components}
          </div>
          <div className={styles.header}>
            Documentation
          </div>
          <div className={styles.section}>
            {documents}
          </div>
        </div>
      </div>
    )
  }
}
