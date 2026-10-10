import { createClient } from '@supabase/supabase-js'

// Fill these in from your Supabase project settings, or set them as
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in a .env file at the project root.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = Boolean(supabase)
