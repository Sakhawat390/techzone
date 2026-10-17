import React, { useMemo, useState } from 'react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge: string;
  tone: string;
  art: string;
  rating: string;
  description: string;
};

const initialProducts: Product[] = [
  { id: 1, name: 'AeroBook 14', category: 'Computers', price: 899, oldPrice: 999, badge: 'BESTSELLER', tone: 'violet', art: 'laptop', rating: '4.9', description: 'A light, capable everyday laptop with a crisp display and all-day battery.' },
  { id: 2, name: 'Pulse Studio', category: 'Audio', price: 189, badge: 'NEW DROP', tone: 'lime', art: 'headphones', rating: '4.8', description: 'Comfort-first wireless headphones for focused work and long playlists.' },
  { id: 3, name: 'Orbit Watch S', category: 'Wearables', price: 229, oldPrice: 269, badge: '−15%', tone: 'blue', art: 'watch', rating: '4.7', description: 'A clean, bright smartwatch designed to keep your day in view.' },
  { id: 4, name: 'Arc Mechanical 75', category: 'Accessories', price: 119, badge: 'STAFF PICK', tone: 'pink', art: 'keyboard', rating: '4.9', description: 'A compact mechanical keyboard with a satisfying tactile feel.' },
  { id: 5, name: 'Nova Pocket Pro', category: 'Computers', price: 649, badge: 'JUST LANDED', tone: 'cyan', art: 'phone', rating: '4.6', description: 'A pocket-sized powerhouse with a vivid screen and fast charging.' },
  { id: 6, name: 'Wave Mini', category: 'Audio', price: 79, badge: 'EVERYDAY', tone: 'orange', art: 'speaker', rating: '4.7', description: 'Big, balanced sound in a small speaker that goes wherever you do.' },
];

const categories = ['All gear', 'Computers', 'Audio', 'Wearables', 'Accessories'];
type CartItem = { product: Product; quantity: number };

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  if (name === 'search') return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.3 4.3"/></svg>;
  if (name === 'bag') return <svg {...shared}><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
  if (name === 'arrow') return <svg {...shared}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
  if (name === 'spark') return <svg {...shared}><path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/></svg>;
  return <svg {...shared}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

function ProductArt({ kind }: { kind: string }) {
  return <div className={`product-art art-${kind}`} aria-hidden="true"><span className="art-glow"/><span className="device-shape"><i/><b/><em/></span><span className="art-floor"/></div>;
}

function ProductCard({ product, onAdd, onDetails }: { product: Product; onAdd: (product: Product) => void; onDetails: (product: Product) => void }) {
  return <article className="product-card">
    <div className={`product-stage tone-${product.tone}`} onClick={() => onDetails(product)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onDetails(product); }} aria-label={`View ${product.name}`}>
      <span className="product-badge">{product.badge}</span><button className="quick-view" onClick={(event) => { event.stopPropagation(); onDetails(product); }} aria-label={`Quick view ${product.name}`}>↗</button>
      <ProductArt kind={product.art}/>
    </div>
    <div className="product-details"><div className="product-heading"><div><span className="product-category">{product.category}</span><h3>{product.name}</h3></div><span className="rating">★ {product.rating}</span></div>
      <p className="product-desc">{product.description}</p><div className="product-buy"><span className="price">${product.price.toFixed(2)}{product.oldPrice && <del>${product.oldPrice.toFixed(2)}</del>}</span><button className="add-button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}>Add to bag <span>＋</span></button></div>
    </div>
  </article>;
}

export default function App() {
  const [products] = useState(initialProducts);
  const [category, setCategory] = useState('All gear');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState<'account' | 'admin' | 'checkout' | null>(null);
  const [detail, setDetail] = useState<Product | null>(null);
  const [toast, setToast] = useState('');
  const [email, setEmail] = useState('');

  const visibleProducts = useMemo(() => products.filter((product) => (category === 'All gear' || product.category === category) && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.toLowerCase())), [products, category, query]);
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const announce = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2400); };
  const addToCart = (product: Product) => {
    setCart((items) => {
      const current = items.find((item) => item.product.id === product.id);
      return current ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { product, quantity: 1 }];
    });
    announce(`${product.name} added to your bag`);
  };
  const changeQuantity = (id: number, amount: number) => setCart((items) => items.map((item) => item.product.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  const placeDemoOrder = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setCart([]); setModal(null); announce('Demo order complete — checkout is a preview'); };

  return <div className="storefront" id="top">
    <div className="announcement"><Icon name="spark" size={13}/><span>THE GOOD STUFF, WITHOUT THE GUESSWORK</span><i/>Thoughtfully picked tech <a href="#shop">Shop the edit <Icon name="arrow" size={13}/></a></div>
    <header className="site-header"><a href="#top" className="wordmark" aria-label="Techzone home"><span className="logo-symbol">T<span>.</span></span><span>TECH<span>ZONE</span></span></a>
      <nav className="main-links" aria-label="Main navigation"><a href="#shop">Shop all</a><a href="#categories">Categories</a><a href="#story">Our standard</a></nav>
      <div className="header-actions"><label className="search-box"><Icon name="search" size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your next favorite" aria-label="Search products"/></label><button className="account-button" onClick={() => setModal('account')} aria-label="Open account"><Icon name="user" size={18}/></button><button className="bag-button" onClick={() => setCartOpen(true)}><Icon name="bag" size={18}/><span>Bag</span><b>{count}</b></button></div>
    </header>
    <main>
      <section className="hero-banner wrap"><div className="hero-copy"><span className="eyebrow"><i/> THE TECHZONE EDIT · 2026</span><h1>Find your next<br/>favorite <span>thing.</span></h1><p>Smart picks for the way you work, play, and make things happen. Good tech should feel exciting before you even switch it on.</p><div className="hero-ctas"><a className="button button-lime" href="#shop">Explore the collection <Icon name="arrow" size={16}/></a><span className="ship-note"><span>↗</span> Curated with care</span></div><div className="hero-proof"><div className="proof-avatars"><i>T</i><i>Z</i><i>+</i></div><span>YOUR DAILY DOSE OF<br/><b>GOOD TECHNOLOGY</b></span><span className="proof-stars">★★★★★</span></div></div>
        <div className="hero-showcase"><div className="hero-arc arc-one"/><div className="hero-arc arc-two"/><div className="hero-label label-top"><span>01 / FEATURED</span><span>TECHZONE SELECTS</span></div><div className="hero-device"><div className="hero-device-screen"><div className="screen-light"/><span>Make room<br/>for what’s next.</span><i>TECHZONE / 01</i></div><div className="hero-device-base"/></div><div className="floating-note note-quality"><span>✦</span><b>Built for your everyday</b><small>Thoughtful picks, no noise</small></div><div className="floating-note note-category"><small>CURATED COLLECTION</small><b>New energy.<br/>Same great tech.</b><a href="#shop">See what’s new ↗</a></div><div className="hero-label label-bottom"><span>TECH THAT FITS YOUR LIFE</span><span>↘ SCROLL TO EXPLORE</span></div></div>
      </section>

      <section className="benefit-row wrap"><div><span className="benefit-icon">✦</span><span><b>Picked with purpose</b><small>Gear that earns its place</small></span></div><div><span className="benefit-icon">↗</span><span><b>Easy to explore</b><small>Clear choices, no clutter</small></span></div><div><span className="benefit-icon">◎</span><span><b>Made for real life</b><small>Work, play, and everything</small></span></div><div className="benefit-tag">A LITTLE MORE<br/><strong>TECH, A LOT LESS NOISE.</strong></div></section>

      <section className="shop-section wrap" id="shop"><div className="section-head"><div><span className="eyebrow"><i/> THE GOOD STUFF</span><h2>Shop the <span>collection.</span></h2></div><a href="#categories" className="underlink">Browse categories <Icon name="arrow" size={15}/></a></div>
        <div className="shop-controls" id="categories"><div className="category-tabs" role="tablist" aria-label="Filter by category">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="result-count">{visibleProducts.length} PICKS <i/> UPDATED OFTEN</span></div>
        {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onDetails={setDetail}/>)}</div> : <div className="empty-results"><span>⌕</span><b>No gear found</b><p>Try another search or browse all gear.</p><button onClick={() => { setQuery(''); setCategory('All gear'); }}>Reset filters</button></div>}
      </section>

      <section className="story-section wrap" id="story"><div className="story-art"><div className="story-orbit orbit-large"/><div className="story-orbit orbit-small"/><div className="story-sun"/><div className="story-micro">TZ / FIELD NOTES<br/>EST. FOR THE CURIOUS</div><div className="story-stamp">GOOD TECH<br/><b>GOOD ENERGY</b></div></div><div className="story-copy"><span className="eyebrow"><i/> WHAT WE BELIEVE</span><h2>Less scrolling.<br/><span>More discovering.</span></h2><p>Techzone is a little corner for the tools that make everyday life more interesting. We’re here for thoughtful picks, clear details, and the fun of finding something that just clicks.</p><a href="#shop" className="button button-outline">Meet your next favorite <Icon name="arrow" size={16}/></a></div></section>

      <section className="newsletter wrap"><div><span className="eyebrow"><i/> THE TECHZONE SIGNAL</span><h2>Good finds, once in a while.</h2><p>A tiny note when something worth seeing lands.</p></div><form onSubmit={(event) => { event.preventDefault(); announce('Thanks — newsletter signup is a preview'); setEmail(''); }}><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required/><button type="submit">Count me in <Icon name="arrow" size={15}/></button></form><span className="newsletter-orb"/></section>
    </main>
    <footer className="site-footer wrap"><a href="#top" className="wordmark"><span className="logo-symbol">T<span>.</span></span><span>TECH<span>ZONE</span></span></a><p>Find the gear. Find your thing.</p><div className="footer-links"><a href="#shop">Shop</a><button onClick={() => setModal('account')}>Account</button><button onClick={() => setModal('admin')}>Admin preview</button></div><span className="copyright">© {new Date().getFullYear()} TECHZONE · BUILT FOR THE CURIOUS</span></footer>

    {cartOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}><aside className="cart-drawer" aria-label="Shopping bag"><div className="drawer-head"><div><span className="eyebrow"><i/> YOUR PICKS</span><h2>Your bag <span>({count})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>{cart.length ? <><div className="cart-list">{cart.map((item) => <div className="cart-line" key={item.product.id}><div className={`cart-thumb tone-${item.product.tone}`}><ProductArt kind={item.product.art}/></div><div className="cart-line-info"><b>{item.product.name}</b><small>{item.product.category}</small><div className="quantity-control"><button onClick={() => changeQuantity(item.product.id, -1)} aria-label={`Remove one ${item.product.name}`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.product.id, 1)} aria-label={`Add one ${item.product.name}`}>+</button></div></div><strong>${(item.product.price * item.quantity).toFixed(2)}</strong></div>)}</div><div className="drawer-summary"><div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><small>Shipping and taxes are shown at checkout.</small><button className="button button-lime checkout-button" onClick={() => { setCartOpen(false); setModal('checkout'); }}>Continue to checkout <Icon name="arrow" size={16}/></button></div></> : <div className="empty-cart"><span className="empty-bag">⌑</span><h3>Your next favorite<br/>is out there.</h3><p>Your bag is waiting for a little something.</p><button className="button button-lime" onClick={() => setCartOpen(false)}>Explore the collection <Icon name="arrow" size={15}/></button></div>}</aside></div>}

    {detail && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setDetail(null); }}><section className="detail-modal"><button className="close-button modal-close" onClick={() => setDetail(null)} aria-label="Close details">×</button><div className={`detail-stage tone-${detail.tone}`}><ProductArt kind={detail.art}/></div><div className="detail-copy"><span className="eyebrow"><i/> {detail.category.toUpperCase()} / TECHZONE PICK</span><h2>{detail.name}</h2><p>{detail.description}</p><div className="detail-rating">★★★★★ <span>{detail.rating} / 5 · DEMO CATALOG</span></div><div className="detail-price">${detail.price.toFixed(2)}</div><button className="button button-lime" onClick={() => { addToCart(detail); setDetail(null); }}>Add to bag <Icon name="bag" size={16}/></button></div></section></div>}

    {modal && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}><section className="form-modal"><button className="close-button modal-close" onClick={() => setModal(null)} aria-label="Close dialog">×</button><span className="eyebrow"><i/> {modal === 'account' ? 'YOUR TECHZONE' : modal === 'admin' ? 'STORE TOOLS' : 'ALMOST THERE'}</span><h2>{modal === 'account' ? 'Welcome back.' : modal === 'admin' ? 'Admin preview.' : 'Checkout preview.'}</h2>{modal === 'account' ? <form onSubmit={(event) => { event.preventDefault(); setModal(null); announce('Account sign-in is a preview until the API is connected'); }}><label>Email address<input type="email" placeholder="you@example.com" required/></label><label>Password<input type="password" placeholder="••••••••" required/></label><button className="button button-lime" type="submit">Sign in <Icon name="arrow" size={15}/></button><p className="form-note">Account screens are a frontend preview; connect the authentication API to enable sign-in.</p></form> : modal === 'admin' ? <div className="admin-preview"><div><span>CATALOG PICKS</span><b>{products.length}</b></div><div><span>ITEMS IN BAG</span><b>{count}</b></div><p>The README describes product management and order processing. These controls are a visual preview; the existing admin API still needs to be connected here.</p><button className="button button-outline" onClick={() => setModal(null)}>Back to the store <Icon name="arrow" size={15}/></button></div> : <form onSubmit={placeDemoOrder}><p className="checkout-note">This is a demo checkout. No payment details are collected or charged.</p><label>Name<input type="text" placeholder="Your name" required/></label><label>Email<input type="email" placeholder="you@example.com" required/></label><div className="checkout-total"><span>Order total</span><b>${subtotal.toFixed(2)}</b></div><button className="button button-lime" type="submit">Place demo order <Icon name="arrow" size={15}/></button></form>}</section></div>}
    <div className={`toast ${toast ? 'show' : ''}`} role="status"><span>✓</span>{toast}</div>
  </div>;
}

