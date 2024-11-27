'use client'

import { Alquiler, Espera, Libros } from "@/models/libros";
import React, { createContext } from 'react'


export const ContextAlqu = createContext({
    libros: [] as Libros[],
    setLibros: (libro: Libros[]) => { },
    setLibroAlqu: (id: number) => { },
    alquiler: [] as Alquiler[],
    setAlquiler: (alquiler: Alquiler[]) => { },
    eliminarAlquiler: (id: number) => { },
    espera: [] as Espera[],
    setEspera: (espera: Espera[]) => { },
    setLibroEspera: (id: number) => { },
    
})