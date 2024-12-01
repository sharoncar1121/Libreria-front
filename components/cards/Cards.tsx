'use client'
import { useContextAlq } from '@/context/ProviderAlqu'
import { getLibros } from '@/services/services'
import React, { useEffect, useState } from 'react'

interface CardsProps {
  filtroEstado?: 'disponible' | 'alquilado' | 'todos';
}

export default function Cards({filtroEstado = 'todos'}: CardsProps) {
  const {libros, setLibros}= useContextAlq();
  const [librosFiltrados, setLibrosFiltrados] = useState(libros);

  useEffect(()=>{
    obtenerLibros();
  }, []);

  useEffect(() =>{
    if (filtroEstado === 'todos'){
      setLibrosFiltrados(libros);

    } else {
      const estadoNumerico = filtroEstado === 'disponible' ? 1 : 2;
      setLibrosFiltrados(libros.filter((libro) => libro.Estado === estadoNumerico));
    }
  }, [libros, filtroEstado]);


  const obtenerLibros = async () => {
    try {
      const librosData = await getLibros();
      setLibros(librosData);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  return (
    <div className="container">
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
                                <p
                                className={`badge ${
                                  libro.Estado === 1 ? 'bg-success' : 'bg-danger'
                                }`}
                                >
                                  {libro.Estado === 1 ? 'Disponible' : 'Alquilado'}
                                </p>
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