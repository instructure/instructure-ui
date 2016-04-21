import React, { PropTypes } from 'react'
import { Button as BaseButton } from 'instructure-ui'

const Button = function (props) {
  const color = '#239EBD'
  const theme = {
    linkTextColor: color,
    linkFocusOutlineColor: color,
    ...props.theme
  }
  return (
    <BaseButton style="link" theme={theme} {...props} />
  )
}

Button.propTypes = {
  theme: PropTypes.object
}

export default Button
