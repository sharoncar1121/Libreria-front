//aqui van todas las consultas a las apis
import axios from "axios";

export const getLibros= async() =>{
    const response = await axios.get('http://localhost:5000/libros')
    return response.data
}