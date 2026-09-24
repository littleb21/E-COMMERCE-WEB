import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, Heart, ShoppingCart, Zap, Coins, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetail, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setIsCartOpen,
    setIsCheckoutModalOpen 
  } = useStore();

  const isSavedInWishlist = wishlist.includes(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCheckoutModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="flow-card"
      onClick={() => openProductDetail(product)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Top Media Area */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', background: 'var(--bg-surface-elevated)' }}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          loading="lazy"
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
        />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          zIndex: 2
        }}>
          {product.isNearbyAvailable && (
            <span className="badge badge-emerald" style={{ backdropFilter: 'blur(8px)', background: 'rgba(16, 185, 129, 0.9)', color: '#ffffff' }}>
              <Zap size={11} /> {product.deliveryEstimateMinutes} min
            </span>
          )}

          {product.discountPercent > 0 && (
            <span className="badge badge-rose" style={{ backdropFilter: 'blur(8px)', background: 'rgba(244, 63, 94, 0.9)', color: '#ffffff' }}>
              {product.discountPercent}% OFF
            </span>
          )}

          {product.isBestSeller && (
            <span className="badge badge-amber" style={{ backdropFilter: 'blur(8px)', background: 'rgba(245, 158, 11, 0.9)', color: '#ffffff' }}>
              ★ Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-surface-glass)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            color: isSavedInWishlist ? 'var(--brand-rose)' : 'var(--text-sub)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.85)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1.0)'}
          aria-label={isSavedInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isSavedInWishlist ? 'var(--brand-rose)' : 'none'} />
        </button>

        {/* Super Coins reward pill */}
        <div style={{
          position: 'absolute',
          bottom: '0.5rem',
          left: '0.75rem',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          padding: '0.2rem 0.6rem',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#fef08a',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <Coins size={12} color="#f59e0b" />
          <span>+{product.superCoinsReward} Super Coins</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Brand & Rating row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.brand}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-amber)' }}>
            <Star size={13} fill="var(--brand-amber)" />
            <span>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--text-main)',
          lineHeight: 1.4,
          marginBottom: '0.5rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '2.8em'
        }}>
          {product.title}
        </h3>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: 'auto', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            onClick={handleAddToCart}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '0.75rem', width: '100%', padding: '0.55rem 0.5rem' }}
          >
            <ShoppingCart size={15} />
            <span>Add</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="btn btn-emerald btn-sm"
            style={{ borderRadius: '0.75rem', width: '100%', padding: '0.55rem 0.5rem' }}
          >
            <Zap size={14} />
            <span>Buy Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
