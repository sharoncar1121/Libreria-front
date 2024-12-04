'use client'
import { useContextAlq } from '@/context/ProviderAlqu'
import { getLibros } from '@/services/services'
import React, { useEffect, useState } from 'react'
import BtnAlquilar from '../botones/BtnAlquilar';
import BtnReservar from '../botones/BtnReservar';

interface CardsProps {
  filtroEstado?: 'disponible' | 'alquilado' | 'todos';
}

export default function Cards({filtroEstado = 'todos'}: CardsProps) {
  const {libros, setLibros}= useContextAlq();
  const [librosFiltrados, setLibrosFiltrados] = useState(libros);
  const [mensaje, setMensajes] = useState<Record<number, string | null>>({});
  const [enEspera, setEnEspera] = useState<number[]>([]);


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

 const mostrarMensaje = (idLibro: number, mensaje: string) => {
  setMensajes((prev) => ({ ...prev, [idLibro]: mensaje}));
  setTimeout(() =>{
    setMensajes((prev) =>({ ...prev, [idLibro]: null}));
  }, 10000);
 };

 const agregarEnEspera = (idLibro: number) => {
  if (!enEspera.includes(idLibro)) {
    setEnEspera((prev) => [...prev, idLibro]);
  }
};

  return (
    <div className="container">
           <div className="row">
                {librosFiltrados.map((libro) => (
                    <div key={libro.Id_libro} className="col-md-3 mb-3 d-flex">
                        <div className="card h-100 d-flex flex-column">
                          <div
                          className='image-container'
                          style={{height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f8f9fa',
                          }}
                          >
                            <img 
                                src={libro.Imagen} 
                                alt={libro.Autor} 
                                style={{
                                  maxHeight: '100%',
                                  maxWidth: '100%',
                                  objectFit: 'contain',
                                }}
                            />
                            </div>
                            
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{libro.Nombre_libro}</h5>
                                <p className="card-text">ISBN : {libro.ISBN}</p>
                                <p className="card-text text-truncate" style={{ minHeight: '60px'}}>{libro.Descripcion}</p>
                                <p
                                className={`badge ${
                                  libro.Estado === 1 ? 'bg-success' : 'bg-danger'
                                }`}
                                >
                                  {libro.Estado === 1 ? 'Disponible' : 'Alquilado'}
                                </p>


                                <p
                                className={`badge ${
                                  libro.Espera === true && libro.Estado=== 2 ? 'bg-success' : ''
                                }`}
                                >
                                  {libro.Espera === true && libro.Estado=== 2 ? 'En espera' : ''}
                                </p>


                                <div className="mt-auto d-flex flex-column align-items-center">
                                {mensaje[libro.Id_libro] && (
                                  <div className="position-absolute top-0 start-50 translate-middle-x bg-green-100 text-green-800 px-3 py-2 rounded shadow text-center">
                                    {mensaje[libro.Id_libro]}
                                    </div>
                                )}
                                {libro.Estado === 1 && ( <BtnAlquilar libroAlq = {libro} 
                                mostrarMensaje={(mensaje) => mostrarMensaje(libro.Id_libro, mensaje)}
                                onAlquilar={() => agregarEnEspera(libro.Id_libro)}
                                />
                                )}
                                {libro.Estado === 2 &&  <BtnReservar libroEsp= {libro}/>}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        

              );

            }