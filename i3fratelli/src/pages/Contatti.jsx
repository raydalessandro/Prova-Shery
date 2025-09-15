import React, { useState } from 'react';
import MetaTags from '../components/seo/MetaTags';
import config from '../data/config.json';
import orari from '../data/orari.json';
import './Contatti.css';
const Contatti = () => {
const [formData, setFormData] = useState({
name: '',
email: '',
phone: '',
subject: 'info',
message: ''
});
const [formStatus, setFormStatus] = useState('');
const handleSubmit = async (e) => {
e.preventDefault();
// Track form submission
if (window.gtag) {
  window.gtag('event', 'contact_form', {
    event_category: 'engagement',
    event_label: formData.subject
  });
}

// Qui integreresti con il tuo backend o servizio email
console.log('Form submitted:', formData);

// Simula invio
setFormStatus('sending');
setTimeout(() => {
  setFormStatus('success');
  // Reset form dopo 3 secondi
  setTimeout(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'info',
      message: ''
    });
    setFormStatus('');
  }, 3000);
}, 1000);
};
const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};
return (
<>
<MetaTags
     title="Contatti e Orari | Siamo Sempre Aperti"
     description="Trova il panificio sempre aperto in Via del Pane 3, Milano. Telefono, WhatsApp, orari (24/7), mappa e indicazioni."
     keywords="contatti panificio milano, orari panificio, dove siamo, panificio h24"
   />
  {/* Hero Section */}
  <section className="contacts-hero">
    <div className="container">
      <h1 className="hero-title">Vieni Quando Vuoi.<br />Siamo Sempre Qui.</h1>
      <p className="hero-subtitle">
        <span className="pulse-badge">
          <span className="pulse-dot"></span>
          APERTI ORA - {new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </p>
    </div>
  </section>

  {/* Quick Info */}
  <section className="quick-info">
    <div className="container">
      <div className="info-grid">
        <div className="info-card primary">
          <div className="info-icon">📍</div>
          <h3>Dove Siamo</h3>
          <address>
            <strong>{config.contact.address.street}</strong><br />
            {config.contact.address.cap} {config.contact.address.city}<br />
            {config.contact.address.zone}
          </address>
          <a 
            href={`https://maps.google.com/?q=${config.contact.address.street}, ${config.contact.address.city}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Indicazioni Stradali →
          </a>
        </div>
        
        <div className="info-card">
          <div className="info-icon">📞</div>
          <h3>Telefono</h3>
          <p>
            <strong>Numero Principale:</strong><br />
            <a href={`tel:${config.contact.phone.main}`} className="phone-number">
              {config.contact.phone.display}
            </a>
          </p>
          <p>
            <strong>Emergenze H24:</strong><br />
            <a href={`tel:${config.contact.phone.emergency}`} className="phone-number emergency">
              {config.contact.phone.displayEmergency}
            </a>
          </p>
          <p>
            <strong>Ristoranti B2B:</strong><br />
            <a href={`tel:${config.contact.phone.b2b}`} className="phone-number">
              333 789 0123
            </a>
          </p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">💬</div>
          <h3>WhatsApp</h3>
          <p>Ordina direttamente su WhatsApp!</p>
          <a 
            href={`https://wa.me/${config.contact.whatsapp.number}`}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apri WhatsApp
          </a>
          <p className="info-note">
            Rispondiamo sempre, anche alle 3 di notte
          </p>
        </div>
        
        <div className="info-card highlight">
          <div className="info-icon">🕐</div>
          <h3>Orari di Apertura</h3>
          <p className="always-open">
            SEMPRE APERTI
          </p>
          <p className="hours-detail">
            24 ore su 24<br />
            7 giorni su 7<br />
            360 giorni l'anno
          </p>
          <p className="closure-note">
            Chiusi solo:<br />
            25/12 (14-18) • 1/1 (14-18)
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Map Section */}
  <section className="map-section">
    <div className="container">
      <h2 className="section-title">Trovaci sulla Mappa</h2>
      <div className="map-wrapper">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.8!2d${config.contact.address.coordinates.lng}!3d${config.contact.address.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI5JzExLjAiTiA5wrAxMSczNC4wIkU!5e0!3m2!1sit!2sit!4v1234567890`}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mappa I 3 Fratelli"
        ></iframe>
      </div>
      
      <div className="directions-info">
        <h3>Come Raggiungerci</h3>
        <div className="transport-options">
          <div className="transport-option">
            <span className="transport-icon">🚇</span>
            <div>
              <strong>Metro:</strong>
              <p>M2/M5 Garibaldi (5 min a piedi)<br />
              M3 Zara (8 min a piedi)</p>
            </div>
          </div>
          
          <div className="transport-option">
            <span className="transport-icon">🚌</span>
            <div>
              <strong>Bus:</strong>
              <p>Linee 43, 94 - Fermata Farini</p>
            </div>
          </div>
          
          <div className="transport-option">
            <span className="transport-icon">🚗</span>
            <div>
              <strong>Auto:</strong>
              <p>Parcheggio in strada (strisce blu)<br />
              Parcheggio notturno gratuito</p>
            </div>
          </div>
          
          <div className="transport-option">
            <span className="transport-icon">🚴</span>
            <div>
              <strong>Bici:</strong>
              <p>Stazione BikeMi a 100m<br />
              Rastrelliere disponibili</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Contact Form */}
  <section className="contact-form-section">
    <div className="container">
      <div className="form-wrapper">
        <div className="form-info">
          <h2>Scrivici</h2>
          <p>
            Hai domande? Vuoi fare un ordine speciale? 
            Sei un ristorante interessato ai nostri servizi?
          </p>
          <p>
            <strong>Compila il form e ti risponderemo subito!</strong>
          </p>
          
          <div className="quick-contacts">
            <p>
              <strong>Email dirette:</strong>
            </p>
            <ul>
              <li>
                Info generali: 
                <a href={`mailto:${config.contact.email.info}`}>
                  {config.contact.email.info}
                </a>
              </li>
              <li>
                Ordini: 
                <a href={`mailto:${config.contact.email.ordini}`}>
                  {config.contact.email.ordini}
                </a>
              </li>
              <li>
                Ristoranti B2B: 
                <a href={`mailto:${config.contact.email.b2b}`}>
                  {config.contact.email.b2b}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nome *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Telefono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Oggetto *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="info">Informazioni generali</option>
                <option value="ordine">Ordine speciale</option>
                <option value="b2b">Partnership B2B</option>
                <option value="catering">Catering/Eventi</option>
                <option value="feedback">Feedback</option>
                <option value="altro">Altro</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Messaggio *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              placeholder="Raccontaci come possiamo aiutarti..."
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Invio in corso...' : 'Invia Messaggio'}
            </button>
          </div>
          
          {formStatus === 'success' && (
            <div className="form-success">
              ✅ Messaggio inviato! Ti risponderemo presto.
            </div>
          )}
        </form>
      </div>
    </div>
  </section>

  {/* Social Links */}
  <section className="social-section">
    <div className="container">
      <h2 className="section-title">Seguici sui Social</h2>
      <div className="social-links">
        <a 
          href={config.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link facebook"
        >
          <span className="social-icon">📘</span>
          <span>Facebook</span>
        </a>
        
        <a 
          href={config.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link instagram"
        >
          <span className="social-icon">📷</span>
          <span>Instagram</span>
        </a>
        
        <a 
          href={config.social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link tiktok"
        >
          <span className="social-icon">🎵</span>
          <span>TikTok</span>
        </a>
        
        <a 
          href={config.social.googleBusiness}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link google"
        >
          <span className="social-icon">📍</span>
          <span>Google Maps</span>
        </a>
      </div>
    </div>
  </section>

  {/* Emergency CTA */}
  <section className="emergency-cta">
    <div className="container">
      <div className="emergency-box">
        <h3>🚨 Servizio Emergenza Attivo 24/7</h3>
        <p>Hai bisogno di pane SUBITO? Consegna garantita in 30 minuti!</p>
        <a href={`tel:${config.contact.phone.emergency}`} className="btn btn-emergency">
          Chiama Emergenza: {config.contact.phone.displayEmergency}
        </a>
      </div>
    </div>
  </section>
</>
);
};
export default Contatti;
