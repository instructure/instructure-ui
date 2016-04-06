import React, { PropTypes } from 'react'

export default function IconCheck ({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0"
      y="0"
      viewBox="0 0 16 16"
      enable-background="new 0 0 16 16"
      className={className}>
      <polygon points="16 4.3 13.4 1.8 6.6 8.7 2.6 4.8 0 7.4 6.6 13.8" />
    </svg>
  )
}

IconCheck.propTypes = {
  className: PropTypes.string
}
