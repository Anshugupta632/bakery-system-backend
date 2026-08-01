import { useState } from 'react';
import Navbar from './components/Navbar';
import CakeGrid from './components/CakeGrid';
import CustomizedShowcase from './components/CustomizedShowcase';
import AboutSection from './components/AboutSection';
import CustomerService from './components/CustomerService';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import { CartProvider } from './context/CartContext';
import { cakesData } from './data/cakesData';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories EXACTLY matching cakesData.js
  const categories = ['All', 'Chocolate', 'Classics', 'Fruit Cakes', 'Indian Fusion', 'Premium'];

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#120805] text-amber-100 font-sans selection:bg-amber-500 selection:text-stone-950">
        
        {/* Navigation Bar */}
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenAuth={() => setIsAuthOpen(true)} 
        />

        {/* Hero & Category Filter Header */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block mb-3">
              ✨ Freshly Baked Everyday
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-serif text-amber-100 tracking-tight mb-3">
              Custom Handcrafted Cakes
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/60 leading-relaxed">
              Order fresh cakes with custom icing names delivered straight to your home.
            </p>
          </div>

          {/* Category Pills Filter */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md'
                    : 'bg-[#22120C] text-amber-200/70 border-amber-900/40 hover:border-amber-500/40 hover:text-amber-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Main Specialty Cake Menu */}
        <main>
          <CakeGrid selectedCategory={selectedCategory} cakes={cakesData} />
        </main>

        {/* 🎨 Customized Photo & Theme Showcase Section */}
        <CustomizedShowcase />

        {/* About Section */}
        <AboutSection />

        {/* Customer Support & Contact */}
        <CustomerService />

        {/* Side Drawers & Overlays */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />

        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />

        {/* Footer */}
        <footer className="border-t border-amber-900/30 mt-16 py-8 bg-[#0D0503] text-center text-xs text-amber-200/40">
          <p>© 2026 CakeBakers. All rights reserved.</p>
          <p className="mt-1 font-semibold text-amber-400/60">Contact: 7400400725 / 7054508563</p>
        </footer>

      </div>
    </CartProvider>
  );
}