import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingCart, 
  Zap, 
  Coins, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  MapPin, 
  Store, 
  Check, 
  CreditCard,
  ThumbsUp,
  Tag,
  Maximize2,
  Percent,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  PackageCheck,
  Plane
} from 'lucide-react';
import { calculateDeliveryMetrics } from '../utils/deliveryCalculator';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    closeProductDetail, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setIsCheckoutModalOpen,
    currentAddress,
    nearbyShopsList
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'specs' | 'overview' | 'reviews'>('specs');
  
  // Interactive Image Zoomer State
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Pincode checker state
  const [pincodeInput, setPincodeInput] = useState(currentAddress.pincode || '560038');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Bank offer expand
  const [showAllBankOffers, setShowAllBankOffers] = useState(false);

  React.useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setQuantity(1);
      setSelectedColor(selectedProduct.variants?.colors?.[0]?.label);
      setSelectedSize(selectedProduct.variants?.sizes?.[0]?.label);
      setSelectedStorage(selectedProduct.variants?.storage?.[0]?.label);
      setActiveTab('specs');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isSavedInWishlist = wishlist.includes(selectedProduct.id);
  const nearbyShop = nearbyShopsList.find(s => s.id === selectedProduct.nearbyShopId);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomCoords({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize, selectedStorage);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize, selectedStorage);
    closeProductDetail();
    setIsCheckoutModalOpen(true);
  };

  // Structured multi-category specifications for Amazon/Flipkart style display
  const categorizedSpecs = selectedProduct.specSections || [
    {
      category: 'General Information',
      details: [
        { name: 'Model Name', value: selectedProduct.title },
        { name: 'Brand', value: selectedProduct.brand },
        { name: 'Category', value: `${selectedProduct.subcategory} / ${selectedProduct.categoryId}` },
        { name: 'Color', value: selectedColor || 'Standard Edition' },
        { name: 'Stock Status', value: selectedProduct.inStock ? `In Stock (${selectedProduct.stockCount} units available)` : 'Out of Stock' }
      ]
    },
    {
      category: 'Key Hardware & Specifications',
      details: Object.entries(selectedProduct.specs).map(([name, value]) => ({ name, value }))
    },
    {
      category: 'Package & In The Box',
      details: [
        { name: 'Package Contents', value: selectedProduct.whatsIncluded.join(', ') || 'Standard retail package' },
        { name: 'Condition', value: '100% Brand New Original Factory Sealed' }
      ]
    },
    {
      category: 'Warranty & Domestic Support',
      details: [
        { name: 'Warranty Summary', value: selectedProduct.warranty },
        { name: 'Return / Replacement', value: selectedProduct.returnPolicy },
        { name: 'Service Type', value: 'Doorstep Courier Replacement / Authorized Brand Service Center' }
      ]
    }
  ];

  // Bank offers list
  const defaultBankOffers = selectedProduct.bankOffers || [
    'Bank Offer: Flat ₹3,000 Instant Discount on HDFC & ICICI Bank Credit Cards',
    'Special Price: Extra ₹2,000 off on Exchange of eligible old devices',
    'No Cost EMI: Available on major credit cards starting from ₹' + (selectedProduct.emiStartsAt || Math.round(selectedProduct.price / 12)).toLocaleString('en-IN') + '/month',
    'Partner Offer: Get Flat ₹150 Cashback on payment via Flowstate UPI'
  ];

  const currentImg = selectedProduct.images[activeImageIndex] || selectedProduct.images[0];

  return (
    <div className="modal-overlay" onClick={closeProductDetail}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '1120px',
          width: '100%',
          padding: '0',
          position: 'relative',
          borderRadius: '1.25rem',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Top Header Strip with Breadcrumb & Close Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 600 }}>Home</span>
            <span>/</span>
            <span style={{ fontWeight: 600 }}>{selectedProduct.categoryId}</span>
            <span>/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{selectedProduct.subcategory}</span>
            <span>/</span>
            <span style={{ color: 'var(--text-sub)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedProduct.title}
            </span>
          </div>

          <button
            onClick={closeProductDetail}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.5rem' }}>
          
          {/* Main 2-Column Product Showcase */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 480px) 1fr',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '2rem'
          }}>
            
            {/* Left Column: Amazon/Flipkart Vertical Gallery + Zoom View */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              
              {/* Vertical Thumbnail Strip */}
              {selectedProduct.images.length > 1 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  maxHeight: '460px',
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}>
                  {selectedProduct.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => setActiveImageIndex(idx)}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '0.6rem',
                        overflow: 'hidden',
                        border: `2px solid ${activeImageIndex === idx ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                        padding: '2px',
                        background: 'var(--bg-surface-elevated)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: activeImageIndex === idx ? '0 0 0 2px rgba(99, 102, 241, 0.25)' : 'none'
                      }}
                      title={`View angle ${idx + 1}`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Angle ${idx + 1}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.4rem' }} 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Showcase with Interactive Magnifier */}
              <div style={{ flex: 1 }}>
                <div 
                  ref={imageContainerRef}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={handleMouseMove}
                  style={{
                    position: 'relative',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    background: 'var(--bg-surface-elevated)',
                    aspectRatio: '1',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'crosshair',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={currentImg}
                    alt={selectedProduct.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: isZooming ? 'none' : 'transform 0.25s ease',
                      transform: isZooming ? 'scale(2.2)' : 'scale(1)',
                      transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`
                    }}
                  />

                  {/* Flipkart Assured / Prime Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    pointerEvents: 'none'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      color: '#ffffff',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)'
                    }}>
                      <CheckCircle2 size={13} color="#facc15" />
                      FLOWSTATE <span style={{ color: '#facc15', fontStyle: 'italic' }}>Assured</span>
                    </span>

                    {selectedProduct.isNearbyAvailable && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        background: 'rgba(16, 185, 129, 0.95)',
                        color: '#ffffff',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}>
                        <Zap size={12} /> {selectedProduct.deliveryEstimateMinutes}m delivery
                      </span>
                    )}
                  </div>

                  {/* Hover to zoom hint */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0.65rem',
                    right: '0.65rem',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#e2e8f0',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <Maximize2 size={11} />
                    {isZooming ? 'Zoomed 2.2x' : 'Hover to zoom'}
                  </div>

                  {/* Image Counter */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0.65rem',
                    left: '0.65rem',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    pointerEvents: 'none'
                  }}>
                    📷 {activeImageIndex + 1} / {selectedProduct.images.length}
                  </div>
                </div>

                {/* 4 Trust Guarantee Icons Grid (Amazon / Flipkart style) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '0.85rem',
                  padding: '0.85rem',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <RotateCcw size={18} color="var(--brand-primary)" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-sub)', lineHeight: 1.2 }}>
                      7 Days Replacement
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <Truck size={18} color="var(--brand-emerald)" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-sub)', lineHeight: 1.2 }}>
                      Free Express Delivery
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <ShieldCheck size={18} color="var(--brand-amber)" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-sub)', lineHeight: 1.2 }}>
                      Brand Warranty
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <Award size={18} color="var(--brand-rose)" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-sub)', lineHeight: 1.2 }}>
                      100% Genuine
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Title, Amazon/Flipkart Pricing, Offers & Buy Box */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Brand Store Link */}
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.35rem'
              }}>
                Visit the {selectedProduct.brand} Store
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.35,
                marginBottom: '0.65rem'
              }}>
                {selectedProduct.title}
              </h1>

              {/* Rating & Review Counter with Star Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{
                  background: '#16a34a',
                  color: '#ffffff',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.825rem',
                  fontWeight: 800
                }}>
                  <span>{selectedProduct.rating}</span>
                  <Star size={12} fill="#ffffff" stroke="#ffffff" />
                </div>

                <span style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', fontWeight: 600, cursor: 'pointer' }}>
                  {selectedProduct.reviewCount.toLocaleString('en-IN')} ratings & verified reviews
                </span>

                {selectedProduct.isBestSeller && (
                  <span style={{
                    background: '#f59e0b',
                    color: '#000000',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800
                  }}>
                    #1 Best Seller
                  </span>
                )}
              </div>

              {/* Amazon / Flipkart Style Price Box */}
              <div style={{
                background: 'var(--bg-surface-elevated)',
                borderRadius: '1rem',
                padding: '1.15rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem' }}>
                  {selectedProduct.discountPercent > 0 && (
                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-rose)' }}>
                      -{selectedProduct.discountPercent}%
                    </span>
                  )}
                  <span style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-main)' }}>
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {selectedProduct.originalPrice > selectedProduct.price && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-sub)' }}>(Inclusive of all taxes)</span>
                  </div>
                )}

                {/* No Cost EMI Info */}
                <div style={{ fontSize: '0.825rem', color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.65rem' }}>
                  <CreditCard size={14} color="var(--brand-primary)" />
                  <span>
                    EMI starts at <strong>₹{(selectedProduct.emiStartsAt || Math.round(selectedProduct.price / 12)).toLocaleString('en-IN')}</strong> per month. 
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 600, cursor: 'pointer', marginLeft: '0.3rem' }}>EMI Options</span>
                  </span>
                </div>

                {/* Super Coins Earned Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.825rem',
                  color: 'var(--brand-amber)',
                  fontWeight: 700,
                  background: 'rgba(245, 158, 11, 0.1)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  width: 'fit-content'
                }}>
                  <Coins size={15} />
                  <span>Earn +{selectedProduct.superCoinsReward} Flowstate Super Coins on this purchase</span>
                </div>
              </div>

              {/* Bank Offers Carousel Card (Amazon / Flipkart Style) */}
              <div style={{
                border: '1px solid rgba(99, 102, 241, 0.25)',
                background: 'rgba(99, 102, 241, 0.04)',
                borderRadius: '0.85rem',
                padding: '0.85rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--brand-primary)' }}>
                    <Tag size={15} />
                    <span>Bank Offers & Discounts</span>
                  </div>
                  <button 
                    onClick={() => setShowAllBankOffers(!showAllBankOffers)}
                    style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {showAllBankOffers ? 'Show Less' : `View All (${defaultBankOffers.length})`}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {(showAllBankOffers ? defaultBankOffers : defaultBankOffers.slice(0, 2)).map((offer, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                      <span style={{ color: 'var(--brand-emerald)', fontWeight: 800 }}>•</span>
                      <span>{offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pincode & Hyperlocal Delivery Availability Checker */}
              <div style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.85rem',
                padding: '0.85rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MapPin size={16} color="var(--brand-emerald)" />
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Check Delivery & Service Availability
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={e => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit Pincode"
                    style={{
                      flex: 1,
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  />
                  <button
                    onClick={() => setPincodeChecked(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', fontWeight: 700 }}
                  >
                    Check
                  </button>
                </div>

                {pincodeChecked && (() => {
                  const isCG = pincodeInput.startsWith('492') || pincodeInput.startsWith('495') || pincodeInput.startsWith('490') || pincodeInput.startsWith('491');
                  const checkAddr = {
                    ...currentAddress,
                    pincode: pincodeInput,
                    city: isCG ? (pincodeInput.startsWith('495') ? 'Bilaspur' : 'Raipur') : currentAddress.city,
                    state: isCG ? 'Chhattisgarh' : currentAddress.state
                  };
                  const metrics = calculateDeliveryMetrics(checkAddr);

                  return (
                    <div style={{
                      background: metrics.isInterstate ? 'rgba(99, 102, 241, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                      border: `1.5px solid ${metrics.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)'}`,
                      borderRadius: '0.75rem',
                      padding: '0.75rem 0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      marginTop: '0.5rem'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: metrics.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {metrics.isInterstate ? <Plane size={16} /> : <Zap size={16} />}
                        <span>{metrics.speedBadge}: {metrics.timeEstimate}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600 }}>
                        Delivering to {checkAddr.city}, {checkAddr.state} ({pincodeInput})
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>
                        Route: {metrics.fullRoute}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>
                        ✓ {metrics.guaranteeNote}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Variant Selectors: Colors */}
              {selectedProduct.variants?.colors && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                    Color: <span style={{ color: 'var(--brand-primary)' }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {selectedProduct.variants.colors.map(col => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedColor(col.label)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: selectedColor === col.label ? 'var(--brand-primary)' : 'var(--text-sub)',
                          background: selectedColor === col.label ? 'var(--bg-surface-elevated)' : 'transparent',
                          border: `1.5px solid ${selectedColor === col.label ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: col.value, border: '1px solid rgba(0,0,0,0.2)' }} />
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selectors: Storage / Size */}
              {selectedProduct.variants?.storage && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                    Storage Capacity: <span style={{ color: 'var(--brand-primary)' }}>{selectedStorage}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {selectedProduct.variants.storage.map(st => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStorage(st.label)}
                        style={{
                          padding: '0.4rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: selectedStorage === st.label ? 'var(--brand-primary)' : 'var(--text-sub)',
                          background: selectedStorage === st.label ? 'var(--bg-surface-elevated)' : 'transparent',
                          border: `1.5px solid ${selectedStorage === st.label ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer'
                        }}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap'
              }}>
                {/* Quantity increment/decrement */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '9999px',
                  padding: '0.2rem'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 700, background: 'none', border: 'none' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 0.8rem', fontWeight: 800, fontSize: '0.9rem' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 700, background: 'none', border: 'none' }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart (Amazon / Flipkart Gold Style) */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '9999px',
                    background: '#f59e0b',
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
                  }}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>

                {/* Buy Now (Amazon / Flipkart Orange/Emerald Style) */}
                <button
                  onClick={handleBuyNow}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '9999px',
                    background: '#ea580c',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)'
                  }}
                >
                  <Zap size={18} />
                  <span>Buy Now</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: isSavedInWishlist ? 'var(--brand-rose)' : 'var(--text-sub)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={isSavedInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart size={20} fill={isSavedInWishlist ? 'var(--brand-rose)' : 'none'} />
                </button>
              </div>

            </div>

          </div>

          {/* Full Amazon & Flipkart Style Tabbed Technical Specifications & Reviews */}
          <div style={{
            borderTop: '2px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            background: 'var(--bg-surface)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            
            {/* Tab navigation pills */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {[
                { id: 'specs' as const, label: 'Technical Specifications' },
                { id: 'overview' as const, label: 'Overview & Highlights' },
                { id: 'reviews' as const, label: `Customer Ratings & Reviews (${selectedProduct.reviewCount.toLocaleString('en-IN')})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: activeTab === tab.id ? 800 : 600,
                    color: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--text-sub)',
                    background: activeTab === tab.id ? 'var(--bg-surface-elevated)' : 'transparent',
                    border: activeTab === tab.id ? '1px solid var(--border-brand)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Amazon & Flipkart Style Structured Categorized Specifications Table */}
            {activeTab === 'specs' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem'
                }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Product Specifications & Genuine Details
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Verified Genuine Manufacturer Data
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {categorizedSpecs.map((cat, catIdx) => (
                    <div 
                      key={catIdx}
                      style={{
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '0.75rem',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Section Category Header */}
                      <div style={{
                        background: 'var(--bg-surface-elevated)',
                        padding: '0.75rem 1.25rem',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        color: 'var(--text-main)',
                        borderBottom: '1px solid var(--border-subtle)'
                      }}>
                        {cat.category}
                      </div>

                      {/* Key-Value Rows */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {cat.details.map((item, itemIdx) => (
                          <div 
                            key={itemIdx}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'minmax(180px, 260px) 1fr',
                              padding: '0.75rem 1.25rem',
                              borderBottom: itemIdx < cat.details.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                              background: itemIdx % 2 === 0 ? 'var(--bg-surface)' : 'rgba(255, 255, 255, 0.02)',
                              fontSize: '0.85rem'
                            }}
                          >
                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                              {item.name}
                            </span>
                            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* What's In The Box pill preview */}
                {selectedProduct.whatsIncluded && selectedProduct.whatsIncluded.length > 0 && (
                  <div style={{ marginTop: '1.5rem', background: 'var(--bg-surface-elevated)', padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <PackageCheck size={16} color="var(--brand-emerald)" />
                      <span>In The Box Contents</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedProduct.whatsIncluded.map((inc, i) => (
                        <span 
                          key={i}
                          style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--text-sub)'
                          }}
                        >
                          ✓ {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Overview & Bullet Features */}
            {activeTab === 'overview' && (
              <div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {selectedProduct.description}
                </p>

                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  About this item
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {selectedProduct.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                      <Check size={16} color="var(--brand-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Amazon / Flipkart Style Customer Ratings Breakdown & Reviews */}
            {activeTab === 'reviews' && (
              <div>
                {/* Top Rating Breakdown Bar Chart */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(200px, 260px) 1fr',
                  gap: '2rem',
                  padding: '1.5rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem'
                }}>
                  {/* Left: Big Score & Stars */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>
                      {selectedProduct.rating}
                    </div>
                    <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b', margin: '0.4rem 0' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Based on {selectedProduct.reviewCount.toLocaleString('en-IN')} verified customer ratings
                    </div>
                  </div>

                  {/* Right: Star Distribution Progress Bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                    {[
                      { star: 5, pct: 78 },
                      { star: 4, pct: 14 },
                      { star: 3, pct: 5 },
                      { star: 2, pct: 2 },
                      { star: 1, pct: 1 }
                    ].map(row => (
                      <div key={row.star} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                        <span style={{ width: '45px', color: 'var(--text-sub)', fontWeight: 600 }}>{row.star} Star</span>
                        <div style={{
                          flex: 1,
                          height: '8px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '9999px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${row.pct}%`,
                            height: '100%',
                            background: row.star >= 4 ? '#16a34a' : row.star === 3 ? '#eab308' : '#ef4444',
                            borderRadius: '9999px'
                          }} />
                        </div>
                        <span style={{ width: '35px', color: 'var(--text-muted)', textAlign: 'right' }}>{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Verified Customer Reviews List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedProduct.reviews.length === 0 ? (
                    <div style={{
                      padding: '2rem',
                      textAlign: 'center',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      <Sparkles size={24} color="var(--brand-primary)" style={{ margin: '0 auto 0.5rem auto' }} />
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        Be the first to review this product!
                      </div>
                      <div style={{ fontSize: '0.85rem' }}>
                        Order today and earn +50 Flowstate Super Coins for posting a verified purchase review.
                      </div>
                    </div>
                  ) : (
                    selectedProduct.reviews.map(rev => (
                      <div 
                        key={rev.id} 
                        style={{
                          background: 'var(--bg-surface)',
                          padding: '1.25rem',
                          borderRadius: '0.85rem',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <img 
                              src={rev.avatar} 
                              alt={rev.author} 
                              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>{rev.author}</div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--brand-emerald)', fontWeight: 700 }}>
                                ✓ Verified Purchase
                              </div>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', marginBottom: '0.35rem' }}>
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={13} fill="#f59e0b" stroke="#f59e0b" />
                          ))}
                        </div>

                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                          {rev.title}
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '0.65rem' }}>
                          {rev.comment}
                        </p>

                        <button style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          background: 'none',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '0.25rem 0.65rem',
                          cursor: 'pointer'
                        }}>
                          <ThumbsUp size={12} /> Helpful ({rev.helpfulVotes})
                        </button>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
