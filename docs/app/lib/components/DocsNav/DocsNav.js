import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

import styles from './DocsNav.css'

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
        const classes = {
          [styles.link]: true,
          [styles.selectedLink]: component.name === this.props.selected
        }
        return (
          <a key={component.name} className={classnames(classes)} href={`#${component.name}`}>
            {component.name}
          </a>
        )
      })

    const documents = this.props.documents
      .filter((doc) => doc.name !== 'index')
      .filter((doc) => new RegExp(this.state.query, 'i').test(doc.title))
      .map((doc) => {
        const classes = {
          [styles.link]: true,
          [styles.selectedLink]: doc.name === this.props.selected
        }
        return (
          <a key={doc.name} className={classnames(classes)} href={`#${doc.name}`}>
            {doc.title}
          </a>
        )
      })

    return (
      <div className={styles.root}>
        <h1 className={styles.title} role="banner">
          InstUI
        </h1>
        <div role="search">
          <input
            placeholder="Search"
            onChange={this.handleSearchChange}
            className={styles.search}
            aria-label="Search Documentation"
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
