import { useState } from 'react';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCart, onOpenAuth }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);

  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <nav className="bg-[#22120C]/80 backdrop-blur-md border-b border-amber-900/40 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-amber-100 tracking-wide font-serif">
              🍰 CakeBakers
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 items-center font-medium text-amber-200/80 text-sm">
            <a href="/" className="hover:text-amber-400 transition">Home</a>
            <a href="#menu" className="hover:text-amber-400 transition">Our Cakes</a>
            <a href="#about" className="hover:text-amber-400 transition">About Us</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Cart Icon with Counter */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-amber-200 hover:text-amber-400 transition cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-amber-200 hidden sm:inline">
                  Hi, {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-full transition cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* IDHER BADLAAV HUA HAI: Link ki jagah modal trigger button */
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1 bg-amber-500 text-stone-950 px-4 py-2 rounded-full text-xs font-extrabold hover:bg-amber-400 transition shadow-md cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-amber-200 p-1"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}