//aqui van todas las consultas a las apis
import { Libros } from "@/models/libros";
import axios from "axios";



export const api = axios.create({
    baseURL: 'http://localhost:5000', 
  });


export const getLibros= async() =>{
    const response = await axios.get('http://localhost:5000/libros')
    return response.data
}

export const updateEstado = async (id:number, estado: number) => {
    try {
        console.log("Enviando ID:", id);
        console.log("Enviando estado:", estado);
        const response = await axios.put(`http://localhost:5000/libro/${id}`, {estado});
        return response.data; 
    } catch (error) {
        console.log("Enviando ID:", id);
        console.log("Enviando estado:", estado);
        console.error("Error en la solicitud Axios:", error);
        throw error; 
    }
};

export const updateEspera = async (id:number, espera: boolean) => {
    try {
        console.log("Enviando ID:", id);
        const response = await axios.put(`http://localhost:5000/libro-espera/${id}`, {espera});
        return response.data; 
    } catch (error) {
        console.log("Enviando ID:", id);
        console.log("Enviando estado:", espera);
        console.error("Error en la solicitud Axios:", error);
        throw error; 
    }
};

export const createEspera = async (data: { Fecha_espera: string; Id_libro: number }) => {
    try {
        console.log("Enviando datos de espera:", data);
        const response = await axios.post('http://localhost:5000/espera-post', data);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud Axios al crear espera:", error);
        throw error;
    }
};

export const createAlquiler = async (data: { Fecha_alquiler: string; Id_libro: number, Fecha_entrega:string, Cargo: number }) => {
    try {
        console.log("Enviando datos de alquiler:", data);
        const response = await axios.post('http://localhost:5000/alquiler-post', data);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud Axios al crear alquiler:", error);
        throw error;
    }
};

export const getAlquiler= async() =>{
    try {
        const response = await axios.get('http://localhost:5000/alquiler')
        return response.data
    } catch (error) {
        console.error('Error al obtner los libros alquilados:', error);
        throw error;
    }
}

export const getEsperaList= async() =>{
    const response = await axios.get('http://localhost:5000/espera')
    return response.data
}



