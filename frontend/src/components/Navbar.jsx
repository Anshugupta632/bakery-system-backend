import React, { useState, useEffect } from 'react';
import { ShoppingBag, User as UserIcon, LogOut, Cake } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync Logged-In State from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to parse user from storage');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    alert('Logged out successfully!');
    window.location.reload();
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Cake className="w-8 h-8 text-pink-600" />
              <span className="text-xl font-black tracking-tight text-gray-900">
                Cake<span className="text-pink-600">Bakers</span>
              </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              
              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-gray-700 hover:text-pink-600 transition"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Login / Profile Section */}
              {isLoggedIn && user ? (
                <div className="flex items-center gap-3 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-200">
                  <div className="w-7 h-7 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <span className="text-sm font-semibold text-gray-800 max-w-[100px] truncate">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="text-gray-500 hover:text-red-600 transition ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition duration-200"
                >
                  <UserIcon className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Auth Modal Trigger */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        setUser={setUser}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default Navbar;