import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://moodzcmszmbatuipfuwj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2R6Y21zem1iYXR1aXBmdXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MzQ4OTYsImV4cCI6MjAyMjIxMDg5Nn0.BmedB6K_px4a4kqAASieMvTxqHU1fwijZ22HT_KUHdQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
