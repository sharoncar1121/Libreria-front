'use client'
import { useContextAlq } from '@/context/ProviderAlqu';
import { getEsperaList, getLibros } from '@/services/services';
import React, { useEffect } from 'react'


export default function InfoUser() {
    const {alquiler, espera, setEspera, libros, setLibros}= useContextAlq();

    useEffect(()=>{
        obtenerEsperaList()
        obtenerLibros()
      }, []);

    const obtenerEsperaList = async () => {
        try {
          const esperaList= await getEsperaList();
          setEspera(esperaList);
        } catch (error) {
          console.error("Error al obtener los alquileres:", error);
        }
      };

      const obtenerLibros = async () => {
        try {
          const librosData = await getLibros();
          setLibros(librosData);
        } catch (error) {
          console.error("Error al obtener los libros:", error);
        }
      };

       
      const librosEnEspera = libros
      .filter((libro) => libro.Espera === true)
      .map((libro) => libro.Nombre_libro);

      const librosAlquilados = libros.filter((libro) => libro.Estado === 2);

      
  return (
    <div className="container mt-5 p-4 bg-white rounded shadow-lg border">
      <div className="text-center mb-4">
      <h2 className="text-primary">Gestión de Libros</h2>
      <p className="text-muted">Resumen de libros alquilados y en espera</p>
      </div>
      
        <div className="mb-4">
        <p className="fs-5 text-secondary">
        <i className="bi bi-book-half text-primary"></i> <strong>Cantidad de libros alquilados:</strong>{''}
        <span>{librosAlquilados.length > 0 ? alquiler.length : 0}</span>
              </p>
              <p className="fs-5 text-secondary">
              <i className="bi bi-clock text-warning"></i> <strong>Cantidad de libros en espera:</strong>{''}
              <span>{librosEnEspera.length > 0 ? espera.length : 0}</span>
              </p>
              </div>

              <div className="mb-4">
            <h3 className="text-success">📚Libros en espera:</h3>
            {librosEnEspera.length > 0 ? (
        <ul className="list-group list-group-flush">
                {librosEnEspera.map((libro, index) => (
                    <li key={index} className="list-group-item">
                    <i className="bi bi-check-circle text-success"></i>{libro}
                      </li>
                ))}
            </ul>
            ) : (
              <p className="text-muted">No hay libros en espera.</p>
            )}
            </div>

            <div>
            <h3 className="text-success">📖 Libros alquilados:</h3>
            {librosAlquilados.length > 0 ? (
          <ul className="list-group list-group-flush">
                {librosAlquilados.map((libro, index) => (
                    <li key={index} className="list-group-item">
                     <i className="bi bi-check-circle text-success"></i> {libro.Nombre_libro}
                     <div className="mt-2">
                      <small className="text-muted">
                      <strong>Fecha de alquiler:</strong>{''}
                      {new Date(libro.Fecha_modifica_estado).toLocaleDateString()}
                      </small>
                      <br/>
                      <small className='text-muted'>
                      <strong>Fecha de entrega:</strong>{''}
                      {new Date(libro.Fecha_entrega).toLocaleDateString()}
                      </small>
                     </div>
                      </li>
                ))}
            </ul>
            ) : (
              <p className="text-muted">No hay libros alquilados.</p>
            )}
            </div>
        </div>
  )
}









