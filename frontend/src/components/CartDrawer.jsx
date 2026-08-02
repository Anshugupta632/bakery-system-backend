import React, { useState } from 'react';
import { X, Trash2, Calendar, Clock, MessageSquare, ShoppingBag, Send, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  
  // Custom Order Details State
  const [customName, setCustomName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Evening (5:00 PM - 8:00 PM)');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  if (!isOpen) return null;

  // WhatsApp Checkout Handler
  const handleWhatsAppCheckout = () => {
    if (!cartItems || cartItems.length === 0) return;

    let itemsText = cartItems
      .map(
        (item) =>
          `• *${item.name}* (${item.selectedSize || '0.5 Kg'}) x${item.quantity || 1} = ₹${(item.price || item.selectedPrice || 0) * (item.quantity || 1)}`
      )
      .join('\n');

    const message = `🎂 *NEW CAKE ORDER - CakeBakers* 🎂\n\n` +
      `*Order Items:*\n${itemsText}\n\n` +
      `💰 *Total Amount:* ₹${cartTotal}\n` +
      `✏️ *Name on Cake:* ${customName || 'N/A'}\n` +
      `📅 *Delivery Date:* ${deliveryDate || 'As soon as possible'}\n` +
      `⏰ *Time Slot:* ${timeSlot}\n` +
      `📍 *Delivery Address:* ${deliveryAddress || 'Pickup from Store'}\n\n` +
      `Please confirm my order details!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "917400400725"; // Client WhatsApp Number
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#180B07] border-l border-amber-900/40 text-amber-100 flex flex-col h-full shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-amber-900/40 flex items-center justify-between bg-[#120805]">
          <div className="flex items-center gap-2 font-bold font-serif text-lg text-amber-100">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            Your Cake Cart ({cartItems ? cartItems.length : 0})
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-amber-900/30 text-amber-400 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!cartItems || cartItems.length === 0 ? (
            <div className="text-center py-16 text-amber-200/50">
              <p className="text-sm">Your cart is currently empty.</p>
            </div>
          ) : (
            <>
              {/* Added Cakes List */}
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-[#22120C] p-3 rounded-2xl border border-amber-900/40">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-amber-100 truncate">{item.name}</h4>
                      <p className="text-[10px] text-amber-300/80">
                        {item.selectedSize || '0.5 Kg'} • ₹{item.price || item.selectedPrice}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="w-5 h-5 bg-amber-900/40 hover:bg-amber-500 hover:text-stone-950 rounded text-xs font-bold flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="w-5 h-5 bg-amber-900/40 hover:bg-amber-500 hover:text-stone-950 rounded text-xs font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-black text-amber-300">
                        ₹{(item.price || item.selectedPrice || 0) * (item.quantity || 1)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400/80 hover:text-red-400 p-1 mt-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Customizations Input Form */}
              <div className="bg-[#22120C] p-4 rounded-2xl border border-amber-900/40 space-y-3 mt-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Order Customizations
                </h4>

                {/* 1. Name on Cake */}
                <div>
                  <label className="text-[11px] text-amber-200/70 block mb-1">Name on Cake (Icing Text):</label>
                  <input
                    type="text"
                    placeholder="e.g. Happy Birthday Rahul"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-[#120805] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                {/* 2. Delivery Date */}
                <div>
                  <label className="text-[11px] text-amber-200/70 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" /> Select Delivery Date:
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-[#120805] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                {/* 3. Delivery Time Slot */}
                <div>
                  <label className="text-[11px] text-amber-200/70 block mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Preferred Delivery Time:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#120805] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500/60"
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (1:00 PM - 5:00 PM)</option>
                    <option>Evening (5:00 PM - 8:00 PM)</option>
                    <option>Night / Midnight (9:30 PM - 12:00 AM)</option>
                  </select>
                </div>

                {/* 4. Delivery Address */}
                <div>
                  <label className="text-[11px] text-amber-200/70 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" /> Delivery Address:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Flat / House No, Street, Landmark..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#120805] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500/60 resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer - Total & WhatsApp Button */}
        {cartItems && cartItems.length > 0 && (
          <div className="p-4 border-t border-amber-900/40 bg-[#120805] space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-amber-200/70">Subtotal Amount:</span>
              <span className="text-amber-300 text-lg">₹{cartTotal}</span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Order via WhatsApp
            </button>
          </div>
        )}

      </div>
    </div>
  );
}