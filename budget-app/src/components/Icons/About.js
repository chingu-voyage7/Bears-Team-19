import React from 'react'

export const About = ({ width = 24, height = 24, color = 'white' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24">
    <path
      fill={color}
      d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
    />
  </svg>
)
