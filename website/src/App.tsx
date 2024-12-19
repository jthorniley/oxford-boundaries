import "leaflet/dist/leaflet.css";
import "./App.css";

import geojson from "geojson";
import L from "leaflet";
import React from "react";

function App() {
  const mapRef = React.useRef<HTMLElement>(null);
  const [map, setMap] = React.useState<L.Map | null>(null)
  const [tt, setTT] = React.useState<React.ReactNode | null>(null);

  React.useEffect(() => {

      while (mapRef.current!.firstChild !== null) {
        mapRef.current!.removeChild(mapRef.current!.firstChild);
      }
      const mapEl = document.createElement("div")
      mapRef.current!.appendChild(mapEl);

      const newMap = L.map(mapEl);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(newMap);


      newMap.setView([51.746409, -1.235782], 14)

      setMap(newMap)
    }
  , [setMap])
  
  React.useEffect(() => {
    (async () => {
      if (map){
        const {wards, wardTooltips} = await import("./wards");

        wards.addTo(map);

        const oxfordDivisions = await import( "./data/oxford-divisions.json");
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

        setTT(wardTooltips);
      }
    })()
  }, [map])
  return (
    <>
      <main className="app">
        (tt && <section style={{display: "none"}}>{ tt }</section>)
        <section id="map" ref={mapRef}></section>
      </main >
    </>
  )
}

export default App
