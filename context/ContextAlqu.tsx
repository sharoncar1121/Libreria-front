'use client'

import { Alquiler, Espera, Libros } from "@/models/libros";
import React, { createContext } from 'react'


export const ContextAlqu = createContext({
    libros: [] as Libros[],
    setLibros: (libro: Libros[]) => { },
    setLibroAlqu: (id: number) => { },
    alquiler: [] as Alquiler[],
    setAlquiler: (alquiler: Alquiler[]) => { },
    setLibroDisp: (id: number) => { },
    espera: [] as Espera[],
    setEspera: (espera: Espera[]) => { },
    setLibroEspera: (id: number, espera:boolean) => { },
    cargo: 0,
    setCargo: (cargo:number)=> {}  
    
})