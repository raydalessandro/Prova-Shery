import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';
const CookieBanner = () => {
const [isVisible, setIsVisible] = useState(false);
const [showDetails, setShowDetails] = useState(false);
const [preferences, setPreferences] = useState({
necessary: true,
analytics: false,
marketing: false
});
useEffect(() => {
// Controlla se l'utente ha già dato consenso
const savedConsent = localStorage.getItem('cookieConsent');
if (!savedConsent) {
  // Mostra banner dopo 1 secondo
  setTimeout(() => {
    setIsVisible(true);
  }, 1000);
} else {
  // Applica preferenze salvate
  const consent = JSON.parse(savedConsent);
  applyConsent(consent);
}
}, []);
const applyConsent = (consent) => {
// Aggiorna Google Tag Manager consent
if (window.gtag) {
window.gtag('consent', 'update', {
'analytics_storage': consent.analytics ? 'granted' : 'denied',
'ad_storage': consent.marketing ? 'granted' : 'denied',
'functionality_storage': 'granted',
'personalization_storage': consent.marketing ? 'granted' : 'denied',
'security_storage': 'granted'
});
}
// Salva in localStorage
localStorage.setItem('cookieConsent', JSON.stringify(consent));
localStorage.setItem('cookieConsentDate', new Date().toISOString());
};
const handleAcceptAll = () => {
const fullConsent = {
necessary: true,
analytics: true,
marketing: true
};
setPreferences(fullConsent);
applyConsent(fullConsent);
setIsVisible(false);

// Track evento
if (window.gtag) {
  window.gtag('event', 'cookie_consent', {
    event_category: 'privacy',
    event_label: 'accept_all'
  });
}
};
const handleAcceptSelected = () => {
applyConsent(preferences);
setIsVisible(false);
// Track evento
if (window.gtag) {
  window.gtag('event', 'cookie_consent', {
    event_category: 'privacy',
    event_label: 'accept_selected',
    analytics: preferences.analytics,
    marketing: preferences.marketing
  });
}
};
const handleRejectAll = () => {
const minimalConsent = {
necessary: true,
analytics: false,
marketing: false
};
setPreferences(minimalConsent);
applyConsent(minimalConsent);
setIsVisible(false);

// Track evento (solo se analytics accettati)
if (window.gtag && preferences.analytics) {
  window.gtag('event', 'cookie_consent', {
    event_category: 'privacy',
    event_label: 'reject_all'
  });
}
};
const togglePreference = (type) => {
if (type === 'necessary') return; // Non si può disabilitare
setPreferences(prev => ({
  ...prev,
  [type]: !prev[type]
}));
};
if (!isVisible) return null;
return (
<>
{/* Overlay */}
<div className="cookie-overlay" onClick={() => setShowDetails(false)} />
  {/* Banner */}
  <div className={`cookie-banner ${showDetails ? 'expanded' : ''}`}>
    <div className="cookie-content">
      {/* Header */}
      <div className="cookie-header">
        <h3>🍪 Usiamo i Cookie (non quelli da mangiare!)</h3>
      </div>

      {/* Main Text */}
      <div className="cookie-text">
        <p>
          Usiamo i cookie per migliorare la tua esperienza, analizzare il traffico 
          e personalizzare i contenuti. Proprio come il nostro pane, anche i cookie 
          sono fatti con cura!
        </p>
        
        {!showDetails && (
          <button 
            className="cookie-details-toggle"
            onClick={() => setShowDetails(true)}
          >
            Personalizza preferenze
          </button>
        )}
      </div>

      {/* Detailed Preferences */}
      {showDetails && (
        <div className="cookie-preferences">
          <div className="preference-group">
            <label className="preference-item">
              <input 
                type="checkbox"
                checked={preferences.necessary}
                disabled
              />
              <div className="preference-info">
                <strong>Cookie Necessari</strong>
                <span>Essenziali per il funzionamento del sito (sempre attivi)</span>
              </div>
            </label>
          </div>

          <div className="preference-group">
            <label className="preference-item">
              <input 
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => togglePreference('analytics')}
              />
              <div className="preference-info">
                <strong>Cookie Analitici</strong>
                <span>Ci aiutano a capire come usi il sito (Google Analytics)</span>
              </div>
            </label>
          </div>

          <div className="preference-group">
            <label className="preference-item">
              <input 
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => togglePreference('marketing')}
              />
              <div className="preference-info">
                <strong>Cookie di Marketing</strong>
                <span>Per mostrarti offerte personalizzate (Facebook, Google Ads)</span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="cookie-actions">
        {showDetails ? (
          <>
            <button 
              className="btn btn-outline"
              onClick={handleRejectAll}
            >
              Rifiuta tutti
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleAcceptSelected}
            >
              Accetta selezionati
            </button>
          </>
        ) : (
          <>
            <button 
              className="btn btn-outline"
              onClick={handleRejectAll}
            >
              Solo necessari
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleAcceptAll}
            >
              Accetta tutti
            </button>
          </>
        )}
      </div>

      {/* Links */}
      <div className="cookie-links">
        <Link to="/cookie-policy" onClick={() => setIsVisible(false)}>
          Cookie Policy
        </Link>
        <span className="separator">•</span>
        <Link to="/privacy" onClick={() => setIsVisible(false)}>
          Privacy Policy
        </Link>
      </div>
    </div>

    {/* Fun Message */}
    <div className="cookie-fun-message">
      <p>
        PS: I nostri cookie digitali sono gluten-free! 
        <span className="emoji">😄</span>
      </p>
    </div>
  </div>
</>
);
};
export default CookieBanner;
