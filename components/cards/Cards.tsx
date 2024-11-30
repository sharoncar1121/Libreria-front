'use client'
import { useContextAlq } from '@/context/ProviderAlqu'
import { getLibros } from '@/services/services'
import React, { useEffect, useState } from 'react'

export default function Cards() {
  const {libros, setLibros}= useContextAlq();
  const [filtroEstado, setFiltroEstado] = useState('todos');

  useEffect(()=>{
    obtenerLibros();
  }, []);

  const obtenerLibros = async () => {
    try {
      const librosData = await getLibros();
      setLibros(librosData);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const librosFiltrados = libros.filter((libro) => {
    if (filtroEstado === 'todos') return true;
    const estadoNumerico = filtroEstado === 'disponible' ? 1 : 2;
    return libro.Estado === estadoNumerico;
  });


  return (
    <div className="container">
      <div className="mb-3">

        <button 
        className={`btn ${filtroEstado === 'todos' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => setFiltroEstado('todos')}     
        >
        Todos
        </button>

        <button 
        className={`btn ${filtroEstado === 'disponible' ? 'btn-primary' : 'btn-secondary'} me-2`}
        onClick={() => setFiltroEstado('disponible')} 
        >
        Disponibles
        </button>

        <button 
        className={`btn ${filtroEstado === 'alquilado' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => setFiltroEstado('alquilado')}
        >
        Alquilado
        </button>
        </div>

           <div className="row">
                {librosFiltrados.map((libro) => (
                    <div key={libro.Id_libro} className="col-md-3 mb-3 d-flex">
                        <div className="card h-100 d-flex flex-column">
                            <img 
                                src={libro.Imagen} 
                                className="card-img-top" 
                                alt={libro.Autor} 
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{libro.Nombre_libro}</h5>
                                <p className="card-text">{libro.ISBN}</p>
                                <p className="card-text">{libro.Descripcion}</p>
                                <p className="card-text"><strong>Estado:</strong>{libro.Estado}</p>
                                <div className="mt-auto">
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        

              );

            }