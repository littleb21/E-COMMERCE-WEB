import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User, 
  MapPin, 
  Package, 
  Coins, 
  ShieldCheck, 
  LogOut, 
  Phone, 
  Mail, 
  Edit3, 
  Plus, 
  Clock, 
  Navigation, 
  CheckCircle2,
  Trash2,
  FileText
} from 'lucide-react';
import { OrderStatus } from '../types';

export const AccountDashboard: React.FC = () => {
  const { 
    user, 
    updateUserProfile, 
    orders, 
    openOrderTracking, 
    addresses, 
    currentAddress, 
    setCurrentAddress, 
    addNewAddress,
    setActiveTab,
    setIsHelpModalOpen,
    setIsPrivacyModalOpen,
    addToast
  } = useStore();

  const [activeAccountSection, setActiveAccountSection] = useState<'orders' | 'addresses' | 'profile' | 'security'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Filter orders
  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'active') return ['placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery'].includes(o.status);
    if (orderFilter === 'delivered') return o.status === 'delivered';
    if (orderFilter === 'cancelled') return o.status === 'cancelled';
    return true;
  });

  return (
    <div style={{ padding: '2rem 0', background: 'var(--bg-app)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        {/* User Profile Banner Header */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: '1.5rem',
          border: '1px solid var(--border-subtle)',
          padding: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--brand-primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {user.name}
                </h1>
                <span className="badge badge-emerald">Verified Account</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
                {user.email} • {user.phone}
              </div>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '1rem',
              padding: '0.75rem 1.25rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--brand-amber)', fontWeight: 700 }}>SUPER COINS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--brand-amber)' }}>{user.superCoins} 🪙</div>
            </div>

            <div style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1rem',
              padding: '0.75rem 1.25rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL ORDERS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{orders.length}</div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Navigation + Active Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 240px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Navigation Sidebar */}
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: '1.25rem',
            border: '1px solid var(--border-subtle)',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            {[
              { id: 'orders' as const, label: 'My Orders', icon: <Package size={17} /> },
              { id: 'addresses' as const, label: 'Saved Addresses', icon: <MapPin size={17} /> },
              { id: 'profile' as const, label: 'Personal Information', icon: <User size={17} /> },
              { id: 'security' as const, label: 'Security & Devices', icon: <ShieldCheck size={17} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveAccountSection(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: activeAccountSection === tab.id ? 700 : 500,
                  color: activeAccountSection === tab.id ? 'var(--brand-primary)' : 'var(--text-sub)',
                  background: activeAccountSection === tab.id ? 'var(--bg-surface-elevated)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}

            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0.5rem 0' }} />

            <button
              onClick={() => setIsHelpModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                color: 'var(--text-sub)',
                cursor: 'pointer'
              }}
            >
              <FileText size={17} />
              <span>Help Center & FAQ</span>
            </button>

            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                color: 'var(--text-sub)',
                cursor: 'pointer'
              }}
            >
              <ShieldCheck size={17} />
              <span>Privacy Center</span>
            </button>
          </div>

          {/* Active Panel Content */}
          <div>
            {/* ORDERS SECTION */}
            {activeAccountSection === 'orders' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Order History
                  </h2>

                  {/* Filter Pills */}
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {[
                      { id: 'all', label: 'All Orders' },
                      { id: 'active', label: 'In Transit' },
                      { id: 'delivered', label: 'Delivered' }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setOrderFilter(f.id)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: orderFilter === f.id ? 700 : 500,
                          color: orderFilter === f.id ? 'var(--brand-primary)' : 'var(--text-sub)',
                          background: orderFilter === f.id ? 'var(--bg-surface)' : 'transparent',
                          border: `1px solid ${orderFilter === f.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer'
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredOrders.map(order => (
                    <div
                      key={order.id}
                      className="flow-card"
                      style={{ padding: '1.25rem' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                            Order #{order.id}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Placed on {order.date}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className={order.status === 'delivered' ? 'badge badge-emerald' : 'badge badge-indigo'}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <button
                            onClick={() => openOrderTracking(order)}
                            className="btn btn-secondary btn-sm"
                            style={{ borderRadius: '8px' }}
                          >
                            <Navigation size={13} /> Track
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                        {order.items.map(item => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <img src={item.product.images[0]} alt={item.product.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.product.title}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                              </div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Delivery to: {order.address.landmark || order.address.city}</span>
                        <span style={{ fontWeight: 800, fontSize: '1rem' }}>Total: ₹{order.total.toLocaleString('en-IN')}</span>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* SAVED ADDRESSES SECTION */}
            {activeAccountSection === 'addresses' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                  Manage Saved Addresses
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      className="flow-card"
                      style={{
                        padding: '1.25rem',
                        borderColor: currentAddress.id === addr.id ? 'var(--brand-emerald)' : 'var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{addr.name}</span>
                          <span className="badge badge-indigo">{addr.type}</span>
                          {currentAddress.id === addr.id && <span className="badge badge-emerald">Selected for Delivery</span>}
                        </div>

                        {currentAddress.id !== addr.id && (
                          <button
                            onClick={() => {
                              setCurrentAddress(addr);
                              addToast('Delivery Address Updated', `Delivering to ${addr.type} (${addr.city})`, 'success');
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ borderRadius: '6px' }}
                          >
                            Set as Active
                          </button>
                        )}
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.4 }}>
                        {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}{addr.landmark && `Near ${addr.landmark}, `}{addr.city} - {addr.pincode}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Phone: {addr.phone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PERSONAL INFO SECTION */}
            {activeAccountSection === 'profile' && (
              <div className="flow-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                  Personal Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      style={{ width: '100%', background: 'var(--bg-input)', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      style={{ width: '100%', background: 'var(--bg-input)', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      defaultValue={user.phone}
                      style={{ width: '100%', background: 'var(--bg-input)', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <button
                    onClick={() => addToast('Changes Saved', 'Your profile details have been updated.', 'success')}
                    className="btn btn-primary"
                    style={{ alignSelf: 'flex-start', borderRadius: '8px', marginTop: '0.5rem' }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* SECURITY SECTION */}
            {activeAccountSection === 'security' && (
              <div className="flow-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                  Security & Active Sessions
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Two-Factor Authentication (2FA)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enabled via Authenticator App</div>
                    </div>
                    <span className="badge badge-emerald">Active</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Active Session: Windows 11 Chrome (Bengaluru, IN)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Device • IP 122.171.18.92</div>
                    </div>
                    <span className="badge badge-emerald">Current</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
