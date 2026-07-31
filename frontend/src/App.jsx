import { useState } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CakeGrid from './components/CakeGrid';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProceedToCheckout = () => {
    alert("Moving to Checkout Flow!");
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-800">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
      />
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          ✨ Freshly Baked Daily in Town
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-950 font-serif mb-4 leading-tight">
          Handcrafted Cakes for Your Special Moments 🎂
        </h1>
        <p className="text-amber-800 max-w-2xl mx-auto text-base sm:text-lg mb-6">
          Select from various flavors, choose delivery slots, and customize message toppings directly for your loved ones.
        </p>

        <a
          href="#menu"
          className="inline-block bg-amber-800 hover:bg-amber-900 text-white font-bold px-8 py-3 rounded-xl shadow-md transition"
        >
          Explore Cake Menu
        </a>
      </main>

      {/* Cake Catalog */}
      <CakeGrid />
    </div>
  );
}