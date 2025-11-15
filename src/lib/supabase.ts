import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://qiaxjdumtbgizmbpjeek.supabase.co';
const supabaseKey = 'sb_publishable_JZ685ikz9WBi7LKxtb2gcg_ktj6KAvH';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };