import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, Cookie, Download, Bell, Lock } from 'lucide-react';

export const PrivacyCenterModal: React.FC = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen, addToast } = useStore();

  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false
  });

  const [marketingPrefs, setMarketingPrefs] = useState({
    emailDiscounts: true,
    whatsappUpdates: true,
    pushAlerts: true
  });

  if (!isPrivacyModalOpen) return null;

  const handleDownloadData = () => {
    addToast('Data Export Initiated', 'An encrypted archive of your account data is being compiled and sent to your email.', 'success');
  };

  const handleSavePreferences = () => {
    addToast('Privacy Settings Saved', 'Your privacy and cookie configurations have been updated.', 'success');
    setIsPrivacyModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPrivacyModalOpen(false)}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '1.75rem',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={22} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Privacy & Consent Center
            </h3>
          </div>
          <button
            onClick={() => setIsPrivacyModalOpen(false)}
            style={{ padding: '0.4rem', borderRadius: '50%', color: 'var(--text-sub)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          You have complete ownership over your personal information, telemetry, and location permissions on FLOWSTATE.
        </p>

        {/* Cookie Settings */}
        <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: '1rem', padding: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cookie size={16} color="var(--brand-amber)" /> Cookie Preferences
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'not-allowed' }}>
              <span>Essential Cookies (Cart, Security, Auth)</span>
              <input type="checkbox" checked disabled style={{ accentColor: 'var(--brand-primary)' }} />
            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>Analytics & Hyperlocal Route Optimization</span>
              <input
                type="checkbox"
                checked={cookieSettings.analytics}
                onChange={e => setCookieSettings({ ...cookieSettings, analytics: e.target.checked })}
                style={{ accentColor: 'var(--brand-primary)' }}
              />
            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>Personalized Brand Offers & Deals</span>
              <input
                type="checkbox"
                checked={cookieSettings.marketing}
                onChange={e => setCookieSettings({ ...cookieSettings, marketing: e.target.checked })}
                style={{ accentColor: 'var(--brand-primary)' }}
              />
            </label>
          </div>
        </div>

        {/* Communications */}
        <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: '1rem', padding: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Bell size={16} color="var(--brand-primary)" /> Notifications & Channels
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>WhatsApp Live Rider ETA & Status</span>
              <input
                type="checkbox"
                checked={marketingPrefs.whatsappUpdates}
                onChange={e => setMarketingPrefs({ ...marketingPrefs, whatsappUpdates: e.target.checked })}
                style={{ accentColor: 'var(--brand-emerald)' }}
              />
            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>Super Coins Expiry & Price Drop Alerts</span>
              <input
                type="checkbox"
                checked={marketingPrefs.pushAlerts}
                onChange={e => setMarketingPrefs({ ...marketingPrefs, pushAlerts: e.target.checked })}
                style={{ accentColor: 'var(--brand-primary)' }}
              />
            </label>
          </div>
        </div>

        {/* Data Portability */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Download My Data</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Get a JSON copy of your orders and coins history</div>
          </div>
          <button
            onClick={handleDownloadData}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '8px' }}
          >
            <Download size={14} /> Export JSON
          </button>
        </div>

        {/* Save button */}
        <button
          onClick={handleSavePreferences}
          className="btn btn-primary"
          style={{ width: '100%', borderRadius: '1rem' }}
        >
          Save Privacy Settings
        </button>

      </div>
    </div>
  );
};
