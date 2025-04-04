import React from "react";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, Cell } from "recharts";
import { Parcela } from "../../../types/parcela";
import ChartContainer from "../ChartContainer";

interface HumidityComparisonChartProps {
  parcelas: Parcela[];
}

const CustomizedYAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-5} y={0} dy={4} textAnchor="end" fill="#4b5563" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

const HumidityComparisonChart: React.FC<HumidityComparisonChartProps> = ({ parcelas }) => {
  const horizontalBarData = parcelas
    .sort((a, b) => (b.sensor?.humedad || 0) - (a.sensor?.humedad || 0))
    .map((parcela, index) => ({
      nombre: parcela.nombre,
      humedad: parcela.sensor?.humedad || 0,
      tooltipValue: `${parcela.sensor?.humedad || 0}%`,
      fill: "#0066a6",
      id: index,
    }));

  return (
    <ChartContainer
      title="Comparación de Humedad"
      subtitle="Análisis por parcela"
      icon="horizontal-bar"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          data={horizontalBarData}
          margin={{ top: 20, right: 80, bottom: 20, left: -20 }}
        >
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "#4b5563" }}
            label={{
              position: "insideBottom",
              offset: -10,
              fill: "#4b5563",
            }}
          />
          <YAxis
            dataKey="nombre"
            type="category"
            scale="band"
            width={150}
            tick={<CustomizedYAxisTick />}
            interval={0}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Humedad"]}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
              color: "#4b5563",
              borderRadius: "8px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "10px",
            }}
          />
          <Legend />
          <Bar dataKey="humedad" name="Humedad (%)" barSize={30} fill="#0066a6" radius={[0, 4, 4, 0]}>
            <LabelList
              dataKey="humedad"
              position="right"
              formatter={(value: number) => `${value}%`}
              fill="#000000"
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                textShadow: "0px 0px 3px white, 0px 0px 3px white",
              }}
            />
            {horizontalBarData.map((entry, index) => {
              let color = "#0066a6";
              if (entry.humedad < 30) color = "#e63946";
              else if (entry.humedad < 60) color = "#ff9e00";

              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default HumidityComparisonChart;