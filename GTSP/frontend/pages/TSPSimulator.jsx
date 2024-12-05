import React, { useState } from "react";
import { Layout } from "antd";
import SidebarTSP from "../components/SidebarTSP";
import MapTSP from "../components/MapTSP";
import {
  calcularDistancias,
  algoritmoBiFrost,
  algoritmoHeldKarp,
} from "./algoritmos";

const { Content } = Layout;

const TSPSimulator = () => {
  const [locations, setLocations] = useState([]);
  const [route, setRoute] = useState([]);
  const [stats, setStats] = useState({
    distancia: 0,
    tiempo: 0,
    totalLocalizaciones: 0,
  });
  const [activeStep, setActiveStep] = useState(-1);

  const generateRandomLocations = (count) => {
    const bounds = {
      lngMin: -125.0,
      lngMax: -66.93457,
      latMin: 24.396308,
      latMax: 49.384358,
    };

    const randomLocations = Array.from({ length: count }, () => ({
      lng: Math.random() * (bounds.lngMax - bounds.lngMin) + bounds.lngMin,
      lat: Math.random() * (bounds.latMax - bounds.latMin) + bounds.latMin,
    }));

    setLocations(randomLocations);
    setRoute([]);
    setStats({
      distancia: 0,
      tiempo: 0,
      totalLocalizaciones: randomLocations.length,
    });
  };

  const addLocation = (event) => {
    const newPoint = { lng: event.lngLat.lng, lat: event.lngLat.lat };

    setLocations([...locations, newPoint]);
  };

  const clearMap = () => {
    setLocations([]);
    setRoute([]);
    setStats({ distancia: 0, tiempo: 0, totalLocalizaciones: 0 });
    setActiveStep(-1);
  };

  const calculateTSP = async () => {
    if (locations.length < 2) {
      alert("Debe haber al menos dos puntos para calcular el TSP.");
      return;
    }

    const distancias = calcularDistancias(locations);
    const inicio = performance.now();
    let mejorRutaIndices = [];
    let mejorRuta = [];

    let ciudadActual = 0;

    for (let i = 0; i < locations.length; i++) {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const siguienteCiudad = algoritmoBiFrost(
        locations,
        distancias,
        ciudadActual
      )[i];
      mejorRutaIndices.push(siguienteCiudad);
      mejorRuta.push(locations[siguienteCiudad]);
      setActiveStep(siguienteCiudad);
      setRoute([...mejorRuta]);
    }

    mejorRuta.push(locations[mejorRutaIndices[0]]);
    setRoute([...mejorRuta]);

    const fin = performance.now();

    let distanciaTotal = 0;
    for (let i = 0; i < mejorRuta.length - 1; i++) {
      const origen = mejorRutaIndices[i];
      const destino = mejorRutaIndices[i + 1] || mejorRutaIndices[0];
      distanciaTotal += distancias[origen][destino];
    }

    setStats({
      distancia: distanciaTotal.toFixed(2),
      tiempo: (fin - inicio).toFixed(2),
      totalLocalizaciones: locations.length,
    });
    setActiveStep(-1);
  };

  // ==============================================================

  const calculateExactTSP = async () => {
    if (locations.length < 2) {
      alert("Debe haber al menos dos puntos para calcular el TSP.");
      return;
    }

    const distancias = calcularDistancias(locations);

    const inicio = performance.now();

    try {
      const mejorRutaIndices = algoritmoHeldKarp(locations, distancias);

      console.log("Distancia mínima:", mejorRutaIndices.distanciaMinima);
      console.log(
        "Mejor ruta:",
        mejorRutaIndices.mejorRuta.map((i) => locations[i])
      );

      const mejorRuta = mejorRutaIndices.mejorRuta.map((i) => locations[i]);

      setRoute([...mejorRuta]);

      const fin = performance.now();

      setStats({
        distancia: mejorRutaIndices.distanciaMinima.toFixed(2),
        tiempo: (fin - inicio).toFixed(2),
        totalLocalizaciones: locations.length,
      });

      setActiveStep(-1);
    } catch (error) {
      console.error("Error calculando el TSP exacto:", error.message);
    }
  };
  // const calculateExactTSP = async () => {
  //   if (locations.length < 2) {
  //     alert("Debe haber al menos dos puntos para calcular el TSP.");
  //     return;
  //   }

  //   const distancias = calcularDistancias(locations);
  //   const inicio = performance.now();

  //   try {
  //     const mejorRutaIndices = algoritmoHeldKarp(locations, distancias);
  //     const mejorRuta = mejorRutaIndices.mejorRuta.map((i) => locations[i]);

  //     for (let i = 0; i < mejorRuta.length; i++) {
  //       // await new Promise((resolve) => setTimeout(resolve, 500));
  //       setRoute(mejorRuta.slice(0, i + 1));
  //       setActiveStep(mejorRutaIndices.mejorRuta[i]);
  //     }

  //     const fin = performance.now();

  //     setRoute([...mejorRuta]);
  //     setStats({
  //       distancia: mejorRutaIndices.distanciaMinima.toFixed(2),
  //       tiempo: (fin - inicio).toFixed(2),
  //       totalLocalizaciones: locations.length,
  //     });

  //     setActiveStep(-1);
  //   } catch (error) {
  //     console.error("Error calculando el TSP exacto:", error.message);
  //   }
  // };

  return (
    <Layout style={{ height: "100vh" }}>
      <SidebarTSP
        onCalculate={calculateTSP}
        onCalculateExact={calculateExactTSP}
        onClear={clearMap}
        onGenerateRandom={generateRandomLocations}
        stats={stats}
        isCalculating={activeStep !== -1}
      />
      <Content>
        <MapTSP
          locations={locations}
          route={route}
          activeStep={activeStep}
          onAddLocation={addLocation}
        />
      </Content>
    </Layout>
  );
};

export default TSPSimulator;
