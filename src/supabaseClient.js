import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozdvjjjltzgtlzdjabts.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96ZHZqampsdHpndGx6ZGphYnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzQ0NDIsImV4cCI6MjA2NzAxMDQ0Mn0.onauyzQJFxUPf6sPUbhy8SbAE_bsdIy884_XUAx-NWc';

export const supabase = createClient(supabaseUrl, supabaseKey);
