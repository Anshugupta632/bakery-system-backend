const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Ensure dotenv is configured
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: Supabase URL or Key missing in process.env!");
}

// Supabase Client Initialization
const supabase = createClient(supabaseUrl, supabaseKey);

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name }
      }
    });

    if (error) {
      console.error('Supabase SignUp Error:', error.message);
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.json({ 
      success: true, 
      message: 'Registration successful', 
      user: data.user 
    });

  } catch (err) {
    console.error('Register Server Error:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    return res.json({ 
      success: true, 
      token: data.session.access_token, 
      user: data.user 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;