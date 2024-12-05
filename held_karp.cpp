#include <iostream>
#include <vector>
#include <limits>
#include <chrono>

using namespace std;

// Definimos un alias para el tipo de datos infinito
const int INF = numeric_limits<int>::max();

int heldKarp(int n, const vector<vector<int>> &distancias)
{
    int N = 1 << n;                                 // Total de combinaciones posibles para visitados
    vector<vector<int>> dp(n, vector<int>(N, INF)); // Memoización

    dp[0][1] = 0; // Comenzamos desde la ciudad 0, solo esta visitada

    // Iterar sobre todas las máscaras de visitados
    for (int visitados = 1; visitados < N; ++visitados)
    {
        for (int u = 0; u < n; ++u)
        {
            if (!(visitados & (1 << u)))
                continue; // Si u no está en visitados, saltar

            // Actualizar dp[u][visitados] considerando todas las transiciones posibles
            for (int v = 0; v < n; ++v)
            {
                if (visitados & (1 << v))
                    continue; // Si v ya está en visitados, saltar

                int nuevaMascara = visitados | (1 << v);
                dp[v][nuevaMascara] = min(
                    dp[v][nuevaMascara],
                    dp[u][visitados] + distancias[u][v]);
            }
        }
    }

    // Buscar la distancia mínima regresando a la ciudad inicial
    int distanciaMinima = INF;
    for (int u = 1; u < n; ++u)
    {
        if (distancias[u][0] != INF)
        {
            distanciaMinima = min(distanciaMinima, dp[u][N - 1] + distancias[u][0]);
        }
    }

    return distanciaMinima;
}

int main()
{
    const int n = 30; // Número de ciudades
    vector<vector<int>> distancias(n, vector<int>(n, INF));

    // Generar una matriz de distancias aleatorias entre 1 y 100 (simulada)
    srand(42); // Semilla fija para reproducibilidad
    for (int i = 0; i < n; ++i)
    {
        for (int j = 0; j < n; ++j)
        {
            if (i != j)
            {
                distancias[i][j] = rand() % 100 + 1;
            }
        }
    }

    auto inicio = chrono::high_resolution_clock::now();
    int resultado = heldKarp(n, distancias);
    auto fin = chrono::high_resolution_clock::now();

    chrono::duration<double> duracion = fin - inicio;

    cout << "Distancia mínima: " << resultado << endl;
    cout << "Tiempo de ejecución: " << duracion.count() << " segundos" << endl;

    return 0;
}
