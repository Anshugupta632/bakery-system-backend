import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose, onProceedToCheckout }) {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-amber-900">Your Cake Cart 🎂</h2>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-black">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-4xl mb-2">🧁</p>
                <p className="font-medium">Your cart is empty!</p>
                <p className="text-xs text-gray-400 mt-1">Add some delicious cakes to get started.</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.cake_id}-${item.size_id}-${index}`}
                  className="flex items-center space-x-4 border border-gray-100 p-3 rounded-xl bg-amber-50/30"
                >
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150'}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-amber-800 font-medium">Size: {item.size_label}</p>
                    {item.customization_text && (
                      <p className="text-xs text-gray-500 italic truncate">"{item.customization_text}"</p>
                    )}
                    <p className="text-sm font-semibold text-amber-900 mt-1">
                      ₹{item.item_price} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cake_id, item.size_id)}
                    className="text-gray-400 hover:text-rose-600 p-1 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal */}
          {cart.length > 0 && (
            <div className="p-4 bg-amber-50/50 border-t border-amber-100 space-y-3">
              <div className="flex justify-between items-center text-amber-900 font-semibold">
                <span>Subtotal</span>
                <span className="text-lg font-bold">₹{cartTotal}</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}