import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  ShieldCheck, 
  FileText, 
  AlertCircle,
  RotateCcw,
  Navigation,
  Zap,
  Plane,
  Radio,
  Compass
} from 'lucide-react';
import type { OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { 
    activeTrackingOrder, 
    closeOrderTracking, 
    cancelOrder, 
    addToast 
  } = useStore();

  // Courier/Flight live animation position (percentage along delivery path)
  const [courierProgress, setCourierProgress] = useState(65);

  useEffect(() => {
    if (!activeTrackingOrder) return;
    const timer = setInterval(() => {
      setCourierProgress(prev => (prev < 90 ? prev + 1 : 60));
    }, 2000);
    return () => clearInterval(timer);
  }, [activeTrackingOrder]);

  if (!activeTrackingOrder) return null;

  const isInterstate = 
    activeTrackingOrder.isInterstate ||
    (activeTrackingOrder.address.state || '').toLowerCase().includes('chhattisgarh') ||
    (activeTrackingOrder.address.city || '').toLowerCase().includes('raipur') ||
    (activeTrackingOrder.address.city || '').toLowerCase().includes('bilaspur') ||
    (activeTrackingOrder.address.city || '').toLowerCase().includes('bhilai') ||
    (activeTrackingOrder.address.pincode || '').startsWith('492') ||
    (activeTrackingOrder.address.pincode || '').startsWith('495') ||
    (activeTrackingOrder.address.pincode || '').startsWith('490');

  const timelineSteps: { status: OrderStatus; label: string; time: string }[] = isInterstate ? [
    { status: 'placed', label: 'Delhi Hub Order Placed', time: '06:15 AM' },
    { status: 'confirmed', label: 'Security & Manifest Confirmed', time: '06:45 AM' },
    { status: 'packed', label: 'Air Container ULD Packed', time: '07:30 AM' },
    { status: 'shipped', label: 'Air Cargo Flight Airborne', time: '09:30 AM' },
    { status: 'out_for_delivery', label: 'Chhattisgarh Hub Dispatch', time: 'Est. 02:00 PM' },
    { status: 'delivered', label: 'Doorstep Handover (24h)', time: 'Guaranteed On Time' }
  ] : [
    { status: 'placed', label: 'Order Placed', time: '09:45 AM' },
    { status: 'confirmed', label: 'Store Confirmed', time: '09:47 AM' },
    { status: 'packed', label: 'Packed & Sealed', time: '09:50 AM' },
    { status: 'shipped', label: 'Rider Picked Up', time: '09:52 AM' },
    { status: 'out_for_delivery', label: 'Out for Delivery', time: '09:55 AM' },
    { status: 'delivered', label: 'Delivered (10-12m)', time: 'Est. 10:02 AM' }
  ];

  const statusOrder: Record<OrderStatus, number> = {
    placed: 1,
    confirmed: 2,
    packed: 3,
    shipped: 4,
    out_for_delivery: 5,
    delivered: 6,
    cancelled: 0
  };

  const currentStepNum = statusOrder[activeTrackingOrder.status] || 4;

  const handleDownloadInvoice = () => {
    addToast('Invoice Downloaded', `Invoice for Order #${activeTrackingOrder.id} saved to downloads.`, 'success');
  };

  const handleContactCarrier = () => {
    if (isInterstate) {
      addToast('Air Cargo Desk', 'Connecting to Flowstate Air Freight Operations Control (DEL-RPR Terminal)...', 'info');
    } else {
      addToast('Connecting Call', `Connecting to delivery partner ${activeTrackingOrder.riderInfo?.name || 'Rider'}...`, 'info');
    }
  };

  // Interpolated coordinates along the simulated route
  // Local: (120, 180) to (680, 80)
  // Interstate Flight: arc from Delhi (120, 190) via peak (400, 50) to Chhattisgarh (680, 150)
  const t = courierProgress / 100;
  const flightX = 120 + (680 - 120) * t;
  const flightY = 190 * (1 - t) * (1 - t) + 2 * (1 - t) * t * 40 + 150 * t * t;

  return (
    <div className="modal-overlay" onClick={closeOrderTracking}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          width: '100%',
          padding: '0',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Track Order #{activeTrackingOrder.id}
              </h2>
              <span className="badge badge-emerald">
                {activeTrackingOrder.status.replace('_', ' ').toUpperCase()}
              </span>
              {isInterstate && (
                <span className="badge badge-indigo">
                  ✈️ INTERSTATE AIR CARGO (DELHI ➔ CHHATTISGARH)
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Placed on {activeTrackingOrder.date} • Delivering to {activeTrackingOrder.address.landmark || activeTrackingOrder.address.city}, {activeTrackingOrder.address.state} ({activeTrackingOrder.address.pincode})
            </div>
          </div>

          <button
            onClick={closeOrderTracking}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-sub)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          
          {/* Live Delivery Map Simulation */}
          <div style={{
            position: 'relative',
            height: '260px',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            background: isInterstate 
              ? 'linear-gradient(180deg, #070b14 0%, #0d1527 50%, #060911 100%)' 
              : 'linear-gradient(180deg, #090e17 0%, #111827 100%)',
            border: `1.5px solid ${isInterstate ? 'rgba(99, 102, 241, 0.4)' : 'var(--border-highlight)'}`,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* SVG Simulation */}
            <svg viewBox="0 0 800 260" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="airRouteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {isInterstate ? (
                <>
                  {/* Radar Circles & Flight Navigation Grid */}
                  <circle cx="400" cy="130" r="110" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                  <circle cx="400" cy="130" r="70" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                  <line x1="0" y1="130" x2="800" y2="130" stroke="#1e293b" strokeWidth="1" opacity="0.3" />
                  <line x1="400" y1="0" x2="400" y2="260" stroke="#1e293b" strokeWidth="1" opacity="0.3" />

                  {/* Flight Corridor Arc from Delhi to Chhattisgarh */}
                  <path
                    d="M 120 190 Q 400 40 680 150"
                    fill="none"
                    stroke="url(#airRouteGrad)"
                    strokeWidth="5"
                    strokeDasharray="8,6"
                  />

                  {/* Delhi Cargo Terminal Origin Pin */}
                  <circle cx="120" cy="190" r="12" fill="#3b82f6" />
                  <circle cx="120" cy="190" r="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
                  <text x="120" y="222" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">
                    Delhi IGI Air Hub (DEL)
                  </text>
                  <text x="120" y="236" textAnchor="middle" fill="#94a3b8" fontSize="9">
                    Dispatched & Cleared
                  </text>

                  {/* Midpoint Flight Waypoint */}
                  <circle cx="400" cy="102" r="5" fill="#6366f1" />
                  <text x="400" y="90" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="600">
                    Airway Corridor W42
                  </text>

                  {/* Chhattisgarh Destination Airport Pin */}
                  <circle cx="680" cy="150" r="12" fill="#10b981" />
                  <circle cx="680" cy="150" r="22" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.7">
                    <animate attributeName="r" values="16;28;16" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="680" y="185" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
                    Raipur Air Terminal, CG (RPR)
                  </text>
                  <text x="680" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">
                    {activeTrackingOrder.address.city}, Chhattisgarh
                  </text>

                  {/* Moving Air Cargo Airplane Pin */}
                  <g transform={`translate(${flightX}, ${flightY})`}>
                    <circle cx="0" cy="0" r="20" fill="#6366f1" filter="drop-shadow(0 0 12px #6366f1)" />
                    {/* Airplane SVG icon shape */}
                    <path
                      d="M -7 -4 L 0 -12 L 7 -4 L 4 6 L -4 6 Z"
                      fill="#ffffff"
                      transform="rotate(65)"
                    />
                    <circle cx="0" cy="0" r="28" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.6">
                      <animate attributeName="r" values="20;36;20" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  </g>
                </>
              ) : (
                <>
                  {/* Grid Roads */}
                  <line x1="50" y1="60" x2="750" y2="60" stroke="#1f2937" strokeWidth="6" />
                  <line x1="50" y1="180" x2="750" y2="180" stroke="#1f2937" strokeWidth="6" />
                  <line x1="200" y1="20" x2="200" y2="220" stroke="#1f2937" strokeWidth="6" />
                  <line x1="450" y1="20" x2="450" y2="220" stroke="#1f2937" strokeWidth="6" />
                  <line x1="650" y1="20" x2="650" y2="220" stroke="#1f2937" strokeWidth="6" />

                  {/* Active Delivery Route S-curve */}
                  <path
                    d="M 120 180 Q 280 180 320 120 T 680 80"
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="5"
                    strokeDasharray="6,6"
                  />

                  {/* Store Origin Pin */}
                  <circle cx="120" cy="180" r="10" fill="#6366f1" />
                  <text x="120" y="210" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Local Store</text>

                  {/* Destination Pin */}
                  <circle cx="680" cy="80" r="10" fill="#10b981" />
                  <circle cx="680" cy="80" r="18" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.6" />
                  <text x="680" y="115" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Your Address</text>

                  {/* Moving Courier Bike Pin */}
                  <g transform={`translate(${120 + ((680 - 120) * (courierProgress / 100))}, ${180 + ((80 - 180) * (courierProgress / 100))})`}>
                    <circle cx="0" cy="0" r="16" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)" />
                    <circle cx="0" cy="0" r="24" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="r" values="16;30;16" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                </>
              )}
            </svg>

            {/* Top ETA Floating Pill */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'rgba(16, 22, 38, 0.9)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${isInterstate ? 'var(--brand-primary)' : 'var(--border-highlight)'}`,
              borderRadius: '9999px',
              padding: '0.45rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 800
            }}>
              {isInterstate ? <Plane size={16} color="var(--brand-primary)" /> : <Zap size={16} color="var(--brand-emerald)" />}
              <span>{activeTrackingOrder.deliveryEta}</span>
            </div>

            {/* Top Right Airway Bill Pill if Interstate */}
            {isInterstate && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(16, 22, 38, 0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                color: '#93c5fd',
                fontWeight: 700
              }}>
                AWB: {activeTrackingOrder.airwayBillNumber || 'AWB-DEL-CG-849201'}
              </div>
            )}

            {/* Bottom Live Telemetry Pill */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(16, 22, 38, 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-highlight)',
              borderRadius: '8px',
              padding: '0.4rem 0.85rem',
              fontSize: '0.75rem',
              color: isInterstate ? '#a5b4fc' : 'var(--text-sub)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Radio size={12} className="radar-ping" color={isInterstate ? '#6366f1' : '#10b981'} />
              <span>
                {isInterstate 
                  ? `In-Flight Radar Active • Flight ${activeTrackingOrder.flightOrVehicleNumber || 'FS-CARGO 902'} • Speed: 740 km/h`
                  : 'Live Telemetry Active • Electric Vida Scooter • Speed: 32 km/h'
                }
              </span>
            </div>
          </div>

          {/* Carrier Card Details */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: '1.25rem',
            padding: '1.25rem',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: isInterstate ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)',
                border: `2px solid ${isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)'}`,
                flexShrink: 0
              }}>
                {isInterstate ? <Plane size={26} /> : <Truck size={26} />}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                    {isInterstate ? 'Flowstate Express Air Cargo Logistics' : activeTrackingOrder.riderInfo?.name || 'Ramesh Kumar'}
                  </span>
                  <span className={isInterstate ? 'badge badge-indigo' : 'badge badge-emerald'} style={{ fontSize: '0.65rem' }}>
                    {isInterstate ? 'Air Cargo Dedicated' : 'Certified FlowRider'}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                  {isInterstate 
                    ? `Freighter: ${activeTrackingOrder.flightOrVehicleNumber || 'Boeing 737 P2F (DEL ➔ RPR)'} • AWB: ${activeTrackingOrder.airwayBillNumber || 'AWB-DEL-CG-849201'}`
                    : `${activeTrackingOrder.riderInfo?.vehicle || 'Hero Vida EV'} • ${activeTrackingOrder.riderInfo?.vehicleNumber || 'KA 03 EV 4821'}`
                  }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--brand-amber)', fontWeight: 700 }}>
                  <Star size={13} fill="var(--brand-amber)" />
                  <span>4.98 Rating</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {isInterstate ? '• 99.8% On-Time 24-Hour Guarantee' : '• 1,480 Local Deliveries completed'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleContactCarrier}
                className="btn btn-emerald btn-sm"
                style={{ borderRadius: '9999px', padding: '0.5rem 1rem' }}
              >
                <Phone size={15} />
                <span>{isInterstate ? 'Air Cargo Desk' : 'Call Rider'}</span>
              </button>
            </div>
          </div>

          {/* Interstate Parcel Checkpoints (If interstate order) */}
          {isInterstate && activeTrackingOrder.parcelCheckpoints && (
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Plane size={16} color="var(--brand-primary)" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    Air Cargo Transit Checkpoints (Delhi to Chhattisgarh)
                  </h4>
                </div>
                <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                  Guaranteed 24H Air Route
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeTrackingOrder.parcelCheckpoints.map((cp, idx) => (
                  <div 
                    key={cp.name} 
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.75rem',
                      background: cp.status === 'in_transit' ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface-elevated)',
                      border: `1px solid ${cp.status === 'in_transit' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: cp.status === 'completed' ? 'var(--brand-emerald)' : cp.status === 'in_transit' ? 'var(--brand-primary)' : 'var(--bg-surface)',
                      color: cp.status === 'pending' ? 'var(--text-muted)' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {cp.status === 'completed' ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                          {cp.name}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: cp.status === 'in_transit' ? 'var(--brand-primary)' : 'var(--text-sub)', fontWeight: 600 }}>
                          {cp.time}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        📍 {cp.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6-Step Visual Timeline */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              Order Lifecycle Timeline
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', position: 'relative' }}>
              {timelineSteps.map((s, idx) => {
                const isPassed = currentStepNum >= idx + 1;
                const isCurrent = currentStepNum === idx + 1;

                return (
                  <div key={s.label} style={{ textAlign: 'center', position: 'relative' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      margin: '0 auto 0.5rem',
                      background: isPassed ? 'var(--brand-emerald)' : 'var(--bg-surface-elevated)',
                      color: isPassed ? '#fff' : 'var(--text-muted)',
                      border: `2px solid ${isCurrent ? '#fff' : isPassed ? 'var(--brand-emerald)' : 'var(--border-subtle)'}`,
                      boxShadow: isCurrent ? '0 0 12px var(--brand-emerald)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}>
                      {isPassed ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>

                    <div style={{ fontSize: '0.75rem', fontWeight: isCurrent ? 800 : 600, color: isPassed ? 'var(--text-main)' : 'var(--text-muted)', lineHeight: 1.2 }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {s.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items & Cost Breakdown */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: '1.25rem',
            padding: '1.25rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Items in this delivery ({activeTrackingOrder.items.length})</span>
              <button
                onClick={handleDownloadInvoice}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  color: 'var(--brand-primary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none'
                }}
              >
                <FileText size={15} /> Download Official Invoice
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
              {activeTrackingOrder.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={item.product.images[0]} alt={item.product.title} style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.product.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity} • ₹{item.unitPrice.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700 }}>₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payment via: </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>{activeTrackingOrder.paymentMethod}</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-main)' }}>
                Paid: ₹{activeTrackingOrder.total.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Cancel Action */}
            {activeTrackingOrder.status !== 'delivered' && activeTrackingOrder.status !== 'cancelled' && (
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <button
                  onClick={() => cancelOrder(activeTrackingOrder.id)}
                  style={{ fontSize: '0.8rem', color: 'var(--brand-rose)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
