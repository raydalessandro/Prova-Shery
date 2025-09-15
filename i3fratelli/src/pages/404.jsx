import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import config from '../data/config.json';
import './404.css';
const NotFound = () => {
const navigate = useNavigate();
const [countdown, setCountdown] = useState(10);
useEffect(() => {
// Auto-redirect dopo 10 secondi
const timer = setInterval(() => {
setCountdown(prev => {
if (prev <= 1) {
navigate('/');
return 0;
}
return prev - 1;
});
}, 1000);
return () => clearInterval(timer);
}, [navigate]);
const messages = [
"Questa pagina è andata a dormire...",
"...ma noi siamo sempre svegli!",
"Il pane che cercavi non è qui...",
"...ma ne abbiamo tanto altro!",
"Ti sei perso nel forno?",
"Non preoccuparti, ti riportiamo a casa!"
];
const [messageIndex, setMessageIndex] = useState(0);
useEffect(() => {
const messageTimer = setInterval(() => {
setMessageIndex(prev => (prev + 1) % messages.length);
}, 3000);
return () => clearInterval(messageTimer);
}, [messages.length]);
return (
<>
<MetaTags
     title="404 - Pagina Non Trovata"
     description="La pagina che cercavi non esiste, ma noi siamo sempre aperti! Torna alla home del panificio H24."
   />
  <div className="error-page">
    <div className="error-container">
      {/* 404 Animation */}
      <div className="error-code">
        <span className="four">4</span>
        <span className="zero bread">🍞</span>
        <span className="four">4</span>
      </div>
      
      {/* Messages */}
      <div className="error-messages">
        <h1 className="error-title">{messages[messageIndex]}</h1>
      </div>
      
      {/* Info */}
      <div className="error-info">
        <p className="error-description">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <p className="always-open">
          Ma tranquillo, <strong>noi siamo sempre aperti!</strong>
        </p>
      </div>
      
      {/* Current Status */}
      <div className="current-status">
        <span className="pulse-dot"></span>
        <span>
          Sono le {new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} 
          e siamo APERTI
        </span>
      </div>
      
      {/* Quick Links */}
      <div className="error-actions">
        <Link to="/" className="btn btn-primary">
          🏠 Torna alla Home
        </Link>
        <Link to="/prodotti" className="btn btn-outline">
          🍞 Vedi i Nostri Pani
        </Link>
        <a 
          href={`https://wa.me/${config.contact.whatsapp.number}`}
          className="btn btn-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 Ordina su WhatsApp
        </a>
      </div>
      
      {/* Auto Redirect */}
      <div className="auto-redirect">
        <p>Verrai reindirizzato alla home in <strong>{countdown}</strong> secondi...</p>
        <button 
          onClick={() => navigate('/')}
          className="skip-redirect"
        >
          Non aspettare →
        </button>
      </div>
      
      {/* Suggestions */}
      <div className="suggestions">
        <h2>Forse cercavi...</h2>
        <div className="suggestion-links">
          <Link to="/sempre-24h">🌙 Servizio 24H</Link>
          <Link to="/b2b">🏢 Per Ristoranti</Link>
          <Link to="/chi-siamo">👥 Chi Siamo</Link>
          <Link to="/contatti">📍 Dove Siamo</Link>
          <Link to="/blog">📖 Blog</Link>
        </div>
      </div>
      
      {/* Fun Facts */}
      <div className="fun-facts">
        <h3>Lo sapevi che...</h3>
        <div className="facts-carousel">
          <p className="fact">
            🍞 Sforniamo 500kg di pane ogni notte
          </p>
          <p className="fact">
            🌙 Il 15% dei nostri clienti viene di notte
          </p>
          <p className="fact">
            ⏰ Siamo aperti 8,640 ore all'anno
          </p>
          <p className="fact">
            🚚 Consegniamo anche alle 3 di notte
          </p>
        </div>
      </div>
      
      {/* Emergency Contact */}
      <div className="emergency-contact">
        <p>Hai bisogno di pane SUBITO?</p>
        <a href={`tel:${config.contact.phone.emergency}`} className="emergency-phone">
          🚨 Chiama il servizio emergenza: {config.contact.phone.displayEmergency}
        </a>
      </div>
    </div>
    
    {/* Background Animation */}
    <div className="background-animation">
      <span className="floating-bread">🥖</span>
      <span className="floating-bread">🍞</span>
      <span className="floating-bread">🥐</span>
      <span className="floating-bread">🥨</span>
    </div>
  </div>
</>
);
};
export default NotFound;
