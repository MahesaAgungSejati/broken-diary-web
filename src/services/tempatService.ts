import api from './api';
import type { Tempat } from '../types';

export const getTempats = async (): Promise<Tempat[]> => {
  const response = await api.get<Tempat[]>('/tempats');
  return response.data;
};

export const createTempat = async (formData: FormData): Promise<Tempat> => {
  const response = await api.post<Tempat>('/admin/tempats', formData);
  return response.data;
};

export const updateTempat = async (id: number, formData: FormData): Promise<Tempat> => {
  const response = await api.post<Tempat>(`/admin/tempats/${id}`, formData);
  return response.data;
};

export const deleteTempat = async (id: number): Promise<void> => {
  await api.delete(`/admin/tempats/${id}`);
};