const supabase = require('../config/supabase');

// Get ALL cakes (including unavailable ones) — for admin view
const getAllCakesAdmin = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cakes')
      .select(`
        id,
        name,
        description,
        image_urls,
        is_available,
        base_price,
        categories (name)
      `)
      .order('name', { ascending: true });

    if (error) throw error;

    const shaped = data.map((cake) => ({
      id: cake.id,
      name: cake.name,
      category: cake.categories?.name || 'Uncategorized',
      image: cake.image_urls?.[0] || '',
      priceHalfKg: cake.base_price,
      isOutOfStock: !cake.is_available,
    }));

    res.json({ success: true, data: shaped });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update price (updates base_price AND the 0.5kg size row)
const updateCakePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (price === undefined || isNaN(price)) {
      return res.status(400).json({ success: false, message: 'Valid price required' });
    }

    // Update base_price on the cake itself
    const { error: cakeError } = await supabase
      .from('cakes')
      .update({ base_price: price })
      .eq('id', id);

    if (cakeError) throw cakeError;

    // Also update the matching 0.5kg size row, if it exists
    const { error: sizeError } = await supabase
      .from('cake_sizes')
      .update({ price })
      .eq('cake_id', id)
      .eq('weight_label', '0.5kg');

    if (sizeError) throw sizeError;

    res.json({ success: true, message: 'Price updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Toggle stock availability
const toggleCakeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const { error } = await supabase
      .from('cakes')
      .update({ is_available: isAvailable })
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Stock status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllCakesAdmin, updateCakePrice, toggleCakeStock };