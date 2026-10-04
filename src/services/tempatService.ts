import { supabase } from './supabase';
import type { Tempat } from '../types';

export const getTempats = async (): Promise<Tempat[]> => {
  const { data, error } = await supabase
    .from('tempats')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Tempat[];
};

export const createTempat = async (
  nama: string,
  lokasi: string,
  deskripsi: string,
  foto: File | null
): Promise<Tempat> => {
  let fotoPath: string | null = null;

  if (foto) {
    const fileName = `tempats/${Date.now()}_${foto.name}`;
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, foto);
    if (uploadError) throw uploadError;
    fotoPath = fileName;
  }

  const { data, error } = await supabase
    .from('tempats')
    .insert({ nama, lokasi, deskripsi, foto: fotoPath })
    .select()
    .single();

  if (error) throw error;
  return data as Tempat;
};

export const updateTempat = async (
  id: number,
  nama: string,
  lokasi: string,
  deskripsi: string,
  foto: File | null,
  existingFoto: string | null
): Promise<Tempat> => {
  let fotoPath = existingFoto;

  if (foto) {
    if (existingFoto) {
      await supabase.storage.from('photos').remove([existingFoto]);
    }
    const fileName = `tempats/${Date.now()}_${foto.name}`;
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, foto);
    if (uploadError) throw uploadError;
    fotoPath = fileName;
  }

  const { data, error } = await supabase
    .from('tempats')
    .update({ nama, lokasi, deskripsi, foto: fotoPath })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Tempat;
};

export const deleteTempat = async (id: number, foto: string | null): Promise<void> => {
  if (foto) {
    await supabase.storage.from('photos').remove([foto]);
  }
  const { error } = await supabase.from('tempats').delete().eq('id', id);
  if (error) throw error;
};