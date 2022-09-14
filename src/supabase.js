import { createClient } from '@supabase/supabase-js';

const options = {
  schema: 'public',
  fetch: fetch.bind(globalThis),
};

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
  options
);

export default supabase;