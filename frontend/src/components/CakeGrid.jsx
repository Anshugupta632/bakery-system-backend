import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Temporary Mock Data (Jab tak backend catalog se connect na ho)
const SAMPLE_CAKES = [
  {
    id: "c3a2f1a0-1234-4321-8765-abcdef123456",
    name: "Belgian Chocolate Truffle",
    category: "Chocolate",
    image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    base_price: 550,
    sizes: [
      { id: "s1", label: "0.5 kg", price: 550 },
      { id: "s2", label: "1 kg", price: 950 },
    ]
  },
  {
    id: "c4b3e2f1-5678-8765-4321-fedcba654321",
    name: "Red Velvet Bliss",
    category: "Premium",
    image_url: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500",
    base_price: 650,
    sizes: [
      { id: "s1", label: "0.5 kg", price: 650 },
      { id: "s2", label: "1 kg", price: 1150 },
    ]
  },
  {
    id: "c5c4d3e2-9999-8888-7777-666655554444",
    name: "Fresh Strawberry Delight",
    category: "Fruit",
    image_url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
    base_price: 500,
    sizes: [
      { id: "s1", label: "0.5 kg", price: 500 },
      { id: "s2", label: "1 kg", price: 880 },
    ]
  }
];

export default function CakeGrid() {
  const { addToCart } = useCart();
  const [customTexts, setCustomTexts] = useState({});

  const handleTextChange = (cakeId, text) => {
    setCustomTexts((prev) => ({ ...prev, [cakeId]: text }));
  };

  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-amber-950 font-serif">Our Bestselling Cakes 🍰</h2>
        <p className="text-amber-800 text-sm mt-1">Pick your favorite flavor and size</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAMPLE_CAKES.map((cake) => {
          const defaultSize = cake.sizes[0];
          return (
            <div
              key={cake.id}
              className="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <img
                  src={cake.image_url}
                  alt={cake.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full">
                    {cake.category}
                  </span>
                  <h3 className="text-xl font-bold text-amber-950 mt-2">{cake.name}</h3>
                  <p className="text-lg font-bold text-amber-900 mt-1">₹{defaultSize.price}</p>

                  {/* Message Input */}
                  <input
                    type="text"
                    placeholder="Message on cake (e.g., Happy Birthday)"
                    value={customTexts[cake.id] || ''}
                    onChange={(e) => handleTextChange(cake.id, e.target.value)}
                    className="mt-4 w-full text-xs p-2.5 border border-amber-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => addToCart(cake, defaultSize, 1, customTexts[cake.id] || '')}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}