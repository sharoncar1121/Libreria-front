'use client'

import { useContextAlq } from '@/context/ProviderAlqu'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Libros } from '@/models/libros';
import Cards from '../cards/Cards';
import { api } from '../../services/services';


export default function Buscador() {
  const { libros } = useContextAlq(); 
  const [busqueda, setBusqueda] = useState('');
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libros | null>(null);
  const [librosFiltrados, setLibrosFiltrados] = useState<Libros[]>([]);
  const [resultadoApi, setResultadoApi] = useState<Libros[]>([]);


  useEffect(() => {
    if (busqueda.trim() === '') {
      setLibrosFiltrados(libros); 
      setResultadoApi([]);
      setLibroSeleccionado(null); 
    } else {
      const filtradosLocal = libros.filter((libro) =>
        libro.Nombre_libro.toLowerCase().includes(busqueda.toLowerCase())
      );
      setLibrosFiltrados(filtradosLocal); 
      buscarLibrosApi(busqueda); 
    }
  }, [busqueda, libros]);


  const buscarLibrosApi = async (termino: string) => {
    try {
      const resultado = await api.get(`/libros/${termino}`);
      setResultadoApi(resultado.data); 
    } catch (error) {
      console.error('Error al buscar libros en la API:', error);
      setResultadoApi([]); 
    }
  };

  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value); 
    setLibroSeleccionado(null); 
  };

 
  const handleClickLibro = (libro: Libros) => {
    setLibroSeleccionado(libro); 
    setBusqueda(''); 
    setLibrosFiltrados([]); 
    setResultadoApi([]);
  };


  const resetBusqueda = () => {
    setBusqueda(''); 
    setLibroSeleccionado(null);
    setLibrosFiltrados([]); 
    setResultadoApi([]); 
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4" style={{ paddingBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar libro..."
          value={busqueda}
          onChange={handleInputChange}
          className="form-control rounded-lg py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
  
        {busqueda && (
          <div className="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg">
            {librosFiltrados.map((libro) => (
              <div
                key={libro.Id_libro}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleClickLibro(libro)}
              >
                <h2 className="font-semibold text-lg">{libro.Nombre_libro}</h2>
                <p className="text-muted text-sm">Autor: {libro.Autor}</p>
              </div>
            ))}
          </div>
        )}
  
        {libroSeleccionado && (
          <button
            onClick={resetBusqueda}
            className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
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
  
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {resultadoApi.map((libro) => (
            <div key={libro.Id_libro} className="col d-flex justify-content-center">
              <div className="card shadow-lg rounded-lg w-100">
               
                <div
                  className="image-container d-flex justify-content-center align-items-center"
                  style={{
                    height: '200px',
                    backgroundColor: '#f8f9fa',
                  }}
                >
                  <img
                    src={libro.Imagen}
                    alt={libro.Nombre_libro}
                    className="img-fluid"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
  
               
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-xl font-semibold">{libro.Nombre_libro}</h5>
                  <p className="card-text text-sm text-muted">ISBN: {libro.ISBN}</p>
                  <p className="card-text text-truncate" style={{ minHeight: '60px' }}>
                    {libro.Descripcion}
                  </p>
  
                
                  <p
                    className={`badge ${
                      libro.Estado === 1 ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {libro.Estado === 1 ? 'Disponible' : 'Alquilado'}
                  </p>
                  {libro.Espera && libro.Estado === 2 && (
                    <p className="badge bg-warning text-white">En espera</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}