import React from 'react'

export const Accounts = ({ width = 24, height = 24, color = 'white' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"
      fill={color}
    />
  </svg>
)
