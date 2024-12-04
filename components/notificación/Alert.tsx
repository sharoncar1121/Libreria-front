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

      const Notificaciones = librosData
        .filter((libro: any) => libro.Estado === 1 && libro.Espera) 
        .map((libro: any) => `Su libro "${libro.Nombre_libro}" ya está disponible, puede pasar por él.`); 

      setNotificaciones(Notificaciones); 
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  return (
    <div>
      <h2>Alertas</h2>
      {notificaciones.length > 0 ? (
        <ul>
          {notificaciones.map((notificacion, index) => (
            <li key={index}>{notificacion}</li>
          ))}
        </ul>
      ) : (
        <p>No hay alertas por el momento.</p>
      )}
    </div>
  );
}
