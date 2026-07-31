import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Truck, Calendar, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

export default function Checkout({ onBack }) {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const [formData, setFormData] = useState({
    delivery_address: '',
    delivery_pincode: '400059',
    delivery_date: '',
    delivery_slot: 'Evening (4 PM - 8 PM)',
    payment_method: 'cod',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to place an order!");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        items: cart.map((item) => ({
          cake_id: item.cake_id,
          size_id: item.size_id,
          flavor_id: null,
          quantity: item.quantity,
          customization_text: item.customization_text || null,
          item_price: item.item_price,
        })),
        delivery_date: formData.delivery_date,
        delivery_slot: formData.delivery_slot,
        delivery_address: formData.delivery_address,
        delivery_pincode: formData.delivery_pincode,
        payment_method: formData.payment_method,
      };

      const res = await API.post('/orders', orderPayload);

      if (res.data.success) {
        setOrderPlaced(res.data.data);
        clearCart();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order placement failed!");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl border border-amber-100 shadow-xl text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-amber-950 font-serif">Order Confirmed! 🎉</h2>
        <p className="text-amber-800 text-sm mt-1">Thank you for ordering with CakeBakers.</p>
        
        <div className="my-6 p-4 bg-stone-50 rounded-xl text-left text-xs space-y-2 text-stone-700">
          <p><strong>Order ID:</strong> {orderPlaced.id}</p>
          <p><strong>Total Amount:</strong> ₹{orderPlaced.total_amount}</p>
          <p><strong>Delivery Date:</strong> {orderPlaced.delivery_date}</p>
          <p><strong>Slot:</strong> {orderPlaced.delivery_slot}</p>
          <p><strong>Status:</strong> <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">{orderPlaced.order_status}</span></p>
        </div>

        <button
          onClick={onBack}
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 px-6 rounded-xl transition cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const deliveryCharge = 50;
  const grandTotal = cartTotal + deliveryCharge;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-1 text-amber-800 hover:text-amber-950 font-semibold mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shopping</span>
      </button>

      <h1 className="text-3xl font-bold text-amber-950 font-serif mb-6">Complete Your Order 🎂</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form Details */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-amber-900 border-b border-amber-100 pb-2 flex items-center gap-2">
            <Truck className="w-5 h-5" /> Delivery Information
          </h3>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Address</label>
              <textarea
                name="delivery_address"
                required
                rows="3"
                placeholder="House No, Street, Landmark, Area"
                value={formData.delivery_address}
                onChange={handleChange}
                className="w-full text-sm p-3 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="delivery_pincode"
                  required
                  value={formData.delivery_pincode}
                  onChange={handleChange}
                  className="w-full text-sm p-3 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Delivery Date</label>
                <input
                  type="date"
                  name="delivery_date"
                  required
                  value={formData.delivery_date}
                  onChange={handleChange}
                  className="w-full text-sm p-3 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Select Slot</label>
              <select
                name="delivery_slot"
                value={formData.delivery_slot}
                onChange={handleChange}
                className="w-full text-sm p-3 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800 focus:outline-hidden bg-white"
              >
                <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Payment Method</label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="w-full text-sm p-3 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800 focus:outline-hidden bg-white"
              >
                <option value="cod">Cash on Delivery (COD)</option>
                <option value="online">Online Payment (Razorpay - Coming Soon)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 rounded-xl transition cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? "Placing Order..." : `Confirm Order (₹${grandTotal})`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 h-fit space-y-4">
          <h3 className="font-bold text-amber-950 text-base">Order Summary</h3>
          
          <div className="space-y-3 text-sm border-b border-amber-200 pb-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-amber-900">{item.name}</p>
                  <p className="text-stone-500">{item.size_label} × {item.quantity}</p>
                </div>
                <span className="font-semibold text-amber-950">₹{item.item_price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1 text-xs text-amber-900 font-medium">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-amber-950 pt-2 border-t border-amber-200">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}