import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://supabasekong.cdocoaching.com';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc1ODUzMDc2MCwiZXhwIjo0OTE0MjA0MzYwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.NcU1tMm2d743mJHfz2B8rmFFx9RLbcBMn-cu64AJHFg';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types pour les données
export interface ListeDeCourse {
  id: number;
  liste_de_course: string;
  created_at?: string;
}

export interface Recette {
  id: number;
  noms: string;
  recette: string;
  created_at?: string;
}

export interface HistoriqueRecette {
  id: number;
  nom: string;
  recette: string;
  created_at?: string;
}