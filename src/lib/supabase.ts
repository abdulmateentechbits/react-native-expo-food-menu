import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zcvqosmfqibspztpocxm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdnFvc21mcWlic3B6dHBvY3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5ODg1MDIsImV4cCI6MjAyODU2NDUwMn0.sLKiNiAlyVEYoEjUa5uN0nZCE1qRBL5TyCe-EdjM13Y"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})