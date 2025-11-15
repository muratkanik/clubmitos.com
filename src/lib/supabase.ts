import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with correct credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qiaxjdumtbgizmbpjeek.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYXhqZHVtdGJnaXptYnBqZWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzU5NzQsImV4cCI6MjA3ODcxMTk3NH0.aO-9RrwRu86mbCI7NzNNSWaxu2fN-f-orwn7RCq62DI';

export const supabase = createClient(supabaseUrl, supabaseKey);
