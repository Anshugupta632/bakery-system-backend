import { useState } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CakeGrid from './components/CakeGrid';
import Checkout from './pages/Checkout';
import { Sparkles, HeartHandshake, ShieldCheck, Truck } from 'lucide-react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Chocolate', 'Fruit & Fresh', 'Bestseller', 'Eggless', 'Customized'];

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-stone-800 antialiased selection:bg-amber-200">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setCurrentView('checkout')}
      />

      {currentView === 'checkout' ? (
        <Checkout onBack={() => setCurrentView('home')} />
      ) : (
        <>
          {/* Premium Hero Section */}
          <section className="relative overflow-hidden pt-12 pb-16 md:py-20 bg-gradient-to-b from-amber-100/60 via-amber-50/30 to-[#FAF7F2]">
            {/* Background Aesthetic Blur Blobs */}
            <div className="absolute top-0 -left-12 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-10 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              
              {/* Glassmorphism Pill */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-amber-200/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-900 shadow-xs mb-6">
                <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Crafted Fresh Daily • 100% Eggless Options</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#2C1810] font-serif mb-6 tracking-tight leading-[1.15]">
                Freshly Baked Happiness, <br />
                <span className="bg-gradient-to-r from-amber-700 via-amber-800 to-rose-700 bg-clip-text text-transparent">
                  Delivered To Your Door
                </span> 🍰
              </h1>

              <p className="text-stone-600 max-w-2xl mx-auto text-base sm:text-xl font-normal mb-8 leading-relaxed">
                Artisanal cakes prepared with pure butter, rich Belgian chocolate, and zero preservatives. Perfect for birthdays, anniversaries, & sweet cravings.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                <a
                  href="#menu"
                  className="w-full sm:w-auto bg-[#3E2723] hover:bg-[#2C1810] text-amber-50 font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition duration-200 text-center cursor-pointer"
                >
                  Explore Delicious Menu
                </a>
                <a
                  href="#trust"
                  className="w-full sm:w-auto bg-white/90 hover:bg-white text-stone-800 border border-stone-200 font-bold px-8 py-3.5 rounded-2xl shadow-xs hover:shadow-md transition duration-200 text-center"
                >
                  Custom Cake Orders
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div id="trust" className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-amber-200/60 pt-8 text-stone-700">
                <div className="flex items-center justify-center gap-2.5 text-xs font-semibold text-amber-950">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Express Same-Day Slot Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-2.5 text-xs font-semibold text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Safe & Hygienic Packaging</span>
                </div>
                <div className="flex items-center justify-center gap-2.5 text-xs font-semibold text-amber-950">
                  <HeartHandshake className="w-4 h-4 text-amber-700" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>

            </div>
          </section>

          {/* Interactive Category Filter Pills */}
          <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#3E2723] text-amber-50 shadow-md scale-105'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cake Cards Catalog */}
          <CakeGrid selectedCategory={selectedCategory} />
        </>
      )}
    </div>
  );
}