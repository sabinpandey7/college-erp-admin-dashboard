import React from "react"
import "./summarycard.scss"

const SummaryCard = ({ text, quantity }) => {
  return (
    <div className="summaryCard">
      <p className="title">{text}</p>
      <p className="amount">{quantity}</p>
    </div>
  )
}

export default SummaryCard
