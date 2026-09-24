import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  Zap, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const HelpCenterModal: React.FC = () => {
  const { isHelpModalOpen, setIsHelpModalOpen, addToast } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'faq' | 'chat'>('faq');

  // Live Chat Simulator state
  const [chatMessages, setChatMessages] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: 'Hello Amreshwar! I am FlowBot, your FLOWSTATE 24/7 AI shopping assistant. How can I help you today?',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  if (!isHelpModalOpen) return null;

  const faqs = [
    {
      q: 'How does FLOWSTATE Nearby 10-Minute Delivery work?',
      a: 'When you place an order marked with the ⚡ Nearby badge, our platform immediately routes the order to the closest certified neighborhood store within a 3-5 km radius. A dedicated electric courier partner is dispatched to pick up the pre-packed thermal security bag and deliver it directly to your doorstep in 8 to 15 minutes.'
    },
    {
      q: 'How do I earn and redeem FLOWSTATE Super Coins?',
      a: 'You earn Super Coins automatically on every purchase (2% standard, 2x boost on nearby stores), verified reviews with photos (+50 coins), and daily login streaks (+25 coins). Coins can be redeemed 1:1 for instant rupee discounts in your shopping bag slider or exchanged in the Rewards Hub for brand vouchers.'
    },
    {
      q: 'What is the return and replacement policy?',
      a: 'We offer a hassle-free 7-day replacement guarantee on electronics and appliances for manufacturing defects, and a 10-day return policy on fashion and footwear. Fresh groceries have an instant on-the-spot replacement or immediate wallet refund.'
    },
    {
      q: 'What payment methods are supported?',
      a: 'We support all major payment modes including Instant UPI (Google Pay, PhonePe, Paytm, QR code), Credit and Debit Cards (Visa, Mastercard, RuPay), Net Banking with 50+ banks, Flowstate PayLater, and Cash on Delivery.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
    setChatInput('');

    // Generate responsive bot reply
    setTimeout(() => {
      let botReply = 'I understand your query. A dedicated customer support representative will follow up or you can check your live order in the Orders tab.';
      const lower = userText.toLowerCase();

      if (lower.includes('delivery') || lower.includes('time') || lower.includes('speed') || lower.includes('fast')) {
        botReply = 'Nearby deliveries are dispatched from local partner stores and typically arrive within 10 to 15 minutes. You can view the live courier location on the map in Track Order!';
      } else if (lower.includes('coins') || lower.includes('reward') || lower.includes('points')) {
        botReply = 'You can check your available Super Coins in the Rewards tab. Remember to claim your daily check-in streak for +25 coins today!';
      } else if (lower.includes('cancel') || lower.includes('return') || lower.includes('refund')) {
        botReply = 'You can easily cancel an order directly from the My Orders dashboard before courier dispatch, or request an instant return within 7-10 days.';
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply, time: 'Just now' }]);
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsHelpModalOpen(false)}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '680px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <HelpCircle size={22} color="var(--brand-primary)" />
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Help Center & Live Support
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                24/7 Customer Care • Instant Answers
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsHelpModalOpen(false)}
            style={{ padding: '0.4rem', borderRadius: '50%', color: 'var(--text-sub)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
          <button
            onClick={() => setActiveTab('faq')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: activeTab === 'faq' ? 'var(--brand-primary)' : 'var(--text-sub)',
              borderBottom: `2px solid ${activeTab === 'faq' ? 'var(--brand-primary)' : 'transparent'}`,
              cursor: 'pointer'
            }}
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: activeTab === 'chat' ? 'var(--brand-primary)' : 'var(--text-sub)',
              borderBottom: `2px solid ${activeTab === 'chat' ? 'var(--brand-primary)' : 'transparent'}`,
              cursor: 'pointer'
            }}
          >
            Live FlowBot Assistant
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
          
          {activeTab === 'faq' ? (
            <div>
              {/* Search Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-input)',
                borderRadius: '0.75rem',
                padding: '0.5rem 0.85rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem'
              }}>
                <Search size={16} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                <input
                  type="text"
                  placeholder="Search questions (orders, delivery, coins, returns)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', fontSize: '0.85rem' }}
                />
              </div>

              {/* FAQs Accordion */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = selectedFaq === idx;

                  return (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border-subtle)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => setSelectedFaq(isOpen ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0 1rem 0.85rem', fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct Support Channels */}
              <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={18} color="var(--brand-emerald)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toll-Free Helpline</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>1800-419-FLOW</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={18} color="var(--brand-primary)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Care</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>support@flowstate.in</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Live Chat Interface */
            <div style={{ display: 'flex', flexDirection: 'column', height: '360px' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem' }}>
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      background: msg.sender === 'user' ? 'var(--brand-primary)' : 'var(--bg-surface-elevated)',
                      color: msg.sender === 'user' ? '#fff' : 'var(--text-main)',
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      borderBottomRightRadius: msg.sender === 'user' ? '2px' : '1rem',
                      borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '1rem',
                      fontSize: '0.85rem',
                      lineHeight: 1.4
                    }}
                  >
                    <div>{msg.text}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.7, textAlign: 'right', marginTop: '2px' }}>
                      {msg.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <input
                  type="text"
                  placeholder="Ask a question about your order, delivery, or coins..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-input)',
                    borderRadius: '9999px',
                    padding: '0.55rem 1rem',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.85rem'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
