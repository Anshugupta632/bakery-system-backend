import { useState } from 'react';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCart }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);

  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <nav className="bg-amber-50/90 backdrop-blur-md border-b border-amber-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-amber-900 tracking-wide font-serif">
              🍰 CakeBakers
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 items-center font-medium text-amber-900">
            <a href="/" className="hover:text-amber-600 transition">Home</a>
            <a href="#menu" className="hover:text-amber-600 transition">Our Cakes</a>
            <a href="#about" className="hover:text-amber-600 transition">About Us</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Cart Icon with Counter */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-amber-900 hover:text-amber-600 transition cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-amber-900 hidden sm:inline">
                  Hi, {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-full transition cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="flex items-center space-x-1 bg-amber-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-900 transition shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-amber-900 p-1"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}