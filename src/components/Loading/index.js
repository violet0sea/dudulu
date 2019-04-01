import React from "react"

import "./index.scss"

export default function loading() {
  return (
    <div className="loading">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
