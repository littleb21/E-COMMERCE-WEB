import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Store, 
  Package, 
  Coins, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  DollarSign,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    productsList, 
    nearbyShopsList, 
    updateOrderStatus, 
    addToast 
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'products' | 'shops'>('orders');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
    o.address.name.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
    o.status.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem 0', background: 'var(--bg-app)', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Admin Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          borderRadius: '1.75rem',
          padding: '2rem 2.5rem',
          border: '1px solid var(--border-highlight)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-indigo">
                <ShieldCheck size={13} /> MASTER CONTROL CONSOLE
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>FLOWSTATE Platform v2.4</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#ffffff' }}>
              Platform Operations & Governance
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              Monitor gross merchandise volume, hyperlocal fulfillment velocity, merchant network, and customer transactions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => addToast('System Health Optimal', 'All microservices & hyperlocal nodes running at 99.98% uptime.', 'success')}
              className="btn btn-emerald btn-sm"
              style={{ borderRadius: '9999px' }}
            >
              System Health: 100% OK
            </button>
          </div>
        </div>

        {/* 6 Executive KPIs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL GMV</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-emerald)', margin: '0.2rem 0' }}>₹4.28 Cr</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)' }}>+32.4% MoM</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE SHOPS</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-primary)', margin: '0.2rem 0' }}>1,240</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across 14 Cities</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>AVG DELIVERY TIME</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-amber)', margin: '0.2rem 0' }}>11.8 min</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)' }}>⚡ Hyperlocal SLA: 98.4%</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>SUPER COINS MINTED</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-amber)', margin: '0.2rem 0' }}>18.5M</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Circulation balance</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE CUSTOMERS</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.2rem 0' }}>42,800</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)' }}>+1,200 today</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ORDERS TODAY</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-rose)', margin: '0.2rem 0' }}>3,490</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)' }}>Zero backlog</div>
          </div>
        </div>

        {/* Section Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            { id: 'orders' as const, label: `Live Orders Queue (${orders.length})` },
            { id: 'products' as const, label: `Product Catalog (${productsList.length})` },
            { id: 'shops' as const, label: `Partner Merchants (${nearbyShopsList.length})` }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveAdminTab(t.id)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: activeAdminTab === t.id ? 700 : 500,
                color: activeAdminTab === t.id ? '#ffffff' : 'var(--text-sub)',
                background: activeAdminTab === t.id ? 'var(--brand-primary)' : 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ORDERS MANAGEMENT TABLE */}
        {activeAdminTab === 'orders' && (
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '340px', background: 'var(--bg-input)', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Search order ID, customer name..."
                  value={orderSearchQuery}
                  onChange={e => setOrderSearchQuery(e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Tip: Admins can directly advance fulfillment status below.
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>ORDER ID</th>
                    <th style={{ padding: '0.75rem' }}>CUSTOMER & ADDRESS</th>
                    <th style={{ padding: '0.75rem' }}>ITEMS</th>
                    <th style={{ padding: '0.75rem' }}>TOTAL</th>
                    <th style={{ padding: '0.75rem' }}>DELIVERY TYPE</th>
                    <th style={{ padding: '0.75rem' }}>STATUS</th>
                    <th style={{ padding: '0.75rem' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                        #{order.id}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 600 }}>{order.address.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.address.city}</div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {order.items.length} items ({order.items[0]?.product.title.slice(0, 18)}...)
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 800 }}>
                        ₹{order.total.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge badge-emerald">⚡ {order.deliveryOption}</span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          style={{
                            background: 'var(--bg-surface-elevated)',
                            color: 'var(--text-main)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '0.3rem 0.6rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <option value="placed">Placed</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="btn btn-secondary btn-sm"
                          style={{ borderRadius: '6px' }}
                        >
                          Mark Done
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS MANAGEMENT TABLE */}
        {activeAdminTab === 'products' && (
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Catalog Registry
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>PRODUCT</th>
                    <th style={{ padding: '0.75rem' }}>CATEGORY</th>
                    <th style={{ padding: '0.75rem' }}>PRICE</th>
                    <th style={{ padding: '0.75rem' }}>STOCK</th>
                    <th style={{ padding: '0.75rem' }}>NEARBY ELIGIBLE</th>
                    <th style={{ padding: '0.75rem' }}>SUPER COINS</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map(prod => (
                    <tr key={prod.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={prod.images[0]} alt={prod.title} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{prod.title.slice(0, 32)}...</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)' }}>{prod.brand}</div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem', textTransform: 'capitalize' }}>{prod.categoryId}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>₹{prod.price.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ color: prod.stockCount < 10 ? 'var(--brand-rose)' : 'var(--brand-emerald)', fontWeight: 700 }}>
                          {prod.stockCount} units
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {prod.isNearbyAvailable ? (
                          <span className="badge badge-emerald">⚡ {prod.deliveryEstimateMinutes}m</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>Standard</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--brand-amber)' }}>
                        +{prod.superCoinsReward}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SHOPS MANAGEMENT TABLE */}
        {activeAdminTab === 'shops' && (
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Registered Local Shops
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {nearbyShopsList.map(shop => (
                <div key={shop.id} style={{ background: 'var(--bg-surface-elevated)', borderRadius: '1rem', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <img src={shop.logo} alt={shop.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{shop.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)' }}>⚡ {shop.etaMinutes}m Delivery Radius: {shop.deliveryRadiusKm}km</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{shop.address}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    Rating: {shop.rating}★ • In-Stock Catalog: {shop.inStockProductsCount} products
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
