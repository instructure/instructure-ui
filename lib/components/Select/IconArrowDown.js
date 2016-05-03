import React, { PropTypes } from 'react'

export default function IconArrowDown ({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0"
      y="0"
      viewBox="0 0 16 16"
      enable-background="new 0 0 16 16"
      className={className}>
      <path
        d="M8 11.4c-0.2 0-0.4-0.1-0.6-0.2l-7-4.8C0
        6.1-0.1 5.5 0.2 5c0.3-0.5 0.9-0.6 1.4-0.3L8
        9.1l6.4-4.4c0.5-0.3 1.1-0.2 1.4 0.3 0.3 0.5
        0.2 1.1-0.3 1.4l-7 4.8C8.4 11.3 8.2 11.4 8 11.4z" />
    </svg>
  )
}

IconArrowDown.propTypes = {
  className: PropTypes.string
}
