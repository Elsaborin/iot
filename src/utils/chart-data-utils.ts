import type { Parcela, TimeSeriesDataPoint, GroupedBarChartDataPoint, HorizontalBarDataPoint } from "../types/api-types"

export const generateTimeSeriesData = (parcela: Parcela): TimeSeriesDataPoint[] => {
  const now = new Date()
  const data = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const randomFactor = 0.8 + Math.random() * 0.4

    data.push({
      fecha: date.toLocaleDateString(),
      humedad: Math.round(parcela.sensor.humedad * randomFactor),
      temperatura: Math.round(parcela.sensor.temperatura * randomFactor),
      lluvia: Math.round(parcela.sensor.lluvia * randomFactor * (i % 2 ? 1.5 : 0.5)),
    })
  }

  return data
}

export const transformDataForGroupedBarChart = (parcelas: Parcela[]): GroupedBarChartDataPoint[] => {
  return parcelas.map((parcela) => ({
    nombre: parcela.nombre,
    humedad: parcela.sensor.humedad,
    temperatura: parcela.sensor.temperatura,
    lluvia: parcela.sensor.lluvia,
    sol: parcela.sensor.sol,
  }))
}

export const transformDataForHorizontalBarChart = (parcelas: Parcela[]): HorizontalBarDataPoint[] => {
  return [...parcelas]
    .sort((a, b) => b.sensor.humedad - a.sensor.humedad)
    .map((parcela, index) => ({
      nombre: parcela.nombre,
      humedad: parcela.sensor.humedad,
      tooltipValue: `${parcela.sensor.humedad}%`,
      fill: "#0066a6", // Color base para todas las barras
      id: index,
    }))
}

