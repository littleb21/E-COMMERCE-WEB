import React from 'react';
import { useStore } from '../context/StoreContext';
import { sampleRewards, sampleSuperCoinTransactions } from '../data/mockData';
import { 
  Coins, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Gift, 
  Lock, 
  ArrowUpRight, 
  Clock, 
  Zap,
  ShoppingBag,
  Award,
  ChevronRight
} from 'lucide-react';

export const SuperCoinsRewards: React.FC = () => {
  const { user, claimDailyStreak, addToast, applyCoupon, setIsCartOpen } = useStore();

  const handleRedeemVoucher = (code: string, coinsCost: number) => {
    if (user.superCoins < coinsCost) {
      addToast('Insufficient Coins', `You need ${coinsCost} Super Coins to unlock this reward.`, 'warning');
      return;
    }
    applyCoupon(code);
    setIsCartOpen(true);
    addToast('Reward Unlocked! 🎁', `Voucher ${code} applied to your cart.`, 'success');
  };

  return (
    <div style={{ padding: '2rem 0', background: 'var(--bg-app)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        {/* Hub Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          borderRadius: '1.75rem',
          padding: '2.5rem',
          border: '1px solid var(--border-highlight)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle gold glow */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                  <Coins size={13} /> FLOWSTATE REWARDS
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tier: Platinum Club Member</span>
              </div>

              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                Flowstate Super Coins
              </h1>

              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', maxWidth: '540px' }}>
                Earn coins on every purchase, daily login, and verified review. Redeem instantly at checkout (1 Coin = ₹1).
              </p>
            </div>

            {/* Coins Balance Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '1.5rem',
              padding: '1.5rem 2rem',
              textAlign: 'center',
              minWidth: '220px'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#fef08a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Available Coins
              </div>
              <div style={{
                fontSize: '2.75rem',
                fontWeight: 900,
                color: 'var(--brand-amber)',
                lineHeight: 1.1,
                margin: '0.25rem 0'
              }}>
                {user.superCoins.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Worth ₹{user.superCoins.toLocaleString('en-IN')} in instant savings
              </div>
            </div>
          </div>

          {/* 4 Stats Chips */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1.5rem',
            position: 'relative',
            zIndex: 2
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Lifetime Earned</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>2,450 🪙</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Coins Redeemed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>1,000 🪙</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Expiring on 31 Dec</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f43f5e' }}>80 🪙</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Daily Streak</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b' }}>Day {user.streakDays} 🔥</div>
            </div>
          </div>

        </div>

        {/* Daily Streak Check-in Card */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: '1.25rem',
          padding: '1.5rem',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '1rem',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-amber)'
            }}>
              <Flame size={28} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                Day {user.streakDays} Daily Check-In Streak
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Check in daily to earn coins. Reach Day 7 for a 100 Coin jackpot bonus!
              </div>
            </div>
          </div>

          <button
            onClick={claimDailyStreak}
            className="btn btn-emerald btn-lg"
            style={{ borderRadius: '9999px', boxShadow: 'var(--shadow-emerald)' }}
          >
            <Sparkles size={18} />
            <span>Claim +25 Super Coins Today</span>
          </button>
        </div>

        {/* Redeemable Rewards Catalog */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Redeem Rewards & Vouchers
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Exchange your Super Coins for discount vouchers, partner brand passes, and free gifts.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {sampleRewards.map(reward => {
              const canAfford = user.superCoins >= reward.coinsCost;

              return (
                <div
                  key={reward.id}
                  className="flow-card"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                        {reward.coinsCost} Coins
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exp: {reward.expiryDate}</span>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      {reward.title}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '1rem', lineHeight: 1.4 }}>
                      {reward.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRedeemVoucher(reward.code, reward.coinsCost)}
                    className={canAfford ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                    style={{ width: '100%', borderRadius: '8px' }}
                    disabled={!canAfford}
                  >
                    {canAfford ? (
                      <>
                        <Gift size={15} />
                        <span>Redeem with {reward.coinsCost} Coins</span>
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        <span>Need {reward.coinsCost - user.superCoins} More Coins</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coins Activity History */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: '1.25rem',
          border: '1px solid var(--border-subtle)',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Recent Coins Activity
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sampleSuperCoinTransactions.map(tx => (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    {tx.reason}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date}</div>
                </div>

                <div style={{
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: tx.type === 'earned' ? 'var(--brand-emerald)' : 'var(--brand-rose)'
                }}>
                  {tx.type === 'earned' ? `+${tx.amount}` : `-${tx.amount}`} Coins
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
