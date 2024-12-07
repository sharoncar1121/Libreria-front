//modelos para tipado

export interface Libros {
    Id_libro:              number;
    Estado:                number;
    Imagen:                string;
    Nombre_libro:          string;
    ISBN:                  string;
    Descripcion:           string;
    Genero:                string;
    Autor:                 string;
    Espera:                boolean;
    Fecha_modifica_estado: Date;
    Fecha_entrega:         Date;
}

export interface Alquiler {
    Id_alquiler:              number;
    Fecha_alquiler:           string;
    Fecha_entrega:            string;
    Cargo:                    number;
    Id_libro:                 number;
    Fecha_entrego:            string;
}

export interface Espera {
    Id_espera:              number;
    Fecha_espera:           Date;
    Id_libro:                 number;
}
