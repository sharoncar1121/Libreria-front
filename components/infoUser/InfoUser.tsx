'use client'
import { useContextAlq } from '@/context/ProviderAlqu';
import { getAlquiler, getEsperaList, getLibros } from '@/services/services';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';


export default function InfoUser() {
    const {libros, setLibros} = useContextAlq();
    const {alquiler, setAlquiler} = useContextAlq();
    const {espera, setEspera} = useContextAlq();
    

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

      const obtenerAlquiler = async () => {
        try {
          const alquileresData = await getAlquiler();
          setAlquiler(alquileresData);
        } catch (error) {
          console.error('Error al obtener libors alquilados:', error);
        }
      };

      const librosAlquilados = libros.filter((libro) => libro.Estado === 2);
      const librosConFechas = librosAlquilados.map((libro) => {
      const registroAlquiler = alquiler.find((alquiler) => alquiler.Id_libro === libro.Id_libro);
      let cargo = 0;
      if (registroAlquiler?.Fecha_entrega && registroAlquiler?.Fecha_entrego) {
        const fechaEntrega = dayjs(registroAlquiler.Fecha_entrega);
        const fechaEntregado = dayjs(registroAlquiler.Fecha_entrego);
        const diferenciaDias = fechaEntregado.diff(fechaEntrega, 'day');
  
        if (diferenciaDias > 30) {
          cargo = 100;
        } else if (diferenciaDias > 20) {
          cargo = 50;
        } else if (diferenciaDias > 10) {
          cargo = 20;
        }
      }
  
      return {
        ...libro,
        Fecha_alquiler: registroAlquiler?.Fecha_alquiler || 'N/A',
        Fecha_entrega: registroAlquiler?.Fecha_entrega || 'N/A',
        Fecha_entregado: registroAlquiler?.Fecha_entrego || 'N/A',
        Cargo: cargo, 
      };
    });
  
      const librosEnEspera = libros
      .filter((libro) => libro.Espera === true)
      .map((libro) => libro.Nombre_libro);

      
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
            {librosConFechas.length > 0 ? (
          <ul className="list-group list-group-flush">
                {librosConFechas.map((libro, index) => (
                    <li key={index} className="list-group-item">
                    <p>
                     <i className="bi bi-check-circle text-success"></i> {libro.Nombre_libro}
                     </p>
                     <div className="mt-2">
                     <p className="text-muted">
                    <strong>Fecha de alquiler:</strong> {libro.Fecha_alquiler}
                    </p>
                    <p className="text-muted">
                    <strong>Fecha de entrega:</strong> {libro.Fecha_entrega}
                    </p>
                    <p className="text-muted">
                    <strong>Fecha entregado:</strong> {libro.Fecha_entregado}
                    </p>
                    <p className={`text-${libro.Cargo > 0 ? 'danger' : 'success'}`}>
                  <strong>Cargo:</strong> ${libro.Cargo}
                </p>
                      
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









