import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../data/config.json';
import './Header.css';
const Header = ({ isNightTime }) => {
const [isScrolled, setIsScrolled] = useState(false);
const [currentTime, setCurrentTime] = useState(new Date());
const [isMenuOpen, setIsMenuOpen] = useState(false);
// Gestione scroll per header sticky
useEffect(() => {
const handleScroll = () => {
setIsScrolled(window.scrollY > 50);
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
// Aggiorna ora ogni minuto
useEffect(() => {
const timer = setInterval(() => {
setCurrentTime(new Date());
}, 60000);
return () => clearInterval(timer);
}, []);
// Format ora italiana
const formatTime = () => {
return currentTime.toLocaleTimeString('it-IT', {
hour: '2-digit',
minute: '2-digit'
});
};
// Messaggio dinamico basato sull'ora
const getTimeMessage = () => {
const hour = currentTime.getHours();
if (hour >= 0 && hour < 5) return "🌙 Sforniamo nella notte";
if (hour >= 5 && hour < 9) return "☀️ Colazione fresca pronta";
if (hour >= 9 && hour < 12) return "🥖 Preparazione pranzo";
if (hour >= 12 && hour < 15) return "🍞 Pranzo caldo servito";
if (hour >= 15 && hour < 18) return "☕ Merenda time";
if (hour >= 18 && hour < 21) return "🌆 Pane per la cena";
return "🌃 Il forno non dorme";
};
const toggleMenu = () => {
setIsMenuOpen(!isMenuOpen);
// Blocca scroll quando menu è aperto
document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
};
return (
<>
{/* Top Bar con info essenziali */}
<div className="header-top-bar">
<div className="container">
<div className="top-bar-content">
<div className="top-bar-left">
<span className="always-open-badge">
<span className="pulse-dot"></span>
SEMPRE APERTI 24/7
</span>
<span className="current-time">
{formatTime()} - {getTimeMessage()}
</span>
</div>
<div className="top-bar-right">
<a href={tel:${config.contact.phone.main}} className="phone-link">
📞 {config.contact.phone.display}
</a>
<a
href={https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(config.contact.whatsapp.defaultMessage)}}
className="whatsapp-link"
target="_blank"
rel="noopener noreferrer"
>
💬 WhatsApp
</a>
</div>
</div>
</div>
</div>
  {/* Header Principale */}
  <header className={`header ${isScrolled ? 'header-scrolled' : ''} ${isNightTime ? 'night-mode' : ''}`}>
    <div className="container">
      <div className="header-content">
        {/* Logo e Brand */}
        <Link to="/" className="header-logo">
          <div className="logo-container">
            <span className="logo-icon">🍞</span>
            <div className="logo-text">
              <h1 className="logo-title">I 3 Fratelli</h1>
              <p className="logo-tagline">Mani di granite, cuore di lievito</p>
            </div>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="header-nav desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/chi-siamo" className="nav-link">Chi Siamo</Link>
          <Link to="/prodotti" className="nav-link">Prodotti</Link>
          <Link to="/b2b" className="nav-link nav-link-highlight">Per Ristoranti</Link>
          <Link to="/sempre-24h" className="nav-link nav-link-special">
            <span className="h24-badge">24H</span>
          </Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/contatti" className="nav-link">Contatti</Link>
        </nav>

        {/* CTA Buttons Desktop */}
        <div className="header-cta desktop-only">
          <a 
            href={`tel:${config.contact.phone.emergency}`}
            className="btn btn-emergency"
          >
            🚨 Emergenza
          </a>
          <a 
            href={`https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(
              isNightTime ? "Ho bisogno di pane ora!" : config.contact.whatsapp.defaultMessage
            )}`}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ordina Ora
          </a>
        </div>

        {/* Menu Hamburger Mobile */}
        <button 
          className="menu-toggle mobile-only"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    {/* Google My Business Integration */}
    <div className="gmb-strip">
      <div className="container">
        <div className="gmb-content">
          <div className="gmb-rating">
            ⭐ {config.testimonials.googleRating}/5 
            <span className="gmb-reviews">({config.testimonials.googleReviews} recensioni)</span>
          </div>
          <div className="gmb-info">
            📍 {config.contact.address.street}, {config.contact.address.zone}
          </div>
          <a 
            href={config.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="gmb-link"
          >
            Vedi su Google Maps →
          </a>
        </div>
      </div>
    </div>
  </header>

  {/* Mobile Menu Overlay */}
  <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
    <div className="mobile-menu-header">
      <div className="mobile-menu-logo">
        <span className="logo-icon">🍞</span>
        <span>I 3 Fratelli</span>
      </div>
      <button 
        className="mobile-menu-close"
        onClick={toggleMenu}
        aria-label="Chiudi menu"
      >
        ✕
      </button>
    </div>

    <nav className="mobile-menu-nav">
      <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
        Home
      </Link>
      <Link to="/chi-siamo" className="mobile-nav-link" onClick={toggleMenu}>
        Chi Siamo
      </Link>
      <Link to="/prodotti" className="mobile-nav-link" onClick={toggleMenu}>
        Prodotti
      </Link>
      <Link to="/b2b" className="mobile-nav-link mobile-nav-highlight" onClick={toggleMenu}>
        🏢 Per Ristoranti
      </Link>
      <Link to="/sempre-24h" className="mobile-nav-link mobile-nav-special" onClick={toggleMenu}>
        🌙 Sempre Aperti H24
      </Link>
      <Link to="/blog" className="mobile-nav-link" onClick={toggleMenu}>
        Blog
      </Link>
      <Link to="/contatti" className="mobile-nav-link" onClick={toggleMenu}>
        Contatti
      </Link>
    </nav>

    <div className="mobile-menu-cta">
      <a 
        href={`tel:${config.contact.phone.emergency}`}
        className="btn btn-emergency btn-block"
      >
        🚨 Chiama Emergenza
      </a>
      <a 
        href={`https://wa.me/${config.contact.whatsapp.number}`}
        className="btn btn-whatsapp btn-block"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 Ordina su WhatsApp
      </a>
    </div>

    <div className="mobile-menu-info">
      <div className="info-item">
        <strong>📍 Dove Siamo</strong>
        <p>{config.contact.address.street}</p>
        <p>{config.contact.address.zone}</p>
      </div>
      <div className="info-item">
        <strong>🕐 Orari</strong>
        <p className="always-open">SEMPRE APERTI 24/7</p>
        <p className="open-days">360 giorni l'anno</p>
      </div>
      <div className="info-item">
        <strong>📞 Contatti</strong>
        <p>{config.contact.phone.display}</p>
        <p>{config.contact.email.info}</p>
      </div>
    </div>

    <div className="mobile-menu-social">
      <a href={config.social.facebook} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a href={config.social.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      <a href={config.social.googleBusiness} target="_blank" rel="noopener noreferrer">
        Google
      </a>
    </div>
  </div>

  {/* Overlay sfondo per mobile menu */}
  {isMenuOpen && (
    <div className="mobile-menu-overlay" onClick={toggleMenu}></div>
  )}
</>
);
};
export default Header;
