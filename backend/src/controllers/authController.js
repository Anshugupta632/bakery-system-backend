const supabase = require('../config/supabase');

// Signup
const signup = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Email, password, name required' });
    }

    // Create auth user using admin method (doesn't hijack the service client's session)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm, since backend is trusted
    });

    if (authError) throw authError;

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: authData.user.id, name, phone }]);

    if (profileError) throw profileError;

    res.json({ success: true, message: 'Signup successful', user: authData.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({
      success: true,
      session: data.session,
      user: data.user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = { signup, login };