import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  ShoppingBag, 
  Film, 
  Check, 
  Star, 
  Zap, 
  Tag, 
  ArrowRight,
  Flame,
  Radio
} from 'lucide-react';

interface CommercialData {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  videoSrc: string;
  durationLabel: string;
  qualityBadge: string;
  featuredProductIds: string[];
  couponCode: string;
  couponDiscount: string;
}

const commercials: CommercialData[] = [
  {
    id: 'comm-1',
    title: 'Flowstate Audio Mastery — Spatial Noise Cancelling Spotlight',
    badge: 'FLAGSHIP AUDIO COMMERCIAL',
    tagline: 'Immerse in studio acoustics, 30-hour battery life, and crystal-clear voice fidelity.',
    videoSrc: '/videos/flowstate_ad_1.mp4',
    durationLabel: '0:25',
    qualityBadge: '1080p FHD 60FPS',
    featuredProductIds: ['prod-sony-wh1000xm5', 'prod-apple-airpods-max', 'prod-bose-qc-ultra'],
    couponCode: 'AUDIO15',
    couponDiscount: 'Flat 15% Off on Audio'
  },
  {
    id: 'comm-2',
    title: 'Next-Gen Pulse — Smart Living & Lightning Fast Delivery',
    badge: 'ECOSYSTEM & SPEED COMMERCIAL',
    tagline: 'Experience titanium aerospace craftsmanship, 200MP cameras, and 10-minute doorstep transit.',
    videoSrc: '/videos/flowstate_ad_2.mp4',
    durationLabel: '0:20',
    qualityBadge: '1080p HDR CINEMATIC',
    featuredProductIds: ['prod-iphone-16-pro-max', 'prod-samsung-s24-ultra', 'prod-sony-bravia-oled-65'],
    couponCode: 'SPEED20',
    couponDiscount: 'Extra ₹1,000 Off on Mobiles'
  }
];

export const VideoAdvertisementSection: React.FC = () => {
  const { productsList, addToCart, openProductDetail, applyCoupon, addToast } = useStore();
  
  const [activeCommercialIndex, setActiveCommercialIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [copiedCode, setCopiedCode] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeAd = commercials[activeCommercialIndex];

  // Featured products from catalog
  const featuredProducts = activeAd.featuredProductIds
    .map(id => productsList.find(p => p.id === id))
    .filter((p): p is typeof productsList[0] => !!p);

  // Fallback to top products if specific IDs not found
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : productsList.slice(0, 3);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeCommercialIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted) {
      addToast('Audio Enabled 🔊', 'Video sound unmuted', 'info');
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((curr / dur) * 100);
    
    const mins = Math.floor(curr / 60);
    const secs = Math.floor(curr % 60);
    setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleApplyAdCoupon = (code: string) => {
    const success = applyCoupon(code);
    if (success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <section 
      id="video-advertisements"
      style={{
        padding: '3rem 0',
        background: 'linear-gradient(180deg, var(--bg-app) 0%, rgba(15, 23, 42, 0.95) 50%, var(--bg-app) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow accents */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-indigo" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                <Film size={13} style={{ marginRight: '0.3rem' }} />
                FLOWSTATE THEATRE & COMMERCIAL SPOTLIGHT
              </span>
              <span className="badge badge-emerald" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 700 }}>
                <Radio size={13} className="radar-ping" style={{ marginRight: '0.3rem' }} />
                1080P ULTRA HD
              </span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
              Watch Official Commercials & Shop The Deals
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.4rem', maxWidth: '640px' }}>
              Explore certified flagship products through high-definition cinematic advertisements. Tap to unmute and purchase featured gear with guaranteed express delivery.
            </p>
          </div>

          {/* Commercial Switcher Tabs */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '0.35rem',
            gap: '0.35rem'
          }}>
            {commercials.map((comm, idx) => {
              const isSelected = activeCommercialIndex === idx;
              return (
                <button
                  key={comm.id}
                  onClick={() => setActiveCommercialIndex(idx)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '0.75rem',
                    background: isSelected ? 'var(--brand-primary)' : 'transparent',
                    color: isSelected ? '#ffffff' : 'var(--text-sub)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    border: 'none'
                  }}
                >
                  <Play size={13} fill={isSelected ? '#fff' : 'currentColor'} />
                  <span>Commercial {idx + 1}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    opacity: 0.8,
                    background: isSelected ? 'rgba(0,0,0,0.2)' : 'var(--bg-surface)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px'
                  }}>
                    {comm.durationLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Cinema Grid Layout: Player on Left (7 cols), Featured Shelf on Right (5 cols) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '1.75rem',
          alignItems: 'stretch'
        }}>
          
          {/* VIDEO PLAYER CARD (8 Cols on desktop, 12 on mobile) */}
          <div style={{
            gridColumn: 'span 8',
            background: '#090d16',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-highlight)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            
            {/* Top Bar inside Player */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              right: '1rem',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{
                background: 'rgba(10, 15, 30, 0.75)',
                backdropFilter: 'blur(10px)',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                pointerEvents: 'auto'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span>COMMERCIAL {activeCommercialIndex + 1} OF 2</span>
                <span style={{ opacity: 0.6 }}>•</span>
                <span style={{ color: '#10b981' }}>{activeAd.qualityBadge}</span>
              </div>

              {/* Unmute Prompt Button */}
              {isMuted && (
                <button
                  onClick={toggleMute}
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(16, 185, 129, 0.9))',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '0.45rem 1rem',
                    borderRadius: '9999px',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                    pointerEvents: 'auto',
                    animation: 'pulse 2s infinite'
                  }}
                >
                  <Volume2 size={16} />
                  <span>Tap for Sound 🔊</span>
                </button>
              )}
            </div>

            {/* Video Container (16:9 cinematic container) */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                background: '#000000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={activeAd.videoSrc}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Center Play Overlay Icon when paused */}
              {!isPlaying && (
                <div style={{
                  position: 'absolute',
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.85)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)'
                }}>
                  <Play size={32} fill="#ffffff" style={{ marginLeft: '4px' }} />
                </div>
              )}
            </div>

            {/* Video Scrubber & Custom Controls */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(9, 14, 26, 0.95) 100%)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              
              {/* Progress Scrubber Bar */}
              <div 
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={(e) => {
                  if (!videoRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
                }}
              >
                <div 
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-emerald) 100%)',
                    borderRadius: '9999px',
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>

              {/* Bottom Controls Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  
                  {/* Play / Pause button */}
                  <button
                    onClick={togglePlay}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} fill="#fff" style={{ marginLeft: '2px' }} />}
                  </button>

                  {/* Mute / Unmute button */}
                  <button
                    onClick={toggleMute}
                    style={{
                      background: isMuted ? 'rgba(255, 255, 255, 0.1)' : 'rgba(16, 185, 129, 0.2)',
                      border: `1px solid ${isMuted ? 'rgba(255, 255, 255, 0.15)' : 'var(--brand-emerald)'}`,
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isMuted ? '#ffffff' : 'var(--brand-emerald)',
                      cursor: 'pointer'
                    }}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  {/* Time counter */}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>
                    {currentTime} / {activeAd.durationLabel}
                  </span>
                </div>

                {/* Title & Tag */}
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                    {activeAd.title}
                  </span>
                  
                  {/* Fullscreen */}
                  <button
                    onClick={handleFullscreen}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      cursor: 'pointer'
                    }}
                    title="Fullscreen"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR: "Featured in this Commercial" Product Shelf (4 Cols) */}
          <div style={{
            gridColumn: 'span 4',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            
            {/* Promo Voucher Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
              border: '1.5px dashed rgba(99, 102, 241, 0.4)',
              borderRadius: '1.25rem',
              padding: '1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--brand-amber)', fontWeight: 700, fontSize: '0.75rem' }}>
                  <Flame size={14} fill="var(--brand-amber)" />
                  <span>COMMERCIAL EXCLUSIVE</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  {activeAd.couponDiscount}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Use code <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>{activeAd.couponCode}</span> at checkout
                </div>
              </div>

              <button
                onClick={() => handleApplyAdCoupon(activeAd.couponCode)}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: '0.75rem', whiteSpace: 'nowrap' }}
              >
                {copiedCode ? <Check size={14} /> : <Tag size={14} />}
                <span>{copiedCode ? 'Applied!' : 'Apply Code'}</span>
              </button>
            </div>

            {/* Featured Products List */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} color="var(--brand-amber)" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    Featured In This Video
                  </h3>
                </div>
                <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                  {displayProducts.length} ITEMS
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                {displayProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => openProductDetail(product)}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      padding: '0.75rem',
                      borderRadius: '0.85rem',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    className="hover-lift"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '0.6rem',
                        objectFit: 'cover',
                        background: '#111827',
                        flexShrink: 0
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontWeight: 700, 
                        fontSize: '0.85rem', 
                        color: 'var(--text-main)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {product.title}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--brand-emerald)' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.35rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>
                          ⭐ {product.rating} ({product.reviewCount})
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: '0.25rem 0.6rem',
                            fontSize: '0.72rem',
                            borderRadius: '0.5rem'
                          }}
                        >
                          <ShoppingBag size={12} />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Speed Badge on bottom */}
              <div style={{
                marginTop: '1rem',
                padding: '0.65rem 0.85rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--brand-emerald)',
                fontWeight: 600
              }}>
                <Zap size={14} />
                <span>10–12 Min Instant Local & 24H Interstate Air Delivery</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
