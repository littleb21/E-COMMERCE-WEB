import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Flame, Clock, Tag, ChevronRight, Zap } from 'lucide-react';

export const HotDeals: React.FC = () => {
  const { productsList, setActiveTab, setFilterState } = useStore();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter hot deals / flash sale items
  const dealProducts = productsList.filter(p => p.discountPercent >= 20).slice(0, 4);

  return (
    <section style={{ padding: '2rem 0', background: 'var(--bg-app)' }}>
      <div className="container">
        
        {/* Header with Title and Countdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '1rem'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(244, 63, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-rose)'
            }}>
              <Flame size={24} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Flash Sale & Hot Deals
                </h2>
                <span className="badge badge-rose">LIVE</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Deepest discounts of the day. Refreshes every 6 hours.
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-highlight)',
              padding: '0.45rem 0.85rem',
              borderRadius: '1rem'
            }}>
              <Clock size={16} color="var(--brand-rose)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-sub)' }}>Ends In:</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem' }}>
                <span style={{ background: 'var(--bg-surface)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: 'var(--brand-rose)' }}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span>:</span>
                <span style={{ background: 'var(--bg-surface)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: 'var(--brand-rose)' }}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span>:</span>
                <span style={{ background: 'var(--bg-surface)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: 'var(--brand-rose)' }}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, minDiscount: 20, category: 'all' }));
                setActiveTab('products');
              }}
              className="btn btn-ghost btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--brand-primary)', fontWeight: 700 }}
            >
              <span>View All Deals</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

        {/* Bank & Coupon Ticker */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
          border: '1px solid var(--border-brand)',
          borderRadius: '1rem',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600 }}>
            <Tag size={16} color="var(--brand-primary)" />
            <span>Bank Offer: 10% Instant Discount on HDFC & ICICI Credit Cards (up to ₹1,500)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Use code:</span>
            <code style={{
              background: 'var(--bg-surface)',
              border: '1px dashed var(--brand-primary)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              fontWeight: 700,
              color: 'var(--brand-primary)'
            }}>
              FESTIVE25
            </code>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          {dealProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
