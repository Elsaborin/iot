export interface TimeSeriesDataPoint {
  fecha: string;
  humedad: number;
  temperatura: number;
  lluvia: number;
  sol: number;
}

export interface GroupedBarChartDataPoint {
  nombre: string;
  humedad: number;
  temperatura: number;
  lluvia: number;
  sol: number;
}

export interface HorizontalBarDataPoint {
  nombre: string;
  humedad: number;
  tooltipValue: string;
  fill: string;
  id: number;
}

export interface Sensor {
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
}

export interface ApiResponse {
  sensores: Sensor;
  parcelas: Parcela[];
}