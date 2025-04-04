import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Parcela } from "../../../types/parcela";
import ChartContainer from "../ChartContainer";
import { ProcessedData } from "../../../services/sensorService";

interface VariableCorrelationChartProps {
  data: ProcessedData;
  parcelas: Parcela[];
}

const VariableCorrelationChart: React.FC<VariableCorrelationChartProps> = ({ data, parcelas }) => {
  const chartData = parcelas.map((parcela) => ({
    nombre: parcela.nombre,
    humedad: parcela.sensor?.humedad || 0,
    temperatura: parcela.sensor?.temperatura || 0,
    lluvia: parcela.sensor?.lluvia || 0,
    sol: parcela.sensor?.sol || 0,
  }));

  return (
    <ChartContainer
      title="Comparación de Variables"
      subtitle="Análisis multivariable por parcela"
      icon="bar"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" tick={{ fill: "#4b5563" }} angle={-45} textAnchor="end" height={60} />
          <YAxis
            tick={{ fill: "#4b5563" }}
            label={{
              value: "Valor",
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
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: "10px" }} />
          <Bar name="Humedad (%)" dataKey="humedad" fill="#0066a6" radius={[4, 4, 0, 0]} />
          <Bar name="Temperatura (°C)" dataKey="temperatura" fill="#e63946" radius={[4, 4, 0, 0]} />
          <Bar name="Lluvia (mm)" dataKey="lluvia" fill="#00a8e8" radius={[4, 4, 0, 0]} />
          <Bar name="Sol (%)" dataKey="sol" fill="#ffd166" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default VariableCorrelationChart;