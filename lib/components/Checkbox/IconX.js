import React, { PropTypes } from 'react'

export default function IconX ({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 16 16"
      enable-background="new 0 0 16 16"
      className={className} aria-hidden="true">
      <polygon points="15,4.3 11.8,1 8,4.8 4.2,1 1,4.3 4.7,8.1 1,11.7 4.2,15 8,11.2 11.8,15 15,11.7 11.3,8.1" />
    </svg>
  )
}

IconX.propTypes = {
  className: PropTypes.string
}
