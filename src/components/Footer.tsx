import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/mockData';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  Coins, 
  Mail, 
  ArrowRight, 
  MapPin, 
  Globe,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    setSelectedCategoryId, 
    setFilterState, 
    setActiveTab, 
    setPortalMode,
    setIsHelpModalOpen,
    setIsPrivacyModalOpen,
    addToast 
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    addToast('Subscribed! ✉️', 'You have been enrolled in exclusive weekly deals and 2x Super Coins drops.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '3.5rem',
      paddingBottom: '5rem', // padding for mobile dock
      color: 'var(--text-sub)'
    }}>
      <div className="container">
        
        {/* Top Newsletter & Brand Pitch Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-emerald))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900
              }}>
                F
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.4rem',
                color: 'var(--text-main)',
                letterSpacing: '-0.02em'
              }}>
                FLOWSTATE
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '360px', marginBottom: '1rem' }}>
              The next-generation commerce ecosystem combining global marketplace convenience with 10-minute local store delivery.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-emerald">⚡ 10-15 Min Nearby Dispatch</span>
              <span className="badge badge-amber">🪙 1:1 Super Coins</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Get Instant Price Drop & Flash Deal Alerts
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Receive exclusive promo codes, festive launches, and weekly cashback drops directly to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.5rem', maxWidth: '420px' }}>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '9999px',
                  padding: '0.6rem 1.15rem',
                  fontSize: '0.85rem'
                }}
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: '9999px', padding: '0.6rem 1.25rem' }}>
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* 4 Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
          fontSize: '0.875rem'
        }}>
          {/* Col 1: Categories */}
          <div>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
              Departments
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories.slice(0, 6).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategoryId(c.id);
                    setFilterState(prev => ({ ...prev, category: c.id, subcategory: 'all' }));
                    setActiveTab('products');
                  }}
                  style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: More Categories */}
          <div>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
              Lifestyle & Home
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories.slice(6).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategoryId(c.id);
                    setFilterState(prev => ({ ...prev, category: c.id, subcategory: 'all' }));
                    setActiveTab('products');
                  }}
                  style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
              Customer Care
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button onClick={() => setIsHelpModalOpen(true)} style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Help Center & FAQs
              </button>
              <button onClick={() => setActiveTab('account')} style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Track Live Order
              </button>
              <button onClick={() => setActiveTab('rewards')} style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Super Coins Rewards Hub
              </button>
              <button onClick={() => setIsPrivacyModalOpen(true)} style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Privacy & Cookie Settings
              </button>
              <button onClick={() => setIsHelpModalOpen(true)} style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Returns & Replacement
              </button>
            </div>
          </div>

          {/* Col 4: Merchant & Platform Partners */}
          <div>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
              Business & Portals
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => { setPortalMode('seller'); setActiveTab('seller'); }}
                style={{ textAlign: 'left', color: 'var(--brand-emerald)', fontWeight: 600, cursor: 'pointer' }}
              >
                🏬 Shop Partner Portal
              </button>
              <button
                onClick={() => { setPortalMode('admin'); setActiveTab('admin'); }}
                style={{ textAlign: 'left', color: 'var(--brand-primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                🛡️ Platform Admin Console
              </button>
              <button onClick={() => setActiveTab('nearby')} style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Local Delivery Coverage Map
              </button>
              <button onClick={() => addToast('Seller Registration', 'New merchant applications open for Bengaluru & Mumbai.', 'info')} style={{ textAlign: 'left', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Join as Hyperlocal Merchant
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Copyright Row */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} FLOWSTATE Technologies, Inc. All rights reserved. Built for ultra-fast commerce.
          </div>

          {/* Payment methods badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>Secure 256-Bit SSL Payments:</span>
            {['UPI', 'VISA', 'Mastercard', 'RuPay', 'NetBanking', 'PayLater'].map(p => (
              <span key={p} style={{
                background: 'var(--bg-surface-elevated)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--text-sub)'
              }}>
                {p}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
