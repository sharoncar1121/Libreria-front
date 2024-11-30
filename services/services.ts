//aqui van todas las consultas a las apis
import { Libros } from "@/models/libros";
import axios from "axios";

export const getLibros= async() =>{
    const response = await axios.get('http://localhost:5000/libros')
    return response.data
}

export const updateEstado = async (id:number, libroData: any) => {
    try {
        const response = await axios.put(`http://localhost:5000/libro/${id}`, libroData);
        return response.data; 
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        throw error; 
    }
};