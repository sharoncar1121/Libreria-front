'use client'
import { useContextAlq } from '@/context/ProviderAlqu';
import { getAlquiler } from '@/services/services';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'

export default function Cargo() {
    const {alquiler, setAlquiler, cargo, setCargo}= useContextAlq();

    useEffect(()=>{
        obtenerAlquileres();
      }, []);

      useEffect(() => {
        calcularCargo();
    }, [alquiler]);

    const obtenerAlquileres = async () => {
        try {
          const alquileresData = await getAlquiler();
          setAlquiler(alquileresData);
        } catch (error) {
          console.error("Error al obtener los alquileres:", error);
        }
      };

    const calcularCargo = () => {
        let cargoTotal = 0; 
    
        alquiler.forEach((item) => {
            const fechaEntrega = dayjs(item.Fecha_entrega);
            const fechaEntrego = dayjs(item.Fecha_entrego);
    
            if (!fechaEntrego.isValid() || !fechaEntrega.isValid()) {
              console.warn('Fecha inválida en el registro:', item);
              return;
          }
    
            const diferenciaDias = fechaEntrego.diff(fechaEntrega, 'day');
            let cargo = 0;
    
            if (diferenciaDias > 30) {
                cargo = 100;
            } else if (diferenciaDias > 20) {
                cargo = 50;
            } else if (diferenciaDias > 10) {
                cargo = 20;
            }
    
            cargoTotal += cargo; 
        });
    
        setCargo(cargoTotal); 
    };
    
  return (
    <div className="text-center mt-4">
    <div className="alert alert-info d-inline-block p-3" role="alert">
      <h5 className="mb-2">
        <i className="bi bi-cash-coin"></i> Total del Cargo
      </h5>
      <p className="fw-bold fs-5 text-primary">L{cargo}</p>
      </div>
      </div>
  )
}
