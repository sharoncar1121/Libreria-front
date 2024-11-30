'use client'
import { Libros, Alquiler, Espera } from '@/models/libros'; 
import React, { ReactNode, useContext, useState } from 'react'
import { ContextAlqu } from './ContextAlqu';
import { updateEstado } from '@/services/services';

interface VistaComponente{
    children: ReactNode
}

export default function ProviderAlqu({children}: VistaComponente) {
    const [libros, setLibros] = useState<Libros[]>([]);
    const [alquiler, setAlquiler] = useState<Alquiler[]>([]);
    const [espera, setEspera] = useState<Espera[]>([]);
    const [cargo, setCargo] = useState(0);

    
    async function setLibroAlqu(id: number, estado: number) {
        try {
            console.log('Intentando cambiar el estado del libro con id:', id);
            
            const libroActualizado = { estado };
            await updateEstado(id, libroActualizado);

            setLibros((prevLibros) =>
                prevLibros.map((libro) =>
                    libro.Id_libro === id ? { ...libro, estado } : libro
                )
            );

            console.log('El libro ha sido alquilado');
        } catch (error) {
            console.error('Error al cambiar el estado del libro:', error);
        }
    }

    function setLibroDisp(id:number) {
        console.log('función para cambiar el libro a estado alquilado a disponible con id:', id);
    }

   async function setLibroEspera(id:number, reservado: boolean) {
        try {
            console.log('Cambiando el campo espera:', id);
            
            const libroActualizado = { reservado };
            await updateEstado(id, libroActualizado);

            setLibros((prevLibros) =>
                prevLibros.map((libro) =>
                    libro.Id_libro === id ? { ...libro, reservado } : libro
                )
            );

            console.log('El libro está en espera');
        } catch (error) {
            console.error('Error al cambiar el campo espera:', error);
        }
    }


  return (
   <ContextAlqu.Provider value={{libros, setLibros, alquiler, setAlquiler, espera, setEspera, setLibroAlqu, setLibroEspera, setLibroDisp, setCargo, cargo }}>

    {children}

   </ContextAlqu.Provider>
  )
}

export function useContextAlq(){
    return useContext(ContextAlqu)
}
