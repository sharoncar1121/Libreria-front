'use client'
import { Libros, Alquiler, Espera } from '@/models/libros'; 
import React, { ReactNode, useContext, useState, createContext } from 'react'
import { ContextAlqu } from './ContextAlqu';
import { getLibros, updateEspera, updateEstado } from '@/services/services';


interface ContextAlqType {
    libros: Libros[];
    setLibros: React.Dispatch<React.SetStateAction<Libros[]>>;
  }

  export const ContextAlq = createContext<ContextAlqType>({
    libros: [],
    setLibros: () => {},
  });

interface VistaComponente{
    children: ReactNode
}

export default function ProviderAlqu({children}: VistaComponente) {
    const [libros, setLibros] = useState<Libros[]>([]);
    const [librosFiltrados, setLibrosFiltrados] = useState<Libros[]>([]);
    const [alquiler, setAlquiler] = useState<Alquiler[]>([]);
    const [espera, setEspera] = useState<Espera[]>([]);
    const [cargo, setCargo] = useState(0);
    
    async function setLibroAlqu(id: number) {
        const estado= 2
        try {
            console.log('Intentando cambiar el estado del libro con id:', id);
            await updateEstado(id, estado);

            const librosData = await getLibros();
            setLibros(librosData);  

            console.log('El libro ha sido alquilado');
        } catch (error) {
            console.error('Error al cambiar el estado del libro:', error);
        }
    }

    function setLibroDisp(id:number) {
        console.log('función para cambiar el libro a estado alquilado a disponible con id:', id);
    }

   async function setLibroEspera(id:number) {
    const espera = true
        try {
            console.log('Cambiando el campo espera:', id);
            await updateEspera(id, espera);

            const librosData = await getLibros();
            setLibros(librosData); 

            console.log('El libro está en espera');
        } catch (error) {
            console.error('Error al cambiar el campo espera:', error);
        }
    }


  return (
   <ContextAlqu.Provider value={{libros, setLibros, librosFiltrados, setLibrosFiltrados, alquiler, setAlquiler, espera, setEspera, setLibroAlqu, setLibroEspera, setLibroDisp, setCargo, cargo }}>

    {children}

   </ContextAlqu.Provider>
  )
}

export function useContextAlq(){
    return useContext(ContextAlqu)
}
