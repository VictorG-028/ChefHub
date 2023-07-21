import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Database } from './lib/database.types';

dotenv.config(); // Cria as variáveis escrita no arquivo .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SUPABASE_URL environment variable is not defined.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
