'use client';
import React, { useState } from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';



export default function BtnAlquilar( libroAlq: Libros) {
  const { setLibroAlqu } = useContextAlq(); 
  const [mensaje, setMensaje] = useState<string | null>(null);


  const handleAlquilar = () => {
    setLibroAlqu( libroAlq.Id_libro, 2); 
    setMensaje(`¡Has alquilado el libro "${libroAlq.Nombre_libro}", con ISBN:  "${libroAlq.ISBN}" con éxito!`);
    setTimeout(() => setMensaje(null), 5000);
  };

  return (
    <div>
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      <button
        onClick={handleAlquilar}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Alquilar
      </button>
    </div>
  );
}