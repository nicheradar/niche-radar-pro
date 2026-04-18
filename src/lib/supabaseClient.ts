import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bgerrbbwoskylnzwbfrg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXJyYmJ3b3NreWxuendiZnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0OTczMTUsImV4cCI6MjA5MjA3MzMxNX0.-Bv5exBtvmPB5X_Go5iKQv8ILHtMTdyxuMmnO3h5vM4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
