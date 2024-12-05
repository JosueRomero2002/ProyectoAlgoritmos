import React, { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";

const MapTSP = ({ locations, route, activeStep, onAddLocation }) => {
  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoiam9zdWVwaW5ybzIxIiwiYSI6ImNtNDhtNW91eDAxMG0yam9wM3Z6MWpqb3gifQ._fNJxZhv1iMMgAiVZwwkfQ";

  const lineLayer = {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#888",
      "line-width": 4,
    },
  };

  const activeMarkerStyle = {
    backgroundColor: "blue",
    border: "2px solid white",
    borderRadius: "50%",
    width: "10px",
    height: "10px",
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onDblClick={onAddLocation}>
        {locations.map((loc, index) => (
          <Marker
            key={index}
            longitude={loc.lng}
            latitude={loc.lat}
            color={index === activeStep ? "blue" : "red"}
            style={index === activeStep ? activeMarkerStyle : null}
          />
        ))}
        {route.length > 1 && (
          <Source
            id="route"
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: route.map((loc) => [loc.lng, loc.lat]),
              },
            }}>
            <Layer {...lineLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default MapTSP;
