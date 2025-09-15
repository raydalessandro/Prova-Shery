Bottone WhatsApp flottante con tracking">
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../../data/config.json';
import './WhatsAppFloat.css';
const WhatsAppFloat = () => {
const location = useLocation();
const [isVisible, setIsVisible] = useState(false);
const [message, setMessage] = useState(config.contact.whatsapp.defaultMessage);
const [showTooltip, setShowTooltip] = useState(false);
const [unreadCount, setUnreadCount] = useState(0);
const [isNightTime, setIsNightTime] = useState(false);
useEffect(() => {
// Mostra dopo 2 secondi
const showTimer = setTimeout(() => {
setIsVisible(true);
}, 2000);
// Mostra tooltip dopo 5 secondi
const tooltipTimer = setTimeout(() => {
  setShowTooltip(true);
  // Nascondi dopo 5 secondi
  setTimeout(() => setShowTooltip(false), 5000);
}, 5000);

return () => {
  clearTimeout(showTimer);
  clearTimeout(tooltipTimer);
};
}, []);
useEffect(() => {
// Determina messaggio in base alla pagina
const path = location.pathname;
const hour = new Date().getHours();
setIsNightTime(hour >= 22 || hour < 5);
if (path.includes('b2b') || path.includes('ristoranti')) {
  setMessage(config.contact.whatsapp.b2bMessage);
} else if (path.includes('emergenza') || isNightTime) {
  setMessage(config.contact.whatsapp.emergencyMessage || "URGENTE: Ho bisogno di pane subito!");
} else if (path.includes('prodotti')) {
  setMessage("Salve, vorrei ordinare dal vostro catalogo");
} else if (path.includes('24h')) {
  setMessage("Salve, siete aperti ora? Vorrei ordinare");
} else {
  setMessage(config.contact.whatsapp.defaultMessage);
}
}, [location, isNightTime]);
// Simula notifiche per engagement
useEffect(() => {
if (isNightTime) {
const notificationTimer = setTimeout(() => {
setUnreadCount(1);
setShowTooltip(true);
    // Rimuovi dopo 3 secondi
    setTimeout(() => {
      setUnreadCount(0);
      setShowTooltip(false);
    }, 3000);
  }, 10000);

  return () => clearTimeout(notificationTimer);
}
}, [isNightTime]);
const handleClick = (e) => {
e.preventDefault();
// Track click
if (window.gtag) {
  window.gtag('event', 'whatsapp_click', {
    event_category: 'engagement',
    event_label: location.pathname,
    value: isNightTime ? 2 : 1
  });
}

// Prepara numero WhatsApp (rimuovi spazi e caratteri speciali)
const number = config.contact.whatsapp.number.replace(/[^0-9]/g, '');

// Crea URL WhatsApp
const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

// Apri WhatsApp
window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

// Reset unread count
setUnreadCount(0);
};
if (!isVisible) return null;
return (
<div className={whatsapp-float-container ${isNightTime ? 'night-mode' : ''}}>
{/* Tooltip */}
{showTooltip && (
<div className="whatsapp-tooltip">
<div className="tooltip-content">
{isNightTime
? "🌙 Siamo svegli! Ordina ora"
: "👋 Ciao! Come possiamo aiutarti?"}
</div>
<div className="tooltip-arrow"></div>
</div>
)}
  {/* Main Button */}
  <button
    className={`whatsapp-float ${unreadCount > 0 ? 'has-notification' : ''}`}
    onClick={handleClick}
    aria-label="Ordina su WhatsApp"
  >
    {/* Notification Badge */}
    {unreadCount > 0 && (
      <span className="notification-badge">{unreadCount}</span>
    )}

    {/* WhatsApp Icon */}
    <div className="whatsapp-icon">
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor"
        width="28"
        height="28"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </div>

    {/* Pulse Effect */}
    <div className="whatsapp-pulse"></div>
    <div className="whatsapp-pulse-2"></div>
  </button>

  {/* Quick Actions (solo mobile) */}
  <div className="whatsapp-quick-actions">
    <button 
      className="quick-action emergency"
      onClick={() => {
        setMessage("EMERGENZA: Ho bisogno di pane subito!");
        handleClick();
      }}
    >
      🆘
    </button>
  </div>

  {/* Status Indicator */}
  <div className="whatsapp-status">
    <span className="status-dot online"></span>
    <span className="status-text">Online ora</span>
  </div>
</div>
);
};
export default WhatsAppFloat;
