'use client'
import { useContextAlq } from '@/context/ProviderAlqu';
import { getLibros } from '@/services/services';
import React, { useEffect, useState } from 'react';


export default function Alert() {
  const { libros, setLibros } = useContextAlq();
  const [notificaciones, setNotificaciones] = useState<string[]>([]);

  useEffect(() => {
    obtenerLibros();
  }, []);

  const obtenerLibros = async () => {
    try {
      const librosData = await getLibros();
      setLibros(librosData);

        const notificaciones = librosData
        .filter((libro: any) => libro.Estado === 1 && libro.Espera === true) 
        .map((libro: any) => `📚 Su libro "${libro.Nombre_libro}" ya está disponible, puede pasar por él.`); 

      setNotificaciones(notificaciones); 
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow-lg border">
    <div className="text-center mb-4">
    <h2 className="text-primary">📢 Alertas</h2>
    <p className="text-muted">Notificaciones sobre la disponibilidad de libros</p>
      </div>
      {notificaciones.length > 0 ? (
        <ul className="list-group">
          {notificaciones.map((notificacion, index) => (
            <li key={index} className="list-group-item d-flex align-items-center">
            <i className="bi bi-bell-fill text-warning me-2"></i>
              {notificacion}</li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info text-center" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No hay alertas por el momento.
      </div>
      )}
    </div>   
  );
}
