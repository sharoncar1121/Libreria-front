'use client';
import React, { useState } from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';

interface BtnAlquilarProps {
  libroAlq: Libros;
  mostrarMensaje: (mensaje: string) => void;
}


export default function BtnAlquilar( { libroAlq, mostrarMensaje }: BtnAlquilarProps) {
  const { setLibroAlqu } = useContextAlq(); 
  const [mensaje, setMensaje] = useState<string | null>(null);


  const handleAlquilar = () => {
    setLibroAlqu( libroAlq.Id_libro); 
    mostrarMensaje(
    `¡Has alquilado el libro "${libroAlq.Nombre_libro}", con ISBN:  "${libroAlq.ISBN}" con éxito!`
    );

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


