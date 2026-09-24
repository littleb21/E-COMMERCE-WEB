import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { categories } from '../data/mockData';
import { 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  RotateCcw, 
  Zap, 
  Star, 
  Search, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ProductListing: React.FC = () => {
  const { 
    productsList, 
    filterState, 
    setFilterState, 
    resetFilters,
    openProductDetail,
    addToCart
  } = useStore();

  // Apply all active filters
  const filteredProducts = productsList.filter(product => {
    // Category filter
    if (filterState.category !== 'all' && product.categoryId !== filterState.category) {
      return false;
    }
    // Subcategory filter
    if (filterState.subcategory !== 'all' && product.subcategory !== filterState.subcategory) {
      return false;
    }
    // Price range
    if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
      return false;
    }
    // Min Rating
    if (filterState.minRating > 0 && product.rating < filterState.minRating) {
      return false;
    }
    // Min Discount
    if (filterState.minDiscount > 0 && product.discountPercent < filterState.minDiscount) {
      return false;
    }
    // Nearby Only
    if (filterState.nearbyOnly && !product.isNearbyAvailable) {
      return false;
    }
    // In Stock Only
    if (filterState.inStockOnly && !product.inStock) {
      return false;
    }
    // Max Delivery Time
    if (filterState.nearbyOnly && product.deliveryEstimateMinutes > filterState.maxDeliveryTime) {
      return false;
    }
    // Search Query
    if (filterState.searchQuery.trim() !== '') {
      const q = filterState.searchQuery.toLowerCase();
      const match = 
        product.title.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.categoryId.toLowerCase().includes(q) ||
        product.subcategory.toLowerCase().includes(q) ||
        product.tags.some(tag => tag.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filterState.sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discountPercent - a.discountPercent;
      case 'delivery_speed':
        return a.deliveryEstimateMinutes - b.deliveryEstimateMinutes;
      case 'popularity':
      case 'relevance':
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const activeCategoryObj = categories.find(c => c.id === filterState.category);

  return (
    <div style={{ padding: '2rem 0', background: 'var(--bg-app)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Breadcrumb & Title Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>Home</span>
            <ChevronRight size={14} />
            <span>Store</span>
            {activeCategoryObj && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{activeCategoryObj.name}</span>
              </>
            )}
            {filterState.searchQuery && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>"{filterState.searchQuery}"</span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {activeCategoryObj ? activeCategoryObj.name : filterState.searchQuery ? `Results for "${filterState.searchQuery}"` : 'All Products'}
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing {sortedProducts.length} verified products from global marketplace and local neighborhood hubs
              </p>
            </div>

            {/* Quick View Controls & Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              
              {/* Sort By Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sort By:</span>
                <select
                  value={filterState.sortBy}
                  onChange={e => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="popularity">Popularity</option>
                  <option value="delivery_speed">⚡ Fastest Delivery</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div style={{
                display: 'flex',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '2px'
              }}>
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'grid' }))}
                  style={{
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    background: filterState.viewMode === 'grid' ? 'var(--bg-surface-elevated)' : 'transparent',
                    color: filterState.viewMode === 'grid' ? 'var(--brand-primary)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                  title="Grid View"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'list' }))}
                  style={{
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    background: filterState.viewMode === 'list' ? 'var(--bg-surface-elevated)' : 'transparent',
                    color: filterState.viewMode === 'list' ? 'var(--brand-primary)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                  title="List View"
                >
                  <List size={18} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Main Body: Filter Sidebar + Products Stream */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Filter Sidebar */}
          <aside style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1.25rem',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
                <SlidersHorizontal size={18} color="var(--brand-primary)" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetFilters}
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--brand-rose)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            {/* Hyperlocal Nearby Toggle */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '0.85rem',
              padding: '0.85rem',
              marginBottom: '1.5rem'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={16} color="var(--brand-emerald)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-emerald)' }}>
                    Nearby Instant (10-15m)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={filterState.nearbyOnly}
                  onChange={e => setFilterState(prev => ({ ...prev, nearbyOnly: e.target.checked }))}
                  style={{ accentColor: 'var(--brand-emerald)', width: '16px', height: '16px' }}
                />
              </label>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-sub)', marginTop: '0.35rem' }}>
                Show only products ready for immediate courier pickup in your locality.
              </div>
            </div>

            {/* Department Categories */}
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                Department
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, category: 'all', subcategory: 'all' }))}
                  style={{
                    textAlign: 'left',
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.825rem',
                    fontWeight: filterState.category === 'all' ? 700 : 500,
                    color: filterState.category === 'all' ? 'var(--brand-primary)' : 'var(--text-sub)',
                    background: filterState.category === 'all' ? 'var(--bg-surface-elevated)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  All Categories ({productsList.length})
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setFilterState(prev => ({ ...prev, category: c.id, subcategory: 'all' }))}
                    style={{
                      textAlign: 'left',
                      padding: '0.35rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.825rem',
                      fontWeight: filterState.category === c.id ? 700 : 500,
                      color: filterState.category === c.id ? 'var(--brand-primary)' : 'var(--text-sub)',
                      background: filterState.category === c.id ? 'var(--bg-surface-elevated)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Max Price</span>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                  ₹{filterState.maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={150000}
                step={500}
                value={filterState.maxPrice}
                onChange={e => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>₹0</span>
                <span>₹1,50,000</span>
              </div>
            </div>

            {/* Minimum Discount Filter */}
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Discount
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[0, 10, 20, 30, 40].map(disc => (
                  <button
                    key={disc}
                    onClick={() => setFilterState(prev => ({ ...prev, minDiscount: disc }))}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: filterState.minDiscount === disc ? 700 : 500,
                      color: filterState.minDiscount === disc ? '#fff' : 'var(--text-sub)',
                      background: filterState.minDiscount === disc ? 'var(--brand-rose)' : 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    {disc === 0 ? 'All' : `${disc}%+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Customer Rating
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { label: '4★ and above', val: 4.0 },
                  { label: '4.5★ and above', val: 4.5 },
                  { label: 'All Ratings', val: 0 }
                ].map(r => (
                  <button
                    key={r.label}
                    onClick={() => setFilterState(prev => ({ ...prev, minRating: r.val }))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: filterState.minRating === r.val ? 700 : 500,
                      color: filterState.minRating === r.val ? 'var(--brand-amber)' : 'var(--text-sub)',
                      background: filterState.minRating === r.val ? 'var(--bg-surface-elevated)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <Star size={14} fill={filterState.minRating === r.val ? 'var(--brand-amber)' : 'none'} />
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Items Display Area */}
          <div>
            {sortedProducts.length === 0 ? (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '1.5rem',
                padding: '3rem 2rem',
                textAlign: 'center'
              }}>
                <Search size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  No products matched your filters
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Try resetting the price, clearing search terms, or turning off the nearby filter.
                </p>
                <button onClick={resetFilters} className="btn btn-primary" style={{ borderRadius: '9999px' }}>
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            ) : filterState.viewMode === 'grid' ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.25rem'
              }}>
                {sortedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              /* List View */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sortedProducts.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => openProductDetail(prod)}
                    className="flow-card"
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      gap: '1.5rem',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '1rem',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>
                          {prod.brand}
                        </span>
                        {prod.isNearbyAvailable && (
                          <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                            ⚡ {prod.deliveryEstimateMinutes}m delivery
                          </span>
                        )}
                        {prod.discountPercent > 0 && (
                          <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>
                            {prod.discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        {prod.title}
                      </h3>

                      <p style={{
                        fontSize: '0.825rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.75rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {prod.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice > prod.price && (
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span style={{ fontSize: '0.8rem', color: 'var(--brand-amber)', fontWeight: 700 }}>
                          ★ {prod.rating} ({prod.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          addToCart(prod, 1);
                        }}
                        className="btn btn-emerald btn-sm"
                        style={{ borderRadius: '8px' }}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          openProductDetail(prod);
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ borderRadius: '8px' }}
                      >
                        Details
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
