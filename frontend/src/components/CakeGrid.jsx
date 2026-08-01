import CakeCard from './CakeCard';
import { useCart } from '../context/CartContext';
import { Sparkles, Cake } from 'lucide-react';

export default function CakeGrid({ selectedCategory = 'All', cakes = [] }) {
  const cartContext = useCart ? useCart() : null;
  const addToCart = cartContext?.addToCart || (() => {});

  // Dynamic filter logic supporting both 'cakes' prop and default categories
  const filteredCakes = selectedCategory === 'All'
    ? cakes
    : cakes.filter(cake => {
        if (!cake.category) return true;
        // Normalize categories for flexible matching
        const cat = cake.category.toLowerCase();
        const sel = selectedCategory.toLowerCase();
        
        if (sel.includes('fruit') && cat.includes('fruit')) return true;
        if (sel === 'bestseller' && (cat === 'classics' || cat === 'chocolate')) return true;
        if (sel === 'customized' && cat.includes('fusion')) return true;
        
        return cat === sel;
      });

  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-amber-900/40">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> CakeBakers Official Menu
          </div>
          <h2 className="text-3xl font-black font-serif text-amber-100">
            Fresh Baked Cakes 🍰
          </h2>
        </div>

        <span className="text-xs font-bold text-amber-300 bg-[#2A1711] px-4 py-2 rounded-2xl border border-amber-800/40 flex items-center gap-2">
          <Cake className="w-4 h-4 text-amber-400" />
          Showing {filteredCakes.length} Cakes
        </span>
      </div>

      {/* Grid Render */}
      {filteredCakes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCakes.map((cake) => (
            <CakeCard
              key={cake.id}
              cake={cake}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-amber-200/50">
          No cakes found in this category.
        </div>
      )}

    </section>
  );
}