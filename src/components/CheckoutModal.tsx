import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MapPin, 
  Zap, 
  Truck, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  Building,
  Smartphone,
  Banknote,
  Clock,
  Plus,
  Plane
} from 'lucide-react';
import { calculateDeliveryMetrics } from '../utils/deliveryCalculator';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartTotal,
    cartDeliveryFee,
    currentAddress,
    setCurrentAddress,
    addresses,
    addNewAddress,
    placeOrder,
    openOrderTracking
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliveryOption, setDeliveryOption] = useState<'instant' | 'express' | 'standard'>('instant');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod' | 'paylater'>('upi');
  
  // Payment mock states
  const [upiId, setUpiId] = useState('amreshwar@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardHolder, setCardHolder] = useState('AMRESHWAR MARAVI');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('•••');

  // New address form state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    type: 'Home' as const,
    name: 'Amreshwar Maravi',
    phone: '+91 98765 43210',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    isDefault: false,
    instructions: 'Ring bell twice.'
  });

  if (!isCheckoutModalOpen) return null;

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.addressLine1.trim()) return;
    addNewAddress(newAddr);
    setIsAddingAddress(false);
  };

  const handleFinalOrderSubmit = () => {
    const order = placeOrder(deliveryOption, paymentMethod);
    openOrderTracking(order);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutModalOpen(false)}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          width: '100%',
          padding: '0',
          position: 'relative'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {step > 1 && (
              <button
                onClick={() => setStep((step - 1) as any)}
                style={{
                  padding: '0.4rem',
                  borderRadius: '50%',
                  background: 'var(--bg-surface-elevated)',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Secure Checkout
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Step {step} of 3 • 256-bit Encrypted
              </div>
            </div>
          </div>

          {/* Stepper Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: step >= 1 ? 'var(--brand-primary)' : 'var(--bg-surface-elevated)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>1</span>
            <span style={{ width: '20px', height: '2px', background: step >= 2 ? 'var(--brand-primary)' : 'var(--border-subtle)' }} />
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: step >= 2 ? 'var(--brand-primary)' : 'var(--bg-surface-elevated)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>2</span>
            <span style={{ width: '20px', height: '2px', background: step >= 3 ? 'var(--brand-primary)' : 'var(--border-subtle)' }} />
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: step >= 3 ? 'var(--brand-primary)' : 'var(--bg-surface-elevated)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>3</span>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-sub)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem' }}>
          
          {/* STEP 1: Address Selection */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Select Delivery Address
                </h3>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  <Plus size={14} /> {isAddingAddress ? 'Cancel' : 'Add New Address'}
                </button>
              </div>

              {isAddingAddress ? (
                <form onSubmit={handleCreateAddress} style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '1.25rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAddr.name}
                      onChange={e => setNewAddr({ ...newAddr, name: e.target.value })}
                      required
                      style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                    <input
                      type="text"
                      placeholder="Mobile Phone"
                      value={newAddr.phone}
                      onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                      required
                      style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Flat, House no., Building, Apartment"
                    value={newAddr.addressLine1}
                    onChange={e => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                    required
                    style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Landmark"
                      value={newAddr.landmark}
                      onChange={e => setNewAddr({ ...newAddr, landmark: e.target.value })}
                      style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddr.city}
                      onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                      required
                      style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={newAddr.pincode}
                      onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      required
                      style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Delivery Instructions (e.g. Leave at door with guard)"
                    value={newAddr.instructions}
                    onChange={e => setNewAddr({ ...newAddr, instructions: e.target.value })}
                    style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                  />

                  <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', borderRadius: '8px' }}>
                    Save & Use This Address
                  </button>
                </form>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {addresses.map(addr => {
                    const isSelected = currentAddress.id === addr.id;

                    return (
                      <div
                        key={addr.id}
                        onClick={() => setCurrentAddress(addr)}
                        style={{
                          padding: '1rem',
                          borderRadius: '1rem',
                          background: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface-elevated)',
                          border: `1.5px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.85rem'
                        }}
                      >
                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => setCurrentAddress(addr)}
                          style={{ marginTop: '0.25rem', accentColor: 'var(--brand-primary)' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{addr.name}</span>
                            <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{addr.type}</span>
                            {addr.isDefault && <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Default</span>}
                            {addr.isInterstate && <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>✈️ 24h Air</span>}
                          </div>
                          <div style={{ fontSize: '0.825rem', color: 'var(--text-sub)', lineHeight: 1.4 }}>
                            {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}{addr.landmark && `Near ${addr.landmark}, `}{addr.city} - {addr.pincode}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 700, marginTop: '0.25rem' }}>
                            {addr.speedTag || (addr.isInterstate ? '✈️ 24 Hours Express Air Cargo' : '⚡ 10-15 Mins Delivery')}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            Phone: {addr.phone} {addr.instructions && `• Note: "${addr.instructions}"`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '1rem' }}
              >
                <span>Continue to Delivery Speed</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: Delivery Speed Options */}
          {step === 2 && (() => {
            const metrics = calculateDeliveryMetrics(currentAddress);

            return (
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Choose Delivery Speed & Logistics Mode
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Delivering to: <strong style={{ color: 'var(--text-main)' }}>{currentAddress.landmark || currentAddress.addressLine1}, {currentAddress.city}</strong> ({currentAddress.pincode})
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  
                  {metrics.isInterstate ? (
                    <>
                      {/* Interstate 24h Air Cargo Option */}
                      <div
                        onClick={() => setDeliveryOption('instant')}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '1rem',
                          background: deliveryOption === 'instant' ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-surface-elevated)',
                          border: `1.5px solid ${deliveryOption === 'instant' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}
                      >
                        <input
                          type="radio"
                          checked={deliveryOption === 'instant'}
                          onChange={() => setDeliveryOption('instant')}
                          style={{ accentColor: 'var(--brand-primary)' }}
                        />
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'rgba(99, 102, 241, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--brand-primary)',
                          flexShrink: 0
                        }}>
                          <Plane size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                              Guaranteed 24-Hour Express Air Cargo (Delhi ➔ Chhattisgarh)
                            </span>
                            <span className="badge badge-indigo">✈️ 24 HOURS GUARANTEED</span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
                            Direct Boeing 737 Cargo flight from Delhi Central Hub to {currentAddress.city} Airport Terminal. No afternoon delay, guaranteed next-day 24-hour delivery.
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--brand-emerald)', fontSize: '0.9rem' }}>
                          FREE
                        </div>
                      </div>

                      {/* Same Day Priority Air Option */}
                      <div
                        onClick={() => setDeliveryOption('express')}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '1rem',
                          background: deliveryOption === 'express' ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface-elevated)',
                          border: `1.5px solid ${deliveryOption === 'express' ? 'var(--brand-emerald)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}
                      >
                        <input
                          type="radio"
                          checked={deliveryOption === 'express'}
                          onChange={() => setDeliveryOption('express')}
                          style={{ accentColor: 'var(--brand-emerald)' }}
                        />
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--brand-emerald)',
                          flexShrink: 0
                        }}>
                          <Truck size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                              Air Cargo Priority Slot
                            </span>
                            <span className="badge badge-emerald">NEXT FLIGHT</span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
                            Earliest available air freight departure from Delhi IGI Terminal.
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                          FREE
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Hyperlocal Instant (<5km: 10-12 min, 5-10km: 15-30 min) */}
                      <div
                        onClick={() => setDeliveryOption('instant')}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '1rem',
                          background: deliveryOption === 'instant' ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface-elevated)',
                          border: `1.5px solid ${deliveryOption === 'instant' ? 'var(--brand-emerald)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}
                      >
                        <input
                          type="radio"
                          checked={deliveryOption === 'instant'}
                          onChange={() => setDeliveryOption('instant')}
                          style={{ accentColor: 'var(--brand-emerald)' }}
                        />
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--brand-emerald)',
                          flexShrink: 0
                        }}>
                          <Zap size={22} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                              {metrics.tier === 'hyperlocal_10m' ? 'Instant Scooter Delivery (<5 km)' : 'Local Hub Express Delivery (5-10 km)'}
                            </span>
                            <span className="badge badge-emerald">{metrics.speedBadge}</span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
                            {metrics.guaranteeNote}
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--brand-emerald)', fontSize: '0.9rem' }}>
                          FREE
                        </div>
                      </div>

                      {/* Same Day Express */}
                      <div
                        onClick={() => setDeliveryOption('express')}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '1rem',
                          background: deliveryOption === 'express' ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface-elevated)',
                          border: `1.5px solid ${deliveryOption === 'express' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}
                      >
                        <input
                          type="radio"
                          checked={deliveryOption === 'express'}
                          onChange={() => setDeliveryOption('express')}
                          style={{ accentColor: 'var(--brand-primary)' }}
                        />
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(99, 102, 241, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--brand-primary)',
                          flexShrink: 0
                        }}>
                          <Truck size={22} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                              Regional Hub Consolidation
                            </span>
                            <span className="badge badge-indigo">TODAY EVENING</span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                            Scheduled evening batch delivery directly to your door.
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                          FREE
                        </div>
                      </div>
                    </>
                  )}

                  {/* Standard Surface / Consolidation */}
                  <div
                    onClick={() => setDeliveryOption('standard')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '1rem',
                      background: deliveryOption === 'standard' ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${deliveryOption === 'standard' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <input
                      type="radio"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      style={{ accentColor: 'var(--brand-primary)' }}
                    />
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-primary)',
                      flexShrink: 0
                    }}>
                      <Clock size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                          Flexible Green Eco Slot
                        </span>
                        <span className="badge badge-purple">ZERO CARBON</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                        Optimized multi-package combined electric courier delivery.
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      FREE
                    </div>
                  </div>

                </div>

                <button
                  onClick={() => setStep(3)}
                  className="btn btn-primary"
                  style={{ width: '100%', borderRadius: '1rem' }}
                >
                  <span>Continue to Payment Method</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })()}

          {/* STEP 3: Payment Selection & Dynamic QR */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Select Payment Method
                </h3>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-emerald)' }}>
                  Pay: ₹{cartTotal.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'upi' as const, label: 'UPI / QR', icon: <QrCode size={16} /> },
                  { id: 'card' as const, label: 'Card', icon: <CreditCard size={16} /> },
                  { id: 'netbanking' as const, label: 'Net Banking', icon: <Building size={16} /> },
                  { id: 'paylater' as const, label: 'PayLater', icon: <Smartphone size={16} /> },
                  { id: 'cod' as const, label: 'Cash on Del.', icon: <Banknote size={16} /> }
                ].map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    style={{
                      padding: '0.65rem 0.25rem',
                      borderRadius: '0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: paymentMethod === pm.id ? 700 : 500,
                      color: paymentMethod === pm.id ? 'var(--brand-primary)' : 'var(--text-sub)',
                      background: paymentMethod === pm.id ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${paymentMethod === pm.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer'
                    }}
                  >
                    {pm.icon}
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>

              {/* UPI Tab with Dynamic Payment QR Code */}
              {paymentMethod === 'upi' && (
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {/* Generated SVG QR Code */}
                  <div style={{
                    width: '160px',
                    height: '160px',
                    background: '#ffffff',
                    padding: '8px',
                    borderRadius: '1rem',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {/* SVG Dynamic QR Representation */}
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                      <rect width="100" height="100" fill="#ffffff" />
                      {/* Top Left Marker */}
                      <rect x="5" y="5" width="28" height="28" fill="#000" />
                      <rect x="9" y="9" width="20" height="20" fill="#fff" />
                      <rect x="13" y="13" width="12" height="12" fill="#000" />
                      {/* Top Right Marker */}
                      <rect x="67" y="5" width="28" height="28" fill="#000" />
                      <rect x="71" y="9" width="20" height="20" fill="#fff" />
                      <rect x="75" y="13" width="12" height="12" fill="#000" />
                      {/* Bottom Left Marker */}
                      <rect x="5" y="67" width="28" height="28" fill="#000" />
                      <rect x="9" y="71" width="20" height="20" fill="#fff" />
                      <rect x="13" y="75" width="12" height="12" fill="#000" />
                      {/* Random Data Pattern Matrix */}
                      <rect x="40" y="8" width="6" height="6" fill="#000" />
                      <rect x="52" y="14" width="8" height="6" fill="#000" />
                      <rect x="40" y="24" width="14" height="6" fill="#000" />
                      <rect x="10" y="42" width="18" height="6" fill="#000" />
                      <rect x="36" y="40" width="28" height="20" fill="#4f46e5" />
                      <text x="50" y="54" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#fff">FLOW</text>
                      <rect x="70" y="44" width="20" height="8" fill="#000" />
                      <rect x="42" y="68" width="12" height="14" fill="#000" />
                      <rect x="64" y="72" width="24" height="8" fill="#000" />
                      <rect x="74" y="86" width="16" height="6" fill="#000" />
                    </svg>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-emerald)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <Zap size={15} /> Instant Zero-Touch UPI
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      Scan QR with Any UPI App
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '0.75rem' }}>
                      Scan using Google Pay, PhonePe, Paytm, or BHIM. Amount ₹{cartTotal.toLocaleString('en-IN')} will be pre-filled.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {['GPay', 'PhonePe', 'Paytm', 'Cred'].map(app => (
                        <span key={app} style={{
                          background: 'var(--bg-surface)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          border: '1px solid var(--border-subtle)'
                        }}>
                          {app}
                        </span>
                      ))}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      UPI ID: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>flowstate.orders@hdfcbank</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Tab with Interactive Visual Card Mock */}
              {paymentMethod === 'card' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  {/* Visual Card */}
                  <div style={{
                    width: '320px',
                    height: '180px',
                    borderRadius: '1.25rem',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)',
                    padding: '1.25rem',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-brand)',
                    marginBottom: '1rem',
                    margin: '0 auto 1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em' }}>FLOWSTATE PLATINUM</span>
                      <CreditCard size={24} />
                    </div>
                    <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                      {cardNumber}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <div>
                        <div style={{ opacity: 0.7, fontSize: '0.65rem' }}>CARD HOLDER</div>
                        <div style={{ fontWeight: 600 }}>{cardHolder}</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7, fontSize: '0.65rem' }}>EXPIRES</div>
                        <div style={{ fontWeight: 600 }}>{cardExpiry}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                    <input
                      type="text"
                      placeholder="Name on Card"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value)}
                      style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      maxLength={4}
                      style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>
                </div>
              )}

              {/* Other Methods */}
              {(paymentMethod === 'netbanking' || paymentMethod === 'paylater' || paymentMethod === 'cod') && (
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-sub)'
                }}>
                  {paymentMethod === 'cod' && (
                    <div>
                      <strong>Cash / UPI on Delivery:</strong> Pay ₹{cartTotal.toLocaleString('en-IN')} directly to the delivery partner via cash or UPI scan upon arrival.
                    </div>
                  )}
                  {paymentMethod === 'paylater' && (
                    <div>
                      <strong>Flowstate PayLater:</strong> Pre-approved credit limit of ₹25,000 available. Pay next month on the 5th with zero interest.
                    </div>
                  )}
                  {paymentMethod === 'netbanking' && (
                    <div>
                      <strong>All Major Banks Supported:</strong> HDFC, ICICI, SBI, Axis, Kotak. Secure redirection to bank gateway.
                    </div>
                  )}
                </div>
              )}

              {/* Order Confirmation CTA */}
              <button
                onClick={handleFinalOrderSubmit}
                className="btn btn-emerald btn-lg"
                style={{ width: '100%', borderRadius: '1rem', boxShadow: 'var(--shadow-emerald)' }}
              >
                <CheckCircle2 size={20} />
                <span>Confirm & Place Order (₹{cartTotal.toLocaleString('en-IN')})</span>
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                By placing this order you agree to FLOWSTATE Terms of Service & Privacy Policy.
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
