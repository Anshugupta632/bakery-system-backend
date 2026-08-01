import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#1A0C08] border-l border-amber-900/50 h-full shadow-2xl flex flex-col justify-between p-5">
        
        {/* Header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-amber-900/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-amber-100 font-serif">Your Baking Cart</h2>
            </div>
            <button onClick={onClose} className="text-amber-400 hover:text-amber-200 p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="my-4 max-h-[60vh] overflow-y-auto space-y-3 pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-amber-200/50">
                <p className="text-sm font-semibold">Your cart is empty 🎂</p>
                <p className="text-xs mt-1 text-amber-800">Add cakes with custom names from the menu.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-[#26130C] border border-amber-900/40 p-3 rounded-2xl flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-amber-900/30" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-amber-100 truncate">{item.name}</h4>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold uppercase">
                      {item.selectedSize}
                    </span>

                    {/* ICED NAME ON CAKE DISPLAY IN CART */}
                    {item.customText && (
                      <p className="text-[10px] text-amber-300 italic mt-1 font-serif truncate">
                        Writing: "{item.customText}"
                      </p>
                    )}

                    <p className="text-xs font-extrabold text-amber-400 mt-1">₹{item.price}</p>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2 bg-[#120805] px-2 py-1 rounded-xl border border-amber-900/40">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-amber-200 font-bold text-xs px-1">-</button>
                    <span className="text-xs font-bold text-amber-100">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-amber-200 font-bold text-xs px-1">+</button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-300 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-amber-900/40">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-amber-200/70 font-semibold uppercase">Total Amount</span>
              <span className="text-2xl font-black text-amber-400">₹{cartTotal}</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-2xl shadow-xl transition cursor-pointer text-sm"
            >
              Proceed to Checkout 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
}