import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder.jpg';
  const { data } = supabase.storage.from('photos').getPublicUrl(path);
  return data.publicUrl;
};