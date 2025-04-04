import type React from "react"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import type { Parcela } from "../../../types/parcela"
import ChartContainer from "../ChartContainer"
import type { ProcessedData } from "../../../services/sensorService"

interface VariableCorrelationChartProps {
  data: ProcessedData
  parcelas: Parcela[]
}

const VariableCorrelationChart: React.FC<VariableCorrelationChartProps> = ({ data, parcelas }) => {
  // Calcular el promedio de cada variable
  const humedadPromedio = parcelas.length > 0 
    ? parcelas.reduce((sum, parcela) => sum + (parcela.sensor?.humedad || 0), 0) / parcelas.length 
    : 0;
  
  const temperaturaPromedio = parcelas.length > 0 
    ? parcelas.reduce((sum, parcela) => sum + (parcela.sensor?.temperatura || 0), 0) / parcelas.length 
    : 0;
  
  const lluviaPromedio = parcelas.length > 0 
    ? parcelas.reduce((sum, parcela) => sum + (parcela.sensor?.lluvia || 0), 0) / parcelas.length 
    : 0;
  
  const solPromedio = parcelas.length > 0 
    ? parcelas.reduce((sum, parcela) => sum + (parcela.sensor?.sol || 0), 0) / parcelas.length 
    : 0;

  // Crear un conjunto de datos con los promedios
  const chartData = [
    { variable: "Humedad", valor: Number(humedadPromedio.toFixed(1)) },
    { variable: "Temperatura", valor: Number(temperaturaPromedio.toFixed(1)) },
    { variable: "Lluvia", valor: Number(lluviaPromedio.toFixed(1)) },
    { variable: "Sol", valor: Number(solPromedio.toFixed(1)) },
  ]

  return (
    <ChartContainer
      title="Promedios por Variable"
      subtitle="Promedio de todas las variables en las parcelas"
      icon="line"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="variable" tick={{ fill: "#4b5563" }} />
          <YAxis
            tick={{ fill: "#4b5563" }}
            label={{
              value: "Valor Promedio",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#4b5563" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
              color: "#4b5563",
              borderRadius: "8px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value, name) => {
              const variableUnits = {
                Humedad: "%",
                Temperatura: "°C",
                Lluvia: "mm",
                Sol: "%",
              }
              const variable = chartData.find((item) => item.valor === value)?.variable
              return [`${value} ${variable ? variableUnits[variable] : ""}`, "Valor Promedio"]
            }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: "10px" }} />
          <Line
            type="monotone"
            name="Valor Promedio"
            dataKey="valor"
            stroke="#0066a6"
            strokeWidth={3}
            dot={{ r: 6, fill: "#0066a6", stroke: "#0066a6" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default VariableCorrelationChart