import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToggleDetails from 'instructure-ui/lib/components/ToggleDetails'
import Typography from 'instructure-ui/lib/components/Typography'

export default class NavToggle extends Component {
  static propTypes = {
    summary: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['section', 'category'])
  }

  static defaultProps = {
    variant: 'section'
  }

  focus () {
    this._toggle.focus()
  }

  render () {
    const {
      summary,
      variant
    } = this.props

    const sectionStyles = {
      color: '#008ee2',
      textWeight: 'light',
      textTransform: 'uppercase',
      textSize: 'medium'
    }

    const categoryStyles = {
      color: '#333',
      textWeight: 'normal',
      textTransform: 'capitalize',
      textSize: 'small'
    }

    const styles = variant === 'section' ? sectionStyles : categoryStyles

    const toggleTheme = {
      iconColor: styles.color
    }

    const typographyTheme = {
      primaryColor: styles.color
    }

    return (
      <ToggleDetails
        ref={(c) => { this._toggle = c }}
        variant={this.props.variant}
        theme={toggleTheme}
        fluidWidth
        {...this.props}
        summary={
          <Typography
            weight={styles.textWeight}
            transform={styles.textTransform}
            size={styles.textSize}
            theme={typographyTheme}
            color="primary"
          >
            {summary}
          </Typography>
        }
      />
    )
  }
}
