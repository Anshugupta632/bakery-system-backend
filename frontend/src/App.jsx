import { useState } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CakeGrid from './components/CakeGrid';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AuthModal from './components/AuthModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'checkout' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Chocolate', 'Fruit & Fresh', 'Bestseller', 'Eggless', 'Customized'];

  return (
    <div className="min-h-screen font-sans text-amber-50 antialiased selection:bg-amber-900/50">
      
      {/* Top Admin Switcher Bar */}
      <div className="bg-[#120805] border-b border-amber-900/40 px-4 py-1.5 text-xs text-amber-200/70 flex justify-between items-center max-w-7xl mx-auto">
        <span className="font-semibold">✨ CakeBakers Management Terminal</span>
        <button
          onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
          className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer transition"
        >
          {currentView === 'admin' ? '← Back to Store' : 'Go to Admin Dashboard 🛠️'}
        </button>
      </div>

      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAuth={() => setIsAuthOpen(true)} 
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
        }}
      />

      {currentView === 'admin' ? (
        <AdminDashboard onBack={() => setCurrentView('home')} />
      ) : currentView === 'checkout' ? (
        <Checkout onBack={() => setCurrentView('home')} />
      ) : (
        <>
          {/* Dark Chocolate Hero Section */}
          <section className="relative overflow-hidden pt-10 pb-16 md:py-20">
            
            {/* Glowing Ambient Light */}
            <div className="absolute top-10 left-1/4 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl pointer-events-none animate-glow" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-glow" />

            {/* Floating 3D Elements */}
            <div className="hidden lg:block absolute top-16 left-12 text-6xl animate-float pointer-events-none drop-shadow-2xl select-none opacity-80">
              🧁
            </div>
            <div className="hidden lg:block absolute bottom-12 left-24 text-5xl animate-float-slow pointer-events-none drop-shadow-2xl select-none opacity-80">
              🍓
            </div>
            <div className="hidden lg:block absolute top-20 right-16 text-6xl animate-float-slow pointer-events-none drop-shadow-2xl select-none opacity-80">
              🎂
            </div>
            <div className="hidden lg:block absolute bottom-16 right-28 text-5xl animate-float pointer-events-none drop-shadow-2xl select-none opacity-80">
              🍫
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              
              {/* Glass Hero Container */}
              <div className="max-w-4xl mx-auto px-6 py-10 bg-[#2A1711]/60 backdrop-blur-xl rounded-3xl border border-amber-900/40 shadow-2xl relative z-10 text-center mb-12">
                
                <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md mb-6">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>100% Handcrafted • Pure Butter & Belgian Cocoa</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-50 font-serif mb-6 tracking-tight leading-[1.15] drop-shadow-lg">
                  Freshly Baked Happiness, <br />
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                    Customized For Every Moment
                  </span> 🍰
                </h1>

                <p className="text-amber-200/80 font-medium max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
                  Choose your favorite flavor, write a personalized topping message, and select express delivery slots.
                </p>

                <div className="flex justify-center gap-4">
                  <a
                    href="#menu"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 transition duration-200 cursor-pointer text-sm"
                  >
                    Explore Cake Menu
                  </a>
                </div>
              </div>

              {/* Glass Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-[#2A1711]/50 backdrop-blur-xl p-5 rounded-3xl border border-amber-900/30 shadow-lg hover:border-amber-500/40 hover:-translate-y-1 transition duration-300 text-left">
                  <div className="w-10 h-10 bg-amber-900/40 rounded-2xl flex items-center justify-center text-xl mb-3 border border-amber-700/30">
                    ⚡
                  </div>
                  <h4 className="font-bold text-amber-100 text-sm">Same-Day Express</h4>
                  <p className="text-xs text-amber-200/60 mt-1">Order before 4 PM for evening delivery slots.</p>
                </div>

                <div className="bg-[#2A1711]/50 backdrop-blur-xl p-5 rounded-3xl border border-amber-900/30 shadow-lg hover:border-amber-500/40 hover:-translate-y-1 transition duration-300 text-left">
                  <div className="w-10 h-10 bg-amber-900/40 rounded-2xl flex items-center justify-center text-xl mb-3 border border-amber-700/30">
                    🌱
                  </div>
                  <h4 className="font-bold text-amber-100 text-sm">100% Eggless Option</h4>
                  <p className="text-xs text-amber-200/60 mt-1">Sponge cakes prepared without compromise on taste.</p>
                </div>

                <div className="bg-[#2A1711]/50 backdrop-blur-xl p-5 rounded-3xl border border-amber-900/30 shadow-lg hover:border-amber-500/40 hover:-translate-y-1 transition duration-300 text-left">
                  <div className="w-10 h-10 bg-amber-900/40 rounded-2xl flex items-center justify-center text-xl mb-3 border border-amber-700/30">
                    ✍️
                  </div>
                  <h4 className="font-bold text-amber-100 text-sm">Custom Topping Text</h4>
                  <p className="text-xs text-amber-200/60 mt-1">Get custom names or birthday greetings iced on cake.</p>
                </div>
              </div>

            </div>
          </section>

          {/* Interactive Category Filters */}
          <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition duration-200 whitespace-nowrap cursor-pointer shadow-sm ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-stone-950 font-black shadow-lg scale-105'
                      : 'bg-[#2A1711]/80 backdrop-blur-md border border-amber-900/40 text-amber-200/80 hover:bg-amber-900/30 hover:text-amber-100'
                  }`}
                >
                  {cat === 'All' ? '✨ All Cakes' : cat}
                </button>
              ))}
            </div>
          </div>

          <CakeGrid selectedCategory={selectedCategory} />
        </>
      )}
    </div>
  );
}