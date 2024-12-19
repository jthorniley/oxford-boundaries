import "leaflet/dist/leaflet.css";
import "./App.css";

import geojson from "geojson";
import L from "leaflet";
import React from "react";

import {wards, wardTooltips} from "./wards";

import oxfordDivisions from "./data/oxford-divisions.json";

function App() {
  const mapRef = React.useRef<HTMLElement>(null);
  
  React.useEffect(() => {

      while (mapRef.current!.firstChild !== null) {
        mapRef.current!.removeChild(mapRef.current!.firstChild);
      }
      const mapEl = document.createElement("div")
      mapRef.current!.appendChild(mapEl);

      const map = L.map(mapEl);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      
      wards.addTo(map);

      L.geoJSON(oxfordDivisions as geojson.GeoJsonObject,
        {
          style: () => {

            return {
              stroke: true,
              color: "black",
              weight: 4
            }
          },
          interactive: false,
          onEachFeature: (feature, layer) => {
            let name = feature.properties.Name;
            name = name.substring(0, name.length -3)
            layer.bindTooltip(name, {permanent: true, direction: "center"})
            
          },
        }
      ).addTo(map);

      map.setView([51.746409, -1.235782], 14)
    }
  , [])
  
  return (
    <>
      <main className="app">
        <section style={{display: "none"}}>{ wardTooltips }</section>
        <section id="map" ref={mapRef}></section>
      </main >
    </>
  )
}

export default App
