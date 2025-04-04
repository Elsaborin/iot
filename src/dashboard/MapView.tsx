import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Parcela } from "../types/parcela";


// Configurar el token de Mapbox
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapViewProps {
  parcelas: Parcela[];
}

const MapView: React.FC<MapViewProps> = ({ parcelas }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [popupRef, setPopupRef] = useState<mapboxgl.Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initializeMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-86.87474305194408, 21.063892829835364],
      zoom: 13,
      attributionControl: false,
    });

    map.current = initializeMap;

    initializeMap.on("load", () => {
      setMapLoaded(true);
      initializeMap.addControl(new mapboxgl.NavigationControl(), "top-right");
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded || !parcelas.length) return;

    // Limpiar marcadores existentes
    const markers = document.getElementsByClassName("custom-marker");
    while (markers.length > 0) {
      markers[0].remove();
    }

    // Calcular los límites del mapa basados en las parcelas
    const bounds = new mapboxgl.LngLatBounds();
    parcelas.forEach((parcela) => {
      bounds.extend([parcela.longitud, parcela.latitud]);
    });

    // Ajustar el mapa para mostrar todas las parcelas
    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15,
      duration: 1000
    });

    // Agregar nuevos marcadores
    parcelas.forEach((parcela) => {
      const el = document.createElement("div");
      el.className = "custom-marker relative";

      const markerContainer = document.createElement("div");
      markerContainer.className = "flex flex-col items-center";

      const pin = document.createElement("div");
      pin.className =
        "w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform-gpu transition-transform duration-300 hover:scale-110 z-10";

      const icon = document.createElement("div");
      icon.className = "text-white";
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8a8 8 0 0 1 16 0c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`;
      pin.appendChild(icon);

      const pulse = document.createElement("div");
      pulse.className = "absolute top-0 left-0 w-8 h-8 rounded-full bg-blue-400 opacity-70 animate-ping";

      const connector = document.createElement("div");
      connector.className = "w-1 h-5 bg-blue-500 -mt-1";

      const label = document.createElement("div");
      label.className =
        "bg-white dark:bg-slate-800 text-xs font-medium text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md shadow-md -mt-1";
      label.textContent = parcela.nombre;

      markerContainer.appendChild(pulse);
      markerContainer.appendChild(pin);
      markerContainer.appendChild(connector);
      markerContainer.appendChild(label);
      el.appendChild(markerContainer);

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        maxWidth: "300px",
        className:
          "custom-popup !bg-white dark:!bg-slate-800 !shadow-lg !rounded-lg !border !border-slate-200 dark:!border-slate-700",
      }).setHTML(`
        <div class="p-4">
          <h3 class="font-bold text-slate-900 dark:text-white text-lg mb-3">${parcela.nombre}</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-slate-600 dark:text-slate-400">Responsable:</span>
              <span class="font-medium text-slate-900 dark:text-white">${parcela.responsable}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-600 dark:text-slate-400">Tipo de cultivo:</span>
              <span class="font-medium text-slate-900 dark:text-white">${parcela.tipo_cultivo}</span>
            </div>
            <div class="border-t border-slate-200 dark:border-slate-700 my-2"></div>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                <div class="text-blue-600 dark:text-blue-400 text-sm">Humedad</div>
                <div class="font-bold text-blue-700 dark:text-blue-300">${parcela.sensor?.humedad}%</div>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                <div class="text-red-600 dark:text-red-400 text-sm">Temperatura</div>
                <div class="font-bold text-red-700 dark:text-red-300">${parcela.sensor?.temperatura}°C</div>
              </div>
              <div class="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded">
                <div class="text-cyan-600 dark:text-cyan-400 text-sm">Lluvia</div>
                <div class="font-bold text-cyan-700 dark:text-cyan-300">${parcela.sensor?.lluvia} mm</div>
              </div>
              <div class="bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                <div class="text-amber-600 dark:text-amber-400 text-sm">Sol</div>
                <div class="font-bold text-amber-700 dark:text-amber-300">${parcela.sensor?.sol}%</div>
              </div>
            </div>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([parcela.longitud, parcela.latitud])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener("click", () => {
        setSelectedMarker(parcela.id);
        popupRef?.remove();
        setPopupRef(popup);
      });
    });
  }, [parcelas, mapLoaded]);

  return (
    <div className="w-full lg:w-[60%] bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 p-4 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Mapa de ubicaciones</h2>
      <div className="h-[calc(100%-2rem)] w-full bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden relative">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
    </div>
  );
};

export default MapView;