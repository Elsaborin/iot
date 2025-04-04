import React, { useState, useEffect } from "react";
import axios from "axios";
import type { ApiResponse } from "../../types/api-types";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import LoadingState from "./LoadingState";
import { getAuthToken } from "../../utils/auth";

const DashboardContainer: React.FC = () => {
  const [apiData, setApiData] = useState<ApiResponse>({
    sensores: {
      temperatura: 0,
      humedad: 0,
      lluvia: 0,
      sol: 0
    },
    parcelas: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_API_URL}/mediciones/ultimas-parcela`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data) {
          const formattedData = {
            sensores: {
              temperatura: response.data.sensores?.temperatura || 0,
              humedad: response.data.sensores?.humedad || 0,
              lluvia: response.data.sensores?.lluvia || 0,
              sol: response.data.sensores?.sol || 0
            },
            parcelas: response.data.parcelas?.map(parcela => ({
              ...parcela,
              latitud: typeof parcela.latitud === 'string' ? parseFloat(parcela.latitud) : parcela.latitud,
              longitud: typeof parcela.longitud === 'string' ? parseFloat(parcela.longitud) : parcela.longitud,
              sensor: {
                temperatura: parcela.sensor?.temperatura || 0,
                humedad: parcela.sensor?.humedad || 0,
                lluvia: parcela.sensor?.lluvia || 0,
                sol: parcela.sensor?.sol || 0
              }
            })) || []
          };
          setApiData(formattedData);
        }
        setError(null);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || "Error al cargar datos de los sensores");
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Actualizar datos cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <DashboardHeader />
      <DashboardContent apiData={apiData} error={error} />
    </>
  );
};

export default DashboardContainer;