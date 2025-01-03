export const objectsArray = (n) => {
  const elements = [
    ["../src/assets/avion.png", 100, 500],
    ["../src/assets/baygon.png", 1, 3],
    ["../src/assets/carro.png", 50, 200],
    ["../src/assets/cookie.png", 1, 5],
    ["../src/assets/diamante.png", 10, 100],
    ["../src/assets/mapa.png", 10, 10],
    ["../src/assets/omnitrix.png", 10, 500],
  ];

  const dynamicArray = [];
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    dynamicArray.push(elements[randomIndex]);
  }
  return dynamicArray;
};

export const knapsackDynamic = (W, items) => {
  let n = items.length;
  let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (i === 0 || w === 0) dp[i][w] = 0;
      else if (items[i - 1][1] <= w)
        dp[i][w] = Math.max(
          items[i - 1][2] + dp[i - 1][w - items[i - 1][1]],
          dp[i - 1][w]
        );
      else dp[i][w] = dp[i - 1][w];
    }
  }
  return dp[n][W];
};

export const knapsackRecursion = (W, items, n) => {
  if (n == 0 || W == 0) {
    return { profit: 0, items: [] };
  }

  const currentItem = items[n - 1];
  const weight = currentItem[1];
  const profit = currentItem[2];

  if (weight > W) {
    return knapsackRecursion(W, items, n - 1);
  } else {
    const includeCurrent = knapsackRecursion(W - weight, items, n - 1);
    includeCurrent.profit += profit;
    includeCurrent.items.push(currentItem);

    const excludeCurrent = knapsackRecursion(W, items, n - 1);

    if (includeCurrent.profit > excludeCurrent.profit) {
      return includeCurrent;
    } else {
      return excludeCurrent;
    }
  }
};
export const calcularDistancias = (ciudades) => {
  const R = 6371;
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

        distancias[i][j] = R * c;
      }
    }
  }

  return distancias;
};

export const algoritmoBiFrost = (ciudades, distancias, ciudadActual) => {
  const mejorRuta = [];
  mejorRuta.push(ciudadActual);

  while (mejorRuta.length < ciudades.length) {
    let distanciaMinima = Infinity;
    let ciudadMasCercana = -1;

    for (let i = 0; i < ciudades.length; i++) {
      if (!mejorRuta.includes(i)) {
        if (distancias[ciudadActual][i] < distanciaMinima) {
          distanciaMinima = distancias[ciudadActual][i];
          ciudadMasCercana = i;
        }
      }
    }

    mejorRuta.push(ciudadMasCercana);
    ciudadActual = ciudadMasCercana;
  }

  mejorRuta.push(mejorRuta[0]);
  return mejorRuta;
};

export const algoritmoHeldKarp = (ciudades, distancias) => {
  const n = ciudades.length;
  const memo = new Map();

  const generarClave = (pos, visitados) => `${pos},${visitados}`;

  const tsp = (ciudadActual, visitados) => {
    const clave = generarClave(ciudadActual, visitados);

    if (memo.has(clave)) return memo.get(clave);

    if (visitados === (1 << n) - 1) {
      return distancias[ciudadActual][0] || Infinity;
    }

    let distanciaMinima = Infinity;

    for (let i = 0; i < n; i++) {
      if (!(visitados & (1 << i))) {
        const nuevaDistancia =
          (distancias[ciudadActual][i] || Infinity) +
          tsp(i, visitados | (1 << i));

        distanciaMinima = Math.min(distanciaMinima, nuevaDistancia);
      }
    }

    memo.set(clave, distanciaMinima);
    return distanciaMinima;
  };

  const resultado = tsp(0, 1);

  const reconstruirRuta = () => {
    let ciudadActual = 0;
    let visitados = 1;
    const ruta = [0];

    while (ruta.length < n) {
      let siguienteCiudad = -1;
      let distanciaMinima = Infinity;

      for (let i = 0; i < n; i++) {
        if (!(visitados & (1 << i))) {
          const clave = generarClave(i, visitados | (1 << i));
          const nuevaDistancia =
            (distancias[ciudadActual][i] || Infinity) + (memo.get(clave) || 0);

          if (nuevaDistancia < distanciaMinima) {
            distanciaMinima = nuevaDistancia;
            siguienteCiudad = i;
          }
        }
      }

      ruta.push(siguienteCiudad);
      visitados |= 1 << siguienteCiudad;
      ciudadActual = siguienteCiudad;
    }

    ruta.push(0);
    return ruta;
  };

  return {
    distanciaMinima: resultado,
    mejorRuta: reconstruirRuta(),
  };
};
