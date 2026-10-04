import api from './api';
import type { Makanan } from '../types';

export const getMakanans = async (): Promise<Makanan[]> => {
  const response = await api.get<Makanan[]>('/makanans');
  return response.data;
};

export const createMakanan = async (formData: FormData): Promise<Makanan> => {
  const response = await api.post<Makanan>('/admin/makanans', formData);
  return response.data;
};

export const updateMakanan = async (id: number, formData: FormData): Promise<Makanan> => {
  const response = await api.post<Makanan>(`/admin/makanans/${id}`, formData);
  return response.data;
};

export const deleteMakanan = async (id: number): Promise<void> => {
  await api.delete(`/admin/makanans/${id}`);
};