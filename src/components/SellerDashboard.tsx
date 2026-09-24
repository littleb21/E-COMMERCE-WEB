import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Store, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Sliders, 
  Edit3, 
  MapPin, 
  ShieldCheck,
  Power,
  RotateCcw
} from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const { 
    nearbyShopsList, 
    productsList, 
    orders, 
    updateOrderStatus, 
    updateProductInList, 
    addToast,
    setPortalMode,
    setActiveTab 
  } = useStore();

  const currentShop = nearbyShopsList[0]; // FreshMart or TechZone
  const [isOpen, setIsOpen] = useState(true);
  const [deliveryRadius, setDeliveryRadius] = useState(currentShop.deliveryRadiusKm);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  const shopProducts = productsList.filter(p => p.nearbyShopId === currentShop.id || p.isNearbyAvailable).slice(0, 6);

  const handleToggleStoreStatus = () => {
    setIsOpen(!isOpen);
    addToast(
      isOpen ? 'Store Marked Closed' : 'Store Opened For Hyperlocal Orders',
      isOpen ? 'Incoming orders will be scheduled for tomorrow.' : 'Live instant orders active in your 10-min radius.',
      isOpen ? 'warning' : 'success'
    );
  };

  const handleSavePrice = (prodId: string) => {
    const prod = productsList.find(p => p.id === prodId);
    if (prod && tempPrice > 0) {
      updateProductInList({ ...prod, price: tempPrice });
      setEditingPriceId(null);
    }
  };

  return (
    <div style={{ padding: '2rem 0', background: 'var(--bg-app)', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Top Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
          borderRadius: '1.75rem',
          padding: '2rem 2.5rem',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img
              src={currentShop.logo}
              alt={currentShop.name}
              style={{ width: '80px', height: '80px', borderRadius: '1.25rem', objectFit: 'cover', border: '3px solid #10b981' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#ffffff' }}>
                  {currentShop.name}
                </h1>
                <span className="badge badge-emerald">Verified Merchant Partner</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#a7f3d0', marginTop: '0.25rem' }}>
                {currentShop.address} • Category: {currentShop.category}
              </div>
            </div>
          </div>

          {/* Store Status Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>Store Operational Status</div>
              <div style={{ fontWeight: 800, color: isOpen ? '#34d399' : '#f87171', fontSize: '1rem' }}>
                {isOpen ? '● ACCEPTING INSTANT ORDERS' : '○ CURRENTLY CLOSED'}
              </div>
            </div>

            <button
              onClick={handleToggleStoreStatus}
              className={isOpen ? 'btn btn-emerald' : 'btn btn-secondary'}
              style={{ borderRadius: '9999px', padding: '0.65rem 1.25rem' }}
            >
              <Power size={16} />
              <span>{isOpen ? 'Turn Off Orders' : 'Open Store Now'}</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-emerald)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>TODAY'S REVENUE</span>
              <DollarSign size={20} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>₹48,920</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', marginTop: '0.25rem' }}>+24% vs yesterday</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>ACTIVE NEARBY ORDERS</span>
              <Package size={20} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>18</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>3 awaiting courier pickup</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-amber)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>AVG. PACK TIME</span>
              <Clock size={20} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>3.4 min</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', marginTop: '0.25rem' }}>Top 5% speed in Indiranagar</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-rose)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>DELIVERY RADIUS</span>
              <MapPin size={20} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>{deliveryRadius} km</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Coverage area: ~45,000 households</div>
          </div>
        </div>

        {/* 2-Column: Live Incoming Orders + Inventory Manager */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left: Incoming Hyperlocal Orders Queue */}
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={18} color="var(--brand-emerald)" />
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Live Incoming Orders
                </h2>
              </div>
              <span className="badge badge-emerald">Auto-Rider Dispatch</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.slice(0, 3).map(order => (
                <div
                  key={order.id}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Order #{order.id}</span>
                    <span className="badge badge-emerald">⚡ {order.deliveryOption}</span>
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-sub)', marginBottom: '0.75rem' }}>
                    Destination: {order.address.landmark || order.address.city} • Customer: {order.address.name}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                    {order.items.map(it => (
                      <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{it.quantity}x {it.product.title.slice(0, 28)}...</span>
                        <span style={{ fontWeight: 700 }}>₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Total: ₹{order.total.toLocaleString('en-IN')}</span>
                    
                    <button
                      onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                      className="btn btn-emerald btn-sm"
                      style={{ borderRadius: '6px' }}
                    >
                      <CheckCircle2 size={14} />
                      <span>Accept & Hand to Rider</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Inventory & Pricing Editor */}
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={18} color="var(--brand-primary)" />
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Store Inventory & Live Prices
                </h2>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click to edit price</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {shopProducts.map(prod => (
                <div
                  key={prod.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={prod.images[0]} alt={prod.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)' }}>{prod.title.slice(0, 26)}...</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)' }}>Stock: {prod.stockCount} units available</div>
                    </div>
                  </div>

                  {editingPriceId === prod.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <input
                        type="number"
                        defaultValue={prod.price}
                        onChange={e => setTempPrice(Number(e.target.value))}
                        style={{ width: '80px', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'var(--bg-input)', border: '1px solid var(--brand-primary)' }}
                      />
                      <button
                        onClick={() => handleSavePrice(prod.id)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingPriceId(prod.id);
                        setTempPrice(prod.price);
                      }}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        color: 'var(--brand-primary)',
                        cursor: 'pointer'
                      }}
                      title="Click to edit price"
                    >
                      ₹{prod.price.toLocaleString('en-IN')} ✏️
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Delivery Radius Setting */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Adjust Delivery Radius</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-emerald)' }}>{deliveryRadius} km</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={deliveryRadius}
                onChange={e => {
                  setDeliveryRadius(Number(e.target.value));
                  addToast('Delivery Radius Updated', `Store now accepting orders within ${e.target.value} km`, 'info');
                }}
                style={{ width: '100%', accentColor: 'var(--brand-emerald)' }}
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
