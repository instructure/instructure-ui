import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import containerQuery from '../../util/containerQuery'
import MetricsList, { MetricsListItem } from '../MetricsList'
import Avatar from '../Avatar'
import Heading from '../Heading'
import Link from '../Link'

import styles from './UserCard.css'
import themeVariables from './theme/UserCard'
import themeStyles from './theme/UserCard.css'

/**

This is the UserCard in its most common format used within the [ContextBox](#ContextBox) component.
See the [ContextBox](#ContextBox) component for prop information.

```jsx_example
  <ContextBox withArrow={false} withAnimation={false}>
    <UserCard
      userName="Jessica Jones"
      profileData={[{
          label: 'Section',
          value: '2'
        },
        {
          label: 'Last Login',
          value: '2/20/12'
      }]}
      metricsData={[{
       label: 'Grade',
       value: '80%'
     },
     {
        label: 'Late',
        value: '4'
     },
     {
       label: 'Missing',
       value: '4'
     }]}
    />
  </ContextBox>
```

When used on its own the UserCard component has no border or drop shadow.

```jsx_example
   <UserCard
     userName="Blake Simkins"
     userImgUrl={avatarImage}
     profileUrl="example.html"
     profileData={[{
       label: 'Section',
       value: '2'
     },
     {
       label: 'Last Login',
       value: '2/20/12'
     }]}
     metricsData={[{
       label: 'Grade',
       value: '80%'
     },
     {
        label: 'Late',
        value: '4'
     },
     {
       label: 'Missing',
       value: '4'
     }]}
   />
```

*/

@themeable(themeVariables, themeStyles)
@containerQuery({ width_greater_than_avatar: { minWidth: '15.6875rem' } })
export default class UserCard extends Component {

  static propTypes = {
    userName: PropTypes.string.isRequired,
    profileUrl: PropTypes.string,
    userImgUrl: PropTypes.string,
    profileData: PropTypes.array,
    metricsData: PropTypes.array
  };

  renderUserName () {
    return this.props.profileUrl ? (
      <Link href={this.props.profileUrl}>
        {this.props.userName}
      </Link>
    ) : this.props.userName
  }

  renderProfileData () {
    return this.props.profileData.map((item, i) => {
      return (
        <div className={styles.profileData} key={i}>
          {item.label} {item.value}
        </div>
      )
    })
  }

  renderMetricsListItems () {
    return this.props.metricsData.map((item, i) => {
      return (
        <MetricsListItem key={i} label={item.label} value={item.value} />
      )
    })
  }

  renderMetricsData () {
    return (
      <MetricsList>
        {this.renderMetricsListItems()}
      </MetricsList>
    )
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.avatar}>
            <Avatar
              variant="rectangle"
              userImgUrl={this.props.userImgUrl}
              userName={this.props.userName} />
          </div>
          <div className={styles.profile}>
            <Heading>
              {this.renderUserName()}
            </Heading>
            {this.props.profileData && this.renderProfileData()}
            <div className={styles.metrics}>
              {this.props.metricsData && this.renderMetricsData()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
