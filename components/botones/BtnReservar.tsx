'use client';
import React from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';


export default function BtnReservar(libroAlq: Libros) {
  const { setLibroEspera } = useContextAlq(); 

  const handleAlquilar = () => {
    setLibroEspera( libroAlq.Id_libro, true); 
  };

  return (
    <button
      onClick={handleAlquilar}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Esperar
    </button>
  );
}
