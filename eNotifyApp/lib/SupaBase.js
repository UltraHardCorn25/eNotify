import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://moodzcmszmbatuipfuwj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2R6Y21zem1iYXR1aXBmdXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MzQ4OTYsImV4cCI6MjAyMjIxMDg5Nn0.BmedB6K_px4a4kqAASieMvTxqHU1fwijZ22HT_KUHdQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
