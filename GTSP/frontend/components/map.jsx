import React, { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoiam9zdWVwaW5ybzIxIiwiYSI6ImNtNDhtNW91eDAxMG0yam9wM3Z6MWpqb3gifQ._fNJxZhv1iMMgAiVZwwkfQ"; // Reemplázalo con tu token

const calcularDistancias = (ciudades) => {
  const R = 6371; // Radio de la Tierra en kilómetros
  const n = ciudades.length;
  const distancias = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const dLat = (ciudades[j].lat - ciudades[i].lat) * (Math.PI / 180);
        const dLng = (ciudades[j].lng - ciudades[i].lng) * (Math.PI / 180);
        const lat1 = ciudades[i].lat * (Math.PI / 180);
        const lat2 = ciudades[j].lat * (Math.PI / 180);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLng / 2) *
            Math.sin(dLng / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        distancias[i][j] = R * c; // Distancia en kilómetros
      }
    }
  }

  return distancias;
};

// const calcularDistancias = (ciudades) => {
//   const n = ciudades.length;
//   const distancias = Array.from({ length: n }, () => Array(n).fill(0));

//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//       if (i !== j) {
//         const dx = ciudades[i].lng - ciudades[j].lng;
//         const dy = ciudades[i].lat - ciudades[j].lat;
//         distancias[i][j] = Math.sqrt(dx * dx + dy * dy);
//       }
//     }
//   }

//   return distancias;
// };

const TSPMap = () => {
  const [locations, setLocations] = useState([]);
  const [route, setRoute] = useState([]);
  const [currentStep, setCurrentStep] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stats, setStats] = useState({
    distance: 0,
    locationCount: 0,
    executionTime: 0,
  });

  const addLocation = (event) => {
    const newPoint = { lng: event.lngLat.lng, lat: event.lngLat.lat };
    setLocations([...locations, newPoint]);
  };

  const clearMap = () => {
    setLocations([]);
    setRoute([]);
    setCurrentStep([]);
    setIsAnimating(false);
    setStats({
      distance: 0,
      locationCount: 0,
      executionTime: 0,
    });
  };

  const calculateTotalDistance = (route) => {
    if (route.length < 2) return 0;

    let total = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const dx = route[i + 1].lng - route[i].lng;
      const dy = route[i + 1].lat - route[i].lat;
      total += Math.sqrt(dx * dx + dy * dy);
    }
    return total.toFixed(2); // Redondeo a 2 decimales
  };

  const animateAlgorithm = async () => {
    if (locations.length < 2) {
      alert("Debe haber al menos dos puntos para calcular el TSP.");
      return;
    }

    const distancias = calcularDistancias(locations);
    const mejorRuta = [];
    let ciudadActual = 0;

    setIsAnimating(true);
    mejorRuta.push(ciudadActual);

    const startTime = performance.now();

    while (mejorRuta.length < locations.length) {
      let distanciaMinima = Infinity;
      let ciudadMasCercana = -1;

      for (let i = 0; i < locations.length; i++) {
        if (
          !mejorRuta.includes(i) &&
          distancias[ciudadActual][i] < distanciaMinima
        ) {
          distanciaMinima = distancias[ciudadActual][i];
          ciudadMasCercana = i;
        }
      }

      await new Promise(
        (resolve) =>
          setTimeout(() => {
            mejorRuta.push(ciudadMasCercana);
            setCurrentStep([...mejorRuta.map((idx) => locations[idx])]);
            ciudadActual = ciudadMasCercana;
            resolve();
          }, 1000) // Intervalo de 1 segundo
      );
    }

    mejorRuta.push(mejorRuta[0]); // Cerrar ciclo
    const endTime = performance.now();

    const finalRoute = mejorRuta.map((idx) => locations[idx]);
    const totalDistance = calculateTotalDistance(finalRoute);

    setRoute(finalRoute);
    setStats({
      distance: totalDistance,
      locationCount: locations.length,
      executionTime: ((endTime - startTime) / 1000).toFixed(2), // Tiempo en segundos
    });
    setIsAnimating(false);
  };

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
        onDblClick={addLocation}>
        {locations.map((loc, index) => (
          <Marker
            key={index}
            longitude={loc.lng}
            latitude={loc.lat}
            color="red"
          />
        ))}

        {currentStep.length > 1 && (
          <Source
            id="currentStep"
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: currentStep.map((loc) => [loc.lng, loc.lat]),
              },
            }}>
            <Layer {...lineLayer} />
          </Source>
        )}

        {route.length > 1 && !isAnimating && (
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

      <button
        onClick={animateAlgorithm}
        disabled={isAnimating}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          padding: "10px 15px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "5px",
          cursor: isAnimating ? "not-allowed" : "pointer",
        }}>
        {isAnimating ? "Calculando..." : "Calcular TSP"}
      </button>

      <button
        onClick={clearMap}
        style={{
          position: "absolute",
          top: 50,
          left: 10,
          zIndex: 1,
          padding: "10px 15px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Limpiar
      </button>

      <div
        style={{
          position: "absolute",
          top: 100,
          left: 10,
          zIndex: 1,
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontSize: "14px",
        }}>
        <p>
          <strong>Estadísticas:</strong>
        </p>
        <p>Distancia total: {stats.distance} kilome</p>
        <p>Localizaciones: {stats.locationCount}</p>
        <p>Tiempo de ejecución: {stats.executionTime} s</p>
      </div>
    </div>
  );
};

export default TSPMap;
