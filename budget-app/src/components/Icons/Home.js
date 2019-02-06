import React from 'react'

export const Home = ({ width = 24, height = 24, color = 'none' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="white" />
  </svg>
)
