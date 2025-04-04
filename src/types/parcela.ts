export interface Sensor {
    id: number;
    temperatura: number;
    humedad: number;
    lluvia: number;
    sol: number;
  }
    
  export interface Parcela {
    id: number;
    nombre: string;
    ubicacion: string;
    responsable: string;
    tipo_cultivo: string;
    sensor: Sensor;
    ultimo_riego: string;
    latitud: number;
    longitud: number;
    activa: boolean;
    created_at: string;
    updated_at: string;
  }