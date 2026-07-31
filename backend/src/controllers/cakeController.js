const supabase = require('../config/supabase');

// Get all available cakes
const getAllCakes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cakes')
      .select(`
        *,
        categories (name, slug),
        cake_sizes (*),
        cake_flavors (*)
      `)
      .eq('is_available', true);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single cake by ID
const getCakeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('cakes')
      .select(`
        *,
        categories (name, slug),
        cake_sizes (*),
        cake_flavors (*),
        customization_options (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllCakes, getCakeById };