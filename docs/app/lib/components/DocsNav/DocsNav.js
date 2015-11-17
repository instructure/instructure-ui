import React, {PropTypes, Component} from 'react'
import { DocsMenu, DocsMenuItem } from '../DocsMenu'

import styles from './DocsNav.css'

export default class DocsNav extends Component {
  constructor (props) {
    super()
    this.state = {
      query: ''
    }
  }

  static propTypes = {
    components: PropTypes.array.isRequired,
    guides: PropTypes.array.isRequired
  }

  handleSearchChange = e => this.setState({query: e.target.value})

  render () {
    const components = this.props.components
      .sort()
      .filter(name => new RegExp(this.state.query, 'i').test(name))
      .map(name => <DocsMenuItem key={name} name={name} href={`#${name}`} />)

    const guides = this.props.guides
      .sort()
      .filter(guide => new RegExp(this.state.query, 'i').test(guide.title))
      .map(guide => <DocsMenuItem key={guide.id} name={guide.title} href={`#${guide.id}`} />)

    return (
      <div className={styles.root}>
        <DocsMenu>
          <DocsMenuItem isActive>
            <input
              placeholder="Search"
              onChange={this.handleSearchChange}
              className={styles.searchInput}
            />
          </DocsMenuItem>
          <div>
            <div className={styles.header}>
              Components
            </div>
            <div className={styles.section}>
              {components}
            </div>
            <div className={styles.header}>
              Guides
            </div>
            <div className={styles.section}>
              {guides}
            </div>
          </div>
        </DocsMenu>
      </div>
    )
  }
}
