import React, { useState } from "react";

// Accessible accordion. Only one panel open at a time. Each trigger is a real
// <button> with aria-expanded / aria-controls for keyboard & screen readers.
export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const btnId = `accordion-button-${i + 1}`;
        const panelId = `accordion-panel-${i + 1}`;
        return (
          <div className={`accordion-item${isOpen ? " active" : ""}`} key={item.title}>
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span className="accordion-title">{item.title}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="accordion-content"
              hidden={!isOpen}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
