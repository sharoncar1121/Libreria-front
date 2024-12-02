'use client';
import React, { useState } from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';
import { createEspera } from '@/services/services';

interface BtnEsperarProps {
  libroEsp: Libros;
}


export default function BtnReservar({libroEsp}: BtnEsperarProps) {
  const { setLibroEspera } = useContextAlq(); 
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEsperar = () => {
    setLibroEspera( libroEsp.Id_libro); 
    agregarEspera(libroEsp.Id_libro)
    setMensaje(`¡Has puesto en espera "${libroEsp.Nombre_libro}" con éxito, se te notificará al estar disponible para que puedas alquilarlo!`);
    setTimeout(() => setMensaje(null), 5000);
  };


  async function agregarEspera(Id_libro: number) {
    const IdLibro = Number(Id_libro)
    try {
        const nuevaEspera = {
            Fecha_espera: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
            Id_libro: IdLibro,
        };

        const respuesta = await createEspera(nuevaEspera);
        console.log("Espera creada exitosamente:", respuesta);
    } catch (error) {
        console.error("Error al agregar a la lista de espera:", error);
    }
}

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
