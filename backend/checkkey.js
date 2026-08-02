require('dotenv').config();
const key = process.env.SUPABASE_SERVICE_KEY;
const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64').toString());
console.log(payload);