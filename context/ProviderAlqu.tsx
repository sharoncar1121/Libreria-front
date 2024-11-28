'use client'
import { Libros, Alquiler, Espera } from '@/models/libros'; 
import React, { ReactNode, useContext, useState } from 'react'
import { ContextAlqu } from './ContextAlqu';

interface VistaComponente{
    children: ReactNode
}

export default function ProviderAlqu({children}: VistaComponente) {
    const [libros, setLibros] = useState<Libros[]>([]);
    const [alquiler, setAlquiler] = useState<Alquiler[]>([]);
    const [espera, setEspera] = useState<Espera[]>([]);
    const [cargo, setCargo] = useState(0);

    
    function setLibroAlqu(id:number) {
        console.log('función para cambiar el libro a estado alquilado con id:', id);
    }
    function eliminarAlquiler(id:number) {
        console.log('función para cambiar el libro a estado alquilado a disponible con id:', id);
    }

    function setLibroEspera(id:number) {
        console.log('funcion que cambia el campo del libro epera a true con id:', id);
    }


  return (
   <ContextAlqu.Provider value={{libros, setLibros, alquiler, setAlquiler, espera, setEspera, setLibroAlqu, setLibroEspera, eliminarAlquiler, setCargo, cargo }}>

    {children}

   </ContextAlqu.Provider>
  )
}

export function useContextAlq(){
    return useContext(ContextAlqu)
}
