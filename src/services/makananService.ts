import { supabase } from './supabase';
import type { Makanan } from '../types';

export const getMakanans = async (): Promise<Makanan[]> => {
  const { data, error } = await supabase
    .from('makanans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Makanan[];
};

export const createMakanan = async (
  nama: string,
  lokasi: string,
  deskripsi: string,
  foto: File | null
): Promise<Makanan> => {
  let fotoPath: string | null = null;

  if (foto) {
    const fileName = `makanans/${Date.now()}_${foto.name}`;
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, foto);
    if (uploadError) throw uploadError;
    fotoPath = fileName;
  }

  const { data, error } = await supabase
    .from('makanans')
    .insert({ nama, lokasi, deskripsi, foto: fotoPath })
    .select()
    .single();

  if (error) throw error;
  return data as Makanan;
};

export const updateMakanan = async (
  id: number,
  nama: string,
  lokasi: string,
  deskripsi: string,
  foto: File | null,
  existingFoto: string | null
): Promise<Makanan> => {
  let fotoPath = existingFoto;

  if (foto) {
    if (existingFoto) {
      await supabase.storage.from('photos').remove([existingFoto]);
    }
    const fileName = `makanans/${Date.now()}_${foto.name}`;
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, foto);
    if (uploadError) throw uploadError;
    fotoPath = fileName;
  }

  const { data, error } = await supabase
    .from('makanans')
    .update({ nama, lokasi, deskripsi, foto: fotoPath })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Makanan;
};

export const deleteMakanan = async (id: number, foto: string | null): Promise<void> => {
  if (foto) {
    await supabase.storage.from('photos').remove([foto]);
  }
  const { error } = await supabase.from('makanans').delete().eq('id', id);
  if (error) throw error;
};