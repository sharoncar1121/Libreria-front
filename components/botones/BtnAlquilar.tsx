'use client';
import React, { useState } from 'react';
import { useContextAlq } from '@/context/ProviderAlqu';
import { Libros } from '@/models/libros';
import { createAlquiler } from '@/services/services';

interface BtnAlquilarProps {
  libroAlq: Libros;
  mostrarMensaje: (mensaje: string) => void;
  onAlquilar: () => void;
}


export default function BtnAlquilar( { libroAlq, mostrarMensaje }: BtnAlquilarProps) {
  const { setLibroAlqu } = useContextAlq(); 
  const [mensaje, setMensaje] = useState<string | null>(null);


  const handleAlquilar = () => {
    setLibroAlqu( libroAlq.Id_libro); 
    agregarAlquiler(libroAlq.Id_libro)
    mostrarMensaje(
    `¡Has alquilado el libro "${libroAlq.Nombre_libro}", con ISBN:  "${libroAlq.ISBN}" con éxito!`
    );

  };


  async function agregarAlquiler(Id_libro: number) {
    const IdLibro = Number(Id_libro)
    try {
      const fecha_alquiler = new Date();
      const fecha_entrega = new Date(fecha_alquiler);
      fecha_entrega.setDate(fecha_alquiler.getDate() + 20); 
        const nuevoAlqu = {
          Fecha_alquiler: fecha_alquiler.toISOString().split("T")[0], 
          Fecha_entrega: fecha_entrega.toISOString().split("T")[0], 
          Id_libro: IdLibro,
          Cargo: 0,
        };

        const respuesta = await createAlquiler(nuevoAlqu);
        console.log("Registro de alquiler creado exitosamente:", respuesta);
    } catch (error) {
        console.error("Error al agregar a la tabla de alquiler:", error);
    }
}


  return (
      <button
        onClick={handleAlquilar}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Alquilar
      </button>

  );
}


