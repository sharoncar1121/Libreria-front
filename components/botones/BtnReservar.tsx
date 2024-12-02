'use client';
import React, { useState } from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';



export default function BtnReservar(libroAlq: Libros) {
  const { setLibroEspera } = useContextAlq(); 
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEsperar = () => {
    setLibroEspera( libroAlq.Id_libro, true); 
    setMensaje(`¡Has puesto en espera "${libroAlq.Nombre_libro}" con éxito, se te notificará al estar disponible para que puedas alquilarlo!`);
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
