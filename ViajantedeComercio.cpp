#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
#include <string>
using namespace std;

// Problema del Viajante de Comercio (TSP): Dada una lista de ciudades
// y las distancias entre cada par de ciudades, ¿cuál es la ruta más
// corta que visita cada ciudad exactamente una vez y regresa al punto de partida?

// Input
// Número de ciudades
// Coordenadas de cada ciudad
// Output
// Ruta más corta que visita cada ciudad exactamente una vez y regresa al punto de partida

// No importa realmente cual sea el inicio, siempre vamos a pasar por ahi

string NombreCiudad(int NumeroCiudad)
{
    switch (NumeroCiudad)
    {
    case 0:
        return "A";
    case 1:
        return "B";
    case 2:
        return "C";
    case 3:
        return "D";
    case 4:
        return "Z";
    default:
        return "Desconocido";
    }
}

vector<int> algoritmoBiFrost(vector<int> Ciudades, int Distancias[5][5], int CiudadActual)
{
    vector<int> MejorRuta;

    MejorRuta.push_back(CiudadActual); // No importa realmente donde empezemos

    while (MejorRuta.size() < Ciudades.size())
    {
        int DistanciaMinima = INT_MAX;
        int CiudadmasCercana = -1;

        // Por cada ciudad revisar cada distancia desde esa ciudad
        for (int i = 0; i < Ciudades.size(); i++)
        {
            // MejorRuta.includes(i), sino entonces vemos esa ciudad con base a la ciudad actual
            if (find(MejorRuta.begin(), MejorRuta.end(), i) == MejorRuta.end())
            {

                // Si encontramos un camino mas corto tonces lo cambiamos
                if (Distancias[CiudadActual][i] < DistanciaMinima)
                {

                    DistanciaMinima = Distancias[CiudadActual][i];
                    CiudadmasCercana = i;
                }
            }
        }
        MejorRuta.push_back(CiudadmasCercana);
        CiudadActual = CiudadmasCercana;
    }

    MejorRuta.push_back(MejorRuta[0]);

    return MejorRuta;
}

int main()
{

    // Lista de Ciudades
    vector<int> Ciudades = {0, 1, 2, 3, 4};

    // Distancia entre Ciudades
    int Distancias[5][5] = {
        // A  B  C   D   Z
        {0, 10, 15, 20, 40},  // A
        {10, 0, 35, 25, 10},  // B
        {15, 35, 0, 30, 15},  // C
        {20, 25, 30, 0, 20},  // D
        {40, 10, 15, 20, 0}}; // Z

    vector<int> MejorRuta;

     MejorRuta = algoritmoBiFrost(Ciudades, Distancias, 0);

    // -------------------------------------------------------

    cout << "Ruta más corta: ";
    for (int i = 0; i < MejorRuta.size(); i++)
    {
        cout << NombreCiudad(MejorRuta[i]) << " ";
    }
    cout << endl;

    int totalDistance = 0;

    for (int i = 0; i < MejorRuta.size() - 1; i++)
    {
        totalDistance += Distancias[MejorRuta[i]][MejorRuta[i + 1]];
    }

    cout << "Distancia total recorrida: " << totalDistance << endl;

    return 0;
}
