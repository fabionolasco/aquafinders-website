import React from "react";

// A single price row in the Process & Pricing breakdown.
export default function PriceRow({ price }) {
  return (
    <div className="price">
      <div style={price.muted ? { backgroundColor: "#eee" } : undefined}>
        {price.amount}
        {price.amountExtra && (<><br />{price.amountExtra}</>)}
      </div>
      <div>
        <h5 style={{ marginTop: "1rem" }}>{price.title}</h5>
        <p>{price.description}</p>
      </div>
    </div>
  );
}
