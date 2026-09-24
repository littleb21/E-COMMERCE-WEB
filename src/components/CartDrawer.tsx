import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Coins, 
  ArrowRight, 
  ShoppingBag, 
  Zap, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartCouponDiscount,
    cartDeliveryFee,
    cartTax,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    user,
    coinsToRedeem,
    setCoinsToRedeem,
    setIsCheckoutModalOpen,
    openProductDetail
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const maxCoinsUsable = Math.min(user.superCoins, Math.floor(cartSubtotal * 0.2)); // up to 20% order value

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div 
        className="drawer-panel"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="var(--brand-primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Your Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              color: 'var(--text-sub)',
              background: 'var(--bg-surface-elevated)',
              cursor: 'pointer'
            }}
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Progress Bar */}
        <div style={{
          padding: '0.75rem 1.25rem',
          background: 'rgba(16, 185, 129, 0.08)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
          fontSize: '0.8rem'
        }}>
          {cartSubtotal >= 499 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>
              <Zap size={14} /> You unlocked FREE Express Nearby Delivery!
            </div>
          ) : (
            <div style={{ color: 'var(--text-sub)' }}>
              Add <strong>₹{(499 - cartSubtotal).toLocaleString('en-IN')}</strong> more for <strong>FREE Express Delivery</strong>!
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Explore nearby fresh groceries, electronics, and best-sellers.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary"
                style={{ borderRadius: '9999px' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '0.75rem',
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      openProductDetail(item.product);
                      setIsCartOpen(false);
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: 'var(--text-main)',
                      lineHeight: 1.3,
                      marginBottom: '0.25rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.product.title}
                    </div>

                    {/* Variant info */}
                    {(item.selectedColor || item.selectedSize || item.selectedStorage) && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        {[item.selectedColor, item.selectedSize, item.selectedStorage].filter(Boolean).join(' • ')}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </div>

                      {/* Quantity Controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--bg-surface)',
                        borderRadius: '9999px',
                        border: '1px solid var(--border-subtle)',
                        padding: '0.15rem'
                      }}>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          style={{ width: '26px', height: '26px', borderRadius: '50%', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ padding: '0 0.5rem', fontSize: '0.825rem', fontWeight: 700 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          style={{ width: '26px', height: '26px', borderRadius: '50%', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                </div>
              ))}

              {/* Promo Coupon Box */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '1rem',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Tag size={15} color="var(--brand-primary)" />
                  <span>Apply Coupon Code</span>
                </div>

                {appliedCoupon ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px dashed var(--brand-emerald)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--brand-emerald)' }}>
                        ✓ {appliedCoupon.code} Applied
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                        {appliedCoupon.description} (-₹{cartCouponDiscount.toLocaleString('en-IN')})
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rose)', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. WELCOME100, SUPERFLOW"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      style={{
                        flex: 1,
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>
                      Apply
                    </button>
                  </form>
                )}

                {/* Quick clickable coupons */}
                {!appliedCoupon && (
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {['WELCOME100', 'SUPERFLOW', 'FREEDELIVERY'].map(code => (
                      <span
                        key={code}
                        onClick={() => applyCoupon(code)}
                        style={{
                          fontSize: '0.7rem',
                          background: 'var(--bg-surface-elevated)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: 'var(--brand-primary)',
                          fontWeight: 700
                        }}
                      >
                        +{code}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Super Coins Redemption Slider */}
              {user.superCoins > 0 && (
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '1rem',
                  padding: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--brand-amber)' }}>
                      <Coins size={16} />
                      <span>Use Super Coins</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      -₹{coinsToRedeem}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginBottom: '0.5rem' }}>
                    Available: {user.superCoins} coins. Max usable on this order: {maxCoinsUsable} coins (1 Coin = ₹1).
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={maxCoinsUsable}
                    step={10}
                    value={coinsToRedeem}
                    onChange={e => setCoinsToRedeem(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand-amber)' }}
                  />
                </div>
              )}

            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)'
          }}>
            {/* Bill Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-sub)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-emerald)', fontWeight: 600 }}>
                  <span>Product Savings</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {cartCouponDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-emerald)', fontWeight: 600 }}>
                  <span>Coupon Discount</span>
                  <span>-₹{cartCouponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {coinsToRedeem > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-amber)', fontWeight: 600 }}>
                  <span>Coins Redeemed</span>
                  <span>-₹{coinsToRedeem.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-sub)' }}>
                <span>Delivery Fee</span>
                <span>{cartDeliveryFee === 0 ? <strong style={{ color: 'var(--brand-emerald)' }}>FREE</strong> : `₹${cartDeliveryFee}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-sub)' }}>
                <span>Taxes & GST (5%)</span>
                <span>₹{cartTax.toLocaleString('en-IN')}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                borderTop: '1px dashed var(--border-subtle)',
                paddingTop: '0.5rem',
                marginTop: '0.25rem'
              }}>
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedCheckout}
              className="btn btn-emerald btn-lg"
              style={{ width: '100%', borderRadius: '1rem', boxShadow: 'var(--shadow-emerald)' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
