import React from "react";
import L from "leaflet";
import geojson from "geojson";

import { CandidateEntry, DEFAULT_COLOR, getPartyColor } from "./parties";
import { WardTooltip } from "./WardTooltip";

import oxfordWards from "./data/oxford-wards.json";
// /import results2022 from "./data/results-2022.json";
import results2024 from "./data/results-2024.json";

export const wardTooltips: React.ReactElement[] = []

export const wards = L.geoJSON(oxfordWards as geojson.GeoJsonObject, {
  style: (feature) => {
    let color = DEFAULT_COLOR;
    if (feature) {
      const ward = feature.properties.Ward_name;
      const winner = getWinner(ward);
      if (winner) {
        color = getPartyColor(winner.party);
      }
    }
    return {
      stroke: true,
      color: "blue",
      weight: 2,

      fill: true,
      fillColor: color,
      fillOpacity: 0.6,
    };
  },
  onEachFeature: (feature, layer) => {
    wardTooltips.push(<WardTooltip key={feature.properties.Name} layer={layer} feature={feature} />);
  },
});



function getWinner(wardName: string): CandidateEntry | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ward = (results2024 as any)[wardName];
  if (ward === undefined) {
    return null;
  }

  const localCandidates = ward.candidates;
  if (ward === undefined) {
    return null;
  }

  for (const candidate of localCandidates) {
    if (candidate.elected) {
      return candidate as CandidateEntry
    }
  }

  return null
}
