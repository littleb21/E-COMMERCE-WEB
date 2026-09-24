import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, ShoppingCart, Trash2, Zap, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { 
    wishlist, 
    productsList, 
    toggleWishlist, 
    moveToCartFromWishlist, 
    openProductDetail,
    setActiveTab 
  } = useStore();

  const savedProducts = productsList.filter(p => wishlist.includes(p.id));

  return (
    <div style={{ padding: '2rem 0', background: 'var(--bg-app)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Heart size={20} color="var(--brand-rose)" fill="var(--brand-rose)" />
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
                My Wishlist ({savedProducts.length})
              </h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Items saved for later with automatic price-drop monitoring
            </p>
          </div>
        </div>

        {savedProducts.length === 0 ? (
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1.5rem',
            padding: '4rem 1.5rem',
            textAlign: 'center'
          }}>
            <Heart size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Your wishlist is empty
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Tap the heart icon on any product to save it here for fast ordering or price alerts.
            </p>
            <button
              onClick={() => setActiveTab('products')}
              className="btn btn-primary"
              style={{ borderRadius: '9999px' }}
            >
              <span>Explore Marketplace</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {savedProducts.map(product => (
              <div
                key={product.id}
                className="flow-card"
                style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', width: '100%', paddingTop: '100%', borderRadius: '1rem', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => openProductDetail(product)}
                  />
                  {product.isNearbyAvailable && (
                    <span className="badge badge-emerald" style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                      <Zap size={11} /> {product.deliveryEstimateMinutes}m delivery
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Remove from wishlist"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>
                  {product.brand}
                </div>

                <div style={{
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  lineHeight: 1.3,
                  margin: '0.25rem 0 0.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: 'auto', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => moveToCartFromWishlist(product.id)}
                  className="btn btn-emerald btn-sm"
                  style={{ width: '100%', borderRadius: '8px' }}
                >
                  <ShoppingCart size={15} />
                  <span>Move to Cart</span>
                </button>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
