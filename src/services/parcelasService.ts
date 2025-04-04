import { Parcela } from '../types/parcela';

const API_URL = 'http://127.0.0.1:8000/api';

export const fetchParcelas = async (): Promise<Parcela[]> => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_URL}/parcelas`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener las parcelas');
  }

  const data = await response.json();
  return data;
};

export const fetchParcelasInactivas = async (): Promise<Parcela[]> => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_URL}/parcelas/inactivas`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener las parcelas inactivas');
  }

  const data = await response.json();
  return data;
};