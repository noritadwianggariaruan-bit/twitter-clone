// supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// CONFIG
const SUPABASE_URL = "https://cjkfayemtiixlfxfcddp.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqa2ZheWVtdGlpeGxmeGZjZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzAxODYsImV4cCI6MjA4NDA0NjE4Nn0.pcLZYsl1avZzz54f7G-TWS_z-zzm0UY1S21hFVjYYew"

// CLIENT
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)
