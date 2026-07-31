import { useState } from 'react';
import { ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SAMPLE_CAKES = [
  {
    id: "c3a2f1a0-1234-4321-8765-abcdef123456",
    name: "Belgian Chocolate Truffle",
    category: "Chocolate",
    rating: "4.9",
    reviews: 128,
    isBestseller: true,
    image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    description: "Layered with Dutch cocoa mousse and dark chocolate ganache glaze.",
    sizes: [
      { id: "s1", label: "0.5 kg", price: 550 },
      { id: "s2", label: "1 kg", price: 980 },
    ]
  },
  {
    id: "c4b3e2f1-5678-8765-4321-fedcba654321",
    name: "Red Velvet Velvet Bliss",
    category: "Bestseller",
    rating: "4.8",
    reviews: 94,
    isBestseller: true,
    image_url: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600",
    description: "Authentic red velvet sponge topped with rich cream cheese frosting.",
    sizes: [
      { id: "s1", label: "0.5 kg", price: 650 },
      { id: "s2", label: "1 kg", price: 1150 },
    ]
  },
  {
    id: "c5c4d3e2-9999-8888-7777-666655554444",
    name: "Fresh Strawberry Gateau",
    category: "Fruit & Fresh",
    rating: "4.7",
    reviews: 76,
    isBestseller: false,
    image_url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600",
    description: "Loaded with fresh Mahabaleshwar strawberries and vanilla bean cream.",
    sizes: [
      { id: "s1", label: "0.5 kg", price: 520 },
      { id: "s2", label: "1 kg", price: 890 },
    ]
  }
];

export default function CakeGrid({ selectedCategory }) {
  const { addToCart } = useCart();
  const [customTexts, setCustomTexts] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const filteredCakes = selectedCategory === 'All'
    ? SAMPLE_CAKES
    : SAMPLE_CAKES.filter(c => c.category === selectedCategory || (selectedCategory === 'Bestseller' && c.isBestseller));

  const handleSizeChange = (cakeId, size) => {
    setSelectedSizes(prev => ({ ...prev, [cakeId]: size }));
  };

  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 py-8 mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-stone-200/80 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] font-serif">
            Our Specialty Cakes
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">Freshly baked upon order confirmation</p>
        </div>
        <span className="text-xs font-semibold text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full mt-2 sm:mt-0">
          Showing {filteredCakes.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCakes.map((cake) => {
          const currentSize = selectedSizes[cake.id] || cake.sizes[0];

          return (
            <div
              key={cake.id}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/70 shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Zoom Effect */}
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={cake.image_url}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition duration-500 ease-out"
                  />
                  
                  {/* Bestseller Badge */}
                  {cake.isBestseller && (
                    <span className="absolute top-3 left-3 bg-[#3E2723] text-amber-100 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" /> BESTSELLER
                    </span>
                  )}

                  {/* Rating Tag */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {cake.rating} ({cake.reviews})
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-900 transition">
                      {cake.name}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {cake.description}
                  </p>

                  {/* Size Options Selector */}
                  <div className="pt-1">
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      Select Weight
                    </label>
                    <div className="flex gap-2">
                      {cake.sizes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleSizeChange(cake.id, s)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                            currentSize.id === s.id
                              ? 'border-amber-900 bg-amber-950 text-white shadow-xs'
                              : 'border-stone-200 text-stone-600 hover:border-amber-700'
                          }`}
                        >
                          {s.label} - ₹{s.price}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Message Input */}
                  <div className="pt-1">
                    <input
                      type="text"
                      placeholder="✍️ Custom message on cake (Optional)"
                      value={customTexts[cake.id] || ''}
                      onChange={(e) => setCustomTexts({ ...customTexts, [cake.id]: e.target.value })}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-800 focus:outline-hidden transition"
                    />
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart Footer */}
              <div className="p-5 pt-0 flex items-center justify-between gap-4 border-t border-stone-100 mt-2">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Total Price</span>
                  <span className="text-xl font-extrabold text-[#2C1810]">₹{currentSize.price}</span>
                </div>

                <button
                  onClick={() => addToCart(cake, currentSize, 1, customTexts[cake.id] || '')}
                  className="flex-1 bg-[#3E2723] hover:bg-[#2C1810] text-amber-50 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer text-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}