import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Database } from './lib/database.types';

dotenv.config(); // Cria as variáveis escrita no arquivo .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const options = process.env.USE_TEST_ENV
  ? { auth: { persistSession: false } }
  : undefined

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are not defined.');
}

const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  options
);

export default supabase;
