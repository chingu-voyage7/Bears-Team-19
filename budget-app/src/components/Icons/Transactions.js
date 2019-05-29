import React from 'react'

export const Transactions = ({ width = 24, height = 24, color = 'white' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24">
    <path
      fill={color}
      d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)
