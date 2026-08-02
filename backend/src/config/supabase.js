
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('Using key starting with:', process.env.SUPABASE_SERVICE_KEY?.substring(0, 15));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = supabase;