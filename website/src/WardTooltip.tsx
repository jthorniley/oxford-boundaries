import React from "react";
import L from "leaflet";
import geojson from "geojson";

import { CandidateEntry } from "./parties";
import { Chart } from "./Chart";

import results2022 from "./data/results-2022.json";
import results2024 from "./data/results-2024.json";

type WardTooltipProps = {
  feature: geojson.Feature
  layer: L.Layer
}

export function WardTooltip(props: WardTooltipProps) {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const { feature, layer } = props;
  const wardName = feature.properties!.Ward_name;

  React.useEffect(() => {
    if (!tooltipRef.current) {
      return;
    }
    const popup = L.popup();
    layer.bindPopup(popup)
    popup.setContent(tooltipRef.current!)
    layer.openPopup()
    layer.closePopup()
    tooltipRef.current.style["display"] = "block";
  }, [tooltipRef, layer])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const le22 = (results2022 as any)[wardName];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const le24 = (results2024 as any)[wardName];

  return (
    <>
      <div ref={tooltipRef} style={{ display: "none" }}>
        <div>{wardName}</div>
        {le22 && <Chart candidates={le22.candidates as CandidateEntry[]} title="LE22"/>}
        {le24 && <Chart candidates={le24.candidates as CandidateEntry[]} title="LE24"/>}
      </div>
    </>
  )
}
