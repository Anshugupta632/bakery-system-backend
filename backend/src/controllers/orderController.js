const supabase = require('../config/supabase');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // aata hai auth middleware se

    const {
      items, // array of { cake_id, size_id, flavor_id, quantity, customization_text, item_price }
      delivery_date,
      delivery_slot,
      delivery_address,
      delivery_pincode,
      payment_method,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }
    if (!delivery_date || !delivery_address || !delivery_pincode) {
      return res.status(400).json({ success: false, message: 'Delivery details required' });
    }

    // Delivery charge check kar
    const { data: deliverySetting } = await supabase
      .from('delivery_settings')
      .select('*')
      .eq('pincode', delivery_pincode)
      .single();

    const delivery_charge = deliverySetting ? deliverySetting.delivery_charge : 50;

    // Total calculate kar
    const itemsTotal = items.reduce((sum, item) => sum + (item.item_price * item.quantity), 0);
    const total_amount = itemsTotal + delivery_charge;

    // Order banao
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        total_amount,
        delivery_date,
        delivery_slot,
        delivery_address,
        delivery_pincode,
        delivery_charge,
        payment_method,
        payment_status: 'pending',
        order_status: 'pending',
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // Order items banao
    const orderItems = items.map((item) => ({
      order_id: order.id,
      cake_id: item.cake_id,
      size_id: item.size_id,
      flavor_id: item.flavor_id || null,
      quantity: item.quantity,
      customization_text: item.customization_text || null,
      customization_image_url: item.customization_image_url || null,
      item_price: item.item_price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    res.json({ success: true, message: 'Order created', data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('orders')
      .select(`*, order_items (*, cakes (name))`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single order by ID (logged-in user's own order)
const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select(`*, order_items (*, cakes (name))`)
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get ALL orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          cakes (name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Order Status (Admin only: pending -> baking -> out_for_delivery -> delivered -> cancelled)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status, payment_status } = req.body;

    const updateData = {};
    if (order_status) updateData.order_status = order_status;
    if (payment_status) updateData.payment_status = payment_status;

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, message: 'Order status updated', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// module.exports me in dono ko bhi add kar do:
module.exports = { 
  createOrder, 
  getMyOrders, 
  getOrderById, 
  getAllOrders, 
  updateOrderStatus 
};