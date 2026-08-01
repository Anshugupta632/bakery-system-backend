import { useState, useEffect } from 'react';
import { ShoppingBag, Clock, CheckCircle, Truck, PackageCheck, RefreshCw, ArrowLeft } from 'lucide-react';
import API from '../services/api';

export default function AdminDashboard({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get('/orders/admin/all');
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await API.patch(`/orders/admin/${orderId}/status`, { status: newStatus });
      if (res.data.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
      }
    } catch (err) {
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case 'Baking':
        return <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Baking</span>;
      case 'Out for Delivery':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> On The Way</span>;
      case 'Delivered':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Delivered</span>;
      default:
        return <span className="bg-stone-500/20 text-stone-300 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs font-bold mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </button>
          <h1 className="text-3xl font-black text-amber-100 font-serif">Admin Order Management 👨‍🍳</h1>
          <p className="text-xs text-amber-200/60 mt-1">Track bakery orders and update delivery dispatch states</p>
        </div>

        <button
          onClick={fetchOrders}
          className="bg-[#2A1711] hover:bg-amber-900/40 text-amber-300 border border-amber-800/50 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Orders
        </button>
      </div>

      {/* Orders Table Container */}
      <div className="bg-[#22120C]/80 backdrop-blur-xl border border-amber-900/40 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-amber-200/60 text-sm">
            Loading active bakery orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-amber-200/60 text-sm">
            No orders found in the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-amber-100">
              <thead className="bg-[#120805] text-amber-400 font-serif border-b border-amber-900/40 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Order Details</th>
                  <th className="p-4">Delivery Info</th>
                  <th className="p-4">Items & Customization</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/30">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-amber-950/20 transition">
                    {/* Order ID & Date */}
                    <td className="p-4 font-mono">
                      <span className="font-bold text-amber-300">#{order.id.slice(0, 8)}</span>
                      <p className="text-[10px] text-amber-200/50 mt-1">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Delivery Details */}
                    <td className="p-4 max-w-xs">
                      <p className="font-semibold text-amber-100 line-clamp-2">{order.delivery_address}</p>
                      <p className="text-[10px] text-amber-300/80 mt-1">
                        📅 {order.delivery_date} | ⏰ {order.delivery_slot}
                      </p>
                    </td>

                    {/* Items */}
                    <td className="p-4 max-w-xs">
                      <div className="space-y-1">
                        {order.order_items?.map((item, idx) => (
                          <div key={idx} className="text-[11px] bg-[#120805]/50 p-2 rounded-lg border border-amber-900/30">
                            <span className="font-bold text-amber-200">{item.cakes?.name || 'Custom Cake'}</span> ({item.quantity}x)
                            {item.customization_text && (
                              <p className="text-[10px] text-amber-400/90 italic mt-0.5">✍️ "{item.customization_text}"</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-bold text-amber-300 text-sm">
                      ₹{order.total_amount}
                      <span className="block text-[10px] font-normal text-amber-200/50 uppercase">{order.payment_method}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      {getStatusBadge(order.order_status)}
                    </td>

                    {/* Actions Dropdown */}
                    <td className="p-4 text-right">
                      <select
                        disabled={updatingId === order.id}
                        value={order.order_status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-[#120805] text-amber-200 border border-amber-800/60 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-hidden focus:border-amber-400 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Baking">Baking</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}