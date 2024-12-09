'use client'

import { useContextAlq } from '@/context/ProviderAlqu'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Libros } from '@/models/libros';
import Cards from '../cards/Cards';

export default function Buscador() {
  const { libros } = useContextAlq();
  const [busqueda, setBusqueda] = useState('');
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libros | null>(null);
  const [librosFiltrados, setLibrosFiltrados] = useState<Libros[]>([]);

  useEffect(() => {
    if (busqueda) {
      const Filtrados = libros.filter((libro) =>
        libro.Nombre_libro.toLowerCase().includes(busqueda.toLowerCase())
      );
      setLibrosFiltrados(Filtrados); 
    } else {
      setLibrosFiltrados(libros);
      setLibroSeleccionado(null);
    }
  }, [busqueda, libros]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value); 
    setLibroSeleccionado(null); 
  };

  const handleClickLibro = (libro: Libros) => {

    setLibroSeleccionado(libro);
    setBusqueda('');
    setLibrosFiltrados([]);
  };

  const resetBusqueda = () => {
    setBusqueda('');
    setLibroSeleccionado(null);
    setLibrosFiltrados([]);
  };

  return (
    <div>
      <div className="mb-4 relative">
      <input
      type="text"
      placeholder='Buscar libro...'
      value={busqueda}
      onChange={handleInputChange}
      className="border border-gray-300 p-2 rounded w-full"
      />
   {busqueda && (
          <div className="absolute z-10 bg-white border rounded mt-1 w-full shadow-lg">
            {librosFiltrados.map((libro) => (
              <div
                key={libro.Id_libro}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleClickLibro(libro)}
              >
                <h2 className="font-bold">{libro.Nombre_libro}</h2>
                <p className="text-gray-600 text-sm">Autor: {libro.Autor}</p>
              </div>
            ))}
          </div>
        )}
        {libroSeleccionado && (
          <button 
            onClick={resetBusqueda}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      <div className="mt-4">
      {libroSeleccionado && (
          <Cards 
            filtroEstado="todos" 
            libroSeleccionado={libroSeleccionado} 
            />
        )}
        </div>
        <p className="text-gray-500">Comienza a escribir para buscar un libro.</p>
        
    </div>
  )
}