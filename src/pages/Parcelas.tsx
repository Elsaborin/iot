import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useSensorData } from "../hooks/useSensorData";
import ParcelasHeader from "../components/parcelas/ParcelasHeader";
import ParcelasToolbar from "../components/parcelas/ParcelasToolbar";
import ParcelasGrid from "../components/parcelas/ParcelasGrid";

const Parcelas: React.FC = () => {
  const { data, loading, error } = useSensorData();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showInactives, setShowInactives] = useState(true); // Changed to true to show inactives by default

  const parcelasActivas = data?.activas ?? [];
  const parcelasInactivas = data?.inactivas ?? [];
  const parcelasToShow = showInactives ? parcelasInactivas : parcelasActivas;

  return (
    <Layout>
      <div className="mb-8">
        <ParcelasHeader
          title="Parcelas"
          subtitle="Monitoreo y control de cultivos"
          badge="Gestión de terrenos"
        />

        <ParcelasToolbar
          showInactives={showInactives}
          viewMode={viewMode}
          onToggleInactives={setShowInactives}
          onChangeViewMode={setViewMode}
        />
      </div>

      <ParcelasGrid
        parcelas={parcelasToShow}
        viewMode={viewMode}
        showInactives={showInactives}
        loading={loading}
        error={error}
      />
    </Layout>
  );
};

export default Parcelas;