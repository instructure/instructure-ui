import React, { PropTypes } from 'react'

export default function iconActive ({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path d="M10 0C4.823 0 .554 3.954.05 9h11.54L9.293
      6.708l1.414-1.416 4.707 4.7-4.706 4.714-1.416-1.412L11.582
      11H.052c.502 5.046 4.77 9 9.948 9 5.514 0 10-4.486
      10-10S15.514 0 10 0"
        fill="#229EBD"
        fill-rule="evenodd"
      />
    </svg>
  )
}

iconActive.propTypes = {
  className: PropTypes.string
}
