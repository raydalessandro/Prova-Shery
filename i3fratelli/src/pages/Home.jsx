import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LazyPicture } from '../components/performance/LazyImage';
import MetaTags from '../components/seo/MetaTags';
import config from '../data/config.json';
import testimonianze from '../data/testimonianze.json';
import prodotti from '../data/prodotti.json';
import './Home.css';
const Home = () => {
const [currentTime, setCurrentTime] = useState(new Date());
const [heroMessage, setHeroMessage] = useState('');
useEffect(() => {
const updateTime = () => {
const now = new Date();
setCurrentTime(now);
  // Messaggio dinamico basato sull'ora
  const hour = now.getHours();
  if (hour >= 0 && hour < 5) {
    setHeroMessage('Mentre Milano dorme, noi impastiamo');
  } else if (hour >= 5 && hour < 9) {
    setHeroMessage('Il profumo del pane fresco ti aspetta');
  } else if (hour >= 9 && hour < 12) {
    setHeroMessage('Sforniamo continuamente per te');
  } else if (hour >= 12 && hour < 15) {
    setHeroMessage('Pane caldo per il tuo pranzo');
  } else if (hour >= 15 && hour < 18) {
    setHeroMessage('La merenda come la faceva la nonna');
  } else if (hour >= 18 && hour < 22) {
    setHeroMessage('Pane fresco per la tua cena');
  } else {
    setHeroMessage('Il forno non dorme mai');
  }
};

updateTime();
const interval = setInterval(updateTime, 60000);
return () => clearInterval(interval);
}, []);
// Prodotti in evidenza
const featuredProducts = prodotti.products.filter(p => p.featured).slice(0, 3);
// Testimonianze in evidenza
const featuredTestimonials = testimonianze.featured.slice(0, 3);
return (
<>
<MetaTags />
  {/* Hero Section */}
  <section className="hero">
    <div className="hero-background">
      <LazyPicture
        src="/images/hero/panificio-notte.jpg"
        alt="I 3 Fratelli - Panificio H24 Milano"
        priority={true}
        className="hero-image"
      />
      <div className="hero-overlay"></div>
    </div>
    
    <div className="hero-content">
      <div className="container">
        <div className="hero-text">
          <div className="hero-badge pulse">
            <span className="pulse-dot"></span>
            SEMPRE APERTI ORA
          </div>
          
          <h1 className="hero-title">
            Il Panificio che<br />
            <span className="highlight">Non Dorme Mai</span>
          </h1>
          
          <p className="hero-subtitle">
            {heroMessage}
          </p>
          
          <p className="hero-description">
            L'unico vero panificio di quartiere aperto 24 ore su 24 a Milano.
            Mani di granite, cuore di lievito, sempre al tuo servizio.
          </p>
          
          <div className="hero-cta">
            <a 
              href={`https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent('Vorrei ordinare del pane')}`}
              className="btn btn-primary btn-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon">💬</span>
              Ordina su WhatsApp
            </a>
            <Link to="/prodotti" className="btn btn-outline btn-large">
              Scopri i Nostri Pani
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Sempre Aperti</span>
            </div>
            <div className="stat">
              <span className="stat-number">360</span>
              <span className="stat-label">Giorni l'Anno</span>
            </div>
            <div className="stat">
              <span className="stat-number">30min</span>
              <span className="stat-label">Consegna</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* I 3 Simboli Section */}
  <section className="three-symbols">
    <div className="container">
      <h2 className="section-title">I Nostri 3 Pilastri</h2>
      <p className="section-subtitle">Non è marketing. È chi siamo.</p>
      
      <div className="symbols-grid">
        {/* Uomo di Granite */}
        <div className="symbol-card">
          <div className="symbol-icon">🗿</div>
          <h3>Uomini di Granite</h3>
          <p>Non siamo fatti di carne e ossa, ma delle granite che lavoriamo. Duri fuori, morbidi dentro.</p>
          <blockquote>"Veri uomini di granite" - Teresa, cliente</blockquote>
        </div>
        
        {/* Pane della Nonna */}
        <div className="symbol-card">
          <div className="symbol-icon">👵</div>
          <h3>Il Pane della Nonna</h3>
          <p>Stesso lievito madre dal 1920. Stessi gesti, stesso amore, stesso profumo di casa.</p>
          <blockquote>"Mi ricorda mia madre" - Marco, tassista</blockquote>
        </div>
        
        {/* 24H */}
        <div className="symbol-card highlight">
          <div className="symbol-icon">🌙</div>
          <h3>Il Forno che Non Dorme</h3>
          <p>Mentre Milano dorme, noi vegliamo. 24 ore su 24, 360 giorni l'anno.</p>
          <blockquote>"Un faro nella notte" - Laura, infermiera</blockquote>
        </div>
      </div>
    </div>
  </section>

  {/* Prodotti in Evidenza */}
  <section className="featured-products">
    <div className="container">
      <h2 className="section-title">I Nostri Pani Simbolo</h2>
      <p className="section-subtitle">Sfornati ogni 2 ore, sempre freschi</p>
      
      <div className="products-grid">
        {featuredProducts.map(product => (
          <div key={product.id} className="product-card">
            <LazyPicture
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="product-price">€{product.price}/{product.unit}</span>
                {product.availability === 'night' && (
                  <span className="product-badge night">🌙 Notturno</span>
                )}
                {product.availability === 'always' && (
                  <span className="product-badge always">24H</span>
                )}
              </div>
              {product.story && (
                <p className="product-story">{product.story}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="section-cta">
        <Link to="/prodotti" className="btn btn-primary">
          Vedi Tutto il Catalogo
        </Link>
      </div>
    </div>
  </section>

  {/* Servizio B2B Highlight */}
  <section className="b2b-highlight">
    <div className="container">
      <div className="b2b-content">
        <div className="b2b-text">
          <span className="b2b-badge">PER RISTORANTI</span>
          <h2>Il Fornitore che Non Ti Abbandona Mai</h2>
          <p className="b2b-lead">
            Finito il pane durante il servizio? Arriviamo in 30 minuti. 
            Anche alle 2 di notte. Anche di domenica.
          </p>
          <ul className="b2b-features">
            <li>✅ Consegne H24, 7 giorni su 7</li>
            <li>✅ Emergenze risolte in 30 minuti</li>
            <li>✅ Nessun ordine minimo per emergenze</li>
            <li>✅ Fatturazione mensile</li>
            <li>✅ Account manager dedicato</li>
          </ul>
          <div className="b2b-cta">
            <Link to="/b2b" className="btn btn-primary">
              Diventa Partner
            </Link>
            <a href={`tel:${config.contact.phone.b2b}`} className="btn btn-outline">
              Chiama Ora: {config.contact.phone.displayEmergency}
            </a>
          </div>
        </div>
        <div className="b2b-image">
          <LazyPicture
            src="/images/b2b/consegna-ristorante.jpg"
            alt="Consegne H24 per ristoranti"
            className="b2b-img"
          />
          <div className="b2b-stats">
            <div className="b2b-stat">
              <span className="number">127</span>
              <span className="label">Ristoranti Partner</span>
            </div>
            <div className="b2b-stat">
              <span className="number">1842</span>
              <span className="label">Emergenze Risolte</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Testimonianze */}
  <section className="testimonials">
    <div className="container">
      <h2 className="section-title">Cosa Dicono di Noi</h2>
      <p className="section-subtitle">
        ⭐ {config.testimonials.googleRating}/5 su Google 
        ({config.testimonials.googleReviews} recensioni)
      </p>
      
      <div className="testimonials-grid">
        {featuredTestimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-header">
              <div className="stars">
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <span className="testimonial-source">{testimonial.source}</span>
            </div>
            <blockquote className="testimonial-text">
              "{testimonial.text}"
            </blockquote>
            <div className="testimonial-footer">
              <strong>{testimonial.author}</strong>
              {testimonial.role && <span>{testimonial.role}</span>}
            </div>
            {testimonial.highlight && (
              <div className="testimonial-highlight">
                💬 "{testimonial.highlight}"
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="section-cta">
        <a 
          href={config.social.googleBusiness}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          Leggi Tutte le Recensioni
        </a>
      </div>
    </div>
  </section>

  {/* Call to Action Finale */}
  <section className="final-cta">
    <div className="container">
      <div className="cta-box">
        <h2>Hai Fame Ora?</h2>
        <p>Non importa che ore sono. Siamo aperti.</p>
        <div className="cta-time">
          <span className="current-time">
            Sono le {currentTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="status">e siamo APERTI</span>
        </div>
        <div className="cta-buttons">
          <a 
            href={`https://wa.me/${config.contact.whatsapp.number}`}
            className="btn btn-whatsapp btn-large"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Ordina su WhatsApp
          </a>
          <Link to="/contatti" className="btn btn-outline btn-large">
            📍 Come Arrivare
          </Link>
        </div>
        <p className="cta-info">
          📍 {config.contact.address.street}, {config.contact.address.zone}
        </p>
      </div>
    </div>
  </section>

  {/* Pane Sospeso Banner */}
  <div className="pane-sospeso-banner">
    <div className="container">
      <p>
        💝 <strong>Pane Sospeso Attivo:</strong> Paga un pane in più, 
        lo daremo a chi ne ha bisogno. Nessuna domanda, solo solidarietà.
      </p>
    </div>
  </div>
</>
);
};
export default Home;
