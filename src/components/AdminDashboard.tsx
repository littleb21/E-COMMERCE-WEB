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
  RefreshCw,
  Plane,
  Zap,
  Truck,
  Plus,
  Eye,
  ArrowLeft,
  X,
  Radio,
  Sliders,
  Check,
  Building,
  Navigation,
  Clock,
  Sparkles
} from 'lucide-react';
import { OrderStatus, Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    productsList, 
    nearbyShopsList, 
    updateOrderStatus, 
    updateProductInList,
    addNewProduct,
    openOrderTracking,
    setPortalMode,
    setActiveTab,
    addToast 
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'products' | 'logistics' | 'shops' | 'customers'>('orders');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState<'all' | 'hyperlocal' | 'interstate'>('all');

  // Product tab states
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProdData, setNewProdData] = useState({
    title: '',
    brand: '',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 9999,
    originalPrice: 12999,
    discountPercent: 23,
    stockCount: 25,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  });

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    // Search query
    const matchesSearch = 
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.address.name.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.address.city.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.status.toLowerCase().includes(orderSearchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Status filter
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;

    // Route type filter
    const isInterstateOrder = o.isInterstate || o.address.state?.toLowerCase().includes('chhattisgarh') || o.address.city?.toLowerCase().includes('raipur');
    if (orderTypeFilter === 'interstate' && !isInterstateOrder) return false;
    if (orderTypeFilter === 'hyperlocal' && isInterstateOrder) return false;

    return true;
  });

  // Filtered products
  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(productSearchQuery.toLowerCase()) || p.brand.toLowerCase().includes(productSearchQuery.toLowerCase());
    const matchesCategory = productCategoryFilter === 'all' || p.categoryId === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleStockAdjust = (product: Product, delta: number) => {
    const newStock = Math.max(0, product.stockCount + delta);
    updateProductInList({
      ...product,
      stockCount: newStock,
      inStock: newStock > 0
    });
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdData.title.trim()) return;

    const createdProduct: Product = {
      id: 'prod-' + Date.now(),
      title: newProdData.title,
      brand: newProdData.brand || 'Flowstate Labs',
      categoryId: newProdData.categoryId,
      subcategory: newProdData.subcategory,
      price: Number(newProdData.price),
      originalPrice: Number(newProdData.originalPrice),
      discountPercent: Number(newProdData.discountPercent),
      rating: 4.8,
      reviewCount: 1,
      images: [newProdData.imageUrl],
      description: newProdData.description || 'Premium certified item.',
      features: ['Genuine manufacturer warranty', 'Fast verified shipping', 'Tamper-evident seal'],
      specs: { 'Brand': newProdData.brand, 'Category': newProdData.categoryId },
      whatsIncluded: ['Product unit', 'Official documentation'],
      warranty: '1 Year Comprehensive Warranty',
      returnPolicy: '7 Days Replacement',
      inStock: newProdData.stockCount > 0,
      stockCount: Number(newProdData.stockCount),
      superCoinsReward: Math.round(newProdData.price * 0.01),
      deliveryEstimateMinutes: Number(newProdData.deliveryEstimateMinutes),
      isNearbyAvailable: newProdData.isNearbyAvailable,
      tags: [newProdData.brand, newProdData.categoryId],
      reviews: []
    };

    addNewProduct(createdProduct);
    setIsAddProductModalOpen(false);
  };

  return (
    <div style={{ padding: '2rem 0', background: 'var(--bg-app)', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Admin Header with Multi-Portal Navigation */}
        <div style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #0f172a 100%)',
          borderRadius: '1.75rem',
          padding: '2rem 2.5rem',
          border: '1.5px solid var(--border-highlight)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge badge-indigo" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 800 }}>
                <ShieldCheck size={14} style={{ marginRight: '0.35rem' }} /> MASTER CONTROL CONSOLE
              </span>
              <span className="badge badge-emerald" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 800 }}>
                <Radio size={12} className="radar-ping" style={{ marginRight: '0.35rem' }} />
                14 HYPERLOCAL HUBS ONLINE • AIR CARGO ACTIVE
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>FLOWSTATE System v3.2</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
              Platform Operations & Governance
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.35rem', maxWidth: '720px' }}>
              Oversee gross merchandise volume, hyperlocal rider dispatch SLA (10–12m / 15–30m), Delhi ➔ Chhattisgarh Air Cargo corridor, catalog inventory, and merchant network.
            </p>
          </div>

          {/* Quick Exit / Switcher Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setPortalMode('customer'); setActiveTab('home'); }}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '9999px', padding: '0.55rem 1.25rem' }}
            >
              <ArrowLeft size={15} />
              <span>Back to Customer Storefront</span>
            </button>
            <button
              onClick={() => { setPortalMode('seller'); setActiveTab('seller'); }}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '9999px', padding: '0.55rem 1.25rem' }}
            >
              <Store size={15} />
              <span>Merchant / Seller Hub</span>
            </button>
          </div>
        </div>

        {/* 6 Executive KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800 }}>TOTAL GMV (ANNUAL)</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-emerald)', margin: '0.2rem 0' }}>₹4.28 Cr</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>+32.4% MoM Growth</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800 }}>HYPERLOCAL SLA (Under 5 KM)</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-amber)', margin: '0.2rem 0' }}>11.2 min</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>⚡ 99.4% On-Time Delivery</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800 }}>AIR FREIGHT TRANSIT</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-primary)', margin: '0.2rem 0' }}>24 Hours</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 700 }}>✈️ Delhi ➔ Chhattisgarh</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800 }}>LIVE ORDERS QUEUE</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-rose)', margin: '0.2rem 0' }}>{orders.length} Active</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>Zero Dispatch Backlog</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800 }}>ACTIVE SHOPS & HUBS</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.2rem 0' }}>{nearbyShopsList.length} Hubs</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certified Partner Stores</div>
          </div>

          <div className="flow-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800 }}>SUPER COINS MINTED</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-amber)', margin: '0.2rem 0' }}>18.5M</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Circulation balance</div>
          </div>
        </div>

        {/* Admin Section Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {[
            { id: 'orders' as const, label: `Live Orders Queue (${orders.length})`, icon: Package },
            { id: 'products' as const, label: `Product Catalog (${productsList.length})`, icon: Sliders },
            { id: 'logistics' as const, label: 'Air Cargo & Fleet Logistics', icon: Plane },
            { id: 'shops' as const, label: `Partner Merchants (${nearbyShopsList.length})`, icon: Store },
            { id: 'customers' as const, label: 'Customers & SuperCoins', icon: Users }
          ].map(t => {
            const Icon = t.icon;
            const isSelected = activeAdminTab === t.id;

            return (
              <button
                key={t.id}
                onClick={() => setActiveAdminTab(t.id)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '0.85rem',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? '#ffffff' : 'var(--text-sub)',
                  background: isSelected ? 'var(--brand-primary)' : 'var(--bg-surface-elevated)',
                  border: `1.5px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS & LIVE FLEET DISPATCH */}
        {activeAdminTab === 'orders' && (
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            
            {/* Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '260px', background: 'var(--bg-input)', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search Order ID, Customer, City (Raipur, Bilaspur, Delhi)..."
                    value={orderSearchQuery}
                    onChange={e => setOrderSearchQuery(e.target.value)}
                    style={{ width: '100%', background: 'transparent', border: 'none', fontSize: '0.85rem', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <option value="all">All Order Statuses</option>
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped (In Transit)</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>

                {/* Type Filter */}
                <select
                  value={orderTypeFilter}
                  onChange={e => setOrderTypeFilter(e.target.value as any)}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <option value="all">All Route Tiers</option>
                  <option value="hyperlocal">⚡ Hyperlocal (10–12m & 15–30m)</option>
                  <option value="interstate">✈️ Interstate 24h Air Cargo (Delhi ➔ CG)</option>
                </select>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Showing <strong>{filteredOrders.length}</strong> orders
              </div>
            </div>

            {/* Orders Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>ORDER ID</th>
                    <th style={{ padding: '0.75rem' }}>CUSTOMER & DESTINATION</th>
                    <th style={{ padding: '0.75rem' }}>ROUTE & LOGISTICS</th>
                    <th style={{ padding: '0.75rem' }}>ITEMS</th>
                    <th style={{ padding: '0.75rem' }}>TOTAL</th>
                    <th style={{ padding: '0.75rem' }}>STATUS CONTROL</th>
                    <th style={{ padding: '0.75rem' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => {
                    const isInterstateOrder = order.isInterstate || order.address.state?.toLowerCase().includes('chhattisgarh') || order.address.city?.toLowerCase().includes('raipur');

                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ fontWeight: 800, color: 'var(--brand-primary)', display: 'block' }}>
                            #{order.id}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {order.date}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ fontWeight: 700 }}>{order.address.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {order.address.city}, {order.address.state} ({order.address.pincode})
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          {isInterstateOrder ? (
                            <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                              <Plane size={11} style={{ marginRight: '0.25rem' }} />
                              Delhi ➔ CG (24h Air)
                            </span>
                          ) : (
                            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                              <Zap size={11} style={{ marginRight: '0.25rem' }} />
                              10–12m Scooter
                            </span>
                          )}
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            {order.deliveryEta}
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ fontWeight: 600 }}>
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                            {order.items[0]?.product.title}
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem', fontWeight: 800 }}>
                          ₹{order.total.toLocaleString('en-IN')}
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
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.8rem',
                              fontWeight: 700,
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
                            onClick={() => openOrderTracking(order)}
                            className="btn btn-secondary btn-sm"
                            style={{ borderRadius: '6px', padding: '0.3rem 0.65rem' }}
                            title="Inspect live delivery radar simulation"
                          >
                            <Eye size={13} />
                            <span>Track</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG & STOCK INVENTORY */}
        {activeAdminTab === 'products' && (
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '260px', background: 'var(--bg-input)', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search product title, brand..."
                    value={productSearchQuery}
                    onChange={e => setProductSearchQuery(e.target.value)}
                    style={{ width: '100%', background: 'transparent', border: 'none', fontSize: '0.85rem', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={e => setProductCategoryFilter(e.target.value)}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="food">Food & Grocery</option>
                  <option value="beauty">Beauty & Care</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="appliances">Appliances</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="btn btn-primary"
                style={{ borderRadius: '0.75rem', padding: '0.55rem 1.25rem' }}
              >
                <Plus size={16} />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Catalog Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>PRODUCT</th>
                    <th style={{ padding: '0.75rem' }}>CATEGORY</th>
                    <th style={{ padding: '0.75rem' }}>PRICE</th>
                    <th style={{ padding: '0.75rem' }}>STOCK CONTROL</th>
                    <th style={{ padding: '0.75rem' }}>NEARBY DELIVERY</th>
                    <th style={{ padding: '0.75rem' }}>SUPER COINS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(prod => (
                    <tr key={prod.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={prod.images[0]} alt={prod.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', background: '#111827' }} />
                        <div>
                          <div style={{ fontWeight: 700, maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {prod.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>{prod.brand}</div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem', textTransform: 'capitalize' }}>
                        <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{prod.categoryId}</span>
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 800 }}>
                        ₹{prod.price.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleStockAdjust(prod, -10)}
                            style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-main)', fontSize: '0.75rem' }}
                          >
                            -10
                          </button>
                          <span style={{ 
                            fontWeight: 800, 
                            minWidth: '55px', 
                            textAlign: 'center',
                            color: prod.stockCount < 10 ? 'var(--brand-rose)' : 'var(--brand-emerald)'
                          }}>
                            {prod.stockCount} left
                          </span>
                          <button
                            onClick={() => handleStockAdjust(prod, 10)}
                            style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-main)', fontSize: '0.75rem' }}
                          >
                            +10
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {prod.isNearbyAvailable ? (
                          <span className="badge badge-emerald">⚡ {prod.deliveryEstimateMinutes}m Instant</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Standard Hub</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--brand-amber)' }}>
                        +{prod.superCoinsReward}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: AIR CARGO & FLEET LOGISTICS */}
        {activeAdminTab === 'logistics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Interstate Air Cargo Fleet Monitor */}
            <div className="flow-card" style={{ padding: '1.75rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1.5px solid rgba(99, 102, 241, 0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plane size={22} color="var(--brand-primary)" />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      Interstate Air Cargo Corridor: Delhi ➔ Chhattisgarh (24h Express)
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>
                      Dedicated Boeing 737 P2F Freighter Scheduled Corridor • Zero Next-Day Delay SLA
                    </div>
                  </div>
                </div>

                <span className="badge badge-indigo">
                  <Radio size={12} className="radar-ping" style={{ marginRight: '0.3rem' }} />
                  FLIGHT RADAR ACTIVE: FS-CARGO 902
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE AIRCRAFT</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>Boeing 737 P2F</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)' }}>Tail No: VT-FS-AIR1</div>
                </div>

                <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ORIGIN AIRPORT</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>New Delhi (DEL)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IGI Cargo Terminal 2</div>
                </div>

                <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>DESTINATION AIRPORT</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-emerald)', marginTop: '0.2rem' }}>Raipur, CG (RPR)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Swami Vivekananda Airport</div>
                </div>

                <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>IN-FLIGHT TELEMETRY</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-amber)', marginTop: '0.2rem' }}>740 km/h</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Altitude: 29,000 ft</div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
                ⚡ <strong>Air Cargo Guarantee:</strong> Every parcel shipped from Delhi fulfillment centers to Chhattisgarh destinations (Raipur, Bilaspur, Bhilai, Durg) is pre-cleared for express belly-hold priority air freight, arriving within 24 hours guaranteed.
              </div>
            </div>

            {/* Hyperlocal Micro-Fulfillment Hubs */}
            <div className="flow-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                Hyperlocal Dark Stores & Instant Courier Fleet
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  { name: 'Indiranagar Hub, Bengaluru', speed: '10–12 min', radius: '4.5 km', riders: 28, battery: '96% EV', status: 'Online' },
                  { name: 'Koramangala Hub, Bengaluru', speed: '10–12 min', radius: '4.8 km', riders: 22, battery: '92% EV', status: 'Online' },
                  { name: 'Whitefield Tech Corridor Hub', speed: '15–30 min', radius: '8.5 km', riders: 18, battery: '89% EV', status: 'Online' },
                  { name: 'Electronic City Express Hub', speed: '15–30 min', radius: '9.5 km', riders: 16, battery: '94% EV', status: 'Online' },
                  { name: 'Connaught Place Central Hub, New Delhi', speed: '10–15 min', radius: '5.0 km', riders: 32, battery: '98% EV', status: 'Online' },
                  { name: 'Raipur Telibandha Hub, Chhattisgarh', speed: '24h Air Dispatched', radius: '15.0 km', riders: 14, battery: '90% EV', status: 'Online' }
                ].map(hub => (
                  <div key={hub.name} style={{ background: 'var(--bg-surface-elevated)', borderRadius: '1rem', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{hub.name}</span>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>{hub.status}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>
                      ⚡ SLA: {hub.speed} • Radius: {hub.radius}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                      Active Couriers: {hub.riders} riders • Fleet: {hub.battery}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: PARTNER MERCHANTS NETWORK */}
        {activeAdminTab === 'shops' && (
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Certified Partner Merchant Network ({nearbyShopsList.length})
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Local stores integrated with Flowstate 10-15 min instant delivery.
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {nearbyShopsList.map(shop => (
                <div key={shop.id} style={{ background: 'var(--bg-surface-elevated)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <img src={shop.logo} alt={shop.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem' }}>{shop.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>
                        ⚡ {shop.etaMinutes}m ETA • Radius {shop.deliveryRadiusKm}km
                      </div>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      {shop.isOpen ? 'OPEN' : 'CLOSED'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                    📍 {shop.address}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>⭐ {shop.rating} ({shop.reviewCount} reviews)</span>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>{shop.inStockProductsCount} items in stock</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS & GOVERNANCE */}
        {activeAdminTab === 'customers' && (
          <div className="flow-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Customer & Rewards Governance
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>CUSTOMER</th>
                    <th style={{ padding: '0.75rem' }}>CONTACT</th>
                    <th style={{ padding: '0.75rem' }}>SUPER COINS BALANCE</th>
                    <th style={{ padding: '0.75rem' }}>STREAK DAYS</th>
                    <th style={{ padding: '0.75rem' }}>KYC & SECURITY</th>
                    <th style={{ padding: '0.75rem' }}>ACCOUNT TIER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="Amreshwar Maravi" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 800 }}>Amreshwar Maravi</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: usr-flowstate-1</div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div>amreshwar.maravi@flowstate.in</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+91 98765 43210</div>
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--brand-amber)' }}>
                      🪙 1,450 Coins
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-amber">🔥 4 Days Active</span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-emerald">Verified AADHAAR</span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-indigo">VIP PLATINUM</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* CREATE NEW PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddProductModalOpen(false)}>
          <div 
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '580px', width: '100%', padding: '1.75rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={20} color="var(--brand-primary)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Add Product to Catalog
                </h3>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                style={{ background: 'var(--bg-surface-elevated)', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-sub)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', display: 'block', marginBottom: '0.25rem' }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony Wireless Earbuds WF-1000XM5"
                  value={newProdData.title}
                  onChange={e => setNewProdData({ ...newProdData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', display: 'block', marginBottom: '0.25rem' }}>
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony"
                    value={newProdData.brand}
                    onChange={e => setNewProdData({ ...newProdData, brand: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', display: 'block', marginBottom: '0.25rem' }}>
                    Category *
                  </label>
                  <select
                    value={newProdData.categoryId}
                    onChange={e => setNewProdData({ ...newProdData, categoryId: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                  >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="food">Food & Grocery</option>
                    <option value="beauty">Beauty & Care</option>
                    <option value="appliances">Appliances</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', display: 'block', marginBottom: '0.25rem' }}>
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdData.price}
                    onChange={e => setNewProdData({ ...newProdData, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', display: 'block', marginBottom: '0.25rem' }}>
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newProdData.originalPrice}
                    onChange={e => setNewProdData({ ...newProdData, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', display: 'block', marginBottom: '0.25rem' }}>
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={newProdData.stockCount}
                    onChange={e => setNewProdData({ ...newProdData, stockCount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', display: 'block', marginBottom: '0.25rem' }}>
                  Image URL
                </label>
                <input
                  type="text"
                  value={newProdData.imageUrl}
                  onChange={e => setNewProdData({ ...newProdData, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '0.85rem', padding: '0.75rem', marginTop: '0.5rem' }}
              >
                Publish to Live Storefront
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
