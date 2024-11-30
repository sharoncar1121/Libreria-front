'use client';
import React from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';



export default function BtnAlquilar( libroAlq: Libros) {
  const { setLibroAlqu } = useContextAlq(); 

  const handleAlquilar = () => {
    setLibroAlqu( libroAlq.Id_libro, 2); 
  };

  return (
    <button
      onClick={handleAlquilar}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Alquilar
    </button>
  );
}