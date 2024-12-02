'use client';
import React, { useState } from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';

interface BtnEsperarProps {
  libroEsp: Libros;
}


export default function BtnReservar({libroEsp}: BtnEsperarProps) {
  const { setLibroEspera } = useContextAlq(); 
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEsperar = () => {
    setLibroEspera( libroEsp.Id_libro); 
    setMensaje(`¡Has puesto en espera "${libroEsp.Nombre_libro}" con éxito, se te notificará al estar disponible para que puedas alquilarlo!`);
    setLibroEspera( libroEsp.Id_libro); 
    setMensaje(`¡Has pues en espera "${libroEsp.Nombre_libro}" con éxito, se te notificará al estar disponible para que puedas alquilarlo!`);
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
      onClick={handleEsperar}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Esperar
    </button>
</div>
    
  )
}
