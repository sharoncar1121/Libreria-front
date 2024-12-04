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

      const librosEnEspera = libros.filter(libro => libro.Espera === true).map(libro => libro.Nombre_libro);


      const librosAlquilados = libros.filter(libro => libro.Estado === 2).map(libro => libro.Nombre_libro);

    
  return (
    <div>
             <p>Cantidad de libros alquilados: {alquiler.length}</p>
             <p>Cantidad de libros en espera: {espera.length}</p>


            <h3>Libros en espera:</h3>
            <ul>
                {librosEnEspera.map((libro, index) => (
                    <li key={index}>{libro}</li>
                ))}
            </ul>

            <h3>Libros alquilados:</h3>
            <ul>
                {librosAlquilados.map((libro, index) => (
                    <li key={index}>{libro}</li>
                ))}
            </ul>

    </div>
  )
}
