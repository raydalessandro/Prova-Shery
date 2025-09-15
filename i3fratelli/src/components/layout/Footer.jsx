import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../data/config.json';
import './Footer.css';
const Footer = () => {
const currentYear = new Date().getFullYear();
const currentHour = new Date().getHours();
const isNight = currentHour >= 22 || currentHour < 5;
return (
<footer className="footer" itemScope itemType="https://schema.org/LocalBusiness">
{/* Pre-footer CTA */}
<div className="footer-cta">
<div className="container">
<div className="cta-content">
<div className="cta-text">
<h2>{isNight ? "Hai fame ora? Siamo aperti!" : "Il pane non aspetta"}</h2>
<p>Consegne H24 • Emergenze in 30 minuti • Sempre freschi</p>
</div>
<div className="cta-buttons">
<a
href={tel:${config.contact.phone.main}}
className="btn btn-primary"
>
📞 Chiama Ora
</a>
<a
href={https://wa.me/${config.contact.whatsapp.number}}
className="btn btn-whatsapp"
target="_blank"
rel="noopener noreferrer"
>
💬 WhatsApp
</a>
</div>
</div>
</div>
</div>
  {/* Main Footer */}
  <div className="footer-main">
    <div className="container">
      <div className="footer-grid">
        
        {/* Colonna 1: Brand & Info */}
        <div className="footer-column">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span itemProp="name">I 3 Fratelli</span>
            </h3>
            <p className="footer-tagline" itemProp="description">
              L'unico vero panificio di quartiere H24 di Milano
            </p>
            <p className="footer-motto">
              "Mani di granite, cuore di lievito"
            </p>
          </div>
          
          <div className="footer-badges">
            <div className="badge-24h">
              <span className="pulse-dot"></span>
              SEMPRE APERTI 24/7
            </div>
            <div className="badge-rating">
              ⭐ {config.testimonials.googleRating}/5 
              <span>({config.testimonials.googleReviews} recensioni)</span>
            </div>
          </div>

          <div className="footer-social">
            <a 
              href={config.social.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <span>📘</span>
            </a>
            <a 
              href={config.social.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <span>📷</span>
            </a>
            <a 
              href={config.social.tiktok} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <span>🎵</span>
            </a>
            <a 
              href={config.social.googleBusiness} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Google Business"
            >
              <span>📍</span>
            </a>
          </div>
        </div>

        {/* Colonna 2: Collegamenti Rapidi */}
        <div className="footer-column">
          <h4 className="footer-title">Collegamenti Rapidi</h4>
          <nav className="footer-nav">
            <Link to="/chi-siamo">Chi Siamo</Link>
            <Link to="/prodotti">I Nostri Pani</Link>
            <Link to="/b2b" className="link-highlight">
              🏢 Per Ristoranti
            </Link>
            <Link to="/sempre-24h" className="link-special">
              🌙 Servizio H24
            </Link>
            <Link to="/blog">Blog & Storie</Link>
            <Link to="/contatti">Contatti & Orari</Link>
          </nav>
        </div>

        {/* Colonna 3: Servizi */}
        <div className="footer-column">
          <h4 className="footer-title">I Nostri Servizi</h4>
          <ul className="footer-services">
            <li>✅ Aperti 24 ore su 24</li>
            <li>🚚 Consegne notturne</li>
            <li>🆘 Emergenze in 30 min</li>
            <li>🏢 Forniture ristoranti</li>
            <li>🎂 Catering eventi</li>
            <li>💝 Pane sospeso attivo</li>
            <li>📦 Ordini personalizzati</li>
            <li>💳 Fatturazione mensile B2B</li>
          </ul>
        </div>

        {/* Colonna 4: Contatti */}
        <div className="footer-column">
          <h4 className="footer-title">Dove Siamo</h4>
          
          <address className="footer-address" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <p>
              <strong itemProp="streetAddress">{config.contact.address.street}</strong><br />
              <span itemProp="addressLocality">{config.contact.address.city}</span>, 
              <span itemProp="postalCode"> {config.contact.address.cap}</span><br />
              <span itemProp="addressRegion">{config.contact.address.zone}</span>
            </p>
          </address>

          <div className="footer-contacts">
            <p>
              <strong>Telefono:</strong><br />
              <a href={`tel:${config.contact.phone.main}`} itemProp="telephone">
                📞 {config.contact.phone.display}
              </a>
            </p>
            <p>
              <strong>Emergenze H24:</strong><br />
              <a href={`tel:${config.contact.phone.emergency}`} className="emergency-phone">
                🚨 {config.contact.phone.displayEmergency}
              </a>
            </p>
            <p>
              <strong>Email:</strong><br />
              <a href={`mailto:${config.contact.email.info}`} itemProp="email">
                ✉️ {config.contact.email.info}
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong><br />
              <a 
                href={`https://wa.me/${config.contact.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-contact"
              >
                💬 Ordina su WhatsApp
              </a>
            </p>
          </div>

          {/* Orari (sempre aperti!) */}
          <div className="footer-hours" itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
            <p className="hours-title">
              <strong>Orari di Apertura:</strong>
            </p>
            <p className="always-open">
              <meta itemProp="dayOfWeek" content="Monday Tuesday Wednesday Thursday Friday Saturday Sunday" />
              <meta itemProp="opens" content="00:00" />
              <meta itemProp="closes" content="23:59" />
              <span className="pulse-text">SEMPRE APERTI 24/7</span>
            </p>
            <p className="open-days">360 giorni l'anno</p>
            <p className="closure-note">
              Chiusi solo: 25/12 (14-18), 1/1 (14-18)
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Resta Aggiornato</h3>
            <p>Ricevi news, ricette e offerte speciali per ristoranti</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="La tua email"
              required
              aria-label="Email per newsletter"
            />
            <button type="submit" className="btn btn-primary">
              Iscriviti
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="footer-bottom">
    <div className="container">
      <div className="bottom-content">
        <div className="copyright">
          <p>
            © {currentYear} I 3 Fratelli S.r.l. - P.IVA {config.legal.vatNumber}
          </p>
          <p className="made-with">
            Fatto con 🍞 e ❤️ a Milano - Il forno non dorme mai
          </p>
        </div>
        <nav className="legal-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
          <Link to="/termini-condizioni">Termini & Condizioni</Link>
        </nav>
      </div>
    </div>
  </div>

  {/* Schema.org JSON-LD */}
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Bakery",
      "name": "I 3 Fratelli",
      "url": "https://www.i3fratelli.it",
      "telephone": config.contact.phone.main,
      "email": config.contact.email.info,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.contact.address.street,
        "addressLocality": config.contact.address.city,
        "postalCode": config.contact.address.cap,
        "addressCountry": "IT"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "€",
      "servesCuisine": "Italian Bakery",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": config.testimonials.googleRating,
        "reviewCount": config.testimonials.googleReviews
      }
    })
  }} />
</footer>
);
};
export default Footer;
