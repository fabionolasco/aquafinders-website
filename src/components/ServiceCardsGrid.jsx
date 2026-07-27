import React from "react";
import LangLink from "./LangLink";
import { FindWaterIcon, AvoidWaterIcon, ResistivityIcon, StudiesIcon } from "./ServiceIcons";
import { useT } from "../i18n";

const CARDS = [
  { key: "findWater", Icon: FindWaterIcon, iconId: "find-water-svg", className: "service-card" },
  { key: "avoidWater", Icon: AvoidWaterIcon, iconId: "avoid-svg", className: "service-card" },
  { key: "resistivity", Icon: ResistivityIcon, iconId: undefined, className: "service-card service-card-soil" },
  { key: "studies", Icon: StudiesIcon, iconId: undefined, className: "service-card service-card-studies" },
];

// The 4 home-page service cards (data-driven).
export default function ServiceCardsGrid() {
  const t = useT();
  return (
    <div className="service-grid">
      {CARDS.map(({ key, Icon, iconId, className }) => (
        <div className={className} key={key}>
          <LangLink page={key}>
            <div className="service-icon" id={iconId}><Icon /></div>
            <h3>{t.services.cards[key].title}</h3>
            <p>{t.services.cards[key].description}</p>
          </LangLink>
        </div>
      ))}
    </div>
  );
}
