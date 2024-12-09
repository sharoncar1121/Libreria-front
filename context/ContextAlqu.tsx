'use client'

import { Alquiler, Espera, Libros } from "@/models/libros";
import React, { createContext } from 'react'


export const ContextAlqu = createContext({
    libros: [] as Libros[],
    setLibros: (libro: Libros[]) => { },
    setLibroAlqu: (id: number) => { },
    librosFiltrados: [] as Libros[],
    setLibrosFiltrados: (librosFiltrados: Libros[]) => {},
    alquiler: [] as Alquiler[],
    setAlquiler: (alquiler: Alquiler[]) => { },
    setLibroDisp: (id: number) => { },
    espera: [] as Espera[],
    setEspera: (espera: Espera[]) => { },
    setLibroEspera: (id: number) => { },
    cargo: 0,
    setCargo: (cargo:number)=> {}  
    
})