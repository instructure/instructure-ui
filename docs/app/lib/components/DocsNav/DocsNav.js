import React, {PropTypes, Component} from 'react'

import styles from './DocsNav.css'

export default class DocsNav extends Component {
  constructor (props) {
    super()
    this.state = {
      query: ''
    }
  }

  static propTypes = {
    components: PropTypes.array,
    documents: PropTypes.array
  }

  static defaultProps = {
    components: [],
    documents: []
  }

  handleSearchChange = e => this.setState({query: e.target.value})

  render () {
    const components = this.props.components
      .sort()
      .filter(component => new RegExp(this.state.query, 'i').test(component.name))
      .map((component) => {
        return (
          <a key={component.name} className={styles.link} href={`#${component.name}`}>
            {component.name}
          </a>
        )
      })

    const documents = this.props.documents
      .sort()
      .filter(doc => new RegExp(this.state.query, 'i').test(doc.title))
      .map((doc) => {
        return (
          <a key={doc.name} className={styles.link} href={`#${doc.name}`}>
            {doc.title}
          </a>
        )
      })

    return (
      <div className={styles.root}>
        <label aria-label="Search Documentation">
          <input
            placeholder="Search"
            onChange={this.handleSearchChange}
            className={styles.search}
          />
        </label>
        <div>
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
