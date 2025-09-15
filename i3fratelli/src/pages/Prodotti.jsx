import React, { useState, useEffect } from 'react';
import MetaTags from '../components/seo/MetaTags';
import { LazyPicture } from '../components/performance/LazyImage';
import prodotti from '../data/prodotti.json';
import config from '../data/config.json';
import './Prodotti.css';
const Prodotti = () => {
const [selectedCategory, setSelectedCategory] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [filteredProducts, setFilteredProducts] = useState(prodotti.products);
const [showNightOnly, setShowNightOnly] = useState(false);
// Check if it's night time
const isNightTime = new Date().getHours() >= 22 || new Date().getHours() < 5;
useEffect(() => {
// Filtra prodotti
let filtered = prodotti.products;
// Filtra per categoria
if (selectedCategory !== 'all') {
  filtered = filtered.filter(p => p.category === selectedCategory);
}

// Filtra per ricerca
if (searchQuery) {
  filtered = filtered.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

// Filtra per disponibilità notturna
if (showNightOnly) {
  filtered = filtered.filter(p => 
    p.availability === 'night' || p.availability === 'always'
  );
}

setFilteredProducts(filtered);
}, [selectedCategory, searchQuery, showNightOnly]);
return (
<>
<MetaTags
     title="I Nostri Pani | Catalogo Prodotti"
     description="Pane artigianale con lievito madre centenario. Sfornato 24 ore su 24. Specialità notturne e linea ristoranti."
     keywords="pane artigianale milano, lievito madre, pane 24h, michette notturne"
   />
  {/* Hero Section */}
  <section className="products-hero">
    <div className="container">
      <h1 className="hero-title">I Nostri Pani</h1>
      <p className="hero-subtitle">
        Sfornati con amore, 24 ore su 24, con lo stesso lievito madre dal 1920
      </p>
      
      {isNightTime && (
        <div className="night-banner">
          <span className="night-icon">🌙</span>
          <span>Prodotti notturni disponibili ora!</span>
        </div>
      )}
    </div>
  </section>

  {/* Filters Section */}
  <section className="products-filters">
    <div className="container">
      <div className="filters-wrapper">
        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Cerca un prodotto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        {/* Category Filters */}
        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Tutti ({prodotti.products.length})
          </button>
          
          {prodotti.categories.map(category => {
            const count = prodotti.products.filter(p => p.category === category.id).length;
            return (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name} ({count})
              </button>
            );
          })}
        </div>
        
        {/* Special Filters */}
        <div className="special-filters">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={showNightOnly}
              onChange={(e) => setShowNightOnly(e.target.checked)}
            />
            <span>🌙 Solo prodotti notturni</span>
          </label>
        </div>
      </div>
      
      <div className="results-count">
        Trovati <strong>{filteredProducts.length}</strong> prodotti
      </div>
    </div>
  </section>

  {/* Products Grid */}
  <section className="products-grid-section">
    <div className="container">
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>Nessun prodotto trovato</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setShowNightOnly(false);
            }}
            className="btn btn-outline"
          >
            Mostra tutti i prodotti
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <article key={product.id} className="product-card">
              {/* Badge */}
              {product.featured && (
                <span className="product-badge featured">⭐ In Evidenza</span>
              )}
              {product.availability === 'night' && (
                <span className="product-badge night">🌙 Notturno</span>
              )}
              {product.b2b && (
                <span className="product-badge b2b">🏢 B2B</span>
              )}
              
              {/* Image */}
              <div className="product-image-wrapper">
                <LazyPicture
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              
              {/* Content */}
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                {/* Ingredients */}
                {product.ingredients && (
                  <div className="product-ingredients">
                    <strong>Ingredienti:</strong>
                    <p>{product.ingredients.join(', ')}</p>
                  </div>
                )}
                
                {/* Story */}
                {product.story && (
                  <p className="product-story">
                    <em>"{product.story}"</em>
                  </p>
                )}
                
                {/* Meta Info */}
                <div className="product-meta">
                  <div className="product-price">
                    <span className="price">€{product.price}</span>
                    <span className="unit">/{product.unit}</span>
                  </div>
                  
                  {product.shelfLife && (
                    <div className="shelf-life">
                      <span className="icon">⏱️</span>
                      <span>{product.shelfLife}</span>
                    </div>
                  )}
                </div>
                
                {/* Availability */}
                <div className="product-availability">
                  {product.availability === 'always' && (
                    <span className="availability always">
                      ✅ Sempre disponibile
                    </span>
                  )}
                  {product.availability === 'night' && (
                    <span className="availability night">
                      🌙 Disponibile {product.availableHours}
                    </span>
                  )}
                  {product.minOrder && (
                    <span className="min-order">
                      Min. ordine: {product.minOrder} pz
                    </span>
                  )}
                </div>
                
                {/* Allergens */}
                {product.allergens && (
                  <div className="product-allergens">
                    <strong>Allergeni:</strong> {product.allergens.join(', ')}
                  </div>
                )}
                
                {/* CTA */}
                <div className="product-cta">
                  <a 
                    href={`https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(`Vorrei ordinare: ${product.name}`)}`}
                    className="btn btn-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ordina su WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  </section>

  {/* Bundles Section */}
  {prodotti.bundles && prodotti.bundles.length > 0 && (
    <section className="bundles-section">
      <div className="container">
        <h2 className="section-title">Pacchetti Speciali</h2>
        
        <div className="bundles-grid">
          {prodotti.bundles.map(bundle => (
            <div key={bundle.id} className="bundle-card">
              <h3 className="bundle-name">{bundle.name}</h3>
              <p className="bundle-description">{bundle.description}</p>
              
              <div className="bundle-products">
                <strong>Include:</strong>
                <ul>
                  {bundle.products.map(productId => {
                    const product = prodotti.products.find(p => p.id === productId);
                    return product ? (
                      <li key={productId}>{product.name}</li>
                    ) : null;
                  })}
                </ul>
              </div>
              
              <div className="bundle-footer">
                <span className="bundle-price">€{bundle.price}</span>
                {bundle.deliveryTime && (
                  <span className="bundle-delivery">
                    🚚 {bundle.deliveryTime}
                  </span>
                )}
                {bundle.availableHours && (
                  <span className="bundle-hours">
                    🕐 {bundle.availableHours}
                  </span>
                )}
              </div>
              
              <a 
                href={`https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(`Vorrei ordinare il pacchetto: ${bundle.name}`)}`}
                className="btn btn-primary btn-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ordina Pacchetto
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )}

  {/* Info Section */}
  <section className="products-info">
    <div className="container">
      <div className="info-grid">
        <div className="info-card">
          <span className="info-icon">🌾</span>
          <h3>Lievito Madre Centenario</h3>
          <p>Lo stesso lievito madre dal 1920, tramandato di generazione in generazione.</p>
        </div>
        
        <div className="info-card">
          <span className="info-icon">🕐</span>
          <h3>Sfornato 24/7</h3>
          <p>Pane fresco ogni 2 ore, anche alle 3 di notte.</p>
        </div>
        
        <div className="info-card">
          <span className="info-icon">🚚</span>
          <h3>Consegna H24</h3>
          <p>Consegniamo sempre, emergenze in 30 minuti.</p>
        </div>
        
        <div className="info-card">
          <span className="info-icon">💝</span>
          <h3>Pane Sospeso</h3>
          <p>Paga un pane extra, lo daremo a chi ne ha bisogno.</p>
        </div>
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="products-cta">
    <div className="container">
      <div className="cta-box">
        <h2>Non Trovi Quello che Cerchi?</h2>
        <p>Produciamo anche su richiesta. Contattaci per ordini personalizzati!</p>
        <div className="cta-buttons">
          <a 
            href={`tel:${config.contact.phone.main}`}
            className="btn btn-primary"
          >
            📞 Chiamaci
          </a>
          <a 
            href={`https://wa.me/${config.contact.whatsapp.number}`}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</>
);
};
export default Prodotti;
