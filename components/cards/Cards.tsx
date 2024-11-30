'use client'
import { useContextAlq } from '@/context/ProviderAlqu'
import { getLibros } from '@/services/services'
import React, { useEffect } from 'react'

export default function Cards() {
  const {libros, setLibros}= useContextAlq();

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


  return (
    <>
     <div>
      {libros?.length > 0 ? (
        <div>
          {libros.map((libro) => (
            <div key={libro.Id_libro}>
              <h3>{libro.Nombre_libro}</h3>
              <p>{libro.Autor}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay libros disponibles.</p>
      )}
    </div>
    </>
  )
}
