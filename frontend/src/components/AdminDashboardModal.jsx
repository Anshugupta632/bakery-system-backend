import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, AlertCircle, Edit2, ShieldAlert, Package } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboardModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Edit Price State
  const [editingCakeId, setEditingCakeId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchCakes();
    }
  }, [isOpen, isAuthenticated]);

  const fetchCakes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/cakes`, {
        headers: { 'x-admin-key': adminKey },
      });
      const result = await res.json();

      if (!result.success) {
        setErrorMsg(result.message || 'Failed to load cakes');
        setIsAuthenticated(false);
        return;
      }

      setCakes(result.data);
    } catch (err) {
      console.error('Failed to fetch cakes:', err);
      setErrorMsg('Could not reach server');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Try fetching cakes with the entered key — if it works, key is valid
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/cakes`, {
        headers: { 'x-admin-key': adminKey },
      });
      const result = await res.json();

      if (result.success) {
        setIsAuthenticated(true);
        setCakes(result.data);
      } else {
        setErrorMsg('Incorrect Admin Key');
      }
    } catch (err) {
      setErrorMsg('Could not reach server');
    }
  };

  const toggleStock = async (id) => {
    const targetCake = cakes.find((c) => c.id === id);
    if (!targetCake) return;

    const newStockStatus = !targetCake.isOutOfStock;

    // UI update immediately
    setCakes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isOutOfStock: newStockStatus } : c))
    );

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/cakes/${id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ isAvailable: !newStockStatus }),
      });
      const result = await res.json();
      if (!result.success) console.error('Stock update failed:', result.message);
    } catch (err) {
      console.error('Failed to sync stock:', err);
    }
  };

  const savePrice = async (id) => {
    if (!newPrice || isNaN(newPrice)) return;
    const priceNumber = Number(newPrice);

    setCakes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, priceHalfKg: priceNumber } : c))
    );

    setEditingCakeId(null);
    setNewPrice('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/cakes/${id}/price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ price: priceNumber }),
      });
      const result = await res.json();
      if (!result.success) console.error('Price update failed:', result.message);
    } catch (err) {
      console.error('Failed to sync price:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#180B07] border border-amber-900/50 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-amber-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-amber-900/40 flex items-center justify-between bg-[#120805]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-serif text-amber-100">
              CakeBakers Owner Dashboard
            </h2>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setAdminKey('');
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-amber-900/30 text-amber-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto my-auto w-full">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-amber-100 mb-1">Admin Access Only</h3>
            <p className="text-xs text-amber-200/60 mb-6">Enter owner admin key to manage cakes & prices.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Admin Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full bg-[#120805] border border-amber-900/50 rounded-xl px-4 py-3 text-xs text-center font-mono tracking-widest text-amber-100 focus:outline-none focus:border-amber-500/60"
              />
              {errorMsg && <p className="text-[11px] text-red-400 font-semibold">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition shadow-lg cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#22120C] border border-amber-900/40 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-amber-200/60 uppercase font-bold">Total Cakes Listed</p>
                  <p className="text-xl font-black text-amber-100">{cakes.length}</p>
                </div>
              </div>

              <div className="bg-[#22120C] border border-amber-900/40 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-amber-200/60 uppercase font-bold">Active In Stock</p>
                  <p className="text-xl font-black text-emerald-400">
                    {cakes.filter((c) => !c.isOutOfStock).length}
                  </p>
                </div>
              </div>

              <div className="bg-[#22120C] border border-amber-900/40 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-amber-200/60 uppercase font-bold">Out of Stock</p>
                  <p className="text-xl font-black text-red-400">
                    {cakes.filter((c) => c.isOutOfStock).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="bg-[#22120C] border border-amber-900/40 rounded-2xl p-4 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Manage Menu Prices & Stock
                </h3>
                {isLoading && <span className="text-[10px] text-amber-400 animate-pulse">Syncing Database...</span>}
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-900/40 text-amber-200/60 uppercase text-[10px]">
                    <th className="py-2 px-3">Cake</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">0.5 Kg Price</th>
                    <th className="py-2 px-3">Stock Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/30">
                  {cakes.map((cake) => (
                    <tr key={cake.id} className="hover:bg-[#1a0c08]/50 transition">
                      <td className="py-2.5 px-3 font-bold text-amber-100 flex items-center gap-2">
                        <img src={cake.image} alt={cake.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="truncate max-w-[150px]">{cake.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-amber-200/70">{cake.category || 'General'}</td>
                      
                      <td className="py-2.5 px-3 font-bold text-amber-300">
                        {editingCakeId === cake.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              placeholder={cake.priceHalfKg}
                              className="w-16 bg-[#120805] border border-amber-500 rounded px-1.5 py-0.5 text-xs text-amber-100 focus:outline-none"
                            />
                            <button
                              onClick={() => savePrice(cake.id)}
                              className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>₹{cake.priceHalfKg}</span>
                            <button
                              onClick={() => {
                                setEditingCakeId(cake.id);
                                setNewPrice(cake.priceHalfKg);
                              }}
                              className="text-amber-400/60 hover:text-amber-400 cursor-pointer"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            cake.isOutOfStock
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {cake.isOutOfStock ? 'Out of Stock' : 'In Stock'}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => toggleStock(cake.id)}
                          className={`px-3 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer ${
                            cake.isOutOfStock
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              : 'bg-red-900/40 hover:bg-red-800/60 text-red-300 border border-red-900/40'
                          }`}
                        >
                          {cake.isOutOfStock ? 'Mark Available' : 'Mark Out of Stock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}